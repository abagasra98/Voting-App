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
    if (req.query.id && req.query.id.match(/^[0-9a-fA-F]{24}$/)) {
      Polls.findOne({'_id': req.query.id}, 'ownerName title options').exec(function(err, data) {
        if (err) throw err;
        res.json({owner: data.ownerName, title: data.title, options: data.options});
      })
    } else if (!req.query.id) {
      Polls.find({}, '_id title').exec(function(err, data) {
        if (err) throw err;
        res.json({polls: data});
      })
    } else {
      res.json({error: 'Invalid ID entered'});
    }
  }

  this.recordVote = function(req, res) {
    var pollId = extractPollId(req.headers['referer']);
    if (pollId.match(/^[0-9a-fA-F]{24}$/)) {
      var projection = 'options.' + req.body.option;
      Polls.findByIdAndUpdate(pollId, {$push: {[projection]: req.user.twitter.id}}, {new: true}, function(err, data) {
        if (err) throw err;
        res.json(data.options[req.body.option].length);
      })
    }
  }
}

function parseOptions(optionStr) {
  var optionArr = {};
  var tokens = optionStr.split(',');
  for (var i = 0; i < tokens.length; i++) {
    optionArr[tokens[i]] = [];
  }
  return optionArr;
}

function extractPollId(str) {
  if (str.indexOf('id=') > 0)
    return str.substring(str.indexOf('=')+1);
  return '';
}

module.exports = PollHandler
