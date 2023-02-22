var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET home page. */
router.post('/chat', function(req, res, next) {
  let name= req.body.name;
  res.render('chat',{name});
});

module.exports = router;
