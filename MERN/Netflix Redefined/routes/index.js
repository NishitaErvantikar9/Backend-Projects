var express = require('express');
var router = express.Router();
var fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/trending', function(req, res, next) {
  res.render('trending');
});

router.get('/movies', function(req, res, next) {
  res.render('movies');
});

router.get('/subscription', function(req, res, next) {
  res.render('subscription');
});

router.post('/submit', function(req,res){
let email = req.body.email
fs.appendFile('data.txt',`email: ${email}`, function(e){
  if(e){
    console.log(e)
  }
  else{
    res.send('Subscribed! Go to Home Page')
  }
})
})

module.exports = router;
