let mongoose = require('mongoose');

let uri = 'mongodb+srv://pratiknew:pratik@pratik.7m6lk.mongodb.net/gamingforum9to12?retryWrites=true&w=majority'
mongoose.connect(uri,{ useUnifiedTopology: true ,useNewUrlParser: true})
.then(function(){
  console.log('Database Connected')
})
.catch(function(e){
  console.log(e)
})

let UserSchema = mongoose.Schema({
  gamename : String,
  review :String
})

module.exports = mongoose.model('user', UserSchema)