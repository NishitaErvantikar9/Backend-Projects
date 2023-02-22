const express = require("express");
const passport = require("passport");
const router = express.Router();
const userModel = require("./users");
const postModel = require('./post')
const { body, validationResult } = require('express-validator');

const data = new userModel()

const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index",{errors:false});
});

router.post("/reg", body('password').isLength({ min: 5 }).withMessage("Password should be of minimum 5 characters"),
function (req, res) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(400).json({ errors: errors.array() });
    res.render('index',errors)
  }

  const dets = new userModel({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
  });

  userModel.register(dets, req.body.password).then(function (registeredUser) {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

router.get("/profile",isLoggedIn ,function (req, res) {
  userModel.findOne({username:req.session.passport.user})
  .then(function(user){
    res.render('profile',{user});
  })
});


router.get("/login", function (req, res) {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res) {
  req.logOut();
  res.redirect("/");
});



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

router.get("/timeline", function (req, res) {
  userModel.findOne({username:req.session.passport.user}).populate('posts')
  .then(function(foundUser){
    res.render("timeline",{foundUser});
  })
});


router.post('/post', function (req, res) {
  userModel.findOne({ username: req.session.passport.user })
    .then(function (foundUser) {
      postModel.create({
        postText: req.body.post,
        user: foundUser
      }).then(function (newlyCreatedPost) {
        foundUser.posts.push(newlyCreatedPost);
        foundUser.save().then(function () {
          res.redirect('/timeline');
        })
      })
    })
});



module.exports = router;
