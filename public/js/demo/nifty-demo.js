// Nifty-demo.js
// ====================================================================
// Set user options for current page.
// This file is only used for demonstration purposes.
// ====================================================================
// - ThemeOn.net -




$(document).ready(function () {


    // SETTINGS WINDOW
    // =================================================================

    var demoSetBody         = $('#demo-set'),
        demoSetIcon         = $('#demo-set-icon'),
        demoSetBtnGo        = $('#demo-set-btngo'),
        niftyContainer      = $('#container'),
        niftyMainNav        = $('#mainnav-container'),
        niftyAside          = $('#aside-container');

    if (demoSetBody.length) {
        function InitializeSettingWindow(){

            // COLOR SCHEMES
            // =================================================================
            var themeBtn = $('.demo-theme'),
            changeTheme = function (themeName, type) {
                var themeCSS = $('#theme'),
                    fileext = '.min.css',
                    filename = 'css/themes/type-' + type + '/' + themeName + fileext;

                if (themeCSS.length) {
                    themeCSS.prop('href', filename);
                } else {
                    themeCSS = '<link id="theme" href="' + filename + '" rel="stylesheet">';
                    $('head').append(themeCSS);
                }
            };

            $('#demo-theme').on('click', '.demo-theme', function (e) {
                e.preventDefault();
                var el = $(this);
                if (el.hasClass('disabled')) {
                    return false;
                }
                changeTheme(el.attr('data-theme'), el.attr('data-type'));
                themeBtn.removeClass('disabled');
                el.addClass('disabled');
                return false;
            });
        }

        var demoSetBody = $('#demo-set-body'), demoSetBtn = $('#demo-set-btn');

        $('html').on('click', function (e) {
            if (demoSetBody.hasClass('in')) {
                if (!$(e.target).closest('#demo-set').length) {
                    demoSetBtn.trigger('click');
                }
            }
        });

        demoSetBtn.one('click', InitializeSettingWindow);

        $('#demo-btn-close-settings').on('click', function () {
            demoSetBtn.trigger('click')
        });


    };
});
