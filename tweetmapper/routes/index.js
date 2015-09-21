var express = require('express');
var router = express.Router();
var settings = require('../settings.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: settings.general.title });
});

router.get('/fetchUser/:user', function(req, res, next) {
  var user = req.params.user;
  res.send(user);
});

module.exports = router;
