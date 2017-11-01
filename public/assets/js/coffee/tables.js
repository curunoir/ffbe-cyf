
function tables(options) {
    options.ajax = options.ajax === undefined ? options.route : options.ajax;
    options.prefill = options.prefill === undefined ? '' : options.prefill;
    options.colDESC = options.colDESC === undefined ? 0 : options.colDESC;
    options.typeOrderBY = options.typeOrderBY === undefined ? 'ASC' : options.typeOrderBY;
    options.heightMAX = options.heightMAX === undefined ? 310 : options.heightMAX;

    table_id = "#" + options.ID;
    table_class = "." + options.ID;
    var header = null;
    search = null;
    $.each(options.ColumnSetting, function (idt, column) {
        if (column.searchable == false) {
            search += "<th></th>";
        } else {
            search += '<th class="filtercell" resize="false">' +
                '<div class="dt_container">' +
                '<div class="dt_indicatorcontainer" style="display:none">' +
                '<a id="grid_table_dd_NEXTSTATUS_button" href="#" title="No filter applied">' +
                '<span class=""><i class="fa fa-angle-down" ></i></span></a>' +
                '</div>' +
                '<div class="dt_inputeditor">' +
                '<span data-filter-editor="true">' +
                '<input type="text" class="input_filter" placeholder="Contient..." role="textbox" style="height: 100%; text-align: left;">' +
                '<input type="hidden" value="" class="ui-iggrid-filtereditor"></span>' +
                '</div>' +
                '</div>';
            '</th>';

        }
        if (column.sum) {
            header += "<th class='sum'>" + column.trad + "</th>";
        } else if (column.allcheck) {
            header += "<th><input type='checkbox' value='1' id='allcheck' />" +
                "<label for='allcheck' class='control-label'></label></th>";
        } else {
            header += "<th>" + column.trad + "</th>";
        }
    });

    $('.tr_search_' + options.ID).html(search);
    $('.tr_header_' + options.ID).html(header);
    var scrollY = function () {
        if ($(document).height() - 400 > 400)
            res = $(document).height() - options.heightMAX;
        else
            res = 470;
        return res;
    }

    var table = $(table_id).DataTable({
        processing: true,
        serverSide: true,
        bAutoWidth: false,
        order: [[options.colDESC, options.typeOrderBY]],
        pageLength: 10,
        colReorder: false,
        responsive: true,
        scrollY: scrollY,
        sScrollX: "100%",
        deferRender: true,
        bAjaxDataGet: true,
        scroller: {
            loadingIndicator: true
        },

        language: {
            "url": options.frJSON
        },
        "ajax": options.ajax,
        search: {
            "search": options.prefill
        },
        processing: function (e, settings, processing) {

        },
        columns: options.ColumnSetting,
        drawCallback: function (settings) {
            $('a[data-toggle="tooltip"]').tooltip();
            $("[rel=tooltip]").tooltip({});
        },
    });

    $(table_id).on('processing.dt', function (e, settings, processing) {
        if (!processing) {
            $('[rel=popover]').popover({
                placement: 'bottom',
                trigger: 'hover',
                html: true
            });
            if ($('.loading_datatables').length) {
                $('.loading_datatables').hide();
            }
        } else {
            if ($('.loading_datatables').length) {
                $('.loading_datatables').show();
            }
        }
    });

    $(table_id)
        .on( 'error.dt', function ( e, settings, techNote, message ) {
            console.log( 'An error has been reported by DataTables: ', message );
        } );

    $(table_id)
        .on( 'init.dt', function ( e ) {
            $('a[data-toggle="tooltip"]').tooltip();
            $("[rel=tooltip]").tooltip({});
        } );

    $(table_id)
        .on( 'draw.dt', function ( e ) {
            if(options.panel_filters !== undefined) {
                if($('#'+options.panel_filters).hasClass('in')){
                    $('#'+options.panel_filters).collapse("hide");
                }
            }
        } );

    $('[name=search_all]').on('keyup', function () {
        val = $(this).val().length;
        if (val > 1 || val == 0)
            table.search($(this).val()).draw();
    });

    return table;
}
