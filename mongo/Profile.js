const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const consts = require('../config.js').consts;

mongoose.connect(consts.MLAB_CONNECTION,function(err){
  console.log("mLab connected succsfully");
});

var ProfileSchema = new Schema({
  _id: {type: String, required: true},
  name: {
    firstname: String,
    lastname: String
  },
  age: Number,
  address: String
},{collection: 'profiles'})

module.exports = mongoose.model('profiles',ProfileSchema);
