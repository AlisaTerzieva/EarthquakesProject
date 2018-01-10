var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var db = require('../dbs');

/* GET home page. */
router.get('/', function (req, res, next) {
  var query = Event.find({}).limit(50);
  query.exec((err, docs) => {
    res.set('Content-Type', 'application/json');
    res.send(docs);
  });
});

router.get('/:id', function (req, res, next) {
  var id = req.url.substr(1);
  var query = Event.findById(id);
  query.exec((err, docs) => {
    res.set('Content-Type', 'application/json');
    res.send(docs);
  });
});

module.exports = router;
