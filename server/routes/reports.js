var express = require('express');
var router = express.Router();
var Report = require('../models/report');
var db = require('../dbs/index');

/* GET home page. */
router.get('/', function (req, res, next) {
  var query = Report.find({}).limit(30);
  query.exec((err, docs) => {
    res.set('Content-Type', 'application/json');
    res.send(docs);
  });
});

module.exports = router;
