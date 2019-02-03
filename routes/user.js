var express = require('express');
var csrf = require('csurf');
var bodyParser = require('body-parser');
var router = express.Router();
var passport = require('passport');

var csrfProtection = csrf({
  cookie: true
});
var parseForm = bodyParser.urlencoded({
  extended: false
});

var Cart = require('../models/cart');
var Order = require('../models/order');

router.get('/profile', isLoggedIn, function (req, res, next) {
  Order.find({
    user: req.user
  }, function (err, orders) {
    if (err) {
      return res.write('Błąd!');
    }
    var cart;
    orders.forEach(function (order) {
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });
    res.render('user/profile', {
      orders: orders
    });
  });
});

router.get('/logout', isLoggedIn, function (req, res, next) {
  req.logout();
  req.session.cart = null;
  res.redirect('/');
});

router.use('/', notLoggedIn, function (req, res, next) {
  next();
});

router.get('/signup', csrfProtection, function (req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  });
});

router.post('/signup', parseForm, csrfProtection, passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.get('/signin', csrfProtection, function (req, res, next) {
  var messages = req.flash('error');
  res.render('user/signin', {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  });
});

router.post('/signin', parseForm, csrfProtection, passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/signin',
  failureFlash: true
}));

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};