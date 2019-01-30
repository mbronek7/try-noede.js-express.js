var express = require('express');
var csrf = require('csurf');
var bodyParser = require('body-parser');
var router = express.Router();
var Product = require('../models/product');

var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });

router.get('/', function(req, res, next) {
  Product.find(function(err, docs) {
    var productsChunk = [];
    var chunkSize = 3;
    for(var i = 0; i < docs.length; i+= chunkSize ){
      productsChunk.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', { products: productsChunk });
  });
});

router.get('/user/signup',  csrfProtection, function(req, res, next){
  res.render('user/signup', {csrfToken: req.csrfToken()});
});

router.post('/user/signup', parseForm, csrfProtection, function(req, res, next){
  res.redirect('/');
});

module.exports = router;
