var express = require('express');
var router = express.Router();
var passport = require('passport')
var GoogleAuth = require('passport-google-oauth20').Strategy
let UserModel = require('./users')

passport.use(
  new GoogleAuth({
    clientID: '965164812870-prb5c6oqgr4p6ud9d8flmrbj17e82e04.apps.googleusercontent.com',
    clientSecret:'tyRkf7Ft2N0gOAyil0dDqyH_',
    callbackURL:'http://localhost:3000/auth'
  }, function(accesstoken,refreshtoken, profile,done){
    console.log('working');
    UserModel.findOne({googleID: profile.id})
    .then(function(founduser){
      if(founduser){
        done(null,founduser)
      }
      else{
        new UserModel({
          googleID: profile.id
        })
        .save()
        .then(function(newuser){
          done(null,newuser)
        })
      }
    })
  })
)

router.get('/', function(req, res, next) {
  res.render('index');
});



router.get('/auth',passport.authenticate( 'google',{ failureRedirect:'/localhost:3000/'}) ,function(req, res, next) {
  res.render('profile');
});

router.get('/google', passport.authenticate('google',{
  scope:['profile','email']
}),function(req,res){

})

router.get('/logout',function(req,res){
req.logOut();
res.redirect('/')
})

module.exports = router;
