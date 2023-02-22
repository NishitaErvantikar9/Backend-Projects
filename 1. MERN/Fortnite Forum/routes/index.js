var express = require('express');
var router = express.Router();
let UserModal = require('./users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/post', function(req, res, next) {
  res.render('write');
});

router.get('/reviews', function(req, res, next) {
  UserModal.find()
  .then(function(data){
    res.render('read', {data});
  })
});

router.post('/submit',function(req,res){
 UserModal.create({
   gamename: req.body.gamename,
   review : req.body.review
 })
 .then(function(a){
  //  res.send(a)
  res.redirect('/reviews')
 })
})

router.get('/update/:id', function(req,res){
  UserModal.findOne({_id: req.params.id})
  .then(function(game){
    res.render('update', {game})
  })
})

router.post('/update/:id',function(req,res){
  let updated = {
    gamename : req.body.gamename,
    review : req.body.review
  }
  UserModal.findOneAndUpdate({_id:req.params.id},{'$set': updated },{require:true})
  .then(function(updatedData){
    res.redirect('/reviews')
  })
})


router.get('/delete/:id',function(req,res){
  UserModal.findOneAndDelete({_id: req.params.id})
  .then(function(){
    res.redirect('/reviews')
  })
})

module.exports = router;
