/**
 * Created by Sergey on 09.06.2014.
 */
var express = require('express');
var fs = require('fs');

var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var jsonString = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    var objects = jsonString.objects;
    res.render('searchEdit', { jsonObjects: objects });
});

module.exports = router;

