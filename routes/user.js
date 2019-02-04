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
var User = require('../models/user');

router.get('/admin', requiresAdmin, function (req, res, next) {
  res.render('admin/panel');
});

router.get('/admin/users-index', requiresAdmin, function (req, res, next) {
  User.find(function (err, docs) {
    var usersChunk = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      usersChunk.push(docs.slice(i, i + chunkSize));
    }
    res.render('admin/users-index', {
      users: usersChunk
    });
  });
});

router.get('/admin/orders', requiresAdmin, function (req, res, next) {
  Order.find(function (err, docs) {
    res.render('admin/orders', {
      orders: docs
    });
  });
});

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
  successRedirect: '/user/profile',
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
    console.log(req.user);
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

function requiresAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user && req.user.isAdmin === true)
      next();
    else
      res.send(401, 'Unauthorized');
  }
};