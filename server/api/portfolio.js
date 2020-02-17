const router = require('express').Router();
const {Portfolio, Stock} = require('../db/models/index');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const portfolios = await Portfolio.findAll();
    res.json(portfolios);
  } catch (err) {
    next(err);
  }
})

// get user's portfolio
router.get('/:id', async (req, res, next) => {
  try {
    const userPortfolio = await Portfolio.findAll({
      where: { id: req.user.portfolioId },
    });
    res.json(userPortfolio);
  } catch (err) {
    next(err);
  }
})
