const router = require('express').Router();
const {TransactionHistory, Transaction} = require('../db/models/index');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const transactions = await TransactionHistory.findAll();
    res.json(transactions);
  } catch (err) {
    next(err);
  }
})

// get user's transactions
router.get('/:id', async (req, res, next) => {
  try {
    const userTransactions = await TransactionHistory.findAll({
      where: { id: req.user.id },
    });
    res.json(userTransactions);
  } catch (err) {
    next(err);
  }
})
