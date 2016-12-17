var Polls = require('../models/polls.js')
var Poll = require('../models/polls');

function PollHandler() {
  this.createNewPoll = function(req, res) { // not checking for duplicates/if poll already exists
    var newPoll = new Poll();
    newPoll.ownerId = req.user.twitter.id;
    newPoll.ownerName = req.user.twitter.name;
    newPoll.title = req.body.questionInput;
    newPoll.options = parseOptions(req.body.options);

    newPoll.save(function(err, data) {
      if (err) throw err;
      res.end();
    });
  }

  this.getPoll = function(req, res) {
    if (typeof req.query.id != 'undefined') {
      Polls.findOne({'_id': req.query.id}, 'ownerName title options').exec(function(err, data) {
        if (err) throw err;
        res.json({owner: data.ownerName, title: data.title, options: data.options});
      })
    } else {
      Polls.find({}, '_id title').exec(function(err, data) {
        if (err) throw err;
        res.json({polls: data});
      })
    }

  }
}

function parseOptions(optionStr) {
  var optionArr = [];
  var tokens = optionStr.split(',');
  for (var i = 0; i < tokens.length; i++) {
    var option = {optionText: tokens[i]};
    optionArr.push(option);
  }
  return optionArr;
}

module.exports = PollHandler
