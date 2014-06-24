/**
 * Created by Sergey on 09.06.2014.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('addObject', { reqParam: req.param("Naim") });
});

router.get('/add', function(req, res) {
    var outputFilename = 'db.json';
    var jsonString = JSON.parse(fs.readFileSync(outputFilename, 'utf8'));


    var jsonObj = new Object();

    var id = jsonString.objects[jsonString.objects.length-1].id;
    var newId = parseInt(id) + 1

    jsonObj.id = newId;
    jsonObj.at_syst = req.param("at_syst");
    jsonObj.dom = req.param("dom");
    jsonObj.Den = req.param("Den");
    jsonObj.Naim = req.param("Naim");
    jsonObj.At_Type = req.param("At_Type");
    jsonObj.At_Len = req.param("At_Len");
    jsonObj.At_Dec = req.param("At_Dec");
    jsonObj.At_Min = req.param("At_Min");
    jsonObj.At_Max = req.param("At_Max");
    jsonObj.At_Razm = req.param("At_Razm");
    jsonObj.At_Kl = req.param("At_Kl");
    jsonString.objects[jsonString.objects.length]=jsonObj;

    fs.writeFile(outputFilename, JSON.stringify(jsonString, null, 4), function(err) {});

    res.render('searchEdit', { jsonObjects: jsonString.objects });
});

module.exports = router;


