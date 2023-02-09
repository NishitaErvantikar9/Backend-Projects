let mongoose = require('mongoose')
let uri = 'mongodb+srv://pratiknew:pratik@pratik.7m6lk.mongodb.net/ck12donorapp?retryWrites=true&w=majority'

mongoose.connect(uri)
.then(()=>{
  console.log('database Connected')
})
.catch((e)=>{
  console.log(e)
})

let UserSchema = mongoose.Schema({
  name:String,
  amount: String,
  prfl: {
    type: String,
    default: "https://images.unsplash.com/photo-1552699611-e2c208d5d9cf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=438&q=80"
  }
})

module.exports = mongoose.model('participant', UserSchema)