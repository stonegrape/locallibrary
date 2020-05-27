var express = require('express');
var router = express.Router();

// Home page route.
router.get('/', function (req, res) {
  res.send('https://www.baidu.com/');
});

// About page route.
router.get('/about', function (req, res) {
  res.send('https://www.baidu.com/');
});

module.exports = router;