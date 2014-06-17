/**
 * Created by e.eremeev on 16/06/2014.
 */
//onload = function() {
//    if (!document.getElementsByTagName || !document.createTextNode) return;
//    var rows = document.getElementById('my_table').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
//    for (i = 0; i < rows.length; i++) {
//        rows[i].onclick = function() {
//            alert(this.rowIndex + 1);
//        }
//    }
//}

var preEl ;
var orgBColor;
var orgTColor;
function highLight(el, backColor,textColor){
    if(typeof(preEl)!='undefined') {
        preEl.bgColor=orgBColor;
        try{ChangeTextColor(preEl,orgTColor);}catch(e){;}
    }
    orgBColor = el.bgColor;
    orgTColor = el.style.color;
    el.bgColor=backColor;

    try{ChangeTextColor(el,textColor);}catch(e){;}
    preEl = el;
}


function ChangeTextColor(a_obj,a_color){  ;
    for (i=0;i<a_obj.cells.length;i++)
        a_obj.cells(i).style.color=a_color;
}