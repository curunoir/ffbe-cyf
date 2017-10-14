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
var createFormDelete = function (link) {
    var form = $('<form>', {'method': 'POST', 'action': link});
    var token = $('<input>', {'type': 'hidden', 'name': '_token', 'value': $('meta[name=csrf_token]').attr('content')});
    var hiddenInput = $('<input>', {'name': '_method', 'type': 'hidden', 'value': 'DELETE'});
    return form.append(token, hiddenInput).appendTo('body');
}
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
        "autoWidth": true,
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
        params: function (params) {
            params.model = $(this).attr('data-model');
            params.hasone = $(this).attr('data-hasone');
            params.foreignkey = $(this).attr('data-foreignkey');
            return params;
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
        $('input[name^=check]').prop('checked', true)
    } else {
        $('input[name^=check]').prop('checked', false)
    }
})
$('.delallcheck').click(function (e) {
    e.preventDefault();
    if ($('input[name^=check]:checked').length) {
        var data = $('input[name^=check]:checked').serializeArray();
        $.ajax({
            url: '/ajax/delallcheck',
            type: 'POST',
            data: data,
            dataType: 'html',
            success: function (data) {
                $('#lg_modal').modal();
                $('.content_lg_modal').html(data);

            },
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
        data: {search: search},
        success: function (data) {
            $('.search_content').html(data);

        }
    })
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
        data: {id: id},
        success: function (data) {
            successS('Lecture de la notification prise en compte');
            $('.notification').find('a').removeClass('fa_flash');
        }
    })
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
        data: {ref_document: ref_document, date: date},
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                $('.blockPaid').html(' <td class="text-right font-sm bold">Date de paiement</td>' +
                    '<td><span class="bold">' + date + '</span><br />' +
                    '<label class="label label-success">PAYEE</label></td>');
                successS('Facture déclarée comme payée');
            }
        },
    });
})

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
            nodelete: block.attr('data-nodelete'),
        },
        dataType: 'html',
        success: function (data) {
            if (data) {
                $('#' + modal).modal();
                $('.content_lg_modal').html(data);
            }
        },
        error: function (status) {
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
                nodelete: block.attr('data-nodelete'),
            },
            dataType: 'html',
            success: function (data) {
                if (data) {
                    if (!data.nodelete)
                        $('[data-id=' + id + ']').parents(parent).remove();
                    $('#lg_modal').modal('hide');
                    successS('Element supprimé avec succès !');
                }
            },

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
            success: function (data) {
                if (data.success) {
                    $('#lg_modal').modal('hide');
                    successS('Modification effectuée');
                }
            },
            error: function (data) {
                errorS('Contacter le Support');
            }

        });
    } else {
        errorS('Aucun élément disponible');
    }
});
var datatableM = function () {
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
        "autoWidth": false,
    });
}
if ($('.dataTable').length) {
    datatableM()

}
if ($('.select2').length) {
    $('.select2').select2();
}
if ($('.datepicker').length) {
    $('.datepicker').datepicker({
        dateFormat: 'yy-mm-dd'
    })
}

/**MAPS**/
$(document).on('click', '.invAdress', function () {
    adresse1 = $('input[name=adresse1]').val()
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
        data: {types: types, search: search},
        dataType: 'json',
        success: function (data) {
            setTimeout(function (e) {
                initMap(data, ID);
            }, 1000);
            initMapHtml = true;
        }
    })
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
        data: {data: data},
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                if ($('.tableErrorMaps').length) {
                    $('.tableErrorMaps').find('tr[data-id=' + data.id + ']').remove();
                    $('#lg_modal').modal('hide');

                }
                successS('Société mise à jour avec succès !');
            }
        }
    })
});
$(document).on('click', '.testMap', function () {
    var ID = $(this).attr('data-map');

    switchAdress = $('input[name=switch_adresse]:checked').val();

    adresse1 = $('input[name=adresse1]').val()
    adresse2 = $('input[name=adresse2]').val()
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
        center: {lat: 46.191644, lng: 5.322666}
    });
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': adresseComplete}, function (results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);

            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
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
    $('.listRemarques .nano-content').scrollTop($('.listRemarques ul').height())
}
$(document).on('click', '.editRemarque', function () {
    parentGlobal = $(this).parents('remarque');

    var model = parentGlobal.attr('data-model');
    var object_id = parentGlobal.attr('data-object_id');
    var id = $(this).attr('data-id');
    $.ajax({
        url: "/ajax/editremarque",
        type: 'POST',
        data: {model: model, object_id: object_id, id: id},
        dataType: 'html',
        success: function (data) {
            $('#lg_modal').modal();
            $('.content_lg_modal').html(data);
        }
    })
});

$(document).ready(function () {
    $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".collapse").hasClass("collapse in");
        if (_opened === true && !clickover.parents('.collapse').hasClass('collapse-toggle')) {
            $(".collapse-toggle").collapse('hide')
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
        data: {model: model, object_id: object_id, body: body},
        dataType: 'html',
        success: function (data) {
            $('input[name=body]').val('');
            $('.listRemarques ul').append(data);
            $('.listRemarques .nano-content').scrollTop($('.listRemarques ul').height())
        }
    })
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
        data: {tags: tags, id: id, contacts_id: contacts_id},
        success: function (data) {
            console.log(data);
            if (data.success) {
                if (!nodelete) {
                    $('.addAcademy').hide();
                    $('.accountAcademyOK').show();
                }else{
                    successS('Catégories renvoyées');
                }
                $('.sendMailAcademy').show();
            } else {
                $('.errorTag').text(data.message);
                $('.errorTag').show();
            }
        },
        error: function (xhr, status) {
            console.log(status);
            errorS('Une erreur s\'est produite');
        }
    });
});
$(document).on('click', '#Contact input[type=checkbox]', function () {
    arr = [];
    if ($('#Contact input[type=checkbox]:checked').length >= 1)
        $('.settingsContact').show();
    else
        $('.settingsContact').hide();
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
        data: {contacts_id: contacts_id, id: id},
        success: function (data) {
            if (data.success) {
                if(!nodelete) {
                    $('.sendAcademyOK').show();
                    $('.sendMailAcademy').hide();
                }else{
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
        success: function (data) {
            if (data.success) {
                successS('Scan des dernières connections effectuées')
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

$('.submit_on_enter').keydown(function(event) {
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
            document.getElementById("log_message").innerHTML = 'opui'
        }

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
                        }, 2000)
                        return;

                    }

                    xhr.previous_text = xhr.responseText;
                } else {
                    log_message(xhr.responseText);
                }
                if (xhr.status == 500) {
                    log_message('<li class="text-danger text-bold">Erreur! Veuillez vérifier votre configuration</li>');
                }

            }
            catch (e) {
                //log_message("<b>[XHR] Exception: " + e + "</b>");
            }
        };
        xhr.timeout = 300000000;
        xhr.ontimeout = function () {
            //log_message('TimeOut');
        }
        xhr.open("POST", url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(formData);
    }
    catch (e) {
        log_message("<b>[XHR] Exception: " + e + "</b>");
    }
}