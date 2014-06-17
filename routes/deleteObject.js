var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res) {
    var jsonString = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    var selectedObjectID = req.query.id;

    for(i=0;i<jsonString.objects.length;i++) {
        if(jsonString.objects[i].id==selectedObjectID) {
            delete jsonString.objects[i];
            break;
        }
    }

    var temp = [];
    var i;
    for (i = 0; i < jsonString.objects.length; ++i) {
        if (jsonString.objects[i] != null) {
            temp.push(jsonString.objects[i]);
        }
    }
    jsonString.objects = temp;

    var outputFilename = 'db.json';
    fs.writeFile(outputFilename, JSON.stringify(jsonString, null, 4), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("JSON saved to " + outputFilename);
        }
    });

//    res.send('TEST!');
    res.render('searchEdit', { jsonObjects: jsonString.objects });
});


module.exports = router;


