/**
 * Created by Sergey on 09.06.2014.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

    var jsonObj = new Object();
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

    var jsonString = JSON.stringify(jsonObj);

    res.render('addObject', { reqParam: req.param("Naim") });
});

module.exports = router;


