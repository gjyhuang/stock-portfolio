const router = require('express').Router();
const {User, Portfolio, TransactionHistory} = require('../db/models/index');

module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {email: req.body.email},
      include: [{model: Portfolio}]
    })
    if (!user) {
      res.status(401).send('Wrong username and/or password.');
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Wrong username and/or password.');
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    // // creating with associations:
    // const user = await User.create(req.body, {
    //   include: [{
    //     association: User.Portfolio
    //   }]
    // });
    const user = await User.create(req.body, {
      include: [{
        association: User.Portfolio
      }]
    });
    const portfolio = await Portfolio.create();
    await user.setPortfolio(portfolio.id);
    const history = await TransactionHistory.create();
    await user.setTransactionHistory(history);
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('An account already exists for this email.');
    } else {
      console.error(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

// router.use('/google', require('./google'));
