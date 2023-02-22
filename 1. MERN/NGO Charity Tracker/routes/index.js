var express = require('express');
var router = express.Router();
let UserModel = require('./users')
let multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    var date = new Date();
    var newfilename = date.getTime() + file.originalname;
    cb(null, newfilename)
  }
})

const upload = multer({ storage: storage })

/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('index')
});

router.get('/update/:id', (req,res)=>{
  UserModel.findOne({_id:req.params.id})
  .then(function(a){
    res.render('update',{a})
  })
})

router.post('/add', (req,res)=>{
  UserModel.create({
    name: req.body.name,
    amount : req.body.amount,
  })
  .then(function(){
    res.redirect('/donorlist')
  })
})

router.post('/update/:id',(req,res)=>{
  let updated = {
    name: req.body.name,
    amount: req.body.amount
  }
  UserModel.findOneAndUpdate({_id: req.params.id}, {$set:updated},{require:true})
  .then(function(){
    res.redirect('/donorlist')
  })
})

router.get('/delete/:id',(req,res)=>{
  UserModel.findOneAndDelete({_id:req.params.id})
  .then(function(){
    res.redirect('/')
  })
})

router.get('/adduser', function(req, res, next) {
  res.render('Add');
});



router.post('/uploadpic/:id', upload.single('prfl'), function (req, res) {
  var addressOfImage = '/images/uploads/' + req.file.filename;
  UserModel.findOne({ _id: req.params.id })
    .then(function (a) {
      a.prfl = addressOfImage;
      a.save().then(function () {
        res.render('update',{a})
      })
    })
});

router.get('/leaderboard',(req,res)=>{
  UserModel.find().sort({amount:-1})
  .then(function(data){
    res.render('leaderboard',{data})
  })
})

router.get('/donorlist', function(req,res){
  UserModel.find().then(function(contestant){
    res.render('donorlist', {contestant});
  })
})

module.exports = router;


