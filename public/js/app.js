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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTNjNDAxZmE1ZmYxNmFlMjA1NmYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9zYXNzL2FwcC5zY3NzIl0sIm5hbWVzIjpbIiQiLCJiaW5kIiwiZSIsImtleUNvZGUiLCJjcmVhdGVGb3JtRGVsZXRlIiwibGluayIsImZvcm0iLCJ0b2tlbiIsImF0dHIiLCJoaWRkZW5JbnB1dCIsImFwcGVuZCIsImFwcGVuZFRvIiwibGVuZ3RoIiwiZGF0YVRhYmxlIiwibGFuZ3VhZ2UiLCJibG9jayIsIm5pZnR5Tm90eSIsInR5cGUiLCJpY29uIiwibWVzc2FnZSIsImNvbnRhaW5lciIsInRpbWVyIiwidG9vbHRpcCIsIlhlZGl0YWJsZSIsImVkaXRhYmxlIiwiZW1wdHl0ZXh0IiwicGFyYW1zIiwibW9kZWwiLCJoYXNvbmUiLCJmb3JlaWdua2V5Iiwic2hvd2J1dHRvbnMiLCJvbmJsdXIiLCJ1cmwiLCJjb3VudExpbmUiLCJ0ZXh0IiwibGluZXMiLCJzcGxpdCIsImNvdW50IiwiaSIsInRyaW0iLCJjb25zb2xlIiwibG9nIiwiY2hhbmdlIiwidmFsIiwiZG9jdW1lbnQiLCJvbiIsImVsIiwiaXMiLCJwcm9wIiwiY2xpY2siLCJwcmV2ZW50RGVmYXVsdCIsImRhdGEiLCJzZXJpYWxpemVBcnJheSIsImFqYXgiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJtb2RhbCIsImh0bWwiLCJlcnJvclMiLCJjb2xsYXBzZSIsImtleXVwIiwic2VsZiIsInNlYXJjaEFsbCIsInNlYXJjaCIsImlkIiwic3VjY2Vzc1MiLCJmaW5kIiwicmVtb3ZlQ2xhc3MiLCJwYXJlbnQiLCJwYXJlbnRzIiwic2hvdyIsImhpZGUiLCJwcmV2IiwiZGF0ZSIsInJlZl9kb2N1bWVudCIsInByaW1hcnlfY29sIiwidmlldyIsIm5hbWUiLCJtZXRob2QiLCJocmVmIiwiYXN5bmMiLCJub2RlbGV0ZSIsImVycm9yIiwic3RhdHVzIiwiYWxlcnQiLCJyZW1vdmUiLCJzdWJtaXQiLCJtb2RlbF9pZCIsInR5cGVfaW5wdXQiLCJ2YWxfaW5wdXQiLCJkYXRhdGFibGVNIiwic2VsZWN0MiIsImRhdGVwaWNrZXIiLCJkYXRlRm9ybWF0IiwiYWRyZXNzZTEiLCJhZHJlc3NlMiIsInNob3dNYXAiLCJJRCIsInVuZGVmaW5lZCIsInR5cGVzIiwiZWFjaCIsImluZGV4IiwicHVzaCIsInNldFRpbWVvdXQiLCJpbml0TWFwIiwiaW5pdE1hcEh0bWwiLCJuYW1lRm9ybSIsInN3aXRjaEFkcmVzcyIsImFkcmVzc2UiLCJhZHJlc3NlQ29tcGxldGUiLCJtYXAiLCJnb29nbGUiLCJtYXBzIiwiTWFwIiwiZ2V0RWxlbWVudEJ5SWQiLCJ6b29tIiwiY2VudGVyIiwibGF0IiwibG5nIiwiZ2VvY29kZXIiLCJHZW9jb2RlciIsImdlb2NvZGUiLCJyZXN1bHRzIiwic2V0Q2VudGVyIiwiZ2VvbWV0cnkiLCJsb2NhdGlvbiIsIm1hcmtlciIsIk1hcmtlciIsInBvc2l0aW9uIiwic2Nyb2xsVG9wIiwiaGVpZ2h0IiwicGFyZW50R2xvYmFsIiwib2JqZWN0X2lkIiwicmVhZHkiLCJldmVudCIsImNsaWNrb3ZlciIsInRhcmdldCIsIl9vcGVuZWQiLCJoYXNDbGFzcyIsImJvZHkiLCJ0YWdzIiwiY29udGFjdHNfaWQiLCJ4aHIiLCJhcnIiLCJsb2dfbWVzc2FnZSIsInByZXBlbmQiLCJzdHJlYW0iLCJmb3JtRGF0YSIsIlhNTEh0dHBSZXF1ZXN0IiwicHJldmlvdXNfdGV4dCIsIm9uZXJyb3IiLCJiZWZvcmVTZW5kIiwiaW5uZXJIVE1MIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsIm5ld19yZXNwb25zZSIsInJlc3BvbnNlVGV4dCIsInN1YnN0cmluZyIsInJlc3VsdCIsIkpTT04iLCJwYXJzZSIsInJlbG9hZCIsInRpbWVvdXQiLCJvbnRpbWVvdXQiLCJvcGVuIiwic2V0UmVxdWVz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QWMsR0FBbEIsRUFBdUI7QUFDbkI2RCxnQ0FBWSxzRkFBWjtBQUNIO0FBRUosYUEzQkQsQ0E0QkEsT0FBTzlJLENBQVAsRUFBVTtBQUNOO0FBQ0g7QUFDSixTQWhDRDtBQWlDQTRJLFlBQUlvQixPQUFKLEdBQWMsU0FBZDtBQUNBcEIsWUFBSXFCLFNBQUosR0FBZ0IsWUFBWTtBQUN4QjtBQUNILFNBRkQ7QUFHQXJCLFlBQUlzQixJQUFKLENBQVMsTUFBVCxFQUFpQnBJLEdBQWpCLEVBQXNCLElBQXRCO0FBQ0E4RyxZQUFJdUIsZ0JBQUosQ0FBcUIsa0JBQXJCLEVBQXlDLGdCQUF6QztBQUNBdkIsWUFBSXdCLElBQUosQ0FBU25CLFFBQVQ7QUFDSCxLQW5ERCxDQW9EQSxPQUFPakosQ0FBUCxFQUFVO0FBQ044SSxvQkFBWSx5QkFBeUI5SSxDQUF6QixHQUE2QixNQUF6QztBQUNIO0FBQ0osQzs7Ozs7O0FDdHBCRCx5QyIsImZpbGUiOiIvanMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOTNjNDAxZmE1ZmYxNmFlMjA1NmYiLCIvKipcbiAqIEZpcnN0IHdlIHdpbGwgbG9hZCBhbGwgb2YgdGhpcyBwcm9qZWN0J3MgSmF2YVNjcmlwdCBkZXBlbmRlbmNpZXMgd2hpY2hcbiAqIGluY2x1ZGVzIFZ1ZSBhbmQgb3RoZXIgbGlicmFyaWVzLiBJdCBpcyBhIGdyZWF0IHN0YXJ0aW5nIHBvaW50IHdoZW5cbiAqIGJ1aWxkaW5nIHJvYnVzdCwgcG93ZXJmdWwgd2ViIGFwcGxpY2F0aW9ucyB1c2luZyBWdWUgYW5kIExhcmF2ZWwuXG4gKi9cbiQoJ2h0bWwnKS5iaW5kKCdrZXlwcmVzcycsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGUua2V5Q29kZSA9PSAxMykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufSk7XG52YXIgY3JlYXRlRm9ybURlbGV0ZSA9IGZ1bmN0aW9uIChsaW5rKSB7XG4gICAgdmFyIGZvcm0gPSAkKCc8Zm9ybT4nLCB7J21ldGhvZCc6ICdQT1NUJywgJ2FjdGlvbic6IGxpbmt9KTtcbiAgICB2YXIgdG9rZW4gPSAkKCc8aW5wdXQ+Jywgeyd0eXBlJzogJ2hpZGRlbicsICduYW1lJzogJ190b2tlbicsICd2YWx1ZSc6ICQoJ21ldGFbbmFtZT1jc3JmX3Rva2VuXScpLmF0dHIoJ2NvbnRlbnQnKX0pO1xuICAgIHZhciBoaWRkZW5JbnB1dCA9ICQoJzxpbnB1dD4nLCB7J25hbWUnOiAnX21ldGhvZCcsICd0eXBlJzogJ2hpZGRlbicsICd2YWx1ZSc6ICdERUxFVEUnfSk7XG4gICAgcmV0dXJuIGZvcm0uYXBwZW5kKHRva2VuLCBoaWRkZW5JbnB1dCkuYXBwZW5kVG8oJ2JvZHknKTtcbn1cbmlmICgkKCcuZGF0YXRhYmxlJykubGVuZ3RoKSB7XG4gICAgJCgnLmRhdGF0YWJsZScpLmRhdGFUYWJsZSh7XG4gICAgICAgIFwicmVzcG9uc2l2ZVwiOiB0cnVlLFxuICAgICAgICBcInBhZ2VMZW5ndGhcIjogMjUsXG4gICAgICAgIFwiYWFTb3J0aW5nXCI6IFtdLFxuICAgICAgICBcImNvbHVtbkRlZnNcIjogW3tcbiAgICAgICAgICAgIFwidGFyZ2V0c1wiOiAnc29ydGluZ19kaXNhYmxlZCcsXG4gICAgICAgICAgICBcIm9yZGVyYWJsZVwiOiBmYWxzZVxuICAgICAgICB9XSxcbiAgICAgICAgbGFuZ3VhZ2U6IHtcbiAgICAgICAgICAgIFwidXJsXCI6IFwiYXNzZXRzL2pzL3BsdWdpbnMvZGF0YXRhYmxlcy9mci5qc29uXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJhdXRvV2lkdGhcIjogdHJ1ZSxcbiAgICB9KTtcbn1cblxuKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoJCgnW2RhdGEtYWxlcnRdJykubGVuZ3RoKSB7XG4gICAgICAgIHZhciBibG9jayA9ICQoJ1tkYXRhLWFsZXJ0XScpO1xuICAgICAgICAkLm5pZnR5Tm90eSh7XG4gICAgICAgICAgICB0eXBlOiBibG9jay5hdHRyKCdkYXRhLWFsZXJ0JyksXG4gICAgICAgICAgICBpY29uOiAncGxpLWNyb3NzIGljb24tMngnLFxuICAgICAgICAgICAgbWVzc2FnZTogYmxvY2suYXR0cignZGF0YS1jb250ZW50JyksXG4gICAgICAgICAgICBjb250YWluZXI6ICdmbG9hdGluZycsXG4gICAgICAgICAgICB0aW1lcjogMzAwMFxuICAgICAgICB9KTtcbiAgICB9XG59KSgpO1xuJCgnW3JlbD10b29sdGlwXScpLnRvb2x0aXAoKTtcblxuZnVuY3Rpb24gWGVkaXRhYmxlKCkge1xuICAgICQoJy5lZGl0YWJsZScpLmVkaXRhYmxlKHtcbiAgICAgICAgZW1wdHl0ZXh0OiBcIlZpZGVcIixcbiAgICAgICAgcGFyYW1zOiBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgICAgICBwYXJhbXMubW9kZWwgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtbW9kZWwnKTtcbiAgICAgICAgICAgIHBhcmFtcy5oYXNvbmUgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaGFzb25lJyk7XG4gICAgICAgICAgICBwYXJhbXMuZm9yZWlnbmtleSA9ICQodGhpcykuYXR0cignZGF0YS1mb3JlaWdua2V5Jyk7XG4gICAgICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgICAgICB9LFxuICAgICAgICBzaG93YnV0dG9uczogJ2JvdHRvbScsXG4gICAgICAgIG9uYmx1cjogJ2lnbm9yZScsXG4gICAgICAgIHVybDogJy9hamF4L3F1aWNrdXBkYXRlJ1xuICAgIH0pO1xufVxuXG5pZiAoJCgnLmVkaXRhYmxlJykubGVuZ3RoKSB7XG4gICAgWGVkaXRhYmxlKCk7XG59XG5cblxuZnVuY3Rpb24gY291bnRMaW5lKHRleHQpIHtcbiAgICB2YXIgbGluZXMgPSB0ZXh0LnNwbGl0KFwiXFxuXCIpO1xuICAgIHZhciBjb3VudCA9IDE7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgaWYgKGxpbmVzW2ldLnRyaW0oKSAhPSBcIlwiICYmIGxpbmVzW2ldLnRyaW0oKSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsaW5lc1tpXSk7XG4gICAgICAgICAgICBjb3VudCArPSAxO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbn1cblxuJCgndGV4dGFyZWFbbmFtZT1zZXJpYWxudW1iZXJdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICB0ZXh0ID0gJCh0aGlzKS52YWwoKTtcbiAgICAkKCcubmJMaWJlcnR5JykudGV4dChjb3VudExpbmUodGV4dCkpO1xufSk7XG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnI2FsbGNoZWNrJywgZnVuY3Rpb24gKCkge1xuICAgIC8vcGFyZW50ID0gJCh0aGlzKS5wYXJlbnRzKCd0YWJsZScpO1xuICAgIGVsID0gJCh0aGlzKTtcbiAgICBpZiAoZWwuaXMoXCI6Y2hlY2tlZFwiKSkge1xuICAgICAgICAkKCdpbnB1dFtuYW1lXj1jaGVja10nKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKCdpbnB1dFtuYW1lXj1jaGVja10nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpXG4gICAgfVxufSlcbiQoJy5kZWxhbGxjaGVjaycpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICgkKCdpbnB1dFtuYW1lXj1jaGVja106Y2hlY2tlZCcpLmxlbmd0aCkge1xuICAgICAgICB2YXIgZGF0YSA9ICQoJ2lucHV0W25hbWVePWNoZWNrXTpjaGVja2VkJykuc2VyaWFsaXplQXJyYXkoKTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogJy9hamF4L2RlbGFsbGNoZWNrJyxcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2h0bWwnLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkKCcjbGdfbW9kYWwnKS5tb2RhbCgpO1xuICAgICAgICAgICAgICAgICQoJy5jb250ZW50X2xnX21vZGFsJykuaHRtbChkYXRhKTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZXJyb3JTKCdWZXVpbGxleiBjaG9pc2lyIGRlcyDDqWzDqW1lbnRzIMOgIHN1cHByaW1lcicpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIFNFQVJDSFxuICovXG4kKCdpbnB1dFtuYW1lPXNlYXJjaGFsbF0nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICBpZiAodmFsLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgJCgnLnJlc3VsdF9zZWFyY2gnKS5jb2xsYXBzZSgnc2hvdycpO1xuICAgIH1cbn0pO1xuJCgnaW5wdXRbbmFtZT1zZWFyY2hhbGxdJykua2V5dXAoZnVuY3Rpb24gKCkge1xuICAgIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgc2VsZiA9IHRoaXM7XG4gICAgaWYgKHZhbC5sZW5ndGggPiAyKSB7XG4gICAgICAgICQoJy5zZWFyY2hfY3VycmVudCcpLnRleHQodmFsKTtcbiAgICAgICAgc2VhcmNoQWxsKHNlbGYpO1xuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiBzZWFyY2hBbGwoZSkge1xuICAgIHZhciBzZWFyY2ggPSAkKGUpLnZhbCgpO1xuICAgICQoJy5yZXN1bHRfc2VhcmNoJykuY29sbGFwc2UoKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYWpheC9zZWFyY2hhbGwnLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGFUeXBlOiAnaHRtbCcsXG4gICAgICAgIGRhdGE6IHtzZWFyY2g6IHNlYXJjaH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAkKCcuc2VhcmNoX2NvbnRlbnQnKS5odG1sKGRhdGEpO1xuXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG4kKCcjY2xvc2Vfc2VhcmNoJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICQoJy5yZXN1bHRfc2VhcmNoJykuY29sbGFwc2UoXCJoaWRlXCIpO1xufSk7XG5cbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuZmFfZmxhc2gnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGlkID0gJCgnaW5wdXRbbmFtZT1ub3RpZmljYXRpb25faWRdJykudmFsKCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYWpheC9ub3RpZmljYXRpb24nLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGRhdGE6IHtpZDogaWR9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgc3VjY2Vzc1MoJ0xlY3R1cmUgZGUgbGEgbm90aWZpY2F0aW9uIHByaXNlIGVuIGNvbXB0ZScpO1xuICAgICAgICAgICAgJCgnLm5vdGlmaWNhdGlvbicpLmZpbmQoJ2EnKS5yZW1vdmVDbGFzcygnZmFfZmxhc2gnKTtcbiAgICAgICAgfVxuICAgIH0pXG59KTtcblxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5tb3JlUmVzdWx0JywgZnVuY3Rpb24gKCkge1xuICAgIHBhcmVudCA9ICQodGhpcykucGFyZW50cygnW2RhdGEtc2VhcmNoXScpO1xuICAgIHBhcmVudC5maW5kKCdsaScpLnNob3coKTtcbiAgICBwYXJlbnQuZmluZCgnLm1vcmVSZXN1bHQnKS5oaWRlKCk7XG59KTtcblxuLyoqXG4gKiBGSU4gU0VBUkNIXG4gKi9cbi8qKlxuICogRmFjdHVyZVxuICovXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnNob3dNYW51YWxQYWlkJywgZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykucHJldigpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgJCgnLm1hbnVhbF9wYXllJykuc2hvdygpO1xufSk7XG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnZhbGlkTWFudWFsUGFpZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBkYXRlID0gJCgnaW5wdXRbbmFtZT1kYXRlX3BhaWVtZW50XScpLnZhbCgpO1xuICAgIHZhciByZWZfZG9jdW1lbnQgPSAkKCdpbnB1dFtuYW1lPXJlZl9kb2N1bWVudF0nKS52YWwoKTtcbiAgICBpZiAoZGF0ZSA9PSAnJykge1xuICAgICAgICBlcnJvclMoJ1ZldWlsbGV6IGluZGlxdWVyIHVuZSBkYXRlIGRlIHBhaWVtZW50Jyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FqYXgvbWFudWFscGF5ZWZhY3R1cmUnLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHtyZWZfZG9jdW1lbnQ6IHJlZl9kb2N1bWVudCwgZGF0ZTogZGF0ZX0sXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgJCgnLmJsb2NrUGFpZCcpLmh0bWwoJyA8dGQgY2xhc3M9XCJ0ZXh0LXJpZ2h0IGZvbnQtc20gYm9sZFwiPkRhdGUgZGUgcGFpZW1lbnQ8L3RkPicgK1xuICAgICAgICAgICAgICAgICAgICAnPHRkPjxzcGFuIGNsYXNzPVwiYm9sZFwiPicgKyBkYXRlICsgJzwvc3Bhbj48YnIgLz4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxsYWJlbCBjbGFzcz1cImxhYmVsIGxhYmVsLXN1Y2Nlc3NcIj5QQVlFRTwvbGFiZWw+PC90ZD4nKTtcbiAgICAgICAgICAgICAgICBzdWNjZXNzUygnRmFjdHVyZSBkw6ljbGFyw6llIGNvbW1lIHBhecOpZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0pO1xufSlcblxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ1tkYXRhLXR5cGU9ZXllXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgYmxvY2sgPSAkKHRoaXMpO1xuICAgIHZhciBpZCA9IGJsb2NrLmF0dHIoJ2RhdGEtaWQnKTtcbiAgICB2YXIgcHJpbWFyeV9jb2wgPSBibG9jay5hdHRyKCdkYXRhLXByaW1hcnlfY29sJyk7XG4gICAgdmFyIG1vZGFsID0gYmxvY2suYXR0cignZGF0YS1tb2RhbCcpID8gYmxvY2suYXR0cignZGF0YS1tb2RhbCcpIDogJ2xnX21vZGFsJztcbiAgICBpZiAoaWQgPT0gJycpIHtcbiAgICAgICAgaWQgPSAkKCdbbmFtZT0nICsgcHJpbWFyeV9jb2wgKyAnXScpLnZhbCgpO1xuICAgICAgICBpZiAoaWQgPT0gMCkgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hamF4L2V5ZXZpZXcnLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIG1vZGVsOiBibG9jay5hdHRyKCdkYXRhLW1vZGVsJyksXG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICB2aWV3OiBibG9jay5hdHRyKCdkYXRhLXZpZXcnKSxcbiAgICAgICAgICAgIHByaW1hcnlfY29sOiBibG9jay5hdHRyKCdkYXRhLXByaW1hcnlfY29sJyksXG4gICAgICAgICAgICBuYW1lOiBibG9jay5hdHRyKCdkYXRhLW5hbWUnKSxcbiAgICAgICAgICAgIG1ldGhvZDogYmxvY2suYXR0cignZGF0YS1tZXRob2QnKSxcbiAgICAgICAgICAgIGhyZWY6IGJsb2NrLmF0dHIoJ2RhdGEtaHJlZicpLFxuICAgICAgICAgICAgYXN5bmM6IGJsb2NrLmF0dHIoJ2RhdGEtYXN5bmMnKSxcbiAgICAgICAgICAgIG5vZGVsZXRlOiBibG9jay5hdHRyKCdkYXRhLW5vZGVsZXRlJyksXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFUeXBlOiAnaHRtbCcsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICQoJyMnICsgbW9kYWwpLm1vZGFsKCk7XG4gICAgICAgICAgICAgICAgJCgnLmNvbnRlbnRfbGdfbW9kYWwnKS5odG1sKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHN0YXR1cykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coc3RhdHVzKTtcbiAgICAgICAgICAgIGFsZXJ0KHN0YXR1cyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ1tkYXRhLWNvbmZpcm09ZGVsZXRlXScsIGZ1bmN0aW9uICgpIHtcbiAgICBibG9jayA9ICQodGhpcyk7XG4gICAgaWYgKGJsb2NrLmF0dHIoJ2RhdGEtYXN5bmMnKSAmJiBibG9jay5hdHRyKCdkYXRhLWFzeW5jJykgPT0gJzEnKSB7XG5cbiAgICAgICAgdmFyIGlkID0gYmxvY2suYXR0cignZGF0YS1pZCcpO1xuICAgICAgICB2YXIgcGFyZW50ID0gYmxvY2suYXR0cignZGF0YS1wYXJlbnQnKSA/IGJsb2NrLmF0dHIoJ2RhdGEtcGFyZW50JykgOiAndHInO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiAnL2FqYXgvZGVsZXRlYXN5bmMnLFxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIG1vZGVsOiBibG9jay5hdHRyKCdkYXRhLW1vZGVsJyksXG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgIG5vZGVsZXRlOiBibG9jay5hdHRyKCdkYXRhLW5vZGVsZXRlJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdodG1sJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhLm5vZGVsZXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnW2RhdGEtaWQ9JyArIGlkICsgJ10nKS5wYXJlbnRzKHBhcmVudCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICQoJyNsZ19tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NTKCdFbGVtZW50IHN1cHByaW3DqSBhdmVjIHN1Y2PDqHMgIScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGZvcm0gPSBjcmVhdGVGb3JtRGVsZXRlKGJsb2NrLmF0dHIoJ2RhdGEtaHJlZicpKTtcbiAgICAgICAgZm9ybS5zdWJtaXQoKTtcbiAgICB9XG59KTtcblxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ1tkYXRhLXR5cGU9dXBkYXRlXScsIGZ1bmN0aW9uICgpIHtcbiAgICBibG9jayA9ICQodGhpcyk7XG4gICAgdmFyIG1vZGVsX2lkID0gYmxvY2suYXR0cignZGF0YS1pZCcpO1xuICAgIHZhciB0eXBlX2lucHV0ID0gYmxvY2suYXR0cignZGF0YS10eXBlX2lucHV0JykgPyBibG9jay5hdHRyKCdkYXRhLXR5cGVfaW5wdXQnKSA6ICdpbnB1dCc7XG4gICAgdmFyIHByaW1hcnlfY29sID0gYmxvY2suYXR0cignZGF0YS1wcmltYXJ5X2NvbCcpO1xuICAgIHZhciB2YWxfaW5wdXQgPSAkKHR5cGVfaW5wdXQgKyAnW25hbWU9JyArIGJsb2NrLmF0dHIoJ2RhdGEtbmFtZScpICsgJ10nKS52YWwoKTtcbiAgICBpZiAodmFsX2lucHV0KSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvYWpheC91cGRhdGVfbW9kZWwnLFxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIG1vZGVsOiBibG9jay5hdHRyKCdkYXRhLW1vZGVsJyksXG4gICAgICAgICAgICAgICAgbW9kZWxfaWQ6IG1vZGVsX2lkLFxuICAgICAgICAgICAgICAgIHByaW1hcnlfY29sOiBibG9jay5hdHRyKCdkYXRhLXByaW1hcnlfY29sJyksXG4gICAgICAgICAgICAgICAgbmFtZTogYmxvY2suYXR0cignZGF0YS1uYW1lJyksXG4gICAgICAgICAgICAgICAgdmFsX2lucHV0OiB2YWxfaW5wdXRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJyNsZ19tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NTKCdNb2RpZmljYXRpb24gZWZmZWN0dcOpZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBlcnJvclMoJ0NvbnRhY3RlciBsZSBTdXBwb3J0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZXJyb3JTKCdBdWN1biDDqWzDqW1lbnQgZGlzcG9uaWJsZScpO1xuICAgIH1cbn0pO1xudmFyIGRhdGF0YWJsZU0gPSBmdW5jdGlvbiAoKSB7XG4gICAgJCgnLmRhdGFUYWJsZScpLmRhdGFUYWJsZSh7XG4gICAgICAgIFwicGFnZUxlbmd0aFwiOiA1MCxcbiAgICAgICAgXCJhYVNvcnRpbmdcIjogW10sXG4gICAgICAgIFwiY29sdW1uRGVmc1wiOiBbe1xuICAgICAgICAgICAgXCJ0YXJnZXRzXCI6ICdzb3J0aW5nX2Rpc2FibGVkJyxcbiAgICAgICAgICAgIFwib3JkZXJhYmxlXCI6IGZhbHNlXG4gICAgICAgIH1dLFxuICAgICAgICAvL29yZGVyOiBbWzEsIFwiZGVzY1wiXV0sXG4gICAgICAgIGxhbmd1YWdlOiB7XG4gICAgICAgICAgICBcInVybFwiOiBcIi9hc3NldHMvanMvcGx1Z2lucy9kYXRhdGFibGVzL2ZyLmpzb25cIlxuICAgICAgICB9LFxuICAgICAgICBcImF1dG9XaWR0aFwiOiBmYWxzZSxcbiAgICB9KTtcbn1cbmlmICgkKCcuZGF0YVRhYmxlJykubGVuZ3RoKSB7XG4gICAgZGF0YXRhYmxlTSgpXG5cbn1cbmlmICgkKCcuc2VsZWN0MicpLmxlbmd0aCkge1xuICAgICQoJy5zZWxlY3QyJykuc2VsZWN0MigpO1xufVxuaWYgKCQoJy5kYXRlcGlja2VyJykubGVuZ3RoKSB7XG4gICAgJCgnLmRhdGVwaWNrZXInKS5kYXRlcGlja2VyKHtcbiAgICAgICAgZGF0ZUZvcm1hdDogJ3l5LW1tLWRkJ1xuICAgIH0pXG59XG5cbi8qKk1BUFMqKi9cbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuaW52QWRyZXNzJywgZnVuY3Rpb24gKCkge1xuICAgIGFkcmVzc2UxID0gJCgnaW5wdXRbbmFtZT1hZHJlc3NlMV0nKS52YWwoKVxuICAgIGFkcmVzc2UyID0gJCgnaW5wdXRbbmFtZT1hZHJlc3NlMl0nKS52YWwoKTtcbiAgICAkKCdpbnB1dFtuYW1lPWFkcmVzc2UxXScpLnZhbChhZHJlc3NlMik7XG4gICAgJCgnaW5wdXRbbmFtZT1hZHJlc3NlMl0nKS52YWwoYWRyZXNzZTEpO1xufSk7XG5cbmZ1bmN0aW9uIHNob3dNYXAoSUQpIHtcbiAgICB2YXIgSUQgPSBJRCAhPT0gdW5kZWZpbmVkID8gSUQgOiAnbWFwJztcbiAgICAkKCcjJyArIElEKS5odG1sKCc8cCBjbGFzcz1cInRleHQtc2VtaWJvbGQgdGV4dC1tYWluIHRleHQtbGdcIiBzdHlsZT1cIm1hcmdpbjogMTAwcHggMHB4XCI+Q2FydGUgZW4gY291cnMgZGUgY29udHJ1Y3Rpb24uLi48L3A+Jyk7XG4gICAgdmFyIHR5cGVzID0gW107XG4gICAgaWYgKCQoJ2lucHV0W25hbWVePXR5cGVzX21hcF0nKS5sZW5ndGgpIHtcbiAgICAgICAgJCgnaW5wdXRbbmFtZV49dHlwZXNfbWFwXTpjaGVja2VkJykuZWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgIHR5cGVzLnB1c2goJCh0aGlzKS52YWwoKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgc2VhcmNoID0gJCgnaW5wdXRbbmFtZT1zZWFyY2hfbWFwXScpLnZhbCgpO1xuICAgIGlmICh0eXBlcy5sZW5ndGggPT0gMCAmJiBzZWFyY2ggPT0gJycpIHtcbiAgICAgICAgJCgnIycgKyBJRCkuaHRtbCgnPHAgY2xhc3M9XCJ0ZXh0LXNlbWlib2xkIHRleHQtbWFpbiB0ZXh0LWxnXCIgc3R5bGU9XCJtYXJnaW46IDEwMHB4IDBweFwiPlZldWlsbGV6IGNob2lzaXIgdW4gdHlwZSBkZSBzb2Npw6l0w6k8L3A+Jyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBcIi9hamF4L3NvY2lldGVfbWFwc1wiLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHt0eXBlczogdHlwZXMsIHNlYXJjaDogc2VhcmNofSxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBpbml0TWFwKGRhdGEsIElEKTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgaW5pdE1hcEh0bWwgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuaWYgKCQoJ2lucHV0W25hbWVePXR5cGVzX21hcF0nKS5sZW5ndGgpIHtcbiAgICAkKCdpbnB1dFtuYW1lXj10eXBlc19tYXBdJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBzaG93TWFwKCk7XG4gICAgfSk7XG59XG4kKCdpbnB1dFtuYW1lPXNlYXJjaF9tYXBdJykua2V5dXAoZnVuY3Rpb24gKCkge1xuICAgIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgaWYgKHZhbC5sZW5ndGggPiAyKSB7XG4gICAgICAgIHNob3dNYXAoKTtcbiAgICB9XG59KTtcblxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy52YWxpZEFkcmVzcycsIGZ1bmN0aW9uICgpIHtcbiAgICBuYW1lRm9ybSA9ICQodGhpcykuYXR0cignZGF0YS1mb3JtJyk7XG4gICAgZGF0YSA9ICQoJyMnICsgbmFtZUZvcm0pLnNlcmlhbGl6ZUFycmF5KCk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBcIi9hamF4L3VwZGF0ZXNvY2lldGVcIixcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhOiB7ZGF0YTogZGF0YX0sXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQoJy50YWJsZUVycm9yTWFwcycpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcudGFibGVFcnJvck1hcHMnKS5maW5kKCd0cltkYXRhLWlkPScgKyBkYXRhLmlkICsgJ10nKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnI2xnX21vZGFsJykubW9kYWwoJ2hpZGUnKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdWNjZXNzUygnU29jacOpdMOpIG1pc2Ugw6Agam91ciBhdmVjIHN1Y2PDqHMgIScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn0pO1xuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy50ZXN0TWFwJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBJRCA9ICQodGhpcykuYXR0cignZGF0YS1tYXAnKTtcblxuICAgIHN3aXRjaEFkcmVzcyA9ICQoJ2lucHV0W25hbWU9c3dpdGNoX2FkcmVzc2VdOmNoZWNrZWQnKS52YWwoKTtcblxuICAgIGFkcmVzc2UxID0gJCgnaW5wdXRbbmFtZT1hZHJlc3NlMV0nKS52YWwoKVxuICAgIGFkcmVzc2UyID0gJCgnaW5wdXRbbmFtZT1hZHJlc3NlMl0nKS52YWwoKVxuICAgIGFkcmVzc2UgPSAnbnlvbnMnO1xuICAgIHN3aXRjaCAoc3dpdGNoQWRyZXNzKSB7XG4gICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgICAgYWRyZXNzZSA9IGFkcmVzc2UxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJzInOlxuICAgICAgICAgICAgYWRyZXNzZSA9IGFkcmVzc2UyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnMyc6XG4gICAgICAgICAgICBhZHJlc3NlID0gYWRyZXNzZTEgKyAnICcgKyBhZHJlc3NlMjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhzd2l0Y2hBZHJlc3MpO1xuICAgIGNvbnNvbGUubG9nKGFkcmVzc2UpO1xuICAgIGFkcmVzc2VDb21wbGV0ZSA9IGFkcmVzc2UgKyAnICcgKyAkKCdpbnB1dFtuYW1lPWNwXScpLnZhbCgpICsgJyAnICsgJCgnaW5wdXRbbmFtZT12aWxsZV0nKS52YWwoKTtcbiAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChJRCksIHtcbiAgICAgICAgem9vbTogMTAsXG4gICAgICAgIGNlbnRlcjoge2xhdDogNDYuMTkxNjQ0LCBsbmc6IDUuMzIyNjY2fVxuICAgIH0pO1xuICAgIHZhciBnZW9jb2RlciA9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcigpO1xuXG4gICAgZ2VvY29kZXIuZ2VvY29kZSh7J2FkZHJlc3MnOiBhZHJlc3NlQ29tcGxldGV9LCBmdW5jdGlvbiAocmVzdWx0cywgc3RhdHVzKSB7XG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdPSycpIHtcbiAgICAgICAgICAgIG1hcC5zZXRDZW50ZXIocmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbik7XG5cbiAgICAgICAgICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcG9zaXRpb24gPSByZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uO1xuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1sYXRpdHVkZV0nKS52YWwocG9zaXRpb24ubGF0KTtcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9bG9uZ2l0dWRlXScpLnZhbChwb3NpdGlvbi5sbmcpO1xuICAgICAgICAgICAgJCgnLm5vQWRkcmVzcycpLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy52YWxpZEFkcmVzcycpLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5ub0FkZHJlc3MnKS5zaG93KCk7XG4gICAgICAgICAgICAkKCcjJyArIElEKS5odG1sKCcnKTtcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9bGF0aXR1ZGVdJykudmFsKDApO1xuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1sb25naXR1ZGVdJykudmFsKDApO1xuICAgICAgICAgICAgJCgnLnZhbGlkQWRyZXNzJykuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcblxuLyoqIEVORCBNQVBTICoqL1xuLyoqIFJlbWFycXVlICoqL1xuaWYgKCQoJy5saXN0UmVtYXJxdWVzJykubGVuZ3RoKSB7XG4gICAgJCgnLmxpc3RSZW1hcnF1ZXMgLm5hbm8tY29udGVudCcpLnNjcm9sbFRvcCgkKCcubGlzdFJlbWFycXVlcyB1bCcpLmhlaWdodCgpKVxufVxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5lZGl0UmVtYXJxdWUnLCBmdW5jdGlvbiAoKSB7XG4gICAgcGFyZW50R2xvYmFsID0gJCh0aGlzKS5wYXJlbnRzKCdyZW1hcnF1ZScpO1xuXG4gICAgdmFyIG1vZGVsID0gcGFyZW50R2xvYmFsLmF0dHIoJ2RhdGEtbW9kZWwnKTtcbiAgICB2YXIgb2JqZWN0X2lkID0gcGFyZW50R2xvYmFsLmF0dHIoJ2RhdGEtb2JqZWN0X2lkJyk7XG4gICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBcIi9hamF4L2VkaXRyZW1hcnF1ZVwiLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHttb2RlbDogbW9kZWwsIG9iamVjdF9pZDogb2JqZWN0X2lkLCBpZDogaWR9LFxuICAgICAgICBkYXRhVHlwZTogJ2h0bWwnLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgJCgnI2xnX21vZGFsJykubW9kYWwoKTtcbiAgICAgICAgICAgICQoJy5jb250ZW50X2xnX21vZGFsJykuaHRtbChkYXRhKTtcbiAgICAgICAgfVxuICAgIH0pXG59KTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgY2xpY2tvdmVyID0gJChldmVudC50YXJnZXQpO1xuICAgICAgICB2YXIgX29wZW5lZCA9ICQoXCIuY29sbGFwc2VcIikuaGFzQ2xhc3MoXCJjb2xsYXBzZSBpblwiKTtcbiAgICAgICAgaWYgKF9vcGVuZWQgPT09IHRydWUgJiYgIWNsaWNrb3Zlci5wYXJlbnRzKCcuY29sbGFwc2UnKS5oYXNDbGFzcygnY29sbGFwc2UtdG9nZ2xlJykpIHtcbiAgICAgICAgICAgICQoXCIuY29sbGFwc2UtdG9nZ2xlXCIpLmNvbGxhcHNlKCdoaWRlJylcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmFkZFJlbWFycXVlJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBtb2RlbCA9ICQoJ2lucHV0W25hbWU9bW9kZWxdJykudmFsKCk7XG4gICAgdmFyIG9iamVjdF9pZCA9ICQoJ2lucHV0W25hbWU9b2JqZWN0X2lkXScpLnZhbCgpO1xuICAgIHZhciBib2R5ID0gJCgnaW5wdXRbbmFtZT1ib2R5XScpLnZhbCgpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogXCIvYWpheC9hZGRyZW1hcnF1ZVwiLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHttb2RlbDogbW9kZWwsIG9iamVjdF9pZDogb2JqZWN0X2lkLCBib2R5OiBib2R5fSxcbiAgICAgICAgZGF0YVR5cGU6ICdodG1sJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9Ym9keV0nKS52YWwoJycpO1xuICAgICAgICAgICAgJCgnLmxpc3RSZW1hcnF1ZXMgdWwnKS5hcHBlbmQoZGF0YSk7XG4gICAgICAgICAgICAkKCcubGlzdFJlbWFycXVlcyAubmFuby1jb250ZW50Jykuc2Nyb2xsVG9wKCQoJy5saXN0UmVtYXJxdWVzIHVsJykuaGVpZ2h0KCkpXG4gICAgICAgIH1cbiAgICB9KVxufSk7XG5cbi8qKiBFTkQgUmVtYXJxdWUgKiovXG4vKiogQWNhZGVteSAqKi9cblxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5hZGRBY2FkZW15JywgZnVuY3Rpb24gKCkge1xuICAgIHZhciB0YWdzID0gJCgnaW5wdXRbbmFtZV49dGFnc10nKS5zZXJpYWxpemVBcnJheSgpO1xuICAgIHZhciBpZCA9ICQoJ2lucHV0W25hbWU9Y29udGFjdF9pZF0nKS52YWwoKTtcbiAgICB2YXIgY29udGFjdHNfaWQgPSAkKCdpbnB1dFtuYW1lPWNvbnRhY3RzXScpLnZhbCgpO1xuICAgIHZhciBub2RlbGV0ZSA9ICEhJCh0aGlzKS5hdHRyKCdkYXRhLW5vZGVsZXRlJyk7XG4gICAgaWYgKCQoJ2lucHV0W25hbWVePXRhZ3NdOmNoZWNrZWQnKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAkKCcuZXJyb3JUYWcnKS5zaG93KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKCcuZXJyb3JUYWcnKS5oaWRlKCk7XG4gICAgfVxuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FqYXgvYWRkYWNhZGVteScsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgZGF0YToge3RhZ3M6IHRhZ3MsIGlkOiBpZCwgY29udGFjdHNfaWQ6IGNvbnRhY3RzX2lkfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIGlmICghbm9kZWxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmFkZEFjYWRlbXknKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5hY2NvdW50QWNhZGVteU9LJykuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzUygnQ2F0w6lnb3JpZXMgcmVudm95w6llcycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKCcuc2VuZE1haWxBY2FkZW15Jykuc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcuZXJyb3JUYWcnKS50ZXh0KGRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgJCgnLmVycm9yVGFnJykuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdGF0dXMpO1xuICAgICAgICAgICAgZXJyb3JTKCdVbmUgZXJyZXVyIHNcXCdlc3QgcHJvZHVpdGUnKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnI0NvbnRhY3QgaW5wdXRbdHlwZT1jaGVja2JveF0nLCBmdW5jdGlvbiAoKSB7XG4gICAgYXJyID0gW107XG4gICAgaWYgKCQoJyNDb250YWN0IGlucHV0W3R5cGU9Y2hlY2tib3hdOmNoZWNrZWQnKS5sZW5ndGggPj0gMSlcbiAgICAgICAgJCgnLnNldHRpbmdzQ29udGFjdCcpLnNob3coKTtcbiAgICBlbHNlXG4gICAgICAgICQoJy5zZXR0aW5nc0NvbnRhY3QnKS5oaWRlKCk7XG59KTtcbiQoJy5hZGRzQWNhZGVteScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBhcnIgPSBbXTtcbiAgICAkKCcjQ29udGFjdCBpbnB1dFt0eXBlPWNoZWNrYm94XTpjaGVja2VkJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFyci5wdXNoKCQodGhpcykudmFsKCkpO1xuICAgIH0pO1xufSk7XG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnNlbmRNYWlsQWNhZGVteScsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaWQgPSAkKCdpbnB1dFtuYW1lPWNvbnRhY3RfaWRdJykudmFsKCk7XG4gICAgdmFyIGNvbnRhY3RzX2lkID0gJCgnaW5wdXRbbmFtZT1jb250YWN0c10nKS52YWwoKTtcbiAgICB2YXIgbm9kZWxldGUgPSAhISQodGhpcykuYXR0cignZGF0YS1ub2RlbGV0ZScpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hamF4L3NlbmRtYWlsYWNhZGVteScsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgZGF0YToge2NvbnRhY3RzX2lkOiBjb250YWN0c19pZCwgaWQ6IGlkfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZighbm9kZWxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNlbmRBY2FkZW15T0snKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zZW5kTWFpbEFjYWRlbXknKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NTKCdNZXNzYWdlIGVudm95w6knKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXJyb3JTKGRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuJCgnLnNjYW5Db25uZWN0aW9ucycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYWpheC9zY2FuY29ubmVjdGlvbmFjYWRlbXknLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgc3VjY2Vzc1MoJ1NjYW4gZGVzIGRlcm5pw6hyZXMgY29ubmVjdGlvbnMgZWZmZWN0dcOpZXMnKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzUyhkYXRhLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59KTtcblxuLyoqIEVORCBBY2FkZW15ICoqL1xuLyoqXG4gKiBTdHJlYW1cbiAqL1xuZnVuY3Rpb24gbG9nX21lc3NhZ2UobWVzc2FnZSkge1xuICAgICQoJyNyZXN1bHRTdHJlYW0nKS5wcmVwZW5kKG1lc3NhZ2UpO1xuICAgIC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN1bHRTdHJlYW1cIikuaW5uZXJIVE1MICs9IG1lc3NhZ2U7XG59XG5cbmZ1bmN0aW9uIHN0cmVhbShmb3JtRGF0YSwgdXJsKSB7XG4gICAgJCgnI3Jlc3VsdFN0cmVhbScpLmh0bWwoJycpO1xuICAgIHRyeSB7XG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLnByZXZpb3VzX3RleHQgPSAnJztcbiAgICAgICAgLy94aHIub25sb2FkID0gZnVuY3Rpb24oKSB7IGxvZ19tZXNzYWdlKFwiW1hIUl0gRG9uZS4gcmVzcG9uc2VUZXh0OiA8aT5cIiArIHhoci5yZXNwb25zZVRleHQgKyBcIjwvaT5cIik7IH07XG4gICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGxvZ19tZXNzYWdlKFwiW1hIUl0gRmF0YWwgRXJyb3IgOlwiICsgZSk7XG4gICAgICAgIH07XG4gICAgICAgIHhoci5iZWZvcmVTZW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dfbWVzc2FnZVwiKS5pbm5lckhUTUwgPSAnb3B1aSdcbiAgICAgICAgfVxuXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA+IDIpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3X3Jlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dC5zdWJzdHJpbmcoeGhyLnByZXZpb3VzX3RleHQubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IEpTT04ucGFyc2UobmV3X3Jlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ19tZXNzYWdlKHJlc3VsdC5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHhoci5yZWFkeVN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ19tZXNzYWdlKHJlc3VsdC5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NTKCdQcm9jZXNzdXMgdGVybWluw6ksIHJlY2hhcmdlbWVudCBlbiBjb3Vycy4uLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB4aHIucHJldmlvdXNfdGV4dCA9IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nX21lc3NhZ2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09IDUwMCkge1xuICAgICAgICAgICAgICAgICAgICBsb2dfbWVzc2FnZSgnPGxpIGNsYXNzPVwidGV4dC1kYW5nZXIgdGV4dC1ib2xkXCI+RXJyZXVyISBWZXVpbGxleiB2w6lyaWZpZXIgdm90cmUgY29uZmlndXJhdGlvbjwvbGk+Jyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vbG9nX21lc3NhZ2UoXCI8Yj5bWEhSXSBFeGNlcHRpb246IFwiICsgZSArIFwiPC9iPlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgeGhyLnRpbWVvdXQgPSAzMDAwMDAwMDA7XG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvL2xvZ19tZXNzYWdlKCdUaW1lT3V0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgeGhyLm9wZW4oXCJQT1NUXCIsIHVybCwgdHJ1ZSk7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLVJlcXVlc3RlZC1XaXRoJywgJ1hNTEh0dHBSZXF1ZXN0Jyk7XG4gICAgICAgIHhoci5zZW5kKGZvcm1EYXRhKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgbG9nX21lc3NhZ2UoXCI8Yj5bWEhSXSBFeGNlcHRpb246IFwiICsgZSArIFwiPC9iPlwiKTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hcHAuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9zYXNzL2FwcC5zY3NzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=