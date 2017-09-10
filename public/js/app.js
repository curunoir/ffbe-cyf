/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
$('html').bind('keypress', function (e) {
    if (e.keyCode == 13) {
        return false;
    }
});
var createFormDelete = function createFormDelete(link) {
    var form = $('<form>', { 'method': 'POST', 'action': link });
    var token = $('<input>', { 'type': 'hidden', 'name': '_token', 'value': $('meta[name=csrf_token]').attr('content') });
    var hiddenInput = $('<input>', { 'name': '_method', 'type': 'hidden', 'value': 'DELETE' });
    return form.append(token, hiddenInput).appendTo('body');
};
if ($('.datatable').length) {
    $('.datatable').dataTable({
        "responsive": true,
        "pageLength": 25,
        "aaSorting": [],
        "columnDefs": [{
            "targets": 'sorting_disabled',
            "orderable": false
        }],
        language: {
            "url": "assets/js/plugins/datatables/fr.json"
        },
        "autoWidth": true
    });
}

(function () {
    if ($('[data-alert]').length) {
        var block = $('[data-alert]');
        $.niftyNoty({
            type: block.attr('data-alert'),
            icon: 'pli-cross icon-2x',
            message: block.attr('data-content'),
            container: 'floating',
            timer: 3000
        });
    }
})();
$('[rel=tooltip]').tooltip();

function Xeditable() {
    $('.editable').editable({
        emptytext: "Vide",
        params: function params(_params) {
            _params.model = $(this).attr('data-model');
            _params.hasone = $(this).attr('data-hasone');
            _params.foreignkey = $(this).attr('data-foreignkey');
            return _params;
        },
        showbuttons: 'bottom',
        onblur: 'ignore',
        url: '/ajax/quickupdate'
    });
}

if ($('.editable').length) {
    Xeditable();
}

function countLine(text) {
    var lines = text.split("\n");
    var count = 1;
    for (var i = 0; i < lines.length - 1; i++) {
        if (lines[i].trim() != "" && lines[i].trim() != null) {
            console.log(lines[i]);
            count += 1;
        }
    }
    return count;
}

$('textarea[name=serialnumber]').change(function () {
    text = $(this).val();
    $('.nbLiberty').text(countLine(text));
});
$(document).on('click', '#allcheck', function () {
    //parent = $(this).parents('table');
    el = $(this);
    if (el.is(":checked")) {
        $('input[name^=check]').prop('checked', true);
    } else {
        $('input[name^=check]').prop('checked', false);
    }
});
$('.delallcheck').click(function (e) {
    e.preventDefault();
    if ($('input[name^=check]:checked').length) {
        var data = $('input[name^=check]:checked').serializeArray();
        $.ajax({
            url: '/ajax/delallcheck',
            type: 'POST',
            data: data,
            dataType: 'html',
            success: function success(data) {
                $('#lg_modal').modal();
                $('.content_lg_modal').html(data);
            }
        });
    } else {
        errorS('Veuillez choisir des éléments à supprimer');
    }
});

/**
 * SEARCH
 */
$('input[name=searchall]').click(function () {
    val = $(this).val();
    if (val.length > 2) {
        $('.result_search').collapse('show');
    }
});
$('input[name=searchall]').keyup(function () {
    val = $(this).val();
    self = this;
    if (val.length > 2) {
        $('.search_current').text(val);
        searchAll(self);
    }
});

function searchAll(e) {
    var search = $(e).val();
    $('.result_search').collapse();
    $.ajax({
        url: '/ajax/searchall',
        type: 'POST',
        dataType: 'html',
        data: { search: search },
        success: function success(data) {
            $('.search_content').html(data);
        }
    });
}

$('#close_search').click(function () {
    $('.result_search').collapse("hide");
});

$(document).on('click', '.fa_flash', function () {
    var id = $('input[name=notification_id]').val();

    $.ajax({
        url: '/ajax/notification',
        type: 'POST',
        dataType: 'json',
        data: { id: id },
        success: function success(data) {
            successS('Lecture de la notification prise en compte');
            $('.notification').find('a').removeClass('fa_flash');
        }
    });
});

$(document).on('click', '.moreResult', function () {
    parent = $(this).parents('[data-search]');
    parent.find('li').show();
    parent.find('.moreResult').hide();
});

/**
 * FIN SEARCH
 */
/**
 * Facture
 */
$(document).on('click', '.showManualPaid', function () {
    $(this).prev().attr('disabled', 'disabled');
    $('.manual_paye').show();
});
$(document).on('click', '.validManualPaid', function (e) {
    e.preventDefault();
    var date = $('input[name=date_paiement]').val();
    var ref_document = $('input[name=ref_document]').val();
    if (date == '') {
        errorS('Veuillez indiquer une date de paiement');
        return false;
    }
    $.ajax({
        url: '/ajax/manualpayefacture',
        type: 'POST',
        data: { ref_document: ref_document, date: date },
        dataType: 'json',
        success: function success(data) {
            if (data.success) {
                $('.blockPaid').html(' <td class="text-right font-sm bold">Date de paiement</td>' + '<td><span class="bold">' + date + '</span><br />' + '<label class="label label-success">PAYEE</label></td>');
                successS('Facture déclarée comme payée');
            }
        }
    });
});

$(document).on('click', '[data-type=eye]', function (e) {
    block = $(this);
    var id = block.attr('data-id');
    var primary_col = block.attr('data-primary_col');
    var modal = block.attr('data-modal') ? block.attr('data-modal') : 'lg_modal';
    if (id == '') {
        id = $('[name=' + primary_col + ']').val();
        if (id == 0) return false;
    }

    $.ajax({
        url: '/ajax/eyeview',
        type: 'POST',
        data: {
            model: block.attr('data-model'),
            id: id,
            view: block.attr('data-view'),
            primary_col: block.attr('data-primary_col'),
            name: block.attr('data-name'),
            method: block.attr('data-method'),
            href: block.attr('data-href'),
            async: block.attr('data-async'),
            nodelete: block.attr('data-nodelete')
        },
        dataType: 'html',
        success: function success(data) {
            if (data) {
                $('#' + modal).modal();
                $('.content_lg_modal').html(data);
            }
        },
        error: function error(status) {
            console.log(status);
            alert(status);
        }
    });
});
$(document).on('click', '[data-confirm=delete]', function () {
    block = $(this);
    if (block.attr('data-async') && block.attr('data-async') == '1') {

        var id = block.attr('data-id');
        var parent = block.attr('data-parent') ? block.attr('data-parent') : 'tr';
        $.ajax({
            url: '/ajax/deleteasync',
            type: 'POST',
            data: {
                model: block.attr('data-model'),
                id: id,
                nodelete: block.attr('data-nodelete')
            },
            dataType: 'html',
            success: function success(data) {
                if (data) {
                    if (!data.nodelete) $('[data-id=' + id + ']').parents(parent).remove();
                    $('#lg_modal').modal('hide');
                    successS('Element supprimé avec succès !');
                }
            }

        });
    } else {

        form = createFormDelete(block.attr('data-href'));
        form.submit();
    }
});

$(document).on('click', '[data-type=update]', function () {
    block = $(this);
    var model_id = block.attr('data-id');
    var type_input = block.attr('data-type_input') ? block.attr('data-type_input') : 'input';
    var primary_col = block.attr('data-primary_col');
    var val_input = $(type_input + '[name=' + block.attr('data-name') + ']').val();
    if (val_input) {
        $.ajax({
            url: '/ajax/update_model',
            type: 'POST',
            data: {
                model: block.attr('data-model'),
                model_id: model_id,
                primary_col: block.attr('data-primary_col'),
                name: block.attr('data-name'),
                val_input: val_input
            },
            dataType: 'json',
            success: function success(data) {
                if (data.success) {
                    $('#lg_modal').modal('hide');
                    successS('Modification effectuée');
                }
            },
            error: function error(data) {
                errorS('Contacter le Support');
            }

        });
    } else {
        errorS('Aucun élément disponible');
    }
});
var datatableM = function datatableM() {
    $('.dataTable').dataTable({
        "pageLength": 50,
        "aaSorting": [],
        "columnDefs": [{
            "targets": 'sorting_disabled',
            "orderable": false
        }],
        //order: [[1, "desc"]],
        language: {
            "url": "/assets/js/plugins/datatables/fr.json"
        },
        "autoWidth": false
    });
};
if ($('.dataTable').length) {
    datatableM();
}
if ($('.select2').length) {
    $('.select2').select2();
}
if ($('.datepicker').length) {
    $('.datepicker').datepicker({
        dateFormat: 'yy-mm-dd'
    });
}

