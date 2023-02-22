var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
/* GET Comic 1 page. */
router.get('/comic1', function(req, res, next) {
  res.render('comic1');
});
/* GET Comic2 page. */
router.get('/comic2', function(req, res, next) {
  res.render('comic2');
});
/* GET Comic 3 page. */
router.get('/comic3', function(req, res, next) {
  res.render('comic3');
});
/* GET Comic 4 page. */
router.get('/comic4', function(req, res, next) {
  res.render('comic4');
});
/* GET Comic 5 page. */
router.get('/comic5', function(req, res, next) {
  res.render('comic5');
});

module.exports = router;
