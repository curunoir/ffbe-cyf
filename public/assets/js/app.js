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

$('.submit_on_enter').keydown(function (event) {
    // enter has keyCode = 13, change it if you want to use another button
    if (event.keyCode == 13) {
        this.form.submit();
        return false;
    }
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmM4ZTQzYzYwNTQwZDNlZDc3MTYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9zYXNzL2FwcC5zY3NzIl0sIm5hbWVzIjpbIiQiLCJiaW5kIiwiZSIsImtleUNvZGUiLCJjcmVhdGVGb3JtRGVsZXRlIiwibGluayIsImZvcm0iLCJ0b2tlbiIsImF0dHIiLCJoaWRkZW5JbnB1dCIsImFwcGVuZCIsImFwcGVuZFRvIiwibGVuZ3RoIiwiZGF0YVRhYmxlIiwibGFuZ3VhZ2UiLCJibG9jayIsIm5pZnR5Tm90eSIsInR5cGUiLCJpY29uIiwibWVzc2FnZSIsImNvbnRhaW5lciIsInRpbWVyIiwidG9vbHRpcCIsIlhlZGl0YWJsZSIsImVkaXRhYmxlIiwiZW1wdHl0ZXh0IiwicGFyYW1zIiwibW9kZWwiLCJoYXNvbmUiLCJmb3JlaWdua2V5Iiwic2hvd2J1dHRvbnMiLCJvbmJsdXIiLCJ1cmwiLCJjb3VudExpbmUiLCJ0ZXh0IiwibGluZXMiLCJzcGxpdCIsImNvdW50IiwiaSIsInRyaW0iLCJjb25zb2xlIiwibG9nIiwiY2hhbmdlIiwidmFsIiwiZG9jdW1lbnQiLCJvbiIsImVsIiwiaXMiLCJwcm9wIiwiY2xpY2siLCJwcmV2ZW50RGVmYXVsdCIsImRhdGEiLCJzZXJpYWxpemVBcnJheSIsImFqYXgiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJtb2RhbCIsImh0bWwiLCJlcnJvclMiLCJjb2xsYXBzZSIsImtleXVwIiwic2VsZiIsInNlYXJjaEFsbCIsInNlYXJjaCIsImlkIiwic3VjY2Vzc1MiLCJmaW5kIiwicmVtb3ZlQ2xhc3MiLCJwYXJlbnQiLCJwYXJlbnRzIiwic2hvdyIsImhpZGUiLCJwcmV2IiwiZGF0ZSIsInJlZl9kb2N1bWVudCIsInByaW1hcnlfY29sIiwidmlldyIsIm5hbWUiLCJtZXRob2QiLCJocmVmIiwiYXN5bmMiLCJub2RlbGV0ZSIsImVycm9yIiwic3RhdHVzIiwiYWxlcnQiLCJyZW1vdmUiLCJzdWJtaXQiLCJtb2RlbF9pZCIsInR5cGVfaW5wdXQiLCJ2YWxfaW5wdXQiLCJkYXRhdGFibGVNIiwic2VsZWN0MiIsImRhdGVwaWNrZXIiLCJkYXRlRm9ybWF0IiwiYWRyZXNzZTEiLCJhZHJlc3NlMiIsInNob3dNYXAiLCJJRCIsInVuZGVmaW5lZCIsInR5cGVzIiwiZWFjaCIsImluZGV4IiwicHVzaCIsInNldFRpbWVvdXQiLCJpbml0TWFwIiwiaW5pdE1hcEh0bWwiLCJuYW1lRm9ybSIsInN3aXRjaEFkcmVzcyIsImFkcmVzc2UiLCJhZHJlc3NlQ29tcGxldGUiLCJtYXAiLCJnb29nbGUiLCJtYXBzIiwiTWFwIiwiZ2V0RWxlbWVudEJ5SWQiLCJ6b29tIiwiY2VudGVyIiwibGF0IiwibG5nIiwiZ2VvY29kZXIiLCJHZW9jb2RlciIsImdlb2NvZGUiLCJyZXN1bHRzIiwic2V0Q2VudGVyIiwiZ2VvbWV0cnkiLCJsb2NhdGlvbiIsIm1hcmtlciIsIk1hcmtlciIsInBvc2l0aW9uIiwic2Nyb2xsVG9wIiwiaGVpZ2h0IiwicGFyZW50R2xvYmFsIiwib2JqZWN0X2lkIiwicmVhZHkiLCJldmVudCIsImNsaWNrb3ZlciIsInRhcmdldCIsIl9vcGVuZWQiLCJoYXNDbGFzcyIsImJvZHkiLCJ0YWdzIiwiY29udGFjdHNfaWQiLCJ4aHIiLCJhcnIiLCJsb2dfbWVzc2FnZSIsInByZXBlbmQiLCJrZXlkb3duIiwic3RyZWFtIiwiZm9ybURhdGEiLCJYTUxIdHRwUmVxdWVzdCIsInByZXZpb3VzX3RleHQiLCJvbmVycm9yIiwiYmVmb3JlU2VuZCIsImlubmVySFRNTCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJuZXdfcmVzcG9uc2UiLCJyZXNwb25zZVRleHQiLCJzdWJzdHJpbmciLCJyZXN1bHQiLCJKU09OIiwicGFyc2UiLCJyZWxvYWQiLCJ0aW1lb3V0Iiwib250aW1lb3V0Iiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJzZW5kIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTs7Ozs7QUFLQUEsRUFBRSxNQUFGLEVBQVVDLElBQVYsQ0FBZSxVQUFmLEVBQTJCLFVBQVVDLENBQVYsRUFBYTtBQUNwQyxRQUFJQSxFQUFFQyxPQUFGLElBQWEsRUFBakIsRUFBcUI7QUFDakIsZUFBTyxLQUFQO0FBQ0g7QUFDSixDQUpEO0FBS0EsSUFBSUMsbUJBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBVUMsSUFBVixFQUFnQjtBQUNuQyxRQUFJQyxPQUFPTixFQUFFLFFBQUYsRUFBWSxFQUFDLFVBQVUsTUFBWCxFQUFtQixVQUFVSyxJQUE3QixFQUFaLENBQVg7QUFDQSxRQUFJRSxRQUFRUCxFQUFFLFNBQUYsRUFBYSxFQUFDLFFBQVEsUUFBVCxFQUFtQixRQUFRLFFBQTNCLEVBQXFDLFNBQVNBLEVBQUUsdUJBQUYsRUFBMkJRLElBQTNCLENBQWdDLFNBQWhDLENBQTlDLEVBQWIsQ0FBWjtBQUNBLFFBQUlDLGNBQWNULEVBQUUsU0FBRixFQUFhLEVBQUMsUUFBUSxTQUFULEVBQW9CLFFBQVEsUUFBNUIsRUFBc0MsU0FBUyxRQUEvQyxFQUFiLENBQWxCO0FBQ0EsV0FBT00sS0FBS0ksTUFBTCxDQUFZSCxLQUFaLEVBQW1CRSxXQUFuQixFQUFnQ0UsUUFBaEMsQ0FBeUMsTUFBekMsQ0FBUDtBQUNILENBTEQ7QUFNQSxJQUFJWCxFQUFFLFlBQUYsRUFBZ0JZLE1BQXBCLEVBQTRCO0FBQ3hCWixNQUFFLFlBQUYsRUFBZ0JhLFNBQWhCLENBQTBCO0FBQ3RCLHNCQUFjLElBRFE7QUFFdEIsc0JBQWMsRUFGUTtBQUd0QixxQkFBYSxFQUhTO0FBSXRCLHNCQUFjLENBQUM7QUFDWCx1QkFBVyxrQkFEQTtBQUVYLHlCQUFhO0FBRkYsU0FBRCxDQUpRO0FBUXRCQyxrQkFBVTtBQUNOLG1CQUFPO0FBREQsU0FSWTtBQVd0QixxQkFBYTtBQVhTLEtBQTFCO0FBYUg7O0FBRUQsQ0FBQyxZQUFZO0FBQ1QsUUFBSWQsRUFBRSxjQUFGLEVBQWtCWSxNQUF0QixFQUE4QjtBQUMxQixZQUFJRyxRQUFRZixFQUFFLGNBQUYsQ0FBWjtBQUNBQSxVQUFFZ0IsU0FBRixDQUFZO0FBQ1JDLGtCQUFNRixNQUFNUCxJQUFOLENBQVcsWUFBWCxDQURFO0FBRVJVLGtCQUFNLG1CQUZFO0FBR1JDLHFCQUFTSixNQUFNUCxJQUFOLENBQVcsY0FBWCxDQUhEO0FBSVJZLHVCQUFXLFVBSkg7QUFLUkMsbUJBQU87QUFMQyxTQUFaO0FBT0g7QUFDSixDQVhEO0FBWUFyQixFQUFFLGVBQUYsRUFBbUJzQixPQUFuQjs7QUFFQSxTQUFTQyxTQUFULEdBQXFCO0FBQ2pCdkIsTUFBRSxXQUFGLEVBQWV3QixRQUFmLENBQXdCO0FBQ3BCQyxtQkFBVyxNQURTO0FBRXBCQyxnQkFBUSxnQkFBVUEsT0FBVixFQUFrQjtBQUN0QkEsb0JBQU9DLEtBQVAsR0FBZTNCLEVBQUUsSUFBRixFQUFRUSxJQUFSLENBQWEsWUFBYixDQUFmO0FBQ0FrQixvQkFBT0UsTUFBUCxHQUFnQjVCLEVBQUUsSUFBRixFQUFRUSxJQUFSLENBQWEsYUFBYixDQUFoQjtBQUNBa0Isb0JBQU9HLFVBQVAsR0FBb0I3QixFQUFFLElBQUYsRUFBUVEsSUFBUixDQUFhLGlCQUFiLENBQXBCO0FBQ0EsbUJBQU9rQixPQUFQO0FBQ0gsU0FQbUI7QUFRcEJJLHFCQUFhLFFBUk87QUFTcEJDLGdCQUFRLFFBVFk7QUFVcEJDLGFBQUs7QUFWZSxLQUF4QjtBQVlIOztBQUVELElBQUloQyxFQUFFLFdBQUYsRUFBZVksTUFBbkIsRUFBMkI7QUFDdkJXO0FBQ0g7O0FBR0QsU0FBU1UsU0FBVCxDQUFtQkMsSUFBbkIsRUFBeUI7QUFDckIsUUFBSUMsUUFBUUQsS0FBS0UsS0FBTCxDQUFXLElBQVgsQ0FBWjtBQUNBLFFBQUlDLFFBQVEsQ0FBWjtBQUNBLFNBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxNQUFNdkIsTUFBTixHQUFlLENBQW5DLEVBQXNDMEIsR0FBdEMsRUFBMkM7QUFDdkMsWUFBSUgsTUFBTUcsQ0FBTixFQUFTQyxJQUFULE1BQW1CLEVBQW5CLElBQXlCSixNQUFNRyxDQUFOLEVBQVNDLElBQVQsTUFBbUIsSUFBaEQsRUFBc0Q7QUFDbERDLG9CQUFRQyxHQUFSLENBQVlOLE1BQU1HLENBQU4sQ0FBWjtBQUNBRCxxQkFBUyxDQUFUO0FBQ0g7QUFDSjtBQUNELFdBQU9BLEtBQVA7QUFDSDs7QUFFRHJDLEVBQUUsNkJBQUYsRUFBaUMwQyxNQUFqQyxDQUF3QyxZQUFZO0FBQ2hEUixXQUFPbEMsRUFBRSxJQUFGLEVBQVEyQyxHQUFSLEVBQVA7QUFDQTNDLE1BQUUsWUFBRixFQUFnQmtDLElBQWhCLENBQXFCRCxVQUFVQyxJQUFWLENBQXJCO0FBQ0gsQ0FIRDtBQUlBbEMsRUFBRTRDLFFBQUYsRUFBWUMsRUFBWixDQUFlLE9BQWYsRUFBd0IsV0FBeEIsRUFBcUMsWUFBWTtBQUM3QztBQUNBQyxTQUFLOUMsRUFBRSxJQUFGLENBQUw7QUFDQSxRQUFJOEMsR0FBR0MsRUFBSCxDQUFNLFVBQU4sQ0FBSixFQUF1QjtBQUNuQi9DLFVBQUUsb0JBQUYsRUFBd0JnRCxJQUF4QixDQUE2QixTQUE3QixFQUF3QyxJQUF4QztBQUNILEtBRkQsTUFFTztBQUNIaEQsVUFBRSxvQkFBRixFQUF3QmdELElBQXhCLENBQTZCLFNBQTdCLEVBQXdDLEtBQXhDO0FBQ0g7QUFDSixDQVJEO0FBU0FoRCxFQUFFLGNBQUYsRUFBa0JpRCxLQUFsQixDQUF3QixVQUFVL0MsQ0FBVixFQUFhO0FBQ2pDQSxNQUFFZ0QsY0FBRjtBQUNBLFFBQUlsRCxFQUFFLDRCQUFGLEVBQWdDWSxNQUFwQyxFQUE0QztBQUN4QyxZQUFJdUMsT0FBT25ELEVBQUUsNEJBQUYsRUFBZ0NvRCxjQUFoQyxFQUFYO0FBQ0FwRCxVQUFFcUQsSUFBRixDQUFPO0FBQ0hyQixpQkFBSyxtQkFERjtBQUVIZixrQkFBTSxNQUZIO0FBR0hrQyxrQkFBTUEsSUFISDtBQUlIRyxzQkFBVSxNQUpQO0FBS0hDLHFCQUFTLGlCQUFVSixJQUFWLEVBQWdCO0FBQ3JCbkQsa0JBQUUsV0FBRixFQUFld0QsS0FBZjtBQUNBeEQsa0JBQUUsbUJBQUYsRUFBdUJ5RCxJQUF2QixDQUE0Qk4sSUFBNUI7QUFFSDtBQVRFLFNBQVA7QUFXSCxLQWJELE1BYU87QUFDSE8sZUFBTywyQ0FBUDtBQUNIO0FBQ0osQ0FsQkQ7O0FBb0JBOzs7QUFHQTFELEVBQUUsdUJBQUYsRUFBMkJpRCxLQUEzQixDQUFpQyxZQUFZO0FBQ3pDTixVQUFNM0MsRUFBRSxJQUFGLEVBQVEyQyxHQUFSLEVBQU47QUFDQSxRQUFJQSxJQUFJL0IsTUFBSixHQUFhLENBQWpCLEVBQW9CO0FBQ2hCWixVQUFFLGdCQUFGLEVBQW9CMkQsUUFBcEIsQ0FBNkIsTUFBN0I7QUFDSDtBQUNKLENBTEQ7QUFNQTNELEVBQUUsdUJBQUYsRUFBMkI0RCxLQUEzQixDQUFpQyxZQUFZO0FBQ3pDakIsVUFBTTNDLEVBQUUsSUFBRixFQUFRMkMsR0FBUixFQUFOO0FBQ0FrQixXQUFPLElBQVA7QUFDQSxRQUFJbEIsSUFBSS9CLE1BQUosR0FBYSxDQUFqQixFQUFvQjtBQUNoQlosVUFBRSxpQkFBRixFQUFxQmtDLElBQXJCLENBQTBCUyxHQUExQjtBQUNBbUIsa0JBQVVELElBQVY7QUFDSDtBQUNKLENBUEQ7O0FBU0EsU0FBU0MsU0FBVCxDQUFtQjVELENBQW5CLEVBQXNCO0FBQ2xCLFFBQUk2RCxTQUFTL0QsRUFBRUUsQ0FBRixFQUFLeUMsR0FBTCxFQUFiO0FBQ0EzQyxNQUFFLGdCQUFGLEVBQW9CMkQsUUFBcEI7QUFDQTNELE1BQUVxRCxJQUFGLENBQU87QUFDSHJCLGFBQUssaUJBREY7QUFFSGYsY0FBTSxNQUZIO0FBR0hxQyxrQkFBVSxNQUhQO0FBSUhILGNBQU0sRUFBQ1ksUUFBUUEsTUFBVCxFQUpIO0FBS0hSLGlCQUFTLGlCQUFVSixJQUFWLEVBQWdCO0FBQ3JCbkQsY0FBRSxpQkFBRixFQUFxQnlELElBQXJCLENBQTBCTixJQUExQjtBQUVIO0FBUkUsS0FBUDtBQVVIOztBQUVEbkQsRUFBRSxlQUFGLEVBQW1CaUQsS0FBbkIsQ0FBeUIsWUFBWTtBQUNqQ2pELE1BQUUsZ0JBQUYsRUFBb0IyRCxRQUFwQixDQUE2QixNQUE3QjtBQUNILENBRkQ7O0FBSUEzRCxFQUFFNEMsUUFBRixFQUFZQyxFQUFaLENBQWUsT0FBZixFQUF3QixXQUF4QixFQUFxQyxZQUFZO0FBQzdDLFFBQUltQixLQUFLaEUsRUFBRSw2QkFBRixFQUFpQzJDLEdBQWpDLEVBQVQ7O0FBRUEzQyxNQUFFcUQsSUFBRixDQUFPO0FBQ0hyQixhQUFLLG9CQURGO0FBRUhmLGNBQU0sTUFGSDtBQUdIcUMsa0JBQVUsTUFIUDtBQUlISCxjQUFNLEVBQUNhLElBQUlBLEVBQUwsRUFKSDtBQUtIVCxpQkFBUyxpQkFBVUosSUFBVixFQUFnQjtBQUNyQmMscUJBQVMsNENBQVQ7QUFDQWpFLGNBQUUsZUFBRixFQUFtQmtFLElBQW5CLENBQXdCLEdBQXhCLEVBQTZCQyxXQUE3QixDQUF5QyxVQUF6QztBQUNIO0FBUkUsS0FBUDtBQVVILENBYkQ7O0FBZUFuRSxFQUFFNEMsUUFBRixFQUFZQyxFQUFaLENBQWUsT0FBZixFQUF3QixhQUF4QixFQUF1QyxZQUFZO0FBQy9DdUIsYUFBU3BFLEVBQUUsSUFBRixFQUFRcUUsT0FBUixDQUFnQixlQUFoQixDQUFUO0FBQ0FELFdBQU9GLElBQVAsQ0FBWSxJQUFaLEVBQWtCSSxJQUFsQjtBQUNBRixXQUFPRixJQUFQLENBQVksYUFBWixFQUEyQkssSUFBM0I7QUFDSCxDQUpEOztBQU1BOzs7QUFHQTs7O0FBR0F2RSxFQUFFNEMsUUFBRixFQUFZQyxFQUFaLENBQWUsT0FBZixFQUF3QixpQkFBeEIsRUFBMkMsWUFBWTtBQUNuRDdDLE1BQUUsSUFBRixFQUFRd0UsSUFBUixHQUFlaEUsSUFBZixDQUFvQixVQUFwQixFQUFnQyxVQUFoQztBQUNBUixNQUFFLGNBQUYsRUFBa0JzRSxJQUFsQjtBQUNILENBSEQ7QUFJQXRFLEVBQUU0QyxRQUFGLEVBQVlDLEVBQVosQ0FBZSxPQUFmLEVBQXdCLGtCQUF4QixFQUE0QyxVQUFVM0MsQ0FBVixFQUFhO0FBQ3JEQSxNQUFFZ0QsY0FBRjtBQUNBLFFBQUl1QixPQUFPekUsRUFBRSwyQkFBRixFQUErQjJDLEdBQS9CLEVBQVg7QUFDQSxRQUFJK0IsZUFBZTFFLEVBQUUsMEJBQUYsRUFBOEIyQyxHQUE5QixFQUFuQjtBQUNBLFFBQUk4QixRQUFRLEVBQVosRUFBZ0I7QUFDWmYsZUFBTyx3Q0FBUDtBQUNBLGVBQU8sS0FBUDtBQUNIO0FBQ0QxRCxNQUFFcUQsSUFBRixDQUFPO0FBQ0hyQixhQUFLLHlCQURGO0FBRUhmLGNBQU0sTUFGSDtBQUdIa0MsY0FBTSxFQUFDdUIsY0FBY0EsWUFBZixFQUE2QkQsTUFBTUEsSUFBbkMsRUFISDtBQUlIbkIsa0JBQVUsTUFKUDtBQUtIQyxpQkFBUyxpQkFBVUosSUFBVixFQUFnQjtBQUNyQixnQkFBSUEsS0FBS0ksT0FBVCxFQUFrQjtBQUNkdkQsa0JBQUUsWUFBRixFQUFnQnlELElBQWhCLENBQXFCLCtEQUNqQix5QkFEaUIsR0FDV2dCLElBRFgsR0FDa0IsZUFEbEIsR0FFakIsdURBRko7QUFHQVIseUJBQVMsOEJBQVQ7QUFDSDtBQUNKO0FBWkUsS0FBUDtBQWNILENBdEJEOztBQXdCQWpFLEVBQUU0QyxRQUFGLEVBQVlDLEVBQVosQ0FBZSxPQUFmLEVBQXdCLGlCQUF4QixFQUEyQyxVQUFVM0MsQ0FBVixFQUFhO0FBQ3BEYSxZQUFRZixFQUFFLElBQUYsQ0FBUjtBQUNBLFFBQUlnRSxLQUFLakQsTUFBTVAsSUFBTixDQUFXLFNBQVgsQ0FBVDtBQUNBLFFBQUltRSxjQUFjNUQsTUFBTVAsSUFBTixDQUFXLGtCQUFYLENBQWxCO0FBQ0EsUUFBSWdELFFBQVF6QyxNQUFNUCxJQUFOLENBQVcsWUFBWCxJQUEyQk8sTUFBTVAsSUFBTixDQUFXLFlBQVgsQ0FBM0IsR0FBc0QsVUFBbEU7QUFDQSxRQUFJd0QsTUFBTSxFQUFWLEVBQWM7QUFDVkEsYUFBS2hFLEVBQUUsV0FBVzJFLFdBQVgsR0FBeUIsR0FBM0IsRUFBZ0NoQyxHQUFoQyxFQUFMO0FBQ0EsWUFBSXFCLE1BQU0sQ0FBVixFQUFhLE9BQU8sS0FBUDtBQUNoQjs7QUFFRGhFLE1BQUVxRCxJQUFGLENBQU87QUFDSHJCLGFBQUssZUFERjtBQUVIZixjQUFNLE1BRkg7QUFHSGtDLGNBQU07QUFDRnhCLG1CQUFPWixNQUFNUCxJQUFOLENBQVcsWUFBWCxDQURMO0FBRUZ3RCxnQkFBSUEsRUFGRjtBQUdGWSxrQkFBTTdELE1BQU1QLElBQU4sQ0FBVyxXQUFYLENBSEo7QUFJRm1FLHlCQUFhNUQsTUFBTVAsSUFBTixDQUFXLGtCQUFYLENBSlg7QUFLRnFFLGtCQUFNOUQsTUFBTVAsSUFBTixDQUFXLFdBQVgsQ0FMSjtBQU1Gc0Usb0JBQVEvRCxNQUFNUCxJQUFOLENBQVcsYUFBWCxDQU5OO0FBT0Z1RSxrQkFBTWhFLE1BQU1QLElBQU4sQ0FBVyxXQUFYLENBUEo7QUFRRndFLG1CQUFPakUsTUFBTVAsSUFBTixDQUFXLFlBQVgsQ0FSTDtBQVNGeUUsc0JBQVVsRSxNQUFNUCxJQUFOLENBQVcsZUFBWDtBQVRSLFNBSEg7QUFjSDhDLGtCQUFVLE1BZFA7QUFlSEMsaUJBQVMsaUJBQVVKLElBQVYsRUFBZ0I7QUFDckIsZ0JBQUlBLElBQUosRUFBVTtBQUNObkQsa0JBQUUsTUFBTXdELEtBQVIsRUFBZUEsS0FBZjtBQUNBeEQsa0JBQUUsbUJBQUYsRUFBdUJ5RCxJQUF2QixDQUE0Qk4sSUFBNUI7QUFDSDtBQUNKLFNBcEJFO0FBcUJIK0IsZUFBTyxlQUFVQyxNQUFWLEVBQWtCO0FBQ3JCM0Msb0JBQVFDLEdBQVIsQ0FBWTBDLE1BQVo7QUFDQUMsa0JBQU1ELE1BQU47QUFDSDtBQXhCRSxLQUFQO0FBMEJILENBcENEO0FBcUNBbkYsRUFBRTRDLFFBQUYsRUFBWUMsRUFBWixDQUFlLE9BQWYsRUFBd0IsdUJBQXhCLEVBQWlELFlBQVk7QUFDekQ5QixZQUFRZixFQUFFLElBQUYsQ0FBUjtBQUNBLFFBQUllLE1BQU1QLElBQU4sQ0FBVyxZQUFYLEtBQTRCTyxNQUFNUCxJQUFOLENBQVcsWUFBWCxLQUE0QixHQUE1RCxFQUFpRTs7QUFFN0QsWUFBSXdELEtBQUtqRCxNQUFNUCxJQUFOLENBQVcsU0FBWCxDQUFUO0FBQ0EsWUFBSTRELFNBQVNyRCxNQUFNUCxJQUFOLENBQVcsYUFBWCxJQUE0Qk8sTUFBTVAsSUFBTixDQUFXLGFBQVgsQ0FBNUIsR0FBd0QsSUFBckU7QUFDQVIsVUFBRXFELElBQUYsQ0FBTztBQUNIckIsaUJBQUssbUJBREY7QUFFSGYsa0JBQU0sTUFGSDtBQUdIa0Msa0JBQU07QUFDRnhCLHVCQUFPWixNQUFNUCxJQUFOLENBQVcsWUFBWCxDQURMO0FBRUZ3RCxvQkFBSUEsRUFGRjtBQUdGaUIsMEJBQVVsRSxNQUFNUCxJQUFOLENBQVcsZUFBWDtBQUhSLGFBSEg7QUFRSDhDLHNCQUFVLE1BUlA7QUFTSEMscUJBQVMsaUJBQVVKLElBQVYsRUFBZ0I7QUFDckIsb0JBQUlBLElBQUosRUFBVTtBQUNOLHdCQUFJLENBQUNBLEtBQUs4QixRQUFWLEVBQ0lqRixFQUFFLGNBQWNnRSxFQUFkLEdBQW1CLEdBQXJCLEVBQTBCSyxPQUExQixDQUFrQ0QsTUFBbEMsRUFBMENpQixNQUExQztBQUNKckYsc0JBQUUsV0FBRixFQUFld0QsS0FBZixDQUFxQixNQUFyQjtBQUNBUyw2QkFBUyxnQ0FBVDtBQUNIO0FBQ0o7O0FBaEJFLFNBQVA7QUFvQkgsS0F4QkQsTUF3Qk87O0FBRUgzRCxlQUFPRixpQkFBaUJXLE1BQU1QLElBQU4sQ0FBVyxXQUFYLENBQWpCLENBQVA7QUFDQUYsYUFBS2dGLE1BQUw7QUFDSDtBQUNKLENBL0JEOztBQWlDQXRGLEVBQUU0QyxRQUFGLEVBQVlDLEVBQVosQ0FBZSxPQUFmLEVBQXdCLG9CQUF4QixFQUE4QyxZQUFZO0FBQ3REOUIsWUFBUWYsRUFBRSxJQUFGLENBQVI7QUFDQSxRQUFJdUYsV0FBV3hFLE1BQU1QLElBQU4sQ0FBVyxTQUFYLENBQWY7QUFDQSxRQUFJZ0YsYUFBYXpFLE1BQU1QLElBQU4sQ0FBVyxpQkFBWCxJQUFnQ08sTUFBTVAsSUFBTixDQUFXLGlCQUFYLENBQWhDLEdBQWdFLE9BQWpGO0FBQ0EsUUFBSW1FLGNBQWM1RCxNQUFNUCxJQUFOLENBQVcsa0JBQVgsQ0FBbEI7QUFDQSxRQUFJaUYsWUFBWXpGLEVBQUV3RixhQUFhLFFBQWIsR0FBd0J6RSxNQUFNUCxJQUFOLENBQVcsV0FBWCxDQUF4QixHQUFrRCxHQUFwRCxFQUF5RG1DLEdBQXpELEVBQWhCO0FBQ0EsUUFBSThDLFNBQUosRUFBZTtBQUNYekYsVUFBRXFELElBQUYsQ0FBTztBQUNIckIsaUJBQUssb0JBREY7QUFFSGYsa0JBQU0sTUFGSDtBQUdIa0Msa0JBQU07QUFDRnhCLHVCQUFPWixNQUFNUCxJQUFOLENBQVcsWUFBWCxDQURMO0FBRUYrRSwwQkFBVUEsUUFGUjtBQUdGWiw2QkFBYTVELE1BQU1QLElBQU4sQ0FBVyxrQkFBWCxDQUhYO0FBSUZxRSxzQkFBTTlELE1BQU1QLElBQU4sQ0FBVyxXQUFYLENBSko7QUFLRmlGLDJCQUFXQTtBQUxULGFBSEg7QUFVSG5DLHNCQUFVLE1BVlA7QUFXSEMscUJBQVMsaUJBQVVKLElBQVYsRUFBZ0I7QUFDckIsb0JBQUlBLEtBQUtJLE9BQVQsRUFBa0I7QUFDZHZELHNCQUFFLFdBQUYsRUFBZXdELEtBQWYsQ0FBcUIsTUFBckI7QUFDQVMsNkJBQVMsd0JBQVQ7QUFDSDtBQUNKLGFBaEJFO0FBaUJIaUIsbUJBQU8sZUFBVS9CLElBQVYsRUFBZ0I7QUFDbkJPLHVCQUFPLHNCQUFQO0FBQ0g7O0FBbkJFLFNBQVA7QUFzQkgsS0F2QkQsTUF1Qk87QUFDSEEsZUFBTywwQkFBUDtBQUNIO0FBQ0osQ0FoQ0Q7QUFpQ0EsSUFBSWdDLGFBQWEsU0FBYkEsVUFBYSxHQUFZO0FBQ3pCMUYsTUFBRSxZQUFGLEVBQWdCYSxTQUFoQixDQUEwQjtBQUN0QixzQkFBYyxFQURRO0FBRXRCLHFCQUFhLEVBRlM7QUFHdEIsc0JBQWMsQ0FBQztBQUNYLHVCQUFXLGtCQURBO0FBRVgseUJBQWE7QUFGRixTQUFELENBSFE7QUFPdEI7QUFDQUMsa0JBQVU7QUFDTixtQkFBTztBQURELFNBUlk7QUFXdEIscUJBQWE7QUFYUyxLQUExQjtBQWFILENBZEQ7QUFlQSxJQUFJZCxFQUFFLFlBQUYsRUFBZ0JZLE1BQXBCLEVBQTRCO0FBQ3hCOEU7QUFFSDtBQUNELElBQUkxRixFQUFFLFVBQUYsRUFBY1ksTUFBbEIsRUFBMEI7QUFDdEJaLE1BQUUsVUFBRixFQUFjMkYsT0FBZDtBQUNIO0FBQ0QsSUFBSTNGLEVBQUUsYUFBRixFQUFpQlksTUFBckIsRUFBNkI7QUFDekJaLE1BQUUsYUFBRixFQUFpQjRGLFVBQWpCLENBQTRCO0FBQ3hCQyxvQkFBWTtBQURZLEtBQTVCO0FBR0g7O0FBRUQ7QUFDQTdGLEVBQUU0QyxRQUFGLEVBQVlDLEVBQVosQ0FBZSxPQUFmLEVBQXdCLFlBQXhCLEVBQXNDLFlBQVk7QUFDOUNpRCxlQUFXOUYsRUFBRSxzQkFBRixFQUEwQjJDLEdBQTFCLEVBQVg7QUFDQW9ELGVBQVcvRixFQUFFLHNCQUFGLEVBQTBCMkMsR0FBMUIsRUFBWDtBQUNBM0MsTUFBRSxzQkFBRixFQUEwQjJDLEdBQTFCLENBQThCb0QsUUFBOUI7QUFDQS9GLE1BQUUsc0JBQUYsRUFBMEIyQyxHQUExQixDQUE4Qm1ELFFBQTlCO0FBQ0gsQ0FMRDs7QUFPQSxTQUFTRSxPQUFULENBQWlCQyxFQUFqQixFQUFxQjtBQUNqQixRQUFJQSxLQUFLQSxPQUFPQyxTQUFQLEdBQW1CRCxFQUFuQixHQUF3QixLQUFqQztBQUNBakcsTUFBRSxNQUFNaUcsRUFBUixFQUFZeEMsSUFBWixDQUFpQiwyR0FBakI7QUFDQSxRQUFJMEMsUUFBUSxFQUFaO0FBQ0EsUUFBSW5HLEVBQUUsd0JBQUYsRUFBNEJZLE1BQWhDLEVBQXdDO0FBQ3BDWixVQUFFLGdDQUFGLEVBQW9Db0csSUFBcEMsQ0FBeUMsVUFBVUMsS0FBVixFQUFpQjtBQUN0REYsa0JBQU1HLElBQU4sQ0FBV3RHLEVBQUUsSUFBRixFQUFRMkMsR0FBUixFQUFYO0FBQ0gsU0FGRDtBQUdIO0FBQ0QsUUFBSW9CLFNBQVMvRCxFQUFFLHdCQUFGLEVBQTRCMkMsR0FBNUIsRUFBYjtBQUNBLFFBQUl3RCxNQUFNdkYsTUFBTixJQUFnQixDQUFoQixJQUFxQm1ELFVBQVUsRUFBbkMsRUFBdUM7QUFDbkMvRCxVQUFFLE1BQU1pRyxFQUFSLEVBQVl4QyxJQUFaLENBQWlCLDhHQUFqQjtBQUNBLGVBQU8sS0FBUDtBQUNIO0FBQ0R6RCxNQUFFcUQsSUFBRixDQUFPO0FBQ0hyQixhQUFLLG9CQURGO0FBRUhmLGNBQU0sTUFGSDtBQUdIa0MsY0FBTSxFQUFDZ0QsT0FBT0EsS0FBUixFQUFlcEMsUUFBUUEsTUFBdkIsRUFISDtBQUlIVCxrQkFBVSxNQUpQO0FBS0hDLGlCQUFTLGlCQUFVSixJQUFWLEVBQWdCO0FBQ3JCb0QsdUJBQVcsVUFBVXJHLENBQVYsRUFBYTtBQUNwQnNHLHdCQUFRckQsSUFBUixFQUFjOEMsRUFBZDtBQUNILGFBRkQsRUFFRyxJQUZIO0FBR0FRLDBCQUFjLElBQWQ7QUFDSDtBQVZFLEtBQVA7QUFZSDs7QUFFRCxJQUFJekcsRUFBRSx3QkFBRixFQUE0QlksTUFBaEMsRUFBd0M7QUFDcENaLE1BQUUsd0JBQUYsRUFBNEJpRCxLQUE1QixDQUFrQyxZQUFZO0FBQzFDK0M7QUFDSCxLQUZEO0FBR0g7QUFDRGhHLEVBQUUsd0JBQUYsRUFBNEI0RCxLQUE1QixDQUFrQyxZQUFZO0FBQzFDakIsVUFBTTNDLEVBQUUsSUFBRixFQUFRMkMsR0FBUixFQUFOO0FBQ0EsUUFBSUEsSUFBSS9CLE1BQUosR0FBYSxDQUFqQixFQUFvQjtBQUNoQm9GO0FBQ0g7QUFDSixDQUxEOztBQU9BaEcsRUFBRTRDLFFBQUYsRUFBWUMsRUFBWixDQUFlLE9BQWYsRUFBd0IsY0FBeEIsRUFBd0MsWUFBWTtBQUNoRDZELGVBQVcxRyxFQUFFLElBQUYsRUFBUVEsSUFBUixDQUFhLFdBQWIsQ0FBWDtBQUNBMkMsV0FBT25ELEVBQUUsTUFBTTBHLFFBQVIsRUFBa0J0RCxjQUFsQixFQUFQO0FBQ0FwRCxNQUFFcUQsSUFBRixDQUFPO0FBQ0hyQixhQUFLLHFCQURGO0FBRUhmLGNBQU0sTUFGSDtBQUdIa0MsY0FBTSxFQUFDQSxNQUFNQSxJQUFQLEVBSEg7QUFJSEcsa0JBQVUsTUFKUDtBQUtIQyxpQkFBUyxpQkFBVUosSUFBVixFQUFnQjtBQUNyQixnQkFBSUEsS0FBS0ksT0FBVCxFQUFrQjtBQUNkLG9CQUFJdkQsRUFBRSxpQkFBRixFQUFxQlksTUFBekIsRUFBaUM7QUFDN0JaLHNCQUFFLGlCQUFGLEVBQXFCa0UsSUFBckIsQ0FBMEIsZ0JBQWdCZixLQUFLYSxFQUFyQixHQUEwQixHQUFwRCxFQUF5RHFCLE1BQXpEO0FBQ0FyRixzQkFBRSxXQUFGLEVBQWV3RCxLQUFmLENBQXFCLE1BQXJCO0FBRUg7QUFDRFMseUJBQVMsbUNBQVQ7QUFDSDtBQUNKO0FBZEUsS0FBUDtBQWdCSCxDQW5CRDtBQW9CQWpFLEVBQUU0QyxRQUFGLEVBQVlDLEVBQVosQ0FBZSxPQUFmLEVBQXdCLFVBQXhCLEVBQW9DLFlBQVk7QUFDNUMsUUFBSW9ELEtBQUtqRyxFQUFFLElBQUYsRUFBUVEsSUFBUixDQUFhLFVBQWIsQ0FBVDs7QUFFQW1HLG1CQUFlM0csRUFBRSxvQ0FBRixFQUF3QzJDLEdBQXhDLEVBQWY7O0FBRUFtRCxlQUFXOUYsRUFBRSxzQkFBRixFQUEwQjJDLEdBQTFCLEVBQVg7QUFDQW9ELGVBQVcvRixFQUFFLHNCQUFGLEVBQTBCMkMsR0FBMUIsRUFBWDtBQUNBaUUsY0FBVSxPQUFWO0FBQ0EsWUFBUUQsWUFBUjtBQUNJLGFBQUssR0FBTDtBQUNJQyxzQkFBVWQsUUFBVjtBQUNBO0FBQ0osYUFBSyxHQUFMO0FBQ0ljLHNCQUFVYixRQUFWO0FBQ0E7O0FBRUosYUFBSyxHQUFMO0FBQ0lhLHNCQUFVZCxXQUFXLEdBQVgsR0FBaUJDLFFBQTNCO0FBQ0E7QUFWUjtBQVlBdkQsWUFBUUMsR0FBUixDQUFZa0UsWUFBWjtBQUNBbkUsWUFBUUMsR0FBUixDQUFZbUUsT0FBWjtBQUNBQyxzQkFBa0JELFVBQVUsR0FBVixHQUFnQjVHLEVBQUUsZ0JBQUYsRUFBb0IyQyxHQUFwQixFQUFoQixHQUE0QyxHQUE1QyxHQUFrRDNDLEVBQUUsbUJBQUYsRUFBdUIyQyxHQUF2QixFQUFwRTtBQUNBLFFBQUltRSxNQUFNLElBQUlDLE9BQU9DLElBQVAsQ0FBWUMsR0FBaEIsQ0FBb0JyRSxTQUFTc0UsY0FBVCxDQUF3QmpCLEVBQXhCLENBQXBCLEVBQWlEO0FBQ3ZEa0IsY0FBTSxFQURpRDtBQUV2REMsZ0JBQVEsRUFBQ0MsS0FBSyxTQUFOLEVBQWlCQyxLQUFLLFFBQXRCO0FBRitDLEtBQWpELENBQVY7QUFJQSxRQUFJQyxXQUFXLElBQUlSLE9BQU9DLElBQVAsQ0FBWVEsUUFBaEIsRUFBZjs7QUFFQUQsYUFBU0UsT0FBVCxDQUFpQixFQUFDLFdBQVdaLGVBQVosRUFBakIsRUFBK0MsVUFBVWEsT0FBVixFQUFtQnZDLE1BQW5CLEVBQTJCO0FBQ3RFLFlBQUlBLFdBQVcsSUFBZixFQUFxQjtBQUNqQjJCLGdCQUFJYSxTQUFKLENBQWNELFFBQVEsQ0FBUixFQUFXRSxRQUFYLENBQW9CQyxRQUFsQzs7QUFFQSxnQkFBSUMsU0FBUyxJQUFJZixPQUFPQyxJQUFQLENBQVllLE1BQWhCLENBQXVCO0FBQ2hDakIscUJBQUtBLEdBRDJCO0FBRWhDa0IsMEJBQVVOLFFBQVEsQ0FBUixFQUFXRSxRQUFYLENBQW9CQztBQUZFLGFBQXZCLENBQWI7QUFJQUcsdUJBQVdOLFFBQVEsQ0FBUixFQUFXRSxRQUFYLENBQW9CQyxRQUEvQjtBQUNBN0gsY0FBRSxzQkFBRixFQUEwQjJDLEdBQTFCLENBQThCcUYsU0FBU1gsR0FBdkM7QUFDQXJILGNBQUUsdUJBQUYsRUFBMkIyQyxHQUEzQixDQUErQnFGLFNBQVNWLEdBQXhDO0FBQ0F0SCxjQUFFLFlBQUYsRUFBZ0J1RSxJQUFoQjtBQUNBdkUsY0FBRSxjQUFGLEVBQWtCc0UsSUFBbEI7QUFDSCxTQVpELE1BWU87QUFDSHRFLGNBQUUsWUFBRixFQUFnQnNFLElBQWhCO0FBQ0F0RSxjQUFFLE1BQU1pRyxFQUFSLEVBQVl4QyxJQUFaLENBQWlCLEVBQWpCO0FBQ0F6RCxjQUFFLHNCQUFGLEVBQTBCMkMsR0FBMUIsQ0FBOEIsQ0FBOUI7QUFDQTNDLGNBQUUsdUJBQUYsRUFBMkIyQyxHQUEzQixDQUErQixDQUEvQjtBQUNBM0MsY0FBRSxjQUFGLEVBQWtCdUUsSUFBbEI7QUFDSDtBQUNKLEtBcEJEO0FBcUJILENBbEREOztBQW9EQTtBQUNBO0FBQ0EsSUFBSXZFLEVBQUUsZ0JBQUYsRUFBb0JZLE1BQXhCLEVBQWdDO0FBQzVCWixNQUFFLDhCQUFGLEVBQWtDaUksU0FBbEMsQ0FBNENqSSxFQUFFLG1CQUFGLEVBQXVCa0ksTUFBdkIsRUFBNUM7QUFDSDtBQUNEbEksRUFBRTRDLFFBQUYsRUFBWUMsRUFBWixDQUFlLE9BQWYsRUFBd0IsZUFBeEIsRUFBeUMsWUFBWTtBQUNqRHNGLG1CQUFlbkksRUFBRSxJQUFGLEVBQVFxRSxPQUFSLENBQWdCLFVBQWhCLENBQWY7O0FBRUEsUUFBSTFDLFFBQVF3RyxhQUFhM0gsSUFBYixDQUFrQixZQUFsQixDQUFaO0FBQ0EsUUFBSTRILFlBQVlELGFBQWEzSCxJQUFiLENBQWtCLGdCQUFsQixDQUFoQjtBQUNBLFFBQUl3RCxLQUFLaEUsRUFBRSxJQUFGLEVBQVFRLElBQVIsQ0FBYSxTQUFiLENBQVQ7QUFDQVIsTUFBRXFELElBQUYsQ0FBTztBQUNIckIsYUFBSyxvQkFERjtBQUVIZixjQUFNLE1BRkg7QUFHSGtDLGNBQU0sRUFBQ3hCLE9BQU9BLEtBQVIsRUFBZXlHLFdBQVdBLFNBQTFCLEVBQXFDcEUsSUFBSUEsRUFBekMsRUFISDtBQUlIVixrQkFBVSxNQUpQO0FBS0hDLGlCQUFTLGlCQUFVSixJQUFWLEVBQWdCO0FBQ3JCbkQsY0FBRSxXQUFGLEVBQWV3RCxLQUFmO0FBQ0F4RCxjQUFFLG1CQUFGLEVBQXVCeUQsSUFBdkIsQ0FBNEJOLElBQTVCO0FBQ0g7QUFSRSxLQUFQO0FBVUgsQ0FoQkQ7O0FBa0JBbkQsRUFBRTRDLFFBQUYsRUFBWXlGLEtBQVosQ0FBa0IsWUFBWTtBQUMxQnJJLE1BQUU0QyxRQUFGLEVBQVlLLEtBQVosQ0FBa0IsVUFBVXFGLEtBQVYsRUFBaUI7QUFDL0IsWUFBSUMsWUFBWXZJLEVBQUVzSSxNQUFNRSxNQUFSLENBQWhCO0FBQ0EsWUFBSUMsVUFBVXpJLEVBQUUsV0FBRixFQUFlMEksUUFBZixDQUF3QixhQUF4QixDQUFkO0FBQ0EsWUFBSUQsWUFBWSxJQUFaLElBQW9CLENBQUNGLFVBQVVsRSxPQUFWLENBQWtCLFdBQWxCLEVBQStCcUUsUUFBL0IsQ0FBd0MsaUJBQXhDLENBQXpCLEVBQXFGO0FBQ2pGMUksY0FBRSxrQkFBRixFQUFzQjJELFFBQXRCLENBQStCLE1BQS9CO0FBQ0g7QUFDSixLQU5EO0FBT0gsQ0FSRDtBQVNBM0QsRUFBRTRDLFFBQUYsRUFBWUMsRUFBWixDQUFlLE9BQWYsRUFBd0IsY0FBeEIsRUFBd0MsWUFBWTtBQUNoRCxRQUFJbEIsUUFBUTNCLEVBQUUsbUJBQUYsRUFBdUIyQyxHQUF2QixFQUFaO0FBQ0EsUUFBSXlGLFlBQVlwSSxFQUFFLHVCQUFGLEVBQTJCMkMsR0FBM0IsRUFBaEI7QUFDQSxRQUFJZ0csT0FBTzNJLEVBQUUsa0JBQUYsRUFBc0IyQyxHQUF0QixFQUFYO0FBQ0EzQyxNQUFFcUQsSUFBRixDQUFPO0FBQ0hyQixhQUFLLG1CQURGO0FBRUhmLGNBQU0sTUFGSDtBQUdIa0MsY0FBTSxFQUFDeEIsT0FBT0EsS0FBUixFQUFleUcsV0FBV0EsU0FBMUIsRUFBcUNPLE1BQU1BLElBQTNDLEVBSEg7QUFJSHJGLGtCQUFVLE1BSlA7QUFLSEMsaUJBQVMsaUJBQVVKLElBQVYsRUFBZ0I7QUFDckJuRCxjQUFFLGtCQUFGLEVBQXNCMkMsR0FBdEIsQ0FBMEIsRUFBMUI7QUFDQTNDLGNBQUUsbUJBQUYsRUFBdUJVLE1BQXZCLENBQThCeUMsSUFBOUI7QUFDQW5ELGNBQUUsOEJBQUYsRUFBa0NpSSxTQUFsQyxDQUE0Q2pJLEVBQUUsbUJBQUYsRUFBdUJrSSxNQUF2QixFQUE1QztBQUNIO0FBVEUsS0FBUDtBQVdILENBZkQ7O0FBaUJBO0FBQ0E7O0FBRUFsSSxFQUFFNEMsUUFBRixFQUFZQyxFQUFaLENBQWUsT0FBZixFQUF3QixhQUF4QixFQUF1QyxZQUFZO0FBQy9DLFFBQUkrRixPQUFPNUksRUFBRSxtQkFBRixFQUF1Qm9ELGNBQXZCLEVBQVg7QUFDQSxRQUFJWSxLQUFLaEUsRUFBRSx3QkFBRixFQUE0QjJDLEdBQTVCLEVBQVQ7QUFDQSxRQUFJa0csY0FBYzdJLEVBQUUsc0JBQUYsRUFBMEIyQyxHQUExQixFQUFsQjtBQUNBLFFBQUlzQyxXQUFXLENBQUMsQ0FBQ2pGLEVBQUUsSUFBRixFQUFRUSxJQUFSLENBQWEsZUFBYixDQUFqQjtBQUNBLFFBQUlSLEVBQUUsMkJBQUYsRUFBK0JZLE1BQS9CLElBQXlDLENBQTdDLEVBQWdEO0FBQzVDWixVQUFFLFdBQUYsRUFBZXNFLElBQWY7QUFDQSxlQUFPLEtBQVA7QUFDSCxLQUhELE1BR087QUFDSHRFLFVBQUUsV0FBRixFQUFldUUsSUFBZjtBQUNIOztBQUVEdkUsTUFBRXFELElBQUYsQ0FBTztBQUNIckIsYUFBSyxrQkFERjtBQUVIZixjQUFNLE1BRkg7QUFHSHFDLGtCQUFVLE1BSFA7QUFJSEgsY0FBTSxFQUFDeUYsTUFBTUEsSUFBUCxFQUFhNUUsSUFBSUEsRUFBakIsRUFBcUI2RSxhQUFhQSxXQUFsQyxFQUpIO0FBS0h0RixpQkFBUyxpQkFBVUosSUFBVixFQUFnQjtBQUNyQlgsb0JBQVFDLEdBQVIsQ0FBWVUsSUFBWjtBQUNBLGdCQUFJQSxLQUFLSSxPQUFULEVBQWtCO0FBQ2Qsb0JBQUksQ0FBQzBCLFFBQUwsRUFBZTtBQUNYakYsc0JBQUUsYUFBRixFQUFpQnVFLElBQWpCO0FBQ0F2RSxzQkFBRSxtQkFBRixFQUF1QnNFLElBQXZCO0FBQ0gsaUJBSEQsTUFHSztBQUNETCw2QkFBUyxzQkFBVDtBQUNIO0FBQ0RqRSxrQkFBRSxrQkFBRixFQUFzQnNFLElBQXRCO0FBQ0gsYUFSRCxNQVFPO0FBQ0h0RSxrQkFBRSxXQUFGLEVBQWVrQyxJQUFmLENBQW9CaUIsS0FBS2hDLE9BQXpCO0FBQ0FuQixrQkFBRSxXQUFGLEVBQWVzRSxJQUFmO0FBQ0g7QUFDSixTQW5CRTtBQW9CSFksZUFBTyxlQUFVNEQsR0FBVixFQUFlM0QsTUFBZixFQUF1QjtBQUMxQjNDLG9CQUFRQyxHQUFSLENBQVkwQyxNQUFaO0FBQ0F6QixtQkFBTyw0QkFBUDtBQUNIO0FBdkJFLEtBQVA7QUF5QkgsQ0FyQ0Q7QUFzQ0ExRCxFQUFFNEMsUUFBRixFQUFZQyxFQUFaLENBQWUsT0FBZixFQUF3QiwrQkFBeEIsRUFBeUQsWUFBWTtBQUNqRWtHLFVBQU0sRUFBTjtBQUNBLFFBQUkvSSxFQUFFLHVDQUFGLEVBQTJDWSxNQUEzQyxJQUFxRCxDQUF6RCxFQUNJWixFQUFFLGtCQUFGLEVBQXNCc0UsSUFBdEIsR0FESixLQUdJdEUsRUFBRSxrQkFBRixFQUFzQnVFLElBQXRCO0FBQ1AsQ0FORDtBQU9BdkUsRUFBRSxjQUFGLEVBQWtCaUQsS0FBbEIsQ0FBd0IsWUFBWTtBQUNoQzhGLFVBQU0sRUFBTjtBQUNBL0ksTUFBRSx1Q0FBRixFQUEyQ29HLElBQTNDLENBQWdELFlBQVk7QUFDeEQyQyxZQUFJekMsSUFBSixDQUFTdEcsRUFBRSxJQUFGLEVBQVEyQyxHQUFSLEVBQVQ7QUFDSCxLQUZEO0FBR0gsQ0FMRDtBQU1BM0MsRUFBRTRDLFFBQUYsRUFBWUMsRUFBWixDQUFlLE9BQWYsRUFBd0Isa0JBQXhCLEVBQTRDLFlBQVk7QUFDcEQsUUFBSW1CLEtBQUtoRSxFQUFFLHdCQUFGLEVBQTRCMkMsR0FBNUIsRUFBVDtBQUNBLFFBQUlrRyxjQUFjN0ksRUFBRSxzQkFBRixFQUEwQjJDLEdBQTFCLEVBQWxCO0FBQ0EsUUFBSXNDLFdBQVcsQ0FBQyxDQUFDakYsRUFBRSxJQUFGLEVBQVFRLElBQVIsQ0FBYSxlQUFiLENBQWpCO0FBQ0FSLE1BQUVxRCxJQUFGLENBQU87QUFDSHJCLGFBQUssdUJBREY7QUFFSGYsY0FBTSxNQUZIO0FBR0hxQyxrQkFBVSxNQUhQO0FBSUhILGNBQU0sRUFBQzBGLGFBQWFBLFdBQWQsRUFBMkI3RSxJQUFJQSxFQUEvQixFQUpIO0FBS0hULGlCQUFTLGlCQUFVSixJQUFWLEVBQWdCO0FBQ3JCLGdCQUFJQSxLQUFLSSxPQUFULEVBQWtCO0FBQ2Qsb0JBQUcsQ0FBQzBCLFFBQUosRUFBYztBQUNWakYsc0JBQUUsZ0JBQUYsRUFBb0JzRSxJQUFwQjtBQUNBdEUsc0JBQUUsa0JBQUYsRUFBc0J1RSxJQUF0QjtBQUNILGlCQUhELE1BR0s7QUFDRE4sNkJBQVMsZ0JBQVQ7QUFDSDtBQUNEO0FBQ0gsYUFSRCxNQVFPO0FBQ0hQLHVCQUFPUCxLQUFLaEMsT0FBWjtBQUNIO0FBQ0o7QUFqQkUsS0FBUDtBQW1CSCxDQXZCRDtBQXdCQW5CLEVBQUUsa0JBQUYsRUFBc0JpRCxLQUF0QixDQUE0QixZQUFZO0FBQ3BDakQsTUFBRXFELElBQUYsQ0FBTztBQUNIckIsYUFBSyw2QkFERjtBQUVIZixjQUFNLE1BRkg7QUFHSHFDLGtCQUFVLE1BSFA7QUFJSEMsaUJBQVMsaUJBQVVKLElBQVYsRUFBZ0I7QUFDckIsZ0JBQUlBLEtBQUtJLE9BQVQsRUFBa0I7QUFDZFUseUJBQVMsMkNBQVQ7QUFDSCxhQUZELE1BRU87QUFDSEEseUJBQVNkLEtBQUtoQyxPQUFkO0FBQ0g7QUFDSjtBQVZFLEtBQVA7QUFZSCxDQWJEOztBQWVBO0FBQ0E7OztBQUdBLFNBQVM2SCxXQUFULENBQXFCN0gsT0FBckIsRUFBOEI7QUFDMUJuQixNQUFFLGVBQUYsRUFBbUJpSixPQUFuQixDQUEyQjlILE9BQTNCO0FBQ0E7QUFDSDs7QUFFRG5CLEVBQUUsa0JBQUYsRUFBc0JrSixPQUF0QixDQUE4QixVQUFTWixLQUFULEVBQWdCO0FBQzFDO0FBQ0EsUUFBSUEsTUFBTW5JLE9BQU4sSUFBaUIsRUFBckIsRUFBeUI7QUFDckIsYUFBS0csSUFBTCxDQUFVZ0YsTUFBVjtBQUNBLGVBQU8sS0FBUDtBQUNIO0FBQ0osQ0FORDs7QUFVQSxTQUFTNkQsTUFBVCxDQUFnQkMsUUFBaEIsRUFBMEJwSCxHQUExQixFQUErQjtBQUMzQmhDLE1BQUUsZUFBRixFQUFtQnlELElBQW5CLENBQXdCLEVBQXhCO0FBQ0EsUUFBSTtBQUNBLFlBQUlxRixNQUFNLElBQUlPLGNBQUosRUFBVjtBQUNBUCxZQUFJUSxhQUFKLEdBQW9CLEVBQXBCO0FBQ0E7QUFDQVIsWUFBSVMsT0FBSixHQUFjLFVBQVVySixDQUFWLEVBQWE7QUFDdkI4SSx3QkFBWSx3QkFBd0I5SSxDQUFwQztBQUNILFNBRkQ7QUFHQTRJLFlBQUlVLFVBQUosR0FBaUIsWUFBWTtBQUN6QjVHLHFCQUFTc0UsY0FBVCxDQUF3QixhQUF4QixFQUF1Q3VDLFNBQXZDLEdBQW1ELE1BQW5EO0FBQ0gsU0FGRDs7QUFJQVgsWUFBSVksa0JBQUosR0FBeUIsWUFBWTtBQUNqQyxnQkFBSTtBQUNBLG9CQUFJWixJQUFJYSxVQUFKLEdBQWlCLENBQXJCLEVBQXdCOztBQUVwQix3QkFBSUMsZUFBZWQsSUFBSWUsWUFBSixDQUFpQkMsU0FBakIsQ0FBMkJoQixJQUFJUSxhQUFKLENBQWtCMUksTUFBN0MsQ0FBbkI7QUFDQSx3QkFBSW1KLFNBQVNDLEtBQUtDLEtBQUwsQ0FBV0wsWUFBWCxDQUFiOztBQUVBLHdCQUFJLENBQUNHLE9BQU81RSxNQUFaLEVBQW9CO0FBQ2hCNkQsb0NBQVllLE9BQU81SSxPQUFuQjtBQUNILHFCQUZELE1BRU87QUFDSHFCLGdDQUFRQyxHQUFSLENBQVlxRyxJQUFJYSxVQUFoQjtBQUNBWCxvQ0FBWWUsT0FBTzVJLE9BQW5CO0FBQ0E4QyxpQ0FBUyw2Q0FBVDtBQUNBc0MsbUNBQVcsWUFBWTtBQUNuQnNCLHFDQUFTcUMsTUFBVDtBQUNILHlCQUZELEVBRUcsSUFGSDtBQUdBO0FBRUg7O0FBRURwQix3QkFBSVEsYUFBSixHQUFvQlIsSUFBSWUsWUFBeEI7QUFDSCxpQkFuQkQsTUFtQk87QUFDSGIsZ0NBQVlGLElBQUllLFlBQWhCO0FBQ0g7QUFDRCxvQkFBSWYsSUFBSTNELE1BQUosSUFBYyxHQUFsQixFQUF1QjtBQUNuQjZELGdDQUFZLHNGQUFaO0FBQ0g7QUFFSixhQTNCRCxDQTRCQSxPQUFPOUksQ0FBUCxFQUFVO0FBQ047QUFDSDtBQUNKLFNBaENEO0FBaUNBNEksWUFBSXFCLE9BQUosR0FBYyxTQUFkO0FBQ0FyQixZQUFJc0IsU0FBSixHQUFnQixZQUFZO0FBQ3hCO0FBQ0gsU0FGRDtBQUdBdEIsWUFBSXVCLElBQUosQ0FBUyxNQUFULEVBQWlCckksR0FBakIsRUFBc0IsSUFBdEI7QUFDQThHLFlBQUl3QixnQkFBSixDQUFxQixrQkFBckIsRUFBeUMsZ0JBQXpDO0FBQ0F4QixZQUFJeUIsSUFBSixDQUFTbkIsUUFBVDtBQUNILEtBbkRELENBb0RBLE9BQU9sSixDQUFQLEVBQVU7QUFDTjhJLG9CQUFZLHlCQUF5QjlJLENBQXpCLEdBQTZCLE1BQXpDO0FBQ0g7QUFDSixDOzs7Ozs7QUNocUJELHlDIiwiZmlsZSI6Ii9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2YzhlNDNjNjA1NDBkM2VkNzcxNiIsIi8qKlxuICogRmlyc3Qgd2Ugd2lsbCBsb2FkIGFsbCBvZiB0aGlzIHByb2plY3QncyBKYXZhU2NyaXB0IGRlcGVuZGVuY2llcyB3aGljaFxuICogaW5jbHVkZXMgVnVlIGFuZCBvdGhlciBsaWJyYXJpZXMuIEl0IGlzIGEgZ3JlYXQgc3RhcnRpbmcgcG9pbnQgd2hlblxuICogYnVpbGRpbmcgcm9idXN0LCBwb3dlcmZ1bCB3ZWIgYXBwbGljYXRpb25zIHVzaW5nIFZ1ZSBhbmQgTGFyYXZlbC5cbiAqL1xuJCgnaHRtbCcpLmJpbmQoJ2tleXByZXNzJywgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS5rZXlDb2RlID09IDEzKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59KTtcbnZhciBjcmVhdGVGb3JtRGVsZXRlID0gZnVuY3Rpb24gKGxpbmspIHtcbiAgICB2YXIgZm9ybSA9ICQoJzxmb3JtPicsIHsnbWV0aG9kJzogJ1BPU1QnLCAnYWN0aW9uJzogbGlua30pO1xuICAgIHZhciB0b2tlbiA9ICQoJzxpbnB1dD4nLCB7J3R5cGUnOiAnaGlkZGVuJywgJ25hbWUnOiAnX3Rva2VuJywgJ3ZhbHVlJzogJCgnbWV0YVtuYW1lPWNzcmZfdG9rZW5dJykuYXR0cignY29udGVudCcpfSk7XG4gICAgdmFyIGhpZGRlbklucHV0ID0gJCgnPGlucHV0PicsIHsnbmFtZSc6ICdfbWV0aG9kJywgJ3R5cGUnOiAnaGlkZGVuJywgJ3ZhbHVlJzogJ0RFTEVURSd9KTtcbiAgICByZXR1cm4gZm9ybS5hcHBlbmQodG9rZW4sIGhpZGRlbklucHV0KS5hcHBlbmRUbygnYm9keScpO1xufVxuaWYgKCQoJy5kYXRhdGFibGUnKS5sZW5ndGgpIHtcbiAgICAkKCcuZGF0YXRhYmxlJykuZGF0YVRhYmxlKHtcbiAgICAgICAgXCJyZXNwb25zaXZlXCI6IHRydWUsXG4gICAgICAgIFwicGFnZUxlbmd0aFwiOiAyNSxcbiAgICAgICAgXCJhYVNvcnRpbmdcIjogW10sXG4gICAgICAgIFwiY29sdW1uRGVmc1wiOiBbe1xuICAgICAgICAgICAgXCJ0YXJnZXRzXCI6ICdzb3J0aW5nX2Rpc2FibGVkJyxcbiAgICAgICAgICAgIFwib3JkZXJhYmxlXCI6IGZhbHNlXG4gICAgICAgIH1dLFxuICAgICAgICBsYW5ndWFnZToge1xuICAgICAgICAgICAgXCJ1cmxcIjogXCJhc3NldHMvanMvcGx1Z2lucy9kYXRhdGFibGVzL2ZyLmpzb25cIlxuICAgICAgICB9LFxuICAgICAgICBcImF1dG9XaWR0aFwiOiB0cnVlLFxuICAgIH0pO1xufVxuXG4oZnVuY3Rpb24gKCkge1xuICAgIGlmICgkKCdbZGF0YS1hbGVydF0nKS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGJsb2NrID0gJCgnW2RhdGEtYWxlcnRdJyk7XG4gICAgICAgICQubmlmdHlOb3R5KHtcbiAgICAgICAgICAgIHR5cGU6IGJsb2NrLmF0dHIoJ2RhdGEtYWxlcnQnKSxcbiAgICAgICAgICAgIGljb246ICdwbGktY3Jvc3MgaWNvbi0yeCcsXG4gICAgICAgICAgICBtZXNzYWdlOiBibG9jay5hdHRyKCdkYXRhLWNvbnRlbnQnKSxcbiAgICAgICAgICAgIGNvbnRhaW5lcjogJ2Zsb2F0aW5nJyxcbiAgICAgICAgICAgIHRpbWVyOiAzMDAwXG4gICAgICAgIH0pO1xuICAgIH1cbn0pKCk7XG4kKCdbcmVsPXRvb2x0aXBdJykudG9vbHRpcCgpO1xuXG5mdW5jdGlvbiBYZWRpdGFibGUoKSB7XG4gICAgJCgnLmVkaXRhYmxlJykuZWRpdGFibGUoe1xuICAgICAgICBlbXB0eXRleHQ6IFwiVmlkZVwiLFxuICAgICAgICBwYXJhbXM6IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgICAgIHBhcmFtcy5tb2RlbCA9ICQodGhpcykuYXR0cignZGF0YS1tb2RlbCcpO1xuICAgICAgICAgICAgcGFyYW1zLmhhc29uZSA9ICQodGhpcykuYXR0cignZGF0YS1oYXNvbmUnKTtcbiAgICAgICAgICAgIHBhcmFtcy5mb3JlaWdua2V5ID0gJCh0aGlzKS5hdHRyKCdkYXRhLWZvcmVpZ25rZXknKTtcbiAgICAgICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgICAgIH0sXG4gICAgICAgIHNob3didXR0b25zOiAnYm90dG9tJyxcbiAgICAgICAgb25ibHVyOiAnaWdub3JlJyxcbiAgICAgICAgdXJsOiAnL2FqYXgvcXVpY2t1cGRhdGUnXG4gICAgfSk7XG59XG5cbmlmICgkKCcuZWRpdGFibGUnKS5sZW5ndGgpIHtcbiAgICBYZWRpdGFibGUoKTtcbn1cblxuXG5mdW5jdGlvbiBjb3VudExpbmUodGV4dCkge1xuICAgIHZhciBsaW5lcyA9IHRleHQuc3BsaXQoXCJcXG5cIik7XG4gICAgdmFyIGNvdW50ID0gMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBpZiAobGluZXNbaV0udHJpbSgpICE9IFwiXCIgJiYgbGluZXNbaV0udHJpbSgpICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxpbmVzW2ldKTtcbiAgICAgICAgICAgIGNvdW50ICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xufVxuXG4kKCd0ZXh0YXJlYVtuYW1lPXNlcmlhbG51bWJlcl0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgIHRleHQgPSAkKHRoaXMpLnZhbCgpO1xuICAgICQoJy5uYkxpYmVydHknKS50ZXh0KGNvdW50TGluZSh0ZXh0KSk7XG59KTtcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjYWxsY2hlY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgLy9wYXJlbnQgPSAkKHRoaXMpLnBhcmVudHMoJ3RhYmxlJyk7XG4gICAgZWwgPSAkKHRoaXMpO1xuICAgIGlmIChlbC5pcyhcIjpjaGVja2VkXCIpKSB7XG4gICAgICAgICQoJ2lucHV0W25hbWVePWNoZWNrXScpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKVxuICAgIH0gZWxzZSB7XG4gICAgICAgICQoJ2lucHV0W25hbWVePWNoZWNrXScpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSlcbiAgICB9XG59KVxuJCgnLmRlbGFsbGNoZWNrJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKCQoJ2lucHV0W25hbWVePWNoZWNrXTpjaGVja2VkJykubGVuZ3RoKSB7XG4gICAgICAgIHZhciBkYXRhID0gJCgnaW5wdXRbbmFtZV49Y2hlY2tdOmNoZWNrZWQnKS5zZXJpYWxpemVBcnJheSgpO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiAnL2FqYXgvZGVsYWxsY2hlY2snLFxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnaHRtbCcsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICQoJyNsZ19tb2RhbCcpLm1vZGFsKCk7XG4gICAgICAgICAgICAgICAgJCgnLmNvbnRlbnRfbGdfbW9kYWwnKS5odG1sKGRhdGEpO1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBlcnJvclMoJ1ZldWlsbGV6IGNob2lzaXIgZGVzIMOpbMOpbWVudHMgw6Agc3VwcHJpbWVyJyk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogU0VBUkNIXG4gKi9cbiQoJ2lucHV0W25hbWU9c2VhcmNoYWxsXScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgIGlmICh2YWwubGVuZ3RoID4gMikge1xuICAgICAgICAkKCcucmVzdWx0X3NlYXJjaCcpLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgfVxufSk7XG4kKCdpbnB1dFtuYW1lPXNlYXJjaGFsbF0nKS5rZXl1cChmdW5jdGlvbiAoKSB7XG4gICAgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICBzZWxmID0gdGhpcztcbiAgICBpZiAodmFsLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgJCgnLnNlYXJjaF9jdXJyZW50JykudGV4dCh2YWwpO1xuICAgICAgICBzZWFyY2hBbGwoc2VsZik7XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIHNlYXJjaEFsbChlKSB7XG4gICAgdmFyIHNlYXJjaCA9ICQoZSkudmFsKCk7XG4gICAgJCgnLnJlc3VsdF9zZWFyY2gnKS5jb2xsYXBzZSgpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hamF4L3NlYXJjaGFsbCcsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YVR5cGU6ICdodG1sJyxcbiAgICAgICAgZGF0YToge3NlYXJjaDogc2VhcmNofSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICQoJy5zZWFyY2hfY29udGVudCcpLmh0bWwoZGF0YSk7XG5cbiAgICAgICAgfVxuICAgIH0pXG59XG5cbiQoJyNjbG9zZV9zZWFyY2gnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJCgnLnJlc3VsdF9zZWFyY2gnKS5jb2xsYXBzZShcImhpZGVcIik7XG59KTtcblxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5mYV9mbGFzaCcsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaWQgPSAkKCdpbnB1dFtuYW1lPW5vdGlmaWNhdGlvbl9pZF0nKS52YWwoKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hamF4L25vdGlmaWNhdGlvbicsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgZGF0YToge2lkOiBpZH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBzdWNjZXNzUygnTGVjdHVyZSBkZSBsYSBub3RpZmljYXRpb24gcHJpc2UgZW4gY29tcHRlJyk7XG4gICAgICAgICAgICAkKCcubm90aWZpY2F0aW9uJykuZmluZCgnYScpLnJlbW92ZUNsYXNzKCdmYV9mbGFzaCcpO1xuICAgICAgICB9XG4gICAgfSlcbn0pO1xuXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLm1vcmVSZXN1bHQnLCBmdW5jdGlvbiAoKSB7XG4gICAgcGFyZW50ID0gJCh0aGlzKS5wYXJlbnRzKCdbZGF0YS1zZWFyY2hdJyk7XG4gICAgcGFyZW50LmZpbmQoJ2xpJykuc2hvdygpO1xuICAgIHBhcmVudC5maW5kKCcubW9yZVJlc3VsdCcpLmhpZGUoKTtcbn0pO1xuXG4vKipcbiAqIEZJTiBTRUFSQ0hcbiAqL1xuLyoqXG4gKiBGYWN0dXJlXG4gKi9cbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuc2hvd01hbnVhbFBhaWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5wcmV2KCkuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAkKCcubWFudWFsX3BheWUnKS5zaG93KCk7XG59KTtcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcudmFsaWRNYW51YWxQYWlkJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIGRhdGUgPSAkKCdpbnB1dFtuYW1lPWRhdGVfcGFpZW1lbnRdJykudmFsKCk7XG4gICAgdmFyIHJlZl9kb2N1bWVudCA9ICQoJ2lucHV0W25hbWU9cmVmX2RvY3VtZW50XScpLnZhbCgpO1xuICAgIGlmIChkYXRlID09ICcnKSB7XG4gICAgICAgIGVycm9yUygnVmV1aWxsZXogaW5kaXF1ZXIgdW5lIGRhdGUgZGUgcGFpZW1lbnQnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYWpheC9tYW51YWxwYXllZmFjdHVyZScsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge3JlZl9kb2N1bWVudDogcmVmX2RvY3VtZW50LCBkYXRlOiBkYXRlfSxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAkKCcuYmxvY2tQYWlkJykuaHRtbCgnIDx0ZCBjbGFzcz1cInRleHQtcmlnaHQgZm9udC1zbSBib2xkXCI+RGF0ZSBkZSBwYWllbWVudDwvdGQ+JyArXG4gICAgICAgICAgICAgICAgICAgICc8dGQ+PHNwYW4gY2xhc3M9XCJib2xkXCI+JyArIGRhdGUgKyAnPC9zcGFuPjxiciAvPicgK1xuICAgICAgICAgICAgICAgICAgICAnPGxhYmVsIGNsYXNzPVwibGFiZWwgbGFiZWwtc3VjY2Vzc1wiPlBBWUVFPC9sYWJlbD48L3RkPicpO1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3NTKCdGYWN0dXJlIGTDqWNsYXLDqWUgY29tbWUgcGF5w6llJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfSk7XG59KVxuXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnW2RhdGEtdHlwZT1leWVdJywgZnVuY3Rpb24gKGUpIHtcbiAgICBibG9jayA9ICQodGhpcyk7XG4gICAgdmFyIGlkID0gYmxvY2suYXR0cignZGF0YS1pZCcpO1xuICAgIHZhciBwcmltYXJ5X2NvbCA9IGJsb2NrLmF0dHIoJ2RhdGEtcHJpbWFyeV9jb2wnKTtcbiAgICB2YXIgbW9kYWwgPSBibG9jay5hdHRyKCdkYXRhLW1vZGFsJykgPyBibG9jay5hdHRyKCdkYXRhLW1vZGFsJykgOiAnbGdfbW9kYWwnO1xuICAgIGlmIChpZCA9PSAnJykge1xuICAgICAgICBpZCA9ICQoJ1tuYW1lPScgKyBwcmltYXJ5X2NvbCArICddJykudmFsKCk7XG4gICAgICAgIGlmIChpZCA9PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FqYXgvZXlldmlldycsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgbW9kZWw6IGJsb2NrLmF0dHIoJ2RhdGEtbW9kZWwnKSxcbiAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgIHZpZXc6IGJsb2NrLmF0dHIoJ2RhdGEtdmlldycpLFxuICAgICAgICAgICAgcHJpbWFyeV9jb2w6IGJsb2NrLmF0dHIoJ2RhdGEtcHJpbWFyeV9jb2wnKSxcbiAgICAgICAgICAgIG5hbWU6IGJsb2NrLmF0dHIoJ2RhdGEtbmFtZScpLFxuICAgICAgICAgICAgbWV0aG9kOiBibG9jay5hdHRyKCdkYXRhLW1ldGhvZCcpLFxuICAgICAgICAgICAgaHJlZjogYmxvY2suYXR0cignZGF0YS1ocmVmJyksXG4gICAgICAgICAgICBhc3luYzogYmxvY2suYXR0cignZGF0YS1hc3luYycpLFxuICAgICAgICAgICAgbm9kZWxldGU6IGJsb2NrLmF0dHIoJ2RhdGEtbm9kZWxldGUnKSxcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YVR5cGU6ICdodG1sJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgJCgnIycgKyBtb2RhbCkubW9kYWwoKTtcbiAgICAgICAgICAgICAgICAkKCcuY29udGVudF9sZ19tb2RhbCcpLmh0bWwoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoc3RhdHVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdGF0dXMpO1xuICAgICAgICAgICAgYWxlcnQoc3RhdHVzKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnW2RhdGEtY29uZmlybT1kZWxldGVdJywgZnVuY3Rpb24gKCkge1xuICAgIGJsb2NrID0gJCh0aGlzKTtcbiAgICBpZiAoYmxvY2suYXR0cignZGF0YS1hc3luYycpICYmIGJsb2NrLmF0dHIoJ2RhdGEtYXN5bmMnKSA9PSAnMScpIHtcblxuICAgICAgICB2YXIgaWQgPSBibG9jay5hdHRyKCdkYXRhLWlkJyk7XG4gICAgICAgIHZhciBwYXJlbnQgPSBibG9jay5hdHRyKCdkYXRhLXBhcmVudCcpID8gYmxvY2suYXR0cignZGF0YS1wYXJlbnQnKSA6ICd0cic7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvYWpheC9kZWxldGVhc3luYycsXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbW9kZWw6IGJsb2NrLmF0dHIoJ2RhdGEtbW9kZWwnKSxcbiAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgbm9kZWxldGU6IGJsb2NrLmF0dHIoJ2RhdGEtbm9kZWxldGUnKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2h0bWwnLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEubm9kZWxldGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCdbZGF0YS1pZD0nICsgaWQgKyAnXScpLnBhcmVudHMocGFyZW50KS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnI2xnX21vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc1MoJ0VsZW1lbnQgc3VwcHJpbcOpIGF2ZWMgc3VjY8OocyAhJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgZm9ybSA9IGNyZWF0ZUZvcm1EZWxldGUoYmxvY2suYXR0cignZGF0YS1ocmVmJykpO1xuICAgICAgICBmb3JtLnN1Ym1pdCgpO1xuICAgIH1cbn0pO1xuXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnW2RhdGEtdHlwZT11cGRhdGVdJywgZnVuY3Rpb24gKCkge1xuICAgIGJsb2NrID0gJCh0aGlzKTtcbiAgICB2YXIgbW9kZWxfaWQgPSBibG9jay5hdHRyKCdkYXRhLWlkJyk7XG4gICAgdmFyIHR5cGVfaW5wdXQgPSBibG9jay5hdHRyKCdkYXRhLXR5cGVfaW5wdXQnKSA/IGJsb2NrLmF0dHIoJ2RhdGEtdHlwZV9pbnB1dCcpIDogJ2lucHV0JztcbiAgICB2YXIgcHJpbWFyeV9jb2wgPSBibG9jay5hdHRyKCdkYXRhLXByaW1hcnlfY29sJyk7XG4gICAgdmFyIHZhbF9pbnB1dCA9ICQodHlwZV9pbnB1dCArICdbbmFtZT0nICsgYmxvY2suYXR0cignZGF0YS1uYW1lJykgKyAnXScpLnZhbCgpO1xuICAgIGlmICh2YWxfaW5wdXQpIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogJy9hamF4L3VwZGF0ZV9tb2RlbCcsXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbW9kZWw6IGJsb2NrLmF0dHIoJ2RhdGEtbW9kZWwnKSxcbiAgICAgICAgICAgICAgICBtb2RlbF9pZDogbW9kZWxfaWQsXG4gICAgICAgICAgICAgICAgcHJpbWFyeV9jb2w6IGJsb2NrLmF0dHIoJ2RhdGEtcHJpbWFyeV9jb2wnKSxcbiAgICAgICAgICAgICAgICBuYW1lOiBibG9jay5hdHRyKCdkYXRhLW5hbWUnKSxcbiAgICAgICAgICAgICAgICB2YWxfaW5wdXQ6IHZhbF9pbnB1dFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnI2xnX21vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc1MoJ01vZGlmaWNhdGlvbiBlZmZlY3R1w6llJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGVycm9yUygnQ29udGFjdGVyIGxlIFN1cHBvcnQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBlcnJvclMoJ0F1Y3VuIMOpbMOpbWVudCBkaXNwb25pYmxlJyk7XG4gICAgfVxufSk7XG52YXIgZGF0YXRhYmxlTSA9IGZ1bmN0aW9uICgpIHtcbiAgICAkKCcuZGF0YVRhYmxlJykuZGF0YVRhYmxlKHtcbiAgICAgICAgXCJwYWdlTGVuZ3RoXCI6IDUwLFxuICAgICAgICBcImFhU29ydGluZ1wiOiBbXSxcbiAgICAgICAgXCJjb2x1bW5EZWZzXCI6IFt7XG4gICAgICAgICAgICBcInRhcmdldHNcIjogJ3NvcnRpbmdfZGlzYWJsZWQnLFxuICAgICAgICAgICAgXCJvcmRlcmFibGVcIjogZmFsc2VcbiAgICAgICAgfV0sXG4gICAgICAgIC8vb3JkZXI6IFtbMSwgXCJkZXNjXCJdXSxcbiAgICAgICAgbGFuZ3VhZ2U6IHtcbiAgICAgICAgICAgIFwidXJsXCI6IFwiL2Fzc2V0cy9qcy9wbHVnaW5zL2RhdGF0YWJsZXMvZnIuanNvblwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYXV0b1dpZHRoXCI6IGZhbHNlLFxuICAgIH0pO1xufVxuaWYgKCQoJy5kYXRhVGFibGUnKS5sZW5ndGgpIHtcbiAgICBkYXRhdGFibGVNKClcblxufVxuaWYgKCQoJy5zZWxlY3QyJykubGVuZ3RoKSB7XG4gICAgJCgnLnNlbGVjdDInKS5zZWxlY3QyKCk7XG59XG5pZiAoJCgnLmRhdGVwaWNrZXInKS5sZW5ndGgpIHtcbiAgICAkKCcuZGF0ZXBpY2tlcicpLmRhdGVwaWNrZXIoe1xuICAgICAgICBkYXRlRm9ybWF0OiAneXktbW0tZGQnXG4gICAgfSlcbn1cblxuLyoqTUFQUyoqL1xuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5pbnZBZHJlc3MnLCBmdW5jdGlvbiAoKSB7XG4gICAgYWRyZXNzZTEgPSAkKCdpbnB1dFtuYW1lPWFkcmVzc2UxXScpLnZhbCgpXG4gICAgYWRyZXNzZTIgPSAkKCdpbnB1dFtuYW1lPWFkcmVzc2UyXScpLnZhbCgpO1xuICAgICQoJ2lucHV0W25hbWU9YWRyZXNzZTFdJykudmFsKGFkcmVzc2UyKTtcbiAgICAkKCdpbnB1dFtuYW1lPWFkcmVzc2UyXScpLnZhbChhZHJlc3NlMSk7XG59KTtcblxuZnVuY3Rpb24gc2hvd01hcChJRCkge1xuICAgIHZhciBJRCA9IElEICE9PSB1bmRlZmluZWQgPyBJRCA6ICdtYXAnO1xuICAgICQoJyMnICsgSUQpLmh0bWwoJzxwIGNsYXNzPVwidGV4dC1zZW1pYm9sZCB0ZXh0LW1haW4gdGV4dC1sZ1wiIHN0eWxlPVwibWFyZ2luOiAxMDBweCAwcHhcIj5DYXJ0ZSBlbiBjb3VycyBkZSBjb250cnVjdGlvbi4uLjwvcD4nKTtcbiAgICB2YXIgdHlwZXMgPSBbXTtcbiAgICBpZiAoJCgnaW5wdXRbbmFtZV49dHlwZXNfbWFwXScpLmxlbmd0aCkge1xuICAgICAgICAkKCdpbnB1dFtuYW1lXj10eXBlc19tYXBdOmNoZWNrZWQnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgdHlwZXMucHVzaCgkKHRoaXMpLnZhbCgpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBzZWFyY2ggPSAkKCdpbnB1dFtuYW1lPXNlYXJjaF9tYXBdJykudmFsKCk7XG4gICAgaWYgKHR5cGVzLmxlbmd0aCA9PSAwICYmIHNlYXJjaCA9PSAnJykge1xuICAgICAgICAkKCcjJyArIElEKS5odG1sKCc8cCBjbGFzcz1cInRleHQtc2VtaWJvbGQgdGV4dC1tYWluIHRleHQtbGdcIiBzdHlsZT1cIm1hcmdpbjogMTAwcHggMHB4XCI+VmV1aWxsZXogY2hvaXNpciB1biB0eXBlIGRlIHNvY2nDqXTDqTwvcD4nKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFwiL2FqYXgvc29jaWV0ZV9tYXBzXCIsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge3R5cGVzOiB0eXBlcywgc2VhcmNoOiBzZWFyY2h9LFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGluaXRNYXAoZGF0YSwgSUQpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICBpbml0TWFwSHRtbCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5pZiAoJCgnaW5wdXRbbmFtZV49dHlwZXNfbWFwXScpLmxlbmd0aCkge1xuICAgICQoJ2lucHV0W25hbWVePXR5cGVzX21hcF0nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNob3dNYXAoKTtcbiAgICB9KTtcbn1cbiQoJ2lucHV0W25hbWU9c2VhcmNoX21hcF0nKS5rZXl1cChmdW5jdGlvbiAoKSB7XG4gICAgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICBpZiAodmFsLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgc2hvd01hcCgpO1xuICAgIH1cbn0pO1xuXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnZhbGlkQWRyZXNzJywgZnVuY3Rpb24gKCkge1xuICAgIG5hbWVGb3JtID0gJCh0aGlzKS5hdHRyKCdkYXRhLWZvcm0nKTtcbiAgICBkYXRhID0gJCgnIycgKyBuYW1lRm9ybSkuc2VyaWFsaXplQXJyYXkoKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFwiL2FqYXgvdXBkYXRlc29jaWV0ZVwiLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHtkYXRhOiBkYXRhfSxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoJCgnLnRhYmxlRXJyb3JNYXBzJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy50YWJsZUVycm9yTWFwcycpLmZpbmQoJ3RyW2RhdGEtaWQ9JyArIGRhdGEuaWQgKyAnXScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcjbGdfbW9kYWwnKS5tb2RhbCgnaGlkZScpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NTKCdTb2Npw6l0w6kgbWlzZSDDoCBqb3VyIGF2ZWMgc3VjY8OocyAhJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufSk7XG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnRlc3RNYXAnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIElEID0gJCh0aGlzKS5hdHRyKCdkYXRhLW1hcCcpO1xuXG4gICAgc3dpdGNoQWRyZXNzID0gJCgnaW5wdXRbbmFtZT1zd2l0Y2hfYWRyZXNzZV06Y2hlY2tlZCcpLnZhbCgpO1xuXG4gICAgYWRyZXNzZTEgPSAkKCdpbnB1dFtuYW1lPWFkcmVzc2UxXScpLnZhbCgpXG4gICAgYWRyZXNzZTIgPSAkKCdpbnB1dFtuYW1lPWFkcmVzc2UyXScpLnZhbCgpXG4gICAgYWRyZXNzZSA9ICdueW9ucyc7XG4gICAgc3dpdGNoIChzd2l0Y2hBZHJlc3MpIHtcbiAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgICBhZHJlc3NlID0gYWRyZXNzZTE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgICBhZHJlc3NlID0gYWRyZXNzZTI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICczJzpcbiAgICAgICAgICAgIGFkcmVzc2UgPSBhZHJlc3NlMSArICcgJyArIGFkcmVzc2UyO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHN3aXRjaEFkcmVzcyk7XG4gICAgY29uc29sZS5sb2coYWRyZXNzZSk7XG4gICAgYWRyZXNzZUNvbXBsZXRlID0gYWRyZXNzZSArICcgJyArICQoJ2lucHV0W25hbWU9Y3BdJykudmFsKCkgKyAnICcgKyAkKCdpbnB1dFtuYW1lPXZpbGxlXScpLnZhbCgpO1xuICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKElEKSwge1xuICAgICAgICB6b29tOiAxMCxcbiAgICAgICAgY2VudGVyOiB7bGF0OiA0Ni4xOTE2NDQsIGxuZzogNS4zMjI2NjZ9XG4gICAgfSk7XG4gICAgdmFyIGdlb2NvZGVyID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyKCk7XG5cbiAgICBnZW9jb2Rlci5nZW9jb2RlKHsnYWRkcmVzcyc6IGFkcmVzc2VDb21wbGV0ZX0sIGZ1bmN0aW9uIChyZXN1bHRzLCBzdGF0dXMpIHtcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ09LJykge1xuICAgICAgICAgICAgbWFwLnNldENlbnRlcihyZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uKTtcblxuICAgICAgICAgICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICAgICAgICAgIG1hcDogbWFwLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiByZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IHJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb247XG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPWxhdGl0dWRlXScpLnZhbChwb3NpdGlvbi5sYXQpO1xuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1sb25naXR1ZGVdJykudmFsKHBvc2l0aW9uLmxuZyk7XG4gICAgICAgICAgICAkKCcubm9BZGRyZXNzJykuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLnZhbGlkQWRyZXNzJykuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLm5vQWRkcmVzcycpLnNob3coKTtcbiAgICAgICAgICAgICQoJyMnICsgSUQpLmh0bWwoJycpO1xuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1sYXRpdHVkZV0nKS52YWwoMCk7XG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPWxvbmdpdHVkZV0nKS52YWwoMCk7XG4gICAgICAgICAgICAkKCcudmFsaWRBZHJlc3MnKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG4vKiogRU5EIE1BUFMgKiovXG4vKiogUmVtYXJxdWUgKiovXG5pZiAoJCgnLmxpc3RSZW1hcnF1ZXMnKS5sZW5ndGgpIHtcbiAgICAkKCcubGlzdFJlbWFycXVlcyAubmFuby1jb250ZW50Jykuc2Nyb2xsVG9wKCQoJy5saXN0UmVtYXJxdWVzIHVsJykuaGVpZ2h0KCkpXG59XG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmVkaXRSZW1hcnF1ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBwYXJlbnRHbG9iYWwgPSAkKHRoaXMpLnBhcmVudHMoJ3JlbWFycXVlJyk7XG5cbiAgICB2YXIgbW9kZWwgPSBwYXJlbnRHbG9iYWwuYXR0cignZGF0YS1tb2RlbCcpO1xuICAgIHZhciBvYmplY3RfaWQgPSBwYXJlbnRHbG9iYWwuYXR0cignZGF0YS1vYmplY3RfaWQnKTtcbiAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFwiL2FqYXgvZWRpdHJlbWFycXVlXCIsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge21vZGVsOiBtb2RlbCwgb2JqZWN0X2lkOiBvYmplY3RfaWQsIGlkOiBpZH0sXG4gICAgICAgIGRhdGFUeXBlOiAnaHRtbCcsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAkKCcjbGdfbW9kYWwnKS5tb2RhbCgpO1xuICAgICAgICAgICAgJCgnLmNvbnRlbnRfbGdfbW9kYWwnKS5odG1sKGRhdGEpO1xuICAgICAgICB9XG4gICAgfSlcbn0pO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciBjbGlja292ZXIgPSAkKGV2ZW50LnRhcmdldCk7XG4gICAgICAgIHZhciBfb3BlbmVkID0gJChcIi5jb2xsYXBzZVwiKS5oYXNDbGFzcyhcImNvbGxhcHNlIGluXCIpO1xuICAgICAgICBpZiAoX29wZW5lZCA9PT0gdHJ1ZSAmJiAhY2xpY2tvdmVyLnBhcmVudHMoJy5jb2xsYXBzZScpLmhhc0NsYXNzKCdjb2xsYXBzZS10b2dnbGUnKSkge1xuICAgICAgICAgICAgJChcIi5jb2xsYXBzZS10b2dnbGVcIikuY29sbGFwc2UoJ2hpZGUnKVxuICAgICAgICB9XG4gICAgfSk7XG59KTtcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYWRkUmVtYXJxdWUnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG1vZGVsID0gJCgnaW5wdXRbbmFtZT1tb2RlbF0nKS52YWwoKTtcbiAgICB2YXIgb2JqZWN0X2lkID0gJCgnaW5wdXRbbmFtZT1vYmplY3RfaWRdJykudmFsKCk7XG4gICAgdmFyIGJvZHkgPSAkKCdpbnB1dFtuYW1lPWJvZHldJykudmFsKCk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBcIi9hamF4L2FkZHJlbWFycXVlXCIsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge21vZGVsOiBtb2RlbCwgb2JqZWN0X2lkOiBvYmplY3RfaWQsIGJvZHk6IGJvZHl9LFxuICAgICAgICBkYXRhVHlwZTogJ2h0bWwnLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1ib2R5XScpLnZhbCgnJyk7XG4gICAgICAgICAgICAkKCcubGlzdFJlbWFycXVlcyB1bCcpLmFwcGVuZChkYXRhKTtcbiAgICAgICAgICAgICQoJy5saXN0UmVtYXJxdWVzIC5uYW5vLWNvbnRlbnQnKS5zY3JvbGxUb3AoJCgnLmxpc3RSZW1hcnF1ZXMgdWwnKS5oZWlnaHQoKSlcbiAgICAgICAgfVxuICAgIH0pXG59KTtcblxuLyoqIEVORCBSZW1hcnF1ZSAqKi9cbi8qKiBBY2FkZW15ICoqL1xuXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmFkZEFjYWRlbXknLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRhZ3MgPSAkKCdpbnB1dFtuYW1lXj10YWdzXScpLnNlcmlhbGl6ZUFycmF5KCk7XG4gICAgdmFyIGlkID0gJCgnaW5wdXRbbmFtZT1jb250YWN0X2lkXScpLnZhbCgpO1xuICAgIHZhciBjb250YWN0c19pZCA9ICQoJ2lucHV0W25hbWU9Y29udGFjdHNdJykudmFsKCk7XG4gICAgdmFyIG5vZGVsZXRlID0gISEkKHRoaXMpLmF0dHIoJ2RhdGEtbm9kZWxldGUnKTtcbiAgICBpZiAoJCgnaW5wdXRbbmFtZV49dGFnc106Y2hlY2tlZCcpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICQoJy5lcnJvclRhZycpLnNob3coKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQoJy5lcnJvclRhZycpLmhpZGUoKTtcbiAgICB9XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYWpheC9hZGRhY2FkZW15JyxcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBkYXRhOiB7dGFnczogdGFncywgaWQ6IGlkLCBjb250YWN0c19pZDogY29udGFjdHNfaWR9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFub2RlbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuYWRkQWNhZGVteScpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmFjY291bnRBY2FkZW15T0snKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NTKCdDYXTDqWdvcmllcyByZW52b3nDqWVzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQoJy5zZW5kTWFpbEFjYWRlbXknKS5zaG93KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJy5lcnJvclRhZycpLnRleHQoZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAkKCcuZXJyb3JUYWcnKS5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0YXR1cyk7XG4gICAgICAgICAgICBlcnJvclMoJ1VuZSBlcnJldXIgc1xcJ2VzdCBwcm9kdWl0ZScpO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjQ29udGFjdCBpbnB1dFt0eXBlPWNoZWNrYm94XScsIGZ1bmN0aW9uICgpIHtcbiAgICBhcnIgPSBbXTtcbiAgICBpZiAoJCgnI0NvbnRhY3QgaW5wdXRbdHlwZT1jaGVja2JveF06Y2hlY2tlZCcpLmxlbmd0aCA+PSAxKVxuICAgICAgICAkKCcuc2V0dGluZ3NDb250YWN0Jykuc2hvdygpO1xuICAgIGVsc2VcbiAgICAgICAgJCgnLnNldHRpbmdzQ29udGFjdCcpLmhpZGUoKTtcbn0pO1xuJCgnLmFkZHNBY2FkZW15JykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGFyciA9IFtdO1xuICAgICQoJyNDb250YWN0IGlucHV0W3R5cGU9Y2hlY2tib3hdOmNoZWNrZWQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXJyLnB1c2goJCh0aGlzKS52YWwoKSk7XG4gICAgfSk7XG59KTtcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuc2VuZE1haWxBY2FkZW15JywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBpZCA9ICQoJ2lucHV0W25hbWU9Y29udGFjdF9pZF0nKS52YWwoKTtcbiAgICB2YXIgY29udGFjdHNfaWQgPSAkKCdpbnB1dFtuYW1lPWNvbnRhY3RzXScpLnZhbCgpO1xuICAgIHZhciBub2RlbGV0ZSA9ICEhJCh0aGlzKS5hdHRyKCdkYXRhLW5vZGVsZXRlJyk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FqYXgvc2VuZG1haWxhY2FkZW15JyxcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBkYXRhOiB7Y29udGFjdHNfaWQ6IGNvbnRhY3RzX2lkLCBpZDogaWR9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIGlmKCFub2RlbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc2VuZEFjYWRlbXlPSycpLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNlbmRNYWlsQWNhZGVteScpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc1MoJ01lc3NhZ2UgZW52b3nDqScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2xvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlcnJvclMoZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG4kKCcuc2NhbkNvbm5lY3Rpb25zJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hamF4L3NjYW5jb25uZWN0aW9uYWNhZGVteScsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzUygnU2NhbiBkZXMgZGVybmnDqHJlcyBjb25uZWN0aW9ucyBlZmZlY3R1w6llcycpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3NTKGRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG4vKiogRU5EIEFjYWRlbXkgKiovXG4vKipcbiAqIFN0cmVhbVxuICovXG5mdW5jdGlvbiBsb2dfbWVzc2FnZShtZXNzYWdlKSB7XG4gICAgJCgnI3Jlc3VsdFN0cmVhbScpLnByZXBlbmQobWVzc2FnZSk7XG4gICAgLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc3VsdFN0cmVhbVwiKS5pbm5lckhUTUwgKz0gbWVzc2FnZTtcbn1cblxuJCgnLnN1Ym1pdF9vbl9lbnRlcicpLmtleWRvd24oZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAvLyBlbnRlciBoYXMga2V5Q29kZSA9IDEzLCBjaGFuZ2UgaXQgaWYgeW91IHdhbnQgdG8gdXNlIGFub3RoZXIgYnV0dG9uXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gMTMpIHtcbiAgICAgICAgdGhpcy5mb3JtLnN1Ym1pdCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufSk7XG5cblxuXG5mdW5jdGlvbiBzdHJlYW0oZm9ybURhdGEsIHVybCkge1xuICAgICQoJyNyZXN1bHRTdHJlYW0nKS5odG1sKCcnKTtcbiAgICB0cnkge1xuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5wcmV2aW91c190ZXh0ID0gJyc7XG4gICAgICAgIC8veGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkgeyBsb2dfbWVzc2FnZShcIltYSFJdIERvbmUuIHJlc3BvbnNlVGV4dDogPGk+XCIgKyB4aHIucmVzcG9uc2VUZXh0ICsgXCI8L2k+XCIpOyB9O1xuICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBsb2dfbWVzc2FnZShcIltYSFJdIEZhdGFsIEVycm9yIDpcIiArIGUpO1xuICAgICAgICB9O1xuICAgICAgICB4aHIuYmVmb3JlU2VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nX21lc3NhZ2VcIikuaW5uZXJIVE1MID0gJ29wdWknXG4gICAgICAgIH1cblxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPiAyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld19yZXNwb25zZSA9IHhoci5yZXNwb25zZVRleHQuc3Vic3RyaW5nKHhoci5wcmV2aW91c190ZXh0Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBKU09OLnBhcnNlKG5ld19yZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dfbWVzc2FnZShyZXN1bHQubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh4aHIucmVhZHlTdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dfbWVzc2FnZShyZXN1bHQubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzUygnUHJvY2Vzc3VzIHRlcm1pbsOpLCByZWNoYXJnZW1lbnQgZW4gY291cnMuLi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjAwMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgeGhyLnByZXZpb3VzX3RleHQgPSB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ19tZXNzYWdlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PSA1MDApIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nX21lc3NhZ2UoJzxsaSBjbGFzcz1cInRleHQtZGFuZ2VyIHRleHQtYm9sZFwiPkVycmV1ciEgVmV1aWxsZXogdsOpcmlmaWVyIHZvdHJlIGNvbmZpZ3VyYXRpb248L2xpPicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAvL2xvZ19tZXNzYWdlKFwiPGI+W1hIUl0gRXhjZXB0aW9uOiBcIiArIGUgKyBcIjwvYj5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHhoci50aW1lb3V0ID0gMzAwMDAwMDAwO1xuICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy9sb2dfbWVzc2FnZSgnVGltZU91dCcpO1xuICAgICAgICB9XG4gICAgICAgIHhoci5vcGVuKFwiUE9TVFwiLCB1cmwsIHRydWUpO1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1SZXF1ZXN0ZWQtV2l0aCcsICdYTUxIdHRwUmVxdWVzdCcpO1xuICAgICAgICB4aHIuc2VuZChmb3JtRGF0YSk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGxvZ19tZXNzYWdlKFwiPGI+W1hIUl0gRXhjZXB0aW9uOiBcIiArIGUgKyBcIjwvYj5cIik7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvYXBwLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvc2Fzcy9hcHAuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9