/**MAPS**/
$(document).on('click', '.invAdress', function () {
    adresse1 = $('input[name=adresse1]').val();
    adresse2 = $('input[name=adresse2]').val();
    $('input[name=adresse1]').val(adresse2);
    $('input[name=adresse2]').val(adresse1);
});

function showMap(ID) {
    var ID = ID !== undefined ? ID : 'map';
    $('#' + ID).html('<p class="text-semibold text-main text-lg" style="margin: 100px 0px">Carte en cours de contruction...</p>');
    var types = [];
    if ($('input[name^=types_map]').length) {
        $('input[name^=types_map]:checked').each(function (index) {
            types.push($(this).val());
        });
    }
    var search = $('input[name=search_map]').val();
    if (types.length == 0 && search == '') {
        $('#' + ID).html('<p class="text-semibold text-main text-lg" style="margin: 100px 0px">Veuillez choisir un type de société</p>');
        return false;
    }
    $.ajax({
        url: "/ajax/societe_maps",
        type: 'POST',
        data: { types: types, search: search },
        dataType: 'json',
        success: function success(data) {
            setTimeout(function (e) {
                initMap(data, ID);
            }, 1000);
            initMapHtml = true;
        }
    });
}

if ($('input[name^=types_map]').length) {
    $('input[name^=types_map]').click(function () {
        showMap();
    });
}
$('input[name=search_map]').keyup(function () {
    val = $(this).val();
    if (val.length > 2) {
        showMap();
    }
});

$(document).on('click', '.validAdress', function () {
    nameForm = $(this).attr('data-form');
    data = $('#' + nameForm).serializeArray();
    $.ajax({
        url: "/ajax/updatesociete",
        type: 'POST',
        data: { data: data },
        dataType: 'json',
        success: function success(data) {
            if (data.success) {
                if ($('.tableErrorMaps').length) {
                    $('.tableErrorMaps').find('tr[data-id=' + data.id + ']').remove();
                    $('#lg_modal').modal('hide');
                }
                successS('Société mise à jour avec succès !');
            }
        }
    });
});
$(document).on('click', '.testMap', function () {
    var ID = $(this).attr('data-map');

    switchAdress = $('input[name=switch_adresse]:checked').val();

    adresse1 = $('input[name=adresse1]').val();
    adresse2 = $('input[name=adresse2]').val();
    adresse = 'nyons';
    switch (switchAdress) {
        case '1':
            adresse = adresse1;
            break;
        case '2':
            adresse = adresse2;
            break;

        case '3':
            adresse = adresse1 + ' ' + adresse2;
            break;
    }
    console.log(switchAdress);
    console.log(adresse);
    adresseComplete = adresse + ' ' + $('input[name=cp]').val() + ' ' + $('input[name=ville]').val();
    var map = new google.maps.Map(document.getElementById(ID), {
        zoom: 10,
        center: { lat: 46.191644, lng: 5.322666 }
    });
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': adresseComplete }, function (results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);

            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            position = results[0].geometry.location;
            $('input[name=latitude]').val(position.lat);
            $('input[name=longitude]').val(position.lng);
            $('.noAddress').hide();
            $('.validAdress').show();
        } else {
            $('.noAddress').show();
            $('#' + ID).html('');
            $('input[name=latitude]').val(0);
            $('input[name=longitude]').val(0);
            $('.validAdress').hide();
        }
    });
});

/** END MAPS **/
/** Remarque **/
if ($('.listRemarques').length) {
    $('.listRemarques .nano-content').scrollTop($('.listRemarques ul').height());
}
$(document).on('click', '.editRemarque', function () {
    parentGlobal = $(this).parents('remarque');

    var model = parentGlobal.attr('data-model');
    var object_id = parentGlobal.attr('data-object_id');
    var id = $(this).attr('data-id');
    $.ajax({
        url: "/ajax/editremarque",
        type: 'POST',
        data: { model: model, object_id: object_id, id: id },
        dataType: 'html',
        success: function success(data) {
            $('#lg_modal').modal();
            $('.content_lg_modal').html(data);
        }
    });
});

$(document).ready(function () {
    $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".collapse").hasClass("collapse in");
        if (_opened === true && !clickover.parents('.collapse').hasClass('collapse-toggle')) {
            $(".collapse-toggle").collapse('hide');
        }
    });
});
$(document).on('click', '.addRemarque', function () {
    var model = $('input[name=model]').val();
    var object_id = $('input[name=object_id]').val();
    var body = $('input[name=body]').val();
    $.ajax({
        url: "/ajax/addremarque",
        type: 'POST',
        data: { model: model, object_id: object_id, body: body },
        dataType: 'html',
        success: function success(data) {
            $('input[name=body]').val('');
            $('.listRemarques ul').append(data);
            $('.listRemarques .nano-content').scrollTop($('.listRemarques ul').height());
        }
    });
});

/** END Remarque **/
/** Academy **/

$(document).on('click', '.addAcademy', function () {
    var tags = $('input[name^=tags]').serializeArray();
    var id = $('input[name=contact_id]').val();
    var contacts_id = $('input[name=contacts]').val();
    var nodelete = !!$(this).attr('data-nodelete');
    if ($('input[name^=tags]:checked').length == 0) {
        $('.errorTag').show();
        return false;
    } else {
        $('.errorTag').hide();
    }

    $.ajax({
        url: '/ajax/addacademy',
        type: 'POST',
        dataType: 'json',
        data: { tags: tags, id: id, contacts_id: contacts_id },
        success: function success(data) {
            console.log(data);
            if (data.success) {
                if (!nodelete) {
                    $('.addAcademy').hide();
                    $('.accountAcademyOK').show();
                } else {
                    successS('Catégories renvoyées');
                }
                $('.sendMailAcademy').show();
            } else {
                $('.errorTag').text(data.message);
                $('.errorTag').show();
            }
        },
        error: function error(xhr, status) {
            console.log(status);
            errorS('Une erreur s\'est produite');
        }
    });
});
$(document).on('click', '#Contact input[type=checkbox]', function () {
    arr = [];
    if ($('#Contact input[type=checkbox]:checked').length >= 1) $('.settingsContact').show();else $('.settingsContact').hide();
});
$('.addsAcademy').click(function () {
    arr = [];
    $('#Contact input[type=checkbox]:checked').each(function () {
        arr.push($(this).val());
    });
});
$(document).on('click', '.sendMailAcademy', function () {
    var id = $('input[name=contact_id]').val();
    var contacts_id = $('input[name=contacts]').val();
    var nodelete = !!$(this).attr('data-nodelete');
    $.ajax({
        url: '/ajax/sendmailacademy',
        type: 'POST',
        dataType: 'json',
        data: { contacts_id: contacts_id, id: id },
        success: function success(data) {
            if (data.success) {
                if (!nodelete) {
                    $('.sendAcademyOK').show();
                    $('.sendMailAcademy').hide();
                } else {
                    successS('Message envoyé');
                }
                //location.reload();
            } else {
                errorS(data.message);
            }
        }
    });
});
$('.scanConnections').click(function () {
    $.ajax({
        url: '/ajax/scanconnectionacademy',
        type: 'POST',
        dataType: 'json',
        success: function success(data) {
            if (data.success) {
                successS('Scan des dernières connections effectuées');
            } else {
                successS(data.message);
            }
        }
    });
});

/** END Academy **/
/**
 * Stream
 */
function log_message(message) {
    $('#resultStream').prepend(message);
    //document.getElementById("resultStream").innerHTML += message;
}

