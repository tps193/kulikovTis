/**
 * Created by inord on 25/06/14.
 */
var selectedObjectID;
function filterColumn ( i ) {
    $('#my_table').DataTable().column( i ).search(
        $('#col'+i+'_filter').val()
    ).draw();
}

//Gets needed data from DataArray and puts it into input fields
function changeValue() {
    var selectedObject;
    for(var i=0; i<local_data.length; i++) {
        if (local_data[i].id==selectedObjectID) {
            selectedObject = local_data[i];
            break;
        }
    }
    var id = document.getElementById('idEdit');
    id.value = selectedObject.id;
    var at_syst = document.getElementById('at_systEdit');
    at_syst.value = selectedObject.at_syst;
    var dom = document.getElementById('domEdit');
    dom.value = selectedObject.dom;
    var Den = document.getElementById('DenEdit');
    Den.value = selectedObject.Den;
    var Naim = document.getElementById('NaimEdit');
    Naim.value = selectedObject.Naim;
    var At_Type = document.getElementById('At_TypeEdit');
    At_Type.value = selectedObject.At_Type;
    var At_Len = document.getElementById('At_LenEdit');
    At_Len.value = selectedObject.At_Len;
    var At_Dec = document.getElementById('At_DecEdit');
    At_Dec.value = selectedObject.At_Dec;
    var At_Min = document.getElementById('At_MinEdit');
    At_Min.value = selectedObject.At_Min;
    var At_Max = document.getElementById('At_MaxEdit');
    At_Max.value = selectedObject.At_Max;
    var At_Razm = document.getElementById('At_RazmEdit');
    At_Razm.value = selectedObject.At_Razm;
    var At_Kl = document.getElementById('At_KlEdit');
    At_Kl.value = selectedObject.At_Kl;
}

$(document).ready(function() {
    var table = $('#my_table').DataTable( {
        "language": {
            "url": "../resources/ru_RU.txt"
        }
    } );
    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('td').attr('data-column') );
    } );
    $('#my_table tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            selectedObjectID = this.id;
            changeValue();
        }
    } );

    //POPUP!
    $('.popup-with-form').magnificPopup({
        type: 'inline',
        preloader: false
    });

    //POPUP!
    $('.popup-with-aboutApp').magnificPopup({
        type: 'inline',
        preloader: false
    });

//    $('#addSubmit').click( function () {
//        $.get( '/addObject', function(data) {
//            table.row.add(['1','testtesttest','3','4','5','6','7','8','9','10','11']).draw();
//            $('#results').html(data);
//        });
//        $.magnificPopup.close();
//        dhtmlx.alert("Объект добавлен!");
//    } );

