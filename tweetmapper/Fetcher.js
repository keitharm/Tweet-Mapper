var Twitter  = require('twitter');
var settings = require('./settings.json');

var Fetcher = function(screenName) {
  this.screenName = screenName;
  this.init();
};

// Setup client
Fetcher.prototype.init = function() {
  this.client = new Twitter({
    consumer_key: settings.twitter.consumer_key,
    consumer_secret: settings.twitter.consumer_secret,
    access_token_key: '',
    access_token_secret: ''
  });
};

Fetcher.prototype.getTweets = function(amount, cb) {
  amount = amount || 10;

  var params = {
    screen_name: this.screenName,
    count: amount
  };

  this.client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      cb(tweets);
    } else {
      console.log(error);
    }
  });
};

module.exports = Fetcher;