function stream(formData, url) {
    $('#resultStream').html('');
    try {
        var xhr = new XMLHttpRequest();
        xhr.previous_text = '';
        //xhr.onload = function() { log_message("[XHR] Done. responseText: <i>" + xhr.responseText + "</i>"); };
        xhr.onerror = function (e) {
            log_message("[XHR] Fatal Error :" + e);
        };
        xhr.beforeSend = function () {
            document.getElementById("log_message").innerHTML = 'opui';
        };

        xhr.onreadystatechange = function () {
            try {
                if (xhr.readyState > 2) {

                    var new_response = xhr.responseText.substring(xhr.previous_text.length);
                    var result = JSON.parse(new_response);

                    if (!result.status) {
                        log_message(result.message);
                    } else {
                        console.log(xhr.readyState);
                        log_message(result.message);
                        successS('Processus terminé, rechargement en cours...');
                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                        return;
                    }

                    xhr.previous_text = xhr.responseText;
                } else {
                    log_message(xhr.responseText);
                }
                if (xhr.status == 500) {
                    log_message('<li class="text-danger text-bold">Erreur! Veuillez vérifier votre configuration</li>');
                }
            } catch (e) {
                //log_message("<b>[XHR] Exception: " + e + "</b>");
            }
        };
        xhr.timeout = 300000000;
        xhr.ontimeout = function () {
            //log_message('TimeOut');
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(formData);
    } catch (e) {
        log_message("<b>[XHR] Exception: " + e + "</b>");
    }
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDM1OWMwNzg2ZjA0YjQ3NWZmYjUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9zYXNzL2FwcC5zY3NzPzZkMTAiXSwibmFtZXMiOlsiJCIsImJpbmQiLCJlIiwia2V5Q29kZSIsImNyZWF0ZUZvcm1EZWxldGUiLCJsaW5rIiwiZm9ybSIsInRva2VuIiwiYXR0ciIsImhpZGRlbklucHV0IiwiYXBwZW5kIiwiYXBwZW5kVG8iLCJsZW5ndGgiLCJkYXRhVGFibGUiLCJsYW5ndWFnZSIsImJsb2NrIiwibmlmdHlOb3R5IiwidHlwZSIsImljb24iLCJtZXNzYWdlIiwiY29udGFpbmVyIiwidGltZXIiLCJ0b29sdGlwIiwiWGVkaXRhYmxlIiwiZWRpdGFibGUiLCJlbXB0eXRleHQiLCJwYXJhbXMiLCJtb2RlbCIsImhhc29uZSIsImZvcmVpZ25rZXkiLCJzaG93YnV0dG9ucyIsIm9uYmx1ciIsInVybCIsImNvdW50TGluZSIsInRleHQiLCJsaW5lcyIsInNwbGl0IiwiY291bnQiLCJpIiwidHJpbSIsImNvbnNvbGUiLCJsb2ciLCJjaGFuZ2UiLCJ2YWwiLCJkb2N1bWVudCIsIm9uIiwiZWwiLCJpcyIsInByb3AiLCJjbGljayIsInByZXZlbnREZWZhdWx0IiwiZGF0YSIsInNlcmlhbGl6ZUFycmF5IiwiYWpheCIsImRhdGFUeXBlIiwic3VjY2VzcyIsIm1vZGFsIiwiaHRtbCIsImVycm9yUyIsImNvbGxhcHNlIiwia2V5dXAiLCJzZWxmIiwic2VhcmNoQWxsIiwic2VhcmNoIiwiaWQiLCJzdWNjZXNzUyIsImZpbmQiLCJyZW1vdmVDbGFzcyIsInBhcmVudCIsInBhcmVudHMiLCJzaG93IiwiaGlkZSIsInByZXYiLCJkYXRlIiwicmVmX2RvY3VtZW50IiwicHJpbWFyeV9jb2wiLCJ2aWV3IiwibmFtZSIsIm1ldGhvZCIsImhyZWYiLCJhc3luYyIsIm5vZGVsZXRlIiwiZXJyb3IiLCJzdGF0dXMiLCJhbGVydCIsInJlbW92ZSIsInN1Ym1pdCIsIm1vZGVsX2lkIiwidHlwZV9pbnB1dCIsInZhbF9pbnB1dCIsImRhdGF0YWJsZU0iLCJzZWxlY3QyIiwiZGF0ZXBpY2tlciIsImRhdGVGb3JtYXQiLCJhZHJlc3NlMSIsImFkcmVzc2UyIiwic2hvd01hcCIsIklEIiwidW5kZWZpbmVkIiwidHlwZXMiLCJlYWNoIiwiaW5kZXgiLCJwdXNoIiwic2V0VGltZW91dCIsImluaXRNYXAiLCJpbml0TWFwSHRtbCIsIm5hbWVGb3JtIiwic3dpdGNoQWRyZXNzIiwiYWRyZXNzZSIsImFkcmVzc2VDb21wbGV0ZSIsIm1hcCIsImdvb2dsZSIsIm1hcHMiLCJNYXAiLCJnZXRFbGVtZW50QnlJZCIsInpvb20iLCJjZW50ZXIiLCJsYXQiLCJsbmciLCJnZW9jb2RlciIsIkdlb2NvZGVyIiwiZ2VvY29kZSIsInJlc3VsdHMiLCJzZXRDZW50ZXIiLCJnZW9tZXRyeSIsImxvY2F0aW9uIiwibWFya2VyIiwiTWFya2VyIiwicG9zaXRpb24iLCJzY3JvbGxUb3AiLCJoZWlnaHQiLCJwYXJlbnRHbG9iYWwiLCJvYmplY3RfaWQiLCJyZWFkeSIsImV2ZW50IiwiY2xpY2tvdmVyIiwidGFyZ2V0IiwiX29wZW5lZCIsImhhc0NsYXNzIiwiYm9keSIsInRhZ3MiLCJjb250YWN0c19pZCIsInhociIsImFyciIsImxvZ19tZXNzYWdlIiwicHJlcGVuZCIsInN0cmVhbSIsImZvcm1EYXRhIiwiWE1MSHR0cFJlcXVlc3QiLCJwcmV2aW91c190ZXh0Iiwib25lcnJvciIsImJlZm9yZVNlbmQiLCJpbm5lckhUTUwiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwibmV3X3Jlc3BvbnNlIiwicmVzcG9uc2VUZXh0Iiwic3Vic3RyaW5nIiwicmVzdWx0IiwiSlNPTiIsInBhcnNlIiwicmVsb2FkIiwidGltZW91dCIsIm9udGltZW91dCIsIm9wZW4iLCJzZXRS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QUosSUFBYyxHQUFsQixFQUF1QjtBQUNuQjZELGdDQUFZLHNGQUFaO0FBQ0g7QUFFSixhQTNCRCxDQTRCQSxPQUFPOUksQ0FBUCxFQUFVO0FBQ047QUFDSDtBQUNKLFNBaENEO0FBaUNBNEksWUFBSW9CLE9BQUosR0FBYyxTQUFkO0FBQ0FwQixZQUFJcUIsU0FBSixHQUFnQixZQUFZO0FBQ3hCO0FBQ0gsU0FGRDtBQUdBckIsWUFBSXNCLElBQUosQ0FBUyxNQUFULEVBQWlCcEksR0FBakIsRUFBc0IsSUFBdEI7QUFDQThHLFlBQUl1QixnQkFBSixDQUFxQixrQkFBckIsRUFBeUMsZ0JBQXpDO0FBQ0F2QixZQUFJd0IsSUFBSixDQUFTbkIsUUFBVDtBQUNILEtBbkRELENBb0RBLE9BQU9qSixDQUFQLEVBQVU7QUFDTjhJLG9CQUFZLHlCQUF5QjlJLENBQXpCLEdBQTZCLE1BQXpDO0FBQ0g7QUFDSixDOzs7Ozs7QUN0cEJELHlDIiwiZmlsZSI6Ii9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkMzU5YzA3ODZmMDRiNDc1ZmZiNSIsIi8qKlxuICogRmlyc3Qgd2Ugd2lsbCBsb2FkIGFsbCBvZiB0aGlzIHByb2plY3QncyBKYXZhU2NyaXB0IGRlcGVuZGVuY2llcyB3aGljaFxuICogaW5jbHVkZXMgVnVlIGFuZCBvdGhlciBsaWJyYXJpZXMuIEl0IGlzIGEgZ3JlYXQgc3RhcnRpbmcgcG9pbnQgd2hlblxuICogYnVpbGRpbmcgcm9idXN0LCBwb3dlcmZ1bCB3ZWIgYXBwbGljYXRpb25zIHVzaW5nIFZ1ZSBhbmQgTGFyYXZlbC5cbiAqL1xuJCgnaHRtbCcpLmJpbmQoJ2tleXByZXNzJywgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS5rZXlDb2RlID09IDEzKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59KTtcbnZhciBjcmVhdGVGb3JtRGVsZXRlID0gZnVuY3Rpb24gKGxpbmspIHtcbiAgICB2YXIgZm9ybSA9ICQoJzxmb3JtPicsIHsnbWV0aG9kJzogJ1BPU1QnLCAnYWN0aW9uJzogbGlua30pO1xuICAgIHZhciB0b2tlbiA9ICQoJzxpbnB1dD4nLCB7J3R5cGUnOiAnaGlkZGVuJywgJ25hbWUnOiAnX3Rva2VuJywgJ3ZhbHVlJzogJCgnbWV0YVtuYW1lPWNzcmZfdG9rZW5dJykuYXR0cignY29udGVudCcpfSk7XG4gICAgdmFyIGhpZGRlbklucHV0ID0gJCgnPGlucHV0PicsIHsnbmFtZSc6ICdfbWV0aG9kJywgJ3R5cGUnOiAnaGlkZGVuJywgJ3ZhbHVlJzogJ0RFTEVURSd9KTtcbiAgICByZXR1cm4gZm9ybS5hcHBlbmQodG9rZW4sIGhpZGRlbklucHV0KS5hcHBlbmRUbygnYm9keScpO1xufVxuaWYgKCQoJy5kYXRhdGFibGUnKS5sZW5ndGgpIHtcbiAgICAkKCcuZGF0YXRhYmxlJykuZGF0YVRhYmxlKHtcbiAgICAgICAgXCJyZXNwb25zaXZlXCI6IHRydWUsXG4gICAgICAgIFwicGFnZUxlbmd0aFwiOiAyNSxcbiAgICAgICAgXCJhYVNvcnRpbmdcIjogW10sXG4gICAgICAgIFwiY29sdW1uRGVmc1wiOiBbe1xuICAgICAgICAgICAgXCJ0YXJnZXRzXCI6ICdzb3J0aW5nX2Rpc2FibGVkJyxcbiAgICAgICAgICAgIFwib3JkZXJhYmxlXCI6IGZhbHNlXG4gICAgICAgIH1dLFxuICAgICAgICBsYW5ndWFnZToge1xuICAgICAgICAgICAgXCJ1cmxcIjogXCJhc3NldHMvanMvcGx1Z2lucy9kYXRhdGFibGVzL2ZyLmpzb25cIlxuICAgICAgICB9LFxuICAgICAgICBcImF1dG9XaWR0aFwiOiB0cnVlLFxuICAgIH0pO1xufVxuXG4oZnVuY3Rpb24gKCkge1xuICAgIGlmICgkKCdbZGF0YS1hbGVydF0nKS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGJsb2NrID0gJCgnW2RhdGEtYWxlcnRdJyk7XG4gICAgICAgICQubmlmdHlOb3R5KHtcbiAgICAgICAgICAgIHR5cGU6IGJsb2NrLmF0dHIoJ2RhdGEtYWxlcnQnKSxcbiAgICAgICAgICAgIGljb246ICdwbGktY3Jvc3MgaWNvbi0yeCcsXG4gICAgICAgICAgICBtZXNzYWdlOiBibG9jay5hdHRyKCdkYXRhLWNvbnRlbnQnKSxcbiAgICAgICAgICAgIGNvbnRhaW5lcjogJ2Zsb2F0aW5nJyxcbiAgICAgICAgICAgIHRpbWVyOiAzMDAwXG4gICAgICAgIH0pO1xuICAgIH1cbn0pKCk7XG4kKCdbcmVsPXRvb2x0aXBdJykudG9vbHRpcCgpO1xuXG5mdW5jdGlvbiBYZWRpdGFibGUoKSB7XG4gICAgJCgnLmVkaXRhYmxlJykuZWRpdGFibGUoe1xuICAgICAgICBlbXB0eXRleHQ6IFwiVmlkZVwiLFxuICAgICAgICBwYXJhbXM6IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgICAgIHBhcmFtcy5tb2RlbCA9ICQodGhpcykuYXR0cignZGF0YS1tb2RlbCcpO1xuICAgICAgICAgICAgcGFyYW1zLmhhc29uZSA9ICQodGhpcykuYXR0cignZGF0YS1oYXNvbmUnKTtcbiAgICAgICAgICAgIHBhcmFtcy5mb3JlaWdua2V5ID0gJCh0aGlzKS5hdHRyKCdkYXRhLWZvcmVpZ25rZXknKTtcbiAgICAgICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgICAgIH0sXG4gICAgICAgIHNob3didXR0b25zOiAnYm90dG9tJyxcbiAgICAgICAgb25ibHVyOiAnaWdub3JlJyxcbiAgICAgICAgdXJsOiAnL2FqYXgvcXVpY2t1cGRhdGUnXG4gICAgfSk7XG59XG5cbmlmICgkKCcuZWRpdGFibGUnKS5sZW5ndGgpIHtcbiAgICBYZWRpdGFibGUoKTtcbn1cblxuXG5mdW5jdGlvbiBjb3VudExpbmUodGV4dCkge1xuICAgIHZhciBsaW5lcyA9IHRleHQuc3BsaXQoXCJcXG5cIik7XG4gICAgdmFyIGNvdW50ID0gMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBpZiAobGluZXNbaV0udHJpbSgpICE9IFwiXCIgJiYgbGluZXNbaV0udHJpbSgpICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxpbmVzW2ldKTtcbiAgICAgICAgICAgIGNvdW50ICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xufVxuXG4kKCd0ZXh0YXJlYVtuYW1lPXNlcmlhbG51bWJlcl0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgIHRleHQgPSAkKHRoaXMpLnZhbCgpO1xuICAgICQoJy5uYkxpYmVydHknKS50ZXh0KGNvdW50TGluZSh0ZXh0KSk7XG59KTtcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjYWxsY2hlY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgLy9wYXJlbnQgPSAkKHRoaXMpLnBhcmVudHMoJ3RhYmxlJyk7XG4gICAgZWwgPSAkKHRoaXMpO1xuICAgIGlmIChlbC5pcyhcIjpjaGVja2VkXCIpKSB7XG4gICAgICAgICQoJ2lucHV0W25hbWVePWNoZWNrXScpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKVxuICAgIH0gZWxzZSB7XG4gICAgICAgICQoJ2lucHV0W25hbWVePWNoZWNrXScpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSlcbiAgICB9XG59KVxuJCgnLmRlbGFsbGNoZWNrJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKCQoJ2lucHV0W25hbWVePWNoZWNrXTpjaGVja2VkJykubGVuZ3RoKSB7XG4gICAgICAgIHZhciBkYXRhID0gJCgnaW5wdXRbbmFtZV49Y2hlY2tdOmNoZWNrZWQnKS5zZXJpYWxpemVBcnJheSgpO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiAnL2FqYXgvZGVsYWxsY2hlY2snLFxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnaHRtbCcsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICQoJyNsZ19tb2RhbCcpLm1vZGFsKCk7XG4gICAgICAgICAgICAgICAgJCgnLmNvbnRlbnRfbGdfbW9kYWwnKS5odG1sKGRhdGEpO1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBlcnJvclMoJ1ZldWlsbGV6IGNob2lzaXIgZGVzIMOpbMOpbWVudHMgw6Agc3VwcHJpbWVyJyk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogU0VBUkNIXG4gKi9cbiQoJ2lucHV0W25hbWU9c2VhcmNoYWxsXScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgIGlmICh2YWwubGVuZ3RoID4gMikge1xuICAgICAgICAkKCcucmVzdWx0X3NlYXJjaCcpLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgfVxufSk7XG4kKCdpbnB1dFtuYW1lPXNlYXJjaGFsbF0nKS5rZXl1cChmdW5jdGlvbiAoKSB7XG4gICAgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICBzZWxmID0gdGhpcztcbiAgICBpZiAodmFsLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgJCgnLnNlYXJjaF9jdXJyZW50JykudGV4dCh2YWwpO1xuICAgICAgICBzZWFyY2hBbGwoc2VsZik7XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIHNlYXJjaEFsbChlKSB7XG4gICAgdmFyIHNlYXJjaCA9ICQoZSkudmFsKCk7XG4gICAgJCgnLnJlc3VsdF9zZWFyY2gnKS5jb2xsYXBzZSgpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hamF4L3NlYXJjaGFsbCcsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YVR5cGU6ICdodG1sJyxcbiAgICAgICAgZGF0YToge3NlYXJjaDogc2VhcmNofSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICQoJy5zZWFyY2hfY29udGVudCcpLmh0bWwoZGF0YSk7XG5cbiAgICAgICAgfVxuICAgIH0pXG59XG5cbiQoJyNjbG9zZV9zZWFyY2gnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJCgnLnJlc3VsdF9zZWFyY2gnKS5jb2xsYXBzZShcImhpZGVcIik7XG59KTtcblxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5mYV9mbGFzaCcsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaWQgPSAkKCdpbnB1dFtuYW1lPW5vdGlmaWNhdGlvbl9pZF0nKS52YWwoKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hamF4L25vdGlmaWNhdGlvbicsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgZGF0YToge2lkOiBpZH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBzdWNjZXNzUygnTGVjdHVyZSBkZSBsYSBub3RpZmljYXRpb24gcHJpc2UgZW4gY29tcHRlJyk7XG4gICAgICAgICAgICAkKCcubm90aWZpY2F0aW9uJykuZmluZCgnYScpLnJlbW92ZUNsYXNzKCdmYV9mbGFzaCcpO1xuICAgICAgICB9XG4gICAgfSlcbn0pO1xuXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLm1vcmVSZXN1bHQnLCBmdW5jdGlvbiAoKSB7XG4gICAgcGFyZW50ID0gJCh0aGlzKS5wYXJlbnRzKCdbZGF0YS1zZWFyY2hdJyk7XG4gICAgcGFyZW50LmZpbmQoJ2xpJykuc2hvdygpO1xuICAgIHBhcmVudC5maW5kKCcubW9yZVJlc3VsdCcpLmhpZGUoKTtcbn0pO1xuXG4vKipcbiAqIEZJTiBTRUFSQ0hcbiAqL1xuLyoqXG4gKiBGYWN0dXJlXG4gKi9cbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuc2hvd01hbnVhbFBhaWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5wcmV2KCkuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAkKCcubWFudWFsX3BheWUnKS5zaG93KCk7XG59KTtcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcudmFsaWRNYW51YWxQYWlkJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIGRhdGUgPSAkKCdpbnB1dFtuYW1lPWRhdGVfcGFpZW1lbnRdJykudmFsKCk7XG4gICAgdmFyIHJlZl9kb2N1bWVudCA9ICQoJ2lucHV0W25hbWU9cmVmX2RvY3VtZW50XScpLnZhbCgpO1xuICAgIGlmIChkYXRlID09ICcnKSB7XG4gICAgICAgIGVycm9yUygnVmV1aWxsZXogaW5kaXF1ZXIgdW5lIGRhdGUgZGUgcGFpZW1lbnQnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYWpheC9tYW51YWxwYXllZmFjdHVyZScsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge3JlZl9kb2N1bWVudDogcmVmX2RvY3VtZW50LCBkYXRlOiBkYXRlfSxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAkKCcuYmxvY2tQYWlkJykuaHRtbCgnIDx0ZCBjbGFzcz1cInRleHQtcmlnaHQgZm9udC1zbSBib2xkXCI+RGF0ZSBkZSBwYWllbWVudDwvdGQ+JyArXG4gICAgICAgICAgICAgICAgICAgICc8dGQ+PHNwYW4gY2xhc3M9XCJib2xkXCI+JyArIGRhdGUgKyAnPC9zcGFuPjxiciAvPicgK1xuICAgICAgICAgICAgICAgICAgICAnPGxhYmVsIGNsYXNzPVwibGFiZWwgbGFiZWwtc3VjY2Vzc1wiPlBBWUVFPC9sYWJlbD48L3RkPicpO1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3NTKCdGYWN0dXJlIGTDqWNsYXLDqWUgY29tbWUgcGF5w6llJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfSk7XG59KVxuXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnW2RhdGEtdHlwZT1leWVdJywgZnVuY3Rpb24gKGUpIHtcbiAgICBibG9jayA9ICQodGhpcyk7XG4gICAgdmFyIGlkID0gYmxvY2suYXR0cignZGF0YS1pZCcpO1xuICAgIHZhciBwcmltYXJ5X2NvbCA9IGJsb2NrLmF0dHIoJ2RhdGEtcHJpbWFyeV9jb2wnKTtcbiAgICB2YXIgbW9kYWwgPSBibG9jay5hdHRyKCdkYXRhLW1vZGFsJykgPyBibG9jay5hdHRyKCdkYXRhLW1vZGFsJykgOiAnbGdfbW9kYWwnO1xuICAgIGlmIChpZCA9PSAnJykge1xuICAgICAgICBpZCA9ICQoJ1tuYW1lPScgKyBwcmltYXJ5X2NvbCArICddJykudmFsKCk7XG4gICAgICAgIGlmIChpZCA9PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FqYXgvZXlldmlldycsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgbW9kZWw6IGJsb2NrLmF0dHIoJ2RhdGEtbW9kZWwnKSxcbiAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgIHZpZXc6IGJsb2NrLmF0dHIoJ2RhdGEtdmlldycpLFxuICAgICAgICAgICAgcHJpbWFyeV9jb2w6IGJsb2NrLmF0dHIoJ2RhdGEtcHJpbWFyeV9jb2wnKSxcbiAgICAgICAgICAgIG5hbWU6IGJsb2NrLmF0dHIoJ2RhdGEtbmFtZScpLFxuICAgICAgICAgICAgbWV0aG9kOiBibG9jay5hdHRyKCdkYXRhLW1ldGhvZCcpLFxuICAgICAgICAgICAgaHJlZjogYmxvY2suYXR0cignZGF0YS1ocmVmJyksXG4gICAgICAgICAgICBhc3luYzogYmxvY2suYXR0cignZGF0YS1hc3luYycpLFxuICAgICAgICAgICAgbm9kZWxldGU6IGJsb2NrLmF0dHIoJ2RhdGEtbm9kZWxldGUnKSxcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YVR5cGU6ICdodG1sJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgJCgnIycgKyBtb2RhbCkubW9kYWwoKTtcbiAgICAgICAgICAgICAgICAkKCcuY29udGVudF9sZ19tb2RhbCcpLmh0bWwoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoc3RhdHVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdGF0dXMpO1xuICAgICAgICAgICAgYWxlcnQoc3RhdHVzKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnW2RhdGEtY29uZmlybT1kZWxldGVdJywgZnVuY3Rpb24gKCkge1xuICAgIGJsb2NrID0gJCh0aGlzKTtcbiAgICBpZiAoYmxvY2suYXR0cignZGF0YS1hc3luYycpICYmIGJsb2NrLmF0dHIoJ2RhdGEtYXN5bmMnKSA9PSAnMScpIHtcblxuICAgICAgICB2YXIgaWQgPSBibG9jay5hdHRyKCdkYXRhLWlkJyk7XG4gICAgICAgIHZhciBwYXJlbnQgPSBibG9jay5hdHRyKCdkYXRhLXBhcmVudCcpID8gYmxvY2suYXR0cignZGF0YS1wYXJlbnQnKSA6ICd0cic7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvYWpheC9kZWxldGVhc3luYycsXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbW9kZWw6IGJsb2NrLmF0dHIoJ2RhdGEtbW9kZWwnKSxcbiAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgbm9kZWxldGU6IGJsb2NrLmF0dHIoJ2RhdGEtbm9kZWxldGUnKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2h0bWwnLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEubm9kZWxldGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCdbZGF0YS1pZD0nICsgaWQgKyAnXScpLnBhcmVudHMocGFyZW50KS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnI2xnX21vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc1MoJ0VsZW1lbnQgc3VwcHJpbcOpIGF2ZWMgc3VjY8OocyAhJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgZm9ybSA9IGNyZWF0ZUZvcm1EZWxldGUoYmxvY2suYXR0cignZGF0YS1ocmVmJykpO1xuICAgICAgICBmb3JtLnN1Ym1pdCgpO1xuICAgIH1cbn0pO1xuXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnW2RhdGEtdHlwZT11cGRhdGVdJywgZnVuY3Rpb24gKCkge1xuICAgIGJsb2NrID0gJCh0aGlzKTtcbiAgICB2YXIgbW9kZWxfaWQgPSBibG9jay5hdHRyKCdkYXRhLWlkJyk7XG4gICAgdmFyIHR5cGVfaW5wdXQgPSBibG9jay5hdHRyKCdkYXRhLXR5cGVfaW5wdXQnKSA/IGJsb2NrLmF0dHIoJ2RhdGEtdHlwZV9pbnB1dCcpIDogJ2lucHV0JztcbiAgICB2YXIgcHJpbWFyeV9jb2wgPSBibG9jay5hdHRyKCdkYXRhLXByaW1hcnlfY29sJyk7XG4gICAgdmFyIHZhbF9pbnB1dCA9ICQodHlwZV9pbnB1dCArICdbbmFtZT0nICsgYmxvY2suYXR0cignZGF0YS1uYW1lJykgKyAnXScpLnZhbCgpO1xuICAgIGlmICh2YWxfaW5wdXQpIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogJy9hamF4L3VwZGF0ZV9tb2RlbCcsXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbW9kZWw6IGJsb2NrLmF0dHIoJ2RhdGEtbW9kZWwnKSxcbiAgICAgICAgICAgICAgICBtb2RlbF9pZDogbW9kZWxfaWQsXG4gICAgICAgICAgICAgICAgcHJpbWFyeV9jb2w6IGJsb2NrLmF0dHIoJ2RhdGEtcHJpbWFyeV9jb2wnKSxcbiAgICAgICAgICAgICAgICBuYW1lOiBibG9jay5hdHRyKCdkYXRhLW5hbWUnKSxcbiAgICAgICAgICAgICAgICB2YWxfaW5wdXQ6IHZhbF9pbnB1dFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnI2xnX21vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc1MoJ01vZGlmaWNhdGlvbiBlZmZlY3R1w6llJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGVycm9yUygnQ29udGFjdGVyIGxlIFN1cHBvcnQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBlcnJvclMoJ0F1Y3VuIMOpbMOpbWVudCBkaXNwb25pYmxlJyk7XG4gICAgfVxufSk7XG52YXIgZGF0YXRhYmxlTSA9IGZ1bmN0aW9uICgpIHtcbiAgICAkKCcuZGF0YVRhYmxlJykuZGF0YVRhYmxlKHtcbiAgICAgICAgXCJwYWdlTGVuZ3RoXCI6IDUwLFxuICAgICAgICBcImFhU29ydGluZ1wiOiBbXSxcbiAgICAgICAgXCJjb2x1bW5EZWZzXCI6IFt7XG4gICAgICAgICAgICBcInRhcmdldHNcIjogJ3NvcnRpbmdfZGlzYWJsZWQnLFxuICAgICAgICAgICAgXCJvcmRlcmFibGVcIjogZmFsc2VcbiAgICAgICAgfV0sXG4gICAgICAgIC8vb3JkZXI6IFtbMSwgXCJkZXNjXCJdXSxcbiAgICAgICAgbGFuZ3VhZ2U6IHtcbiAgICAgICAgICAgIFwidXJsXCI6IFwiL2Fzc2V0cy9qcy9wbHVnaW5zL2RhdGF0YWJsZXMvZnIuanNvblwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYXV0b1dpZHRoXCI6IGZhbHNlLFxuICAgIH0pO1xufVxuaWYgKCQoJy5kYXRhVGFibGUnKS5sZW5ndGgpIHtcbiAgICBkYXRhdGFibGVNKClcblxufVxuaWYgKCQoJy5zZWxlY3QyJykubGVuZ3RoKSB7XG4gICAgJCgnLnNlbGVjdDInKS5zZWxlY3QyKCk7XG59XG5pZiAoJCgnLmRhdGVwaWNrZXInKS5sZW5ndGgpIHtcbiAgICAkKCcuZGF0ZXBpY2tlcicpLmRhdGVwaWNrZXIoe1xuICAgICAgICBkYXRlRm9ybWF0OiAneXktbW0tZGQnXG4gICAgfSlcbn1cblxuLyoqTUFQUyoqL1xuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5pbnZBZHJlc3MnLCBmdW5jdGlvbiAoKSB7XG4gICAgYWRyZXNzZTEgPSAkKCdpbnB1dFtuYW1lPWFkcmVzc2UxXScpLnZhbCgpXG4gICAgYWRyZXNzZTIgPSAkKCdpbnB1dFtuYW1lPWFkcmVzc2UyXScpLnZhbCgpO1xuICAgICQoJ2lucHV0W25hbWU9YWRyZXNzZTFdJykudmFsKGFkcmVzc2UyKTtcbiAgICAkKCdpbnB1dFtuYW1lPWFkcmVzc2UyXScpLnZhbChhZHJlc3NlMSk7XG59KTtcblxuZnVuY3Rpb24gc2hvd01hcChJRCkge1xuICAgIHZhciBJRCA9IElEICE9PSB1bmRlZmluZWQgPyBJRCA6ICdtYXAnO1xuICAgICQoJyMnICsgSUQpLmh0bWwoJzxwIGNsYXNzPVwidGV4dC1zZW1pYm9sZCB0ZXh0LW1haW4gdGV4dC1sZ1wiIHN0eWxlPVwibWFyZ2luOiAxMDBweCAwcHhcIj5DYXJ0ZSBlbiBjb3VycyBkZSBjb250cnVjdGlvbi4uLjwvcD4nKTtcbiAgICB2YXIgdHlwZXMgPSBbXTtcbiAgICBpZiAoJCgnaW5wdXRbbmFtZV49dHlwZXNfbWFwXScpLmxlbmd0aCkge1xuICAgICAgICAkKCdpbnB1dFtuYW1lXj10eXBlc19tYXBdOmNoZWNrZWQnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgdHlwZXMucHVzaCgkKHRoaXMpLnZhbCgpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBzZWFyY2ggPSAkKCdpbnB1dFtuYW1lPXNlYXJjaF9tYXBdJykudmFsKCk7XG4gICAgaWYgKHR5cGVzLmxlbmd0aCA9PSAwICYmIHNlYXJjaCA9PSAnJykge1xuICAgICAgICAkKCcjJyArIElEKS5odG1sKCc8cCBjbGFzcz1cInRleHQtc2VtaWJvbGQgdGV4dC1tYWluIHRleHQtbGdcIiBzdHlsZT1cIm1hcmdpbjogMTAwcHggMHB4XCI+VmV1aWxsZXogY2hvaXNpciB1biB0eXBlIGRlIHNvY2nDqXTDqTwvcD4nKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFwiL2FqYXgvc29jaWV0ZV9tYXBzXCIsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge3R5cGVzOiB0eXBlcywgc2VhcmNoOiBzZWFyY2h9LFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGluaXRNYXAoZGF0YSwgSUQpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICBpbml0TWFwSHRtbCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5pZiAoJCgnaW5wdXRbbmFtZV49dHlwZXNfbWFwXScpLmxlbmd0aCkge1xuICAgICQoJ2lucHV0W25hbWVePXR5cGVzX21hcF0nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNob3dNYXAoKTtcbiAgICB9KTtcbn1cbiQoJ2lucHV0W25hbWU9c2VhcmNoX21hcF0nKS5rZXl1cChmdW5jdGlvbiAoKSB7XG4gICAgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICBpZiAodmFsLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgc2hvd01hcCgpO1xuICAgIH1cbn0pO1xuXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnZhbGlkQWRyZXNzJywgZnVuY3Rpb24gKCkge1xuICAgIG5hbWVGb3JtID0gJCh0aGlzKS5hdHRyKCdkYXRhLWZvcm0nKTtcbiAgICBkYXRhID0gJCgnIycgKyBuYW1lRm9ybSkuc2VyaWFsaXplQXJyYXkoKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFwiL2FqYXgvdXBkYXRlc29jaWV0ZVwiLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHtkYXRhOiBkYXRhfSxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoJCgnLnRhYmxlRXJyb3JNYXBzJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy50YWJsZUVycm9yTWFwcycpLmZpbmQoJ3RyW2RhdGEtaWQ9JyArIGRhdGEuaWQgKyAnXScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcjbGdfbW9kYWwnKS5tb2RhbCgnaGlkZScpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NTKCdTb2Npw6l0w6kgbWlzZSDDoCBqb3VyIGF2ZWMgc3VjY8OocyAhJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufSk7XG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnRlc3RNYXAnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIElEID0gJCh0aGlzKS5hdHRyKCdkYXRhLW1hcCcpO1xuXG4gICAgc3dpdGNoQWRyZXNzID0gJCgnaW5wdXRbbmFtZT1zd2l0Y2hfYWRyZXNzZV06Y2hlY2tlZCcpLnZhbCgpO1xuXG4gICAgYWRyZXNzZTEgPSAkKCdpbnB1dFtuYW1lPWFkcmVzc2UxXScpLnZhbCgpXG4gICAgYWRyZXNzZTIgPSAkKCdpbnB1dFtuYW1lPWFkcmVzc2UyXScpLnZhbCgpXG4gICAgYWRyZXNzZSA9ICdueW9ucyc7XG4gICAgc3dpdGNoIChzd2l0Y2hBZHJlc3MpIHtcbiAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgICBhZHJlc3NlID0gYWRyZXNzZTE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgICBhZHJlc3NlID0gYWRyZXNzZTI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICczJzpcbiAgICAgICAgICAgIGFkcmVzc2UgPSBhZHJlc3NlMSArICcgJyArIGFkcmVzc2UyO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHN3aXRjaEFkcmVzcyk7XG4gICAgY29uc29sZS5sb2coYWRyZXNzZSk7XG4gICAgYWRyZXNzZUNvbXBsZXRlID0gYWRyZXNzZSArICcgJyArICQoJ2lucHV0W25hbWU9Y3BdJykudmFsKCkgKyAnICcgKyAkKCdpbnB1dFtuYW1lPXZpbGxlXScpLnZhbCgpO1xuICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKElEKSwge1xuICAgICAgICB6b29tOiAxMCxcbiAgICAgICAgY2VudGVyOiB7bGF0OiA0Ni4xOTE2NDQsIGxuZzogNS4zMjI2NjZ9XG4gICAgfSk7XG4gICAgdmFyIGdlb2NvZGVyID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyKCk7XG5cbiAgICBnZW9jb2Rlci5nZW9jb2RlKHsnYWRkcmVzcyc6IGFkcmVzc2VDb21wbGV0ZX0sIGZ1bmN0aW9uIChyZXN1bHRzLCBzdGF0dXMpIHtcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ09LJykge1xuICAgICAgICAgICAgbWFwLnNldENlbnRlcihyZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uKTtcblxuICAgICAgICAgICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICAgICAgICAgIG1hcDogbWFwLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiByZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IHJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb247XG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPWxhdGl0dWRlXScpLnZhbChwb3NpdGlvbi5sYXQpO1xuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1sb25naXR1ZGVdJykudmFsKHBvc2l0aW9uLmxuZyk7XG4gICAgICAgICAgICAkKCcubm9BZGRyZXNzJykuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLnZhbGlkQWRyZXNzJykuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLm5vQWRkcmVzcycpLnNob3coKTtcbiAgICAgICAgICAgICQoJyMnICsgSUQpLmh0bWwoJycpO1xuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1sYXRpdHVkZV0nKS52YWwoMCk7XG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPWxvbmdpdHVkZV0nKS52YWwoMCk7XG4gICAgICAgICAgICAkKCcudmFsaWRBZHJlc3MnKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG4vKiogRU5EIE1BUFMgKiovXG4vKiogUmVtYXJxdWUgKiovXG5pZiAoJCgnLmxpc3RSZW1hcnF1ZXMnKS5sZW5ndGgpIHtcbiAgICAkKCcubGlzdFJlbWFycXVlcyAubmFuby1jb250ZW50Jykuc2Nyb2xsVG9wKCQoJy5saXN0UmVtYXJxdWVzIHVsJykuaGVpZ2h0KCkpXG59XG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmVkaXRSZW1hcnF1ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBwYXJlbnRHbG9iYWwgPSAkKHRoaXMpLnBhcmVudHMoJ3JlbWFycXVlJyk7XG5cbiAgICB2YXIgbW9kZWwgPSBwYXJlbnRHbG9iYWwuYXR0cignZGF0YS1tb2RlbCcpO1xuICAgIHZhciBvYmplY3RfaWQgPSBwYXJlbnRHbG9iYWwuYXR0cignZGF0YS1vYmplY3RfaWQnKTtcbiAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFwiL2FqYXgvZWRpdHJlbWFycXVlXCIsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge21vZGVsOiBtb2RlbCwgb2JqZWN0X2lkOiBvYmplY3RfaWQsIGlkOiBpZH0sXG4gICAgICAgIGRhdGFUeXBlOiAnaHRtbCcsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAkKCcjbGdfbW9kYWwnKS5tb2RhbCgpO1xuICAgICAgICAgICAgJCgnLmNvbnRlbnRfbGdfbW9kYWwnKS5odG1sKGRhdGEpO1xuICAgICAgICB9XG4gICAgfSlcbn0pO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciBjbGlja292ZXIgPSAkKGV2ZW50LnRhcmdldCk7XG4gICAgICAgIHZhciBfb3BlbmVkID0gJChcIi5jb2xsYXBzZVwiKS5oYXNDbGFzcyhcImNvbGxhcHNlIGluXCIpO1xuICAgICAgICBpZiAoX29wZW5lZCA9PT0gdHJ1ZSAmJiAhY2xpY2tvdmVyLnBhcmVudHMoJy5jb2xsYXBzZScpLmhhc0NsYXNzKCdjb2xsYXBzZS10b2dnbGUnKSkge1xuICAgICAgICAgICAgJChcIi5jb2xsYXBzZS10b2dnbGVcIikuY29sbGFwc2UoJ2hpZGUnKVxuICAgICAgICB9XG4gICAgfSk7XG59KTtcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYWRkUmVtYXJxdWUnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG1vZGVsID0gJCgnaW5wdXRbbmFtZT1tb2RlbF0nKS52YWwoKTtcbiAgICB2YXIgb2JqZWN0X2lkID0gJCgnaW5wdXRbbmFtZT1vYmplY3RfaWRdJykudmFsKCk7XG4gICAgdmFyIGJvZHkgPSAkKCdpbnB1dFtuYW1lPWJvZHldJykudmFsKCk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBcIi9hamF4L2FkZHJlbWFycXVlXCIsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge21vZGVsOiBtb2RlbCwgb2JqZWN0X2lkOiBvYmplY3RfaWQsIGJvZHk6IGJvZHl9LFxuICAgICAgICBkYXRhVHlwZTogJ2h0bWwnLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1ib2R5XScpLnZhbCgnJyk7XG4gICAgICAgICAgICAkKCcubGlzdFJlbWFycXVlcyB1bCcpLmFwcGVuZChkYXRhKTtcbiAgICAgICAgICAgICQoJy5saXN0UmVtYXJxdWVzIC5uYW5vLWNvbnRlbnQnKS5zY3JvbGxUb3AoJCgnLmxpc3RSZW1hcnF1ZXMgdWwnKS5oZWlnaHQoKSlcbiAgICAgICAgfVxuICAgIH0pXG59KTtcblxuLyoqIEVORCBSZW1hcnF1ZSAqKi9cbi8qKiBBY2FkZW15ICoqL1xuXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmFkZEFjYWRlbXknLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRhZ3MgPSAkKCdpbnB1dFtuYW1lXj10YWdzXScpLnNlcmlhbGl6ZUFycmF5KCk7XG4gICAgdmFyIGlkID0gJCgnaW5wdXRbbmFtZT1jb250YWN0X2lkXScpLnZhbCgpO1xuICAgIHZhciBjb250YWN0c19pZCA9ICQoJ2lucHV0W25hbWU9Y29udGFjdHNdJykudmFsKCk7XG4gICAgdmFyIG5vZGVsZXRlID0gISEkKHRoaXMpLmF0dHIoJ2RhdGEtbm9kZWxldGUnKTtcbiAgICBpZiAoJCgnaW5wdXRbbmFtZV49dGFnc106Y2hlY2tlZCcpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICQoJy5lcnJvclRhZycpLnNob3coKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQoJy5lcnJvclRhZycpLmhpZGUoKTtcbiAgICB9XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYWpheC9hZGRhY2FkZW15JyxcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBkYXRhOiB7dGFnczogdGFncywgaWQ6IGlkLCBjb250YWN0c19pZDogY29udGFjdHNfaWR9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFub2RlbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuYWRkQWNhZGVteScpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmFjY291bnRBY2FkZW15T0snKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NTKCdDYXTDqWdvcmllcyByZW52b3nDqWVzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQoJy5zZW5kTWFpbEFjYWRlbXknKS5zaG93KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJy5lcnJvclRhZycpLnRleHQoZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAkKCcuZXJyb3JUYWcnKS5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0YXR1cyk7XG4gICAgICAgICAgICBlcnJvclMoJ1VuZSBlcnJldXIgc1xcJ2VzdCBwcm9kdWl0ZScpO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjQ29udGFjdCBpbnB1dFt0eXBlPWNoZWNrYm94XScsIGZ1bmN0aW9uICgpIHtcbiAgICBhcnIgPSBbXTtcbiAgICBpZiAoJCgnI0NvbnRhY3QgaW5wdXRbdHlwZT1jaGVja2JveF06Y2hlY2tlZCcpLmxlbmd0aCA+PSAxKVxuICAgICAgICAkKCcuc2V0dGluZ3NDb250YWN0Jykuc2hvdygpO1xuICAgIGVsc2VcbiAgICAgICAgJCgnLnNldHRpbmdzQ29udGFjdCcpLmhpZGUoKTtcbn0pO1xuJCgnLmFkZHNBY2FkZW15JykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGFyciA9IFtdO1xuICAgICQoJyNDb250YWN0IGlucHV0W3R5cGU9Y2hlY2tib3hdOmNoZWNrZWQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXJyLnB1c2goJCh0aGlzKS52YWwoKSk7XG4gICAgfSk7XG59KTtcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuc2VuZE1haWxBY2FkZW15JywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBpZCA9ICQoJ2lucHV0W25hbWU9Y29udGFjdF9pZF0nKS52YWwoKTtcbiAgICB2YXIgY29udGFjdHNfaWQgPSAkKCdpbnB1dFtuYW1lPWNvbnRhY3RzXScpLnZhbCgpO1xuICAgIHZhciBub2RlbGV0ZSA9ICEhJCh0aGlzKS5hdHRyKCdkYXRhLW5vZGVsZXRlJyk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FqYXgvc2VuZG1haWxhY2FkZW15JyxcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBkYXRhOiB7Y29udGFjdHNfaWQ6IGNvbnRhY3RzX2lkLCBpZDogaWR9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIGlmKCFub2RlbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc2VuZEFjYWRlbXlPSycpLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNlbmRNYWlsQWNhZGVteScpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc1MoJ01lc3NhZ2UgZW52b3nDqScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2xvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlcnJvclMoZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG4kKCcuc2NhbkNvbm5lY3Rpb25zJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hamF4L3NjYW5jb25uZWN0aW9uYWNhZGVteScsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzUygnU2NhbiBkZXMgZGVybmnDqHJlcyBjb25uZWN0aW9ucyBlZmZlY3R1w6llcycpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3NTKGRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG4vKiogRU5EIEFjYWRlbXkgKiovXG4vKipcbiAqIFN0cmVhbVxuICovXG5mdW5jdGlvbiBsb2dfbWVzc2FnZShtZXNzYWdlKSB7XG4gICAgJCgnI3Jlc3VsdFN0cmVhbScpLnByZXBlbmQobWVzc2FnZSk7XG4gICAgLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc3VsdFN0cmVhbVwiKS5pbm5lckhUTUwgKz0gbWVzc2FnZTtcbn1cblxuZnVuY3Rpb24gc3RyZWFtKGZvcm1EYXRhLCB1cmwpIHtcbiAgICAkKCcjcmVzdWx0U3RyZWFtJykuaHRtbCgnJyk7XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIucHJldmlvdXNfdGV4dCA9ICcnO1xuICAgICAgICAvL3hoci5vbmxvYWQgPSBmdW5jdGlvbigpIHsgbG9nX21lc3NhZ2UoXCJbWEhSXSBEb25lLiByZXNwb25zZVRleHQ6IDxpPlwiICsgeGhyLnJlc3BvbnNlVGV4dCArIFwiPC9pPlwiKTsgfTtcbiAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgbG9nX21lc3NhZ2UoXCJbWEhSXSBGYXRhbCBFcnJvciA6XCIgKyBlKTtcbiAgICAgICAgfTtcbiAgICAgICAgeGhyLmJlZm9yZVNlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ19tZXNzYWdlXCIpLmlubmVySFRNTCA9ICdvcHVpJ1xuICAgICAgICB9XG5cbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID4gMikge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdfcmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUZXh0LnN1YnN0cmluZyh4aHIucHJldmlvdXNfdGV4dC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gSlNPTi5wYXJzZShuZXdfcmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LnN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nX21lc3NhZ2UocmVzdWx0Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coeGhyLnJlYWR5U3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nX21lc3NhZ2UocmVzdWx0Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc1MoJ1Byb2Nlc3N1cyB0ZXJtaW7DqSwgcmVjaGFyZ2VtZW50IGVuIGNvdXJzLi4uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDIwMDApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHhoci5wcmV2aW91c190ZXh0ID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsb2dfbWVzc2FnZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT0gNTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ19tZXNzYWdlKCc8bGkgY2xhc3M9XCJ0ZXh0LWRhbmdlciB0ZXh0LWJvbGRcIj5FcnJldXIhIFZldWlsbGV6IHbDqXJpZmllciB2b3RyZSBjb25maWd1cmF0aW9uPC9saT4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgLy9sb2dfbWVzc2FnZShcIjxiPltYSFJdIEV4Y2VwdGlvbjogXCIgKyBlICsgXCI8L2I+XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB4aHIudGltZW91dCA9IDMwMDAwMDAwMDtcbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vbG9nX21lc3NhZ2UoJ1RpbWVPdXQnKTtcbiAgICAgICAgfVxuICAgICAgICB4aHIub3BlbihcIlBPU1RcIiwgdXJsLCB0cnVlKTtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtUmVxdWVzdGVkLVdpdGgnLCAnWE1MSHR0cFJlcXVlc3QnKTtcbiAgICAgICAgeGhyLnNlbmQoZm9ybURhdGEpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBsb2dfbWVzc2FnZShcIjxiPltYSFJdIEV4Y2VwdGlvbjogXCIgKyBlICsgXCI8L2I+XCIpO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FwcC5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL3Nhc3MvYXBwLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==