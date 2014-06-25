/**
 * Created by inord on 25/06/14.
 */
var selectedObjectID;
function filterColumn ( i ) {
    $('#my_table').DataTable().column( i ).search(
        $('#col'+i+'_filter').val()
    ).draw();
}
function getSelectedObjectID() {
    return selectedObjectID;
}
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
    //POPUP!
    $('.popup-with-form').magnificPopup({
        type: 'inline',
        preloader: false
    });
    //validator
    $.validator.addMethod("greaterThan", function (value, element, param) {
        var $min = $(param);
        if (this.settings.onfocusout) {
            $min.off(".validate-greaterThan").on("blur.validate-greaterThan", function () {
                $(element).valid();
            });
        }
        return parseInt(value) > parseInt($min.val());
    }, "Максимум должен быть больше чем минимум");
    $.validator.addMethod("validSymbols", function (value, element, param) {
        var $type = $(param);
        var mask;
        var len = "" ? 0 : parseInt($("#At_Len").val());
        if ($type.val() == "int") {
            mask = "^((-[0-9]{1," + (len-1) + "})|([0-9]{1," + len +"}))$";
        } else if ($type.val() == "float") {
            var afterDotSymbols = "" ? 0 : parseInt($("#At_Dec").val());
            mask = "^((-{0,1}\\d{1,"+(len-afterDotSymbols)+"}\\.\\d{1,"+afterDotSymbols+"})|(-{0,1}\\d{0,+"+len+"))$";
        } else {
            mask = "^.{1,"+len+"}$";
        }
        var mask = new RegExp(mask);
        var b = mask.test(value);
        return mask.test(value);
    }, "Некорректный формат данных");
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
    $('#myform').validate({ // initialize the plugin
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
                fieldLength: '#At_Type',
                min: 1
            },
            At_Dec: {
                required: true,
                min: 1,
                number: true
            },
            At_Min: {
                required: true,
                validSymbols:'#At_Type'
            },
            At_Max: {
                required: true,
                validSymbols:'#At_Type',
                greaterThan:'#At_Min'
            },
            At_Razm: {
                required: true
            },
            At_Kl: {
                required: true
            }
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
                fieldLength: '#At_Type',
                min: 1
            },
            At_Dec: {
                required: true,
                min: 1,
                number: true
            },
            At_Min: {
                required: true,
                validSymbols:'#At_Type'
            },
            At_Max: {
                required: true,
                validSymbols:'#At_Type',
                greaterThan:'#At_Min'
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