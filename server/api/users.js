const router = require('express').Router();
const {User} = require('../db/models/index');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// pass in amount being paid
router.put('/:id', async (req, res, next) => {
  // make sure the user is logged in via passport's req.user
  if (!req.user) res.sendStatus(401);
  try {
    console.log('in put route', req.body, req.params.id)
    const {cash} = req.body;
    console.log('amt??', cash)
    if (cash < 0) {
      res.status(400).send("Error: negative amount.")
    }
    const user = await User.findByPk(req.params.id);
    user.totalCash -= cash;
    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
})
