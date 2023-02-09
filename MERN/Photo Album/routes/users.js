let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/photoalbum')
.then(function(){
  console.log('Database connected')
})
.catch(function(e){
console.log(e)
})

let userSchema = mongoose.Schema({
  name: String,
  avatar : String
})

module.exports = mongoose.model('photo', userSchema)