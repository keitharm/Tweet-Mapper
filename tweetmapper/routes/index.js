var Fetcher  = require('../Fetcher.js');
var Tweet    = require('../Tweet.js');
var express  = require('express');
var router   = express.Router();
var settings = require('../settings.json');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: settings.general.title });
});

router.get('/fetchUser/:user', function(req, res, next) {
  var user = new Fetcher(req.params.user);
  user.getTweets(5, function(data) {
    res.send(data);
  });
});

module.exports = router;
