const router = require('express').Router();
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
    res.json(userPortfolio);
  } catch (err) {
    next(err);
  }
})
