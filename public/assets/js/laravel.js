/**
 * Created by dlouvard_imac on 06/01/2017.
 */
function errorS(text) {
    $.niftyNoty({
        type: 'danger',
        icon: 'pli-cross icon-2x',
        message: text,
        container: 'floating',
        timer: 3000
    });

}

function successS(text) {
    $.niftyNoty({
        type: 'success',
        icon: 'pli-cross icon-2x',
        message: text,
        container: 'floating',
        timer: 3000
    });
}

function dataId(that) {
    return $(that.currentTarget).attr('data-id');
}

(function () {
    var laravel = {
        initialize: function () {
            this.methodLinks = $('a[data-method]');
            this.registerEvents();
        },

        registerEvents: function () {
            this.methodLinks.on('click', this.handleMethod);
        },

        handleMethod: function (e) {
            var link = $(this);
            var httpMethod = link.data('method').toUpperCase();
            var form;

            // If the data-method attribute is not PUT or DELETE,
            // then we don't know what to do. Just ignore.
            if ($.inArray(httpMethod, ['PUT', 'DELETE', 'POST']) === -1) {
                return;
            }

            // Allow user to optionally provide data-confirm="Are you sure?"
            if (link.data('confirm')) {

                $.SmartMessageBox({
                    //: "Confirmation ?",
                    title: link.data('confirm'),
                    buttons: '[No][Yes]'
                }, function (ButtonPressed) {
                    if (ButtonPressed === "Yes") {
                        form = laravel.createForm(link);
                        form.submit();
                    }
                    if (ButtonPressed === "No") {
                        $('.divMessageBox').remove();
                        return false
                    }

                });
            } else {
                form = laravel.createForm(link);
                form.submit();
            }
            e.preventDefault();
        },


        createForm: function (link) {
            var form =
                $('<form>', {
                    'method': 'POST',
                    'action': link.attr('href')
                });

            var token =
                $('<input>', {
                    'type': 'hidden',
                    'name': '_token',
                    'value': $('meta[name=csrf_token]').attr('content')
                });

            var hiddenInput =
                $('<input>', {
                    'name': '_method',
                    'type': 'hidden',
                    'value': link.data('method')
                });

            return form.append(token, hiddenInput)
                .appendTo('body');
        }
    };
    laravel.initialize();

})();
