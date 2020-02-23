const router = require('express').Router();
const axios = require('axios');
const STOCK_API_KEY = process.env.API_KEY || require('../../secrets');
const {Portfolio, Stock} = require('../db/models/index');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const portfolios = await Portfolio.findAll({
      include: [{ model: Stock }]
    });
    res.json(portfolios);
  } catch (err) {
    next(err);
  }
})

// add selected stock to user portfolio
  // if stock is already in portfolio, only increment
router.post('/:id', async (req, res, next) => {
  try {
    // make sure the user is logged in via passport's req.user
    if (!req.user) res.sendStatus(401);
    const { symbol, companyName, quantity, convertedDate } = req.body;

    // making sure quantity is a whole integer
    if (quantity <= 0 || !Number.isInteger(quantity)) {
      return res.status(400).json('Please enter a valid quantity.');
    }
    const userPortfolio = await Portfolio.findOne({
      where: { id: req.params.id }
    });
    const [stockToAdd, created] = await Stock.findOrCreate({
      where: {
        symbol,
        portfolioId: req.params.id
       },
       defaults: {
         companyName,
         symbol,
         quantity,
         firstUpdate: convertedDate,
         latestUpdate: convertedDate
       }
    });
    // if stock is not in portfolio, add it; else, update the quantity
    if (created) {
      userPortfolio.addStock(stockToAdd);
    } else {
      stockToAdd.quantity += quantity;
      stockToAdd.latestUpdate = convertedDate;
      await stockToAdd.save();
    }
    // send the stock and the created flag - data to be resolved in redux store
    res.json([stockToAdd, created])
  } catch (err) {
    next(err);
  }
})

router.get('/fetchQuote/:symbol', async (req, res, next) => {
  try {
    // console.log('req.params', req.params)
    const URL = `https://sandbox.iexapis.com/stable/stock/${req.params.symbol}/quote?token=${STOCK_API_KEY}`;
    const { data } = await axios.get(URL);
    if (data) {
      res.json(data);
    }
  } catch (err) {
    if (err.response.status === 429) {
      res.status(429).send("You have attempted too many searches in too short a time frame. Please wait before trying again.")
    } else if (err.response.status === 500) {
      res.status(500).send("System error. Please try again shortly.")
    } else {
      res.status(404).send("This stock does not exist, or is not available for purchase.");
    }
  }
})

// get user's portfolio
// req.params.id is portfolioId from user
router.get('/:id', async (req, res, next) => {
  try {
    // make sure the user is logged in via passport's req.user
    if (!req.user) res.sendStatus(401);
    const userPortfolio = await Portfolio.findOne({
      where: { id: req.params.id },
      include: [{ model: Stock }]
    });
    // refresh stock prices via batch call to API for quotes for entire portfolio
    const symbols = userPortfolio.stocks
      .map(stock => stock.symbol)
      .join(',');
    // make batch call to API for quotes for entire portfolio
    const URL = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=quote&range=1m&last=5&&token=${STOCK_API_KEY}`;
    // api call won't work if portfolio is empty - skip
    if (!symbols) {
      res.json(userPortfolio);
      return;
    }
    const { data } = await axios.get(URL);

    // map through portfolio array to access nested objects from response object
    // restructure to match frontend requirements
    const stocksWithValues = userPortfolio.stocks.map(stock => {
      const currData = data[stock.symbol].quote;
      const updatedValue = currData.latestPrice;
      const status = currData.latestPrice - currData.open;
      const updatedStock = {
        id: stock.id,
        symbol: stock.symbol,
        companyName: stock.companyName,
        quantity: stock.quantity,
        firstUpdate: stock.firstUpdate,
        latestUpdate: stock.latestUpdate,
        portfolioId: stock.portfolioId,
        value: updatedValue,
        status
      };
      return updatedStock;
    });
    const updatedPortfolio = {
      id: userPortfolio.id,
      stocks: stocksWithValues
    }
    res.json(updatedPortfolio);
  } catch (err) {
    next(err);
  }
})
