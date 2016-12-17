var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var User = new Schema({
  twitter: {
    id: String,
    screenName: String,
    name: String,
  },
  polls: {
    ownedPolls: [Number],
    votedPolls: [Number]
  }
});

module.exports = mongoose.model('User', User);
