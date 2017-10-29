function request_modal(accid) {
    var modal = 'lg_modal';
    var html = '<article>';
    html += '   <div class="modal-header">';
    html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">';
    html += '            <i class="fa fa-times"></i>';
    html += '        </button>';
    html += '        <h4 class="modal-title " id="myModalLabel">Demande dami</h4>';
    html += '    </div>';
    html += '    <div class="modal-body modalwidgets" id="myModalContent">';
    html += '        <div>';
    html += '            <mark class="text-2x text-info">Vous pourrez voir son code ami et communiquer avec lui si il accepte.</mark>';
    html += '        </div>';
    html += '        <label for="message" class="col-sm-3 control-label">Message pour le joueur</label>';
    html += '        <textarea required="" class="form-control" name="message" cols="50" rows="10" id="request_message"></textarea>';
    html += '        <div class="text-center pad-top">';
    html += '            <button class="btn btn-info btn-labeled fa fa-thumb-up confirm_selected">Demander</button>';
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

function request_friend(accid) {
    var modal = 'lg_modal';
    request_modal(accid);
    $('#' + modal).modal();
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


    // $.post(prefix_ajax+"ajax/friends/request", { id : accid },
    //     function(returnedData){
    //         if(returnedData.status == 'OK')
    //             successS("Demande envoyée");
    //     })
    //
    // var modal = 'lg_modal';
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