/**
 * Created by Sergey on 09.06.2014.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/', function(req, res) {
    var outputFilename = 'db.json';
    var jsonString = JSON.parse(fs.readFileSync(outputFilename, 'utf8'));


    var jsonObj = new Object();

    var id = jsonString.objects[jsonString.objects.length-1].id;
    var newId = parseInt(id) + 1

    jsonObj.id = newId;
    jsonObj.at_syst = req.body.at_syst;
    jsonObj.dom = req.body.dom;
    jsonObj.Den = req.body.Den;
    jsonObj.Naim = req.body.Naim;
    jsonObj.At_Type = req.body.At_Type;
    jsonObj.At_Len = req.body.At_Len;
    jsonObj.At_Dec = req.body.At_Dec;
    jsonObj.At_Min = req.body.At_Min;
    jsonObj.At_Max = req.body.At_Max;
    jsonObj.At_Razm = req.body.At_Razm;
    jsonObj.At_Kl = req.body.At_Kl;
    jsonString.objects[jsonString.objects.length]=jsonObj;

    fs.writeFile(outputFilename, JSON.stringify(jsonString, null, 4), function(err) {});

    res.render('searchEdit', { jsonObjects: jsonString.objects });
});

module.exports = router;


