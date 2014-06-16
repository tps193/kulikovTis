/**
 * Created by Sergey on 09.06.2014.
 */
var express = require('express');
var fs = require('fs');

var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());
var router = express.Router();
var jsonString = JSON.parse(fs.readFileSync('db.json', 'utf8'));
/*{
    "objects" :
     [ {
        "at_syst": "detal",
        "dom": "~1.0.0",
        "Den": "~1.0.1",
        "Naim": "Первая деталь",
        "At_Type": "~0.7.4",
        "At_Len": "~1.3.0",
        "At_Dec": "",
        "At_Min": "",
        "At_Max": "",
        "At_Razm": "",
        "At_Kl": ""
} ,
     {
        "at_syst": "detal2",
        "dom": "~1.0.0",
        "Den": "~1.0.1",
        "Naim": "Вторая деталь",
        "At_Type": "~0.7.4",
        "At_Len": "~1.3.0",
        "At_Dec": "",
        "At_Min": "",
        "At_Max": "",
        "At_Razm": "",
        "At_Kl": ""
    } ]
}
*/

//var jsonObj = JSON.parse(jsonString);


/* GET home page. */
router.get('/', function(req, res) {
    var itemsNumber = 2;

    var first_field = req.param("email");
    var curPage = req.param("curPage");
    if (first_field != null) {
        var array = [];
        var len = jsonString.objects.length;
        var details = jsonString.objects;

        /*
         here we get all values from data base and make the search for the three fields
         */
        for(i=0;i<len;i++) {
            var detail = details[i];
            var fields = [detail.Naim, detail.dom, detail.Den];
            for(j=0;j<fields.length;j++) {
                if (search(fields[j], first_field)) {
                    array[array.length] = detail;
                    break;
                }
            }
        }
        /*
         if no string is suitable return nothing (empty array)
         */
        var arrayLen = array.length;
        var pages = arrayLen / itemsNumber;
        if (pages > parseInt(pages)) {
            pages = parseInt(pages) + 1;
        }
        var last;
        if (curPage == null) {
            curPage = 1;
        }
        if (curPage == pages) {
            last = arrayLen;
        } else {
            last = itemsNumber * curPage;
        }
        var outputArray = [];
        for(i=(curPage-1)*itemsNumber;i<last;i++) {
            outputArray[outputArray.length] = array[i];
        }
        var pageCount = pages;
        pages = [];
        for(i=0;i<pageCount;i++) {
            pages[pages.length] = i+1;
        }
        //        if (array.length == 0) {
//            //array = details;
//        }
    }
    res.render('search', { search: req.param("email") , items: arrayLen, json: outputArray , curPage: curPage, pages: pages});
});

module.exports = router;

/*
    function return true if string is suitable for mask
 */
function search(string, mask) {
    mask = mask.toLowerCase();
    string = string.toLowerCase()
    mask = mask.replace(new RegExp("\\*",'g'), ".*");
    mask = mask.replace(new RegExp("\\?",'g'), ".?");
    if (string.search(mask) != -1) {
        return true;
    } else {
        return false;
    }
}

function f(){}

