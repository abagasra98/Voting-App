var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Option = new Schema({
  optionText: String,
  votes: Number,
  voterIds: [String]
});

var Poll = new Schema({
  ownerId: Number, // unique ID for polls not assigned, implement later?
  ownerName: String,
  title: String,
  options: [Option]
});

module.exports = mongoose.model('Poll', Poll);
