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
    console.log("a");
    res.send(data);
  });
});

module.exports = router;
