function attach_confirm_request(table){
    $('.confirm_send_request').off();
    $('.confirm_send_request').on('click', function() {
        $('#lg_modal').modal('hide');
        var message = $('#request_message').val();
        var accid = $(this).attr('data-id');
        var requester_account_id = $('select#requester_account_id').val();
        $.post(prefix_ajax+"ajax/requestfriend", { id : accid, message : message, requester_account_id : requester_account_id },
            function(returnedData){
                if(returnedData.status == 'OK') {
                    successS("Demande envoyée");
                    table.draw();
                }
                else
                    errorS(returnedData.status);
            })
    });
}

function request_friend(accid, name, table) {
    $.ajax({
        url: prefix_ajax + '/ajax/requestModal',
        type: 'POST',
        data: {
            'id' : accid,
            'name' : name
        },
        dataType: 'html',
        success: function (data) {
            if (data) {
                $('#lg_modal').modal();
                $('.content_lg_modal').html(data);
                $('#lg_modal').on('shown.bs.modal', function (e) {
                    attach_confirm_request(table);
                });
            }
        },
        error: function (status) {
            console.log(status);
            errorS("Erreur ajax/referenceproposalsdelete/modal : " + status);
        }
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



$(document).ready(function () {
    $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".collapse").hasClass("collapse in");
        if (_opened === true && !clickover.parents('.collapse').hasClass('collapse-toggle')) {
            $(".collapse-toggle").collapse('hide')
        }
    });

    if ($('.select2').length) {
        $('.select2').select2();
    }
    if ($('.datepicker').length) {
        $('.datepicker').datepicker({
            dateFormat: 'yy-mm-dd'
        })
    }

    $('.gochat').on('click', function (e) {
        var id = dataId(e);

    });

});