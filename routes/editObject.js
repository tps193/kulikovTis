/**
 * Created by e.eremeev on 17/06/2014.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/:id', function(req, res) {
    var jsonString = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    var selectedObjectID = req.params.id;
    var selectedObject;
    for(i=0;i<jsonString.objects.length;i++) {
        if(jsonString.objects[i].id==selectedObjectID) {
            selectedObject = jsonString.objects[i];
            break;
        }
    }
    res.render('editObject', { jsonObject: selectedObject });
});

router.post('/:id', function(req, res) {
    var jsonString = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    var selectedObjectID = req.params.id;
    for(i=0;i<jsonString.objects.length;i++) {
        if(jsonString.objects[i].id==selectedObjectID) {
            jsonString.objects[i]={
                "id": req.params.id,
                "at_syst": req.body.at_syst,
                "dom": req.body.dom,
                "Den": req.body.Den,
                "Naim": req.body.Naim,
                "At_Type": req.body.At_Type,
                "At_Len": req.body.At_Len,
                "At_Dec": req.body.At_Dec,
                "At_Min": req.body.At_Min,
                "At_Max": req.body.At_Max,
                "At_Razm": req.body.At_Razm,
                "At_Kl": req.body.At_Kl
            };
            var outputFilename = 'db.json';
            fs.writeFile(outputFilename, JSON.stringify(jsonString, null, 4), function(err) {});
            break;
        }
    }

    res.render('searchEdit', { jsonObjects: jsonString.objects });
});


module.exports = router;