//    $('#editSubmit').click( function () {
//        dhtmlx.confirm({
//            title: "Удалить",
//            cancel: "Отмена",
//            type:"confirm",
//            text: "Вы уверены, что хотите удалить объект?",
//            callback: function(mode) {
//                if(mode==true) {
//                    table.row('.selected').remove().draw( false );
//                    //var parameters = { id: selectedObjectID };
//                    $.get( '/editObject', function(data) {
//                        $('#results').html(data);
//                    });
//                    dhtmlx.alert("Объект отредактирован!");
//                }
//            }
//        });
//    } );

    $('#delete').click( function () {
        dhtmlx.confirm({
            title: "Удалить",
            cancel: "Отмена",
            type:"confirm",
            text: "Вы уверены, что хотите удалить объект?",
            callback: function(mode) {
                if(mode==true) {
                    table.row('.selected').remove().draw( false );
                    var parameters = { id: selectedObjectID };
                    $.get( '/deleteObject', parameters, function(data) {
                        $('#results').html(data);
                    });
                    dhtmlx.alert("Объект удален!");
                }
            }
        });
    } );

    //validator
    $.validator.addMethod("greaterThan", function (value, element, param) {
        var $min = $(param);
        var addingName="";
        var name = $(param).attr('id');
        if (new RegExp("Edit").test(name)) {
            addingName = "Edit";
        }
        if (this.settings.onfocusout) {
            $min.off(".validate-greaterThan").on("blur.validate-greaterThan", function () {
                $(element).valid();
            });
        }
        if ($("#At_Type"+addingName).val() == "string") {
            return true;
        }
        return parseInt(value) > parseInt($min.val());
    }, "Максимум должен быть больше чем минимум");
    $.validator.addMethod("validSymbols", function (value, element, param) {
        var $type = $(param);
        var addingName="";
        var name = $(param).attr('id');
        if (new RegExp("Edit").test(name)) {
            addingName = "Edit";
        }
        var mask;
        var len = "" || NaN ? 0 : parseInt($("#At_Len"+addingName).val());
        if ($type.val() == "int") {
            mask = "^((-[0-9]{1," + (len-1) + "})|([0-9]{1," + len +"}))$";
        } else if ($type.val() == "float") {
            var afterDotSymbols = "" ? 0 : parseInt($("#At_Dec"+addingName).val());
            if (afterDotSymbols < 1) {
                mask = "^((-{0,1}\\d{0,"+len+"}))$";
            } else {
                mask = "^((-{0,1}\\d{1,"+(len-afterDotSymbols)+"}\\.\\d{1,"+afterDotSymbols+"}))$";
            }
        } else {
            mask = "^.{0,"+len+"}$";
        }
        var mask = new RegExp(mask);
        var b = mask.test(value);
        return mask.test(value);
    }, "Некорректный формат данных");
    $.validator.addMethod("customRequired", function (value, element, param) {
        var $type = $(param);
        var fieldValue=value;
        if ($type.val() != "string") {
            return value != "";
        } else {
            return true;
        }
    }, "Это поле необходимо заполнить.");
    $.validator.addMethod("fieldLength", function (value, element, param) {
        var $type = $(param);
        var len=value;
        var max,min;
        min = 0;max =10;
        if ($type.val() == "int") {
            return len>0 && len<11;
        } else if ($type.val() == "float") {
            return len>0 && len <=10;
        } else {
            max = 256;
            return len>0 && len<257;
        }
    }, "Введите корректный размер поля.");

    $("#myform").validate({ // initialize the plugin
        rules: {
            at_syst: "required",
            dom: { required: true },
            Den: { required: true },
            Naim: { required: true },
            At_Type: { required: true },
            At_Len: {
                required: true,
                number: true,
                fieldLength: '#At_Type',
                min: 1
            },
            At_Dec: {
                customRequired: '#At_Type',
                min: 0,
                number: true
            },
            At_Min: {
                customRequired: '#At_Type',
                validSymbols:'#At_Type'
            },
            At_Max: {
                customRequired: '#At_Type',
                validSymbols:'#At_Type',
                greaterThan:'#At_Min'
            },
            At_Razm: { required: true },
            At_Kl: { required: true }
        },
        submitHandler: function (form) {
            if ($('#myform').valid()) {
                dhtmlx.message({
                    title: "Ок",
                    type: "alert-warning",
                    text: "Объект успешно добавлен!",
                    callback: function() {
                        form.submit();
                    }
                });
            }
        }
    });
    $('#editForm').validate({ // initialize the plugin
        rules: {
            at_syst: "required",
            dom: {
                required: true
            },
            Den: {
                required: true
            },
            Naim: {
                required: true
            },
            At_Type: {
                required: true
            },
            At_Len: {
                required: true,
                number: true,
                fieldLength: '#At_TypeEdit',
                min: 1
            },
            At_Dec: {
                customRequired: '#At_TypeEdit',
                min: 0,
                number: true
            },
            At_Min: {
                customRequired: '#At_TypeEdit',
                validSymbols:'#At_TypeEdit'
            },
            At_Max: {
                customRequired: '#At_TypeEdit',
                validSymbols:'#At_TypeEdit',
                greaterThan:'#At_MinEdit'
            },
            At_Razm: {
                required: true
            },
            At_Kl: {
                required: true
            }
        },
        submitHandler: function (form) {
            if ($('#editForm').valid()) {
                dhtmlx.message({
                    title: "Ок",
                    type: "alert-warning",
                    text: "Объект успешно отредактирован!",
                    callback: function() {
                        form.submit();
                    }
                });
            }
        }
    });
} );