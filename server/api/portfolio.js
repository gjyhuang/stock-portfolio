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
