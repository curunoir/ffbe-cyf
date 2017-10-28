


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

$(document).ready(function () {
    $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".collapse").hasClass("collapse in");
        if (_opened === true && !clickover.parents('.collapse').hasClass('collapse-toggle')) {
            $(".collapse-toggle").collapse('hide')
        }
    });
});

function request_friend(accid) {
    $.post(prefix_ajax+"ajax/friends/request", { id : accid },
        function(returnedData){
            if(returnedData.status == 'OK')
                successS("Demande envoyée");
        })
}