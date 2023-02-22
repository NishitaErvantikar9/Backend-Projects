var express = require('express');
var router = express.Router();
var fs = require('fs')
const nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/events', function(req, res, next) {
  res.render('gallery');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.post('/submit',function(req,res){
  let name = req.body.name
  let email = req.body.email
  let number = req.body.number
  fs.appendFile('data.txt',`name: ${name}, email: ${email}, number: ${number}\n`, function(e){
    if(e){
      console.log(e)
    }

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'webdevck121.1@gmail.com',
        pass: 'ASProcks123'
      }
    });

    
    var mailOptions = {
      from: 'ratedr@gmail.com',
      to: req.body.email,
      subject: 'Successfully Tickets Booked',
      text: 'Congratulation you have successfully booked the ticket for the upcoming event'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
       res.render('success')
      }
    });

  
  })
})

router.get('/submit',(req,res)=>{
  res.render('success')
})

module.exports = router;
