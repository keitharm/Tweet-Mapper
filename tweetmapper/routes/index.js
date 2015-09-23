var Fetcher  = require('../Fetcher.js');
var Tweet    = require('../Tweet.js');
var express  = require('express');
var router   = express.Router();
var settings = require('../settings.json');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: settings.general.title });
});

router.get('/fetchUser/:user/:requests?', function(req, res, next) {
  var user     = new Fetcher(req.params.user);
  var requests = req.params.requests;
  user.getTweets(requests, function(data) {
    var coords = [];
    data.forEach(function(tweet) {
      var tweet = new Tweet(tweet);
      var t_coords = tweet.getCoords(true);
      if (t_coords.length !== 0) {
        coords.push({
          coords: t_coords,
          coords_str: tweet.getCoords(),
          status: tweet.getStatus(),
          date: tweet.getDate(),
          id: tweet.getID()
        });
      }
    });
    res.send({
      info: {
        requested: +(requests ? requests : 10),
        received: coords.length,
        total: data.length,
        percent: (Math.floor((coords.length/+(requests ? requests : 10))*10000)/100) + "%"
      },
      coords: coords
    });
  });
});

module.exports = router;
