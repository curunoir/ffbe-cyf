function request_modal(accid, ami) {
    var modal = 'lg_modal';
    var html = '<article>';
    html += '   <div class="modal-header bg-gray-light">';
    html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">';
    html += '            <i class="fa fa-times"></i>';
    html += '        </button>';
    html += '        <h4 class="modal-title " id="myModalLabel">Demande d\'ami à '+ami+'</h4>';
    html += '    </div>';
    html += '    <div class="modal-body modalwidgets bg-gray-light" id="myModalContent">';
    html += '        <div>';
    html += '            <mark class="text-info">Vous pourrez voir son code ami et communiquer avec lui si il accepte.</mark>';
    html += '        </div><hr />';
    html += '        <div><label for="message" class="col-sm-3 control-label">Message pour le joueur</label>';
    html += '        <textarea required="" class="form-control" name="message" cols="10" rows="4" id="request_message"></textarea></div>';
    html += '        <div class="text-center pad-top">';
    html += '            <button class="btn btn-primary btn-labeled text-bold confirm_send_request" data-id="'+accid+'"> Envoyer la requête  <i class="fa fa-question"> </i></button>';
    html += '        </div>';
    html += '    </div>';
    html += '    <div class="modal-footer clearfix">';
    html += '    <span class="btn btn-default pull-left" data-dismiss="modal">';
    html += '    Fermer';
    html += '    </span>';
    html += '    </div>';
    html += '</article>';
    $('.content_lg_modal').html(html);
}

function request_friend(accid, name) {
    var modal = 'lg_modal';
    request_modal(accid, name);
    $('#' + modal).modal();
    $('#' + modal).on('shown.bs.modal', function (e) {
        attach_confirm_request();
    });
}

function attach_confirm_request(){
    $('.confirm_send_request').off();
    $('.confirm_send_request').on('click', function() {
        $('#lg_modal').modal('hide');
        var message = $('#request_message').val();
        var accid = $(this).attr('data-id');
        $.post(prefix_ajax+"ajax/requestfriend", { id : accid, message : message },
            function(returnedData){
                if(returnedData.status == 'OK')
                    successS("Demande envoyée");
                else
                    errorS(returnedData.status);
            })
    });
}


$(document).ready(function () {
    $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".collapse").hasClass("collapse in");
        if (_opened === true && !clickover.parents('.collapse').hasClass('collapse-toggle')) {
            $(".collapse-toggle").collapse('hide')
        }
    });

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

});

// $.ajax({
//     url: prefix_ajax + "ajax/friends/request",
//     type: 'POST',
//     data: {
//         'id' : accid
//     },
//     dataType: 'html',
//     success: function (data) {
//         if (data) {
//             $('#' + modal).modal();
//
//         }
//     },
//     error: function (status) {
//         console.log(status);
//         errorS("Erreur ajax/supplyproposalsaccept/modal : " + status);
//     }