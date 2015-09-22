var Twitter  = require('twitter');
var async    = require('async');
var _        = require('lodash');
var settings = require('./settings.json');
var Tweet    = require('./Tweet.js');

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

// Can fetch the latest 3200 tweets
Fetcher.prototype.getTweets = function(amount, cb) {
  amount      = amount || 10;
  var done    = false;
  var fetches = 0;
  var self    = this;

  // Maximum tweets that can be retrieved
  if (amount > 3200) {
    amount = 3200;
  }

  if (amount <= 200) {
    var params = {
      screen_name: this.screenName,
      count: amount
    };

    this.client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        cb(tweets);
      } else {
        cb([]);
      }
    });
    return;
  }

  // Hold all of the tweets to fetch
  var tweets = [];
  var toFetch, latestID;

  // Fetch as many tweets as possible
  async.whilst(
    function () { fetches++; return !done; },
    function (callback) {
      if (amount > 200) {
        toFetch = 200;
        amount -= 200;
      } else {
        toFetch = amount;
        amount = 0;
      }

      if (amount === 0 && toFetch === 0) {
        done = true;
        return;
      }

      var params = {
        screen_name: self.screenName,
        count: toFetch,
        trim_user: true
      };

      if (fetches > 1) {
        params["max_id"] = latestID;
      }

      self.client.get('statuses/user_timeline', params, function(error, data, response) {
        if (data.length === 0) {
          done = true;
        } else {
          if (!error) {
            var first = new Tweet(data[0]);
            var last = new Tweet(data[data.length-1]);
            latestID = last.getID();
            tweets = tweets.concat(data);
            if (amount === 0) {
              done = true;
            }
            callback();
          }
        }
      });
    },
    function (err) {
      cb(tweets);
    }
  );
};

module.exports = Fetcher;