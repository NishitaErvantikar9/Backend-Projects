const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
let uri = 'mongodb+srv://pratiknew:pratik@pratik.7m6lk.mongodb.net/ck12newFB?retryWrites=true&w=majority'
mongoose.connect(uri,{ useUnifiedTopology: true ,useNewUrlParser: true});

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts'
  }]
});

userSchema.plugin(plm);

module.exports = mongoose.model('user', userSchema);