var expect   = require('../node_modules/chai/chai').expect;
var Fetcher  = require('../Fetcher.js');
var Tweet    = require('../Tweet.js');
//var request = require('request');

describe("General tests", function() {

  // beforeEach(function(done) {
  //   done()
  // });

  // afterEach(function(done) {
  //   done()
  // });

  console.log("It should do addition properly")
  it("Should do addition properly", function() {
    var one = Math.floor(Math.random()*1000);
    var two = Math.floor(Math.random()*1000);
    expect(one+two).to.equal(one+two);
  });
});

describe("API tests", function() {

  // beforeEach(function(done) {
  //   done()
  // });

  // afterEach(function(done) {
  //   done()
  // });

  console.log("It should fetch a user's tweets")
  it("Should fetch a user's tweets", function() {
    var user = new Fetcher("arronhunt");
    user.getTweets(1, function(data) {
      console.log(data);
      expect(data).to.not.equal(null);
    });
  });
});