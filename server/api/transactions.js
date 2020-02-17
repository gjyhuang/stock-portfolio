const router = require('express').Router();
const {TransactionHistory, Transaction} = require('../db/models/index');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const transactions = await TransactionHistory.findAll({
      include: [{ model: Transaction }]
    });
    res.json(transactions);
  } catch (err) {
    next(err);
  }
})

// add selected stock upon purchase to user transaction history
router.post('/:id', async (req, res, next) => {
  try {
    // make sure the user is logged in via passport's req.user
    if (!req.user) res.sendStatus(401);
    const { symbol, name, priceAtPurchase, quantity, date } = req.body;
    const userTransactions = await TransactionHistory.findOne({
      where: { id: req.params.id },
      include: [{ model: Transaction }]
    })
    const newTransaction = await Transaction.create({
      symbol,
      name,
      priceAtPurchase,
      quantity,
      date,
    });
    await userTransactions.addTransaction(newTransaction);
    res.json(userTransactions);
  } catch (err) {
    next(err);
  }
})

// get user's transactions
router.get('/:id', async (req, res, next) => {
  try {
    // make sure the user is logged in via passport's req.user
    if (!req.user) res.sendStatus(401);
    const userTransactions = await TransactionHistory.findOne({
      where: { id: req.params.id },
      include: [{ model: Transaction }]
    });
    res.json(userTransactions);
  } catch (err) {
    next(err);
  }
})
