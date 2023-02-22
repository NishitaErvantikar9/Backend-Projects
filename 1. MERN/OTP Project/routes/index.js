var express = require('express');
var router = express.Router();
// var expresshbs = require('express-handlebars')
var messagebird = require('messagebird')('On5Y38ao7EtBUd5EgDJQ5bGh3')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.post('/step2', (req, res) => {
  var number = req.body.number

  messagebird.verify.create(number, {
      template:"Your verification code is %token"
  }, function (err, response) {
          if (err) {
              console.log(err)
              res.render('index', {
                  error:err.errors[0].description
              })
          }
          else {
              console.log(response)
              res.render('otp', {
                  id:response.id
              })
          }
  })
})

router.post('/step3', (req, res) => {
  var id = req.body.id
  var token = req.body.token

  messagebird.verify.verify(id, token, (err, response) => {
      if (err) {
          // res.render('otp', {
          //     error: err.errors[0].description,
          //     id:id
          // })
          res.send(err)
      }
      else {
          res.render('success')
      }
  })
})



module.exports = router;
