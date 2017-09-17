
<div class="input-group mar-btm">
    <input placeholder="Search units..." class="form-control" id="input_search_units">
    <span class="input-group-btn">
        <button class="btn btn-mint " type="button"><i class="fa fa-search"></i></button>
    </span>
</div>

<script src="{{ asset('js/ffbe/units_icons.js') }}"></script>
<script type="text/javascript">
    $( document ).ready(function() {

        ffbe_units.forEach(function(unit) {
            var styleBg = 'style="background: ' + unit.bg +';"'
            //$('#units').append('<div class="col-xs-1 bg-sprites" ' +styleBg +' title="'+unit.id+ '-'+unit.name+'" ></div>');

        });

        $('#input_search_units').autocomplete({
            lookup: ffbe_units_suggestions,
            formatResult : function (suggestion, currentValue) {

                // var pattern = '(' + currentValue.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ')';
                // return suggestion.value.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>') + ' (' + suggestion.data + ')';
                //console.log(ffbe_units_names[suggestion.value]);
                console.log(suggestion.data);

                if(suggestion.data == 'u000') {
                    var class_global = 'icon-' + suggestion.value.replace(/ /g, '_');
                    var span_return = '<div class="ib '+class_global+'"></div><span>&nbsp;'+suggestion.value+'</span>';
                    console.log(span_return);
                }
                else {
                    //console.log(ffbe_units_names[suggestion.value]);
                    var span_return = '<span class="bg-sprites" style="background: ' + ffbe_units_names[suggestion.value].bg + ';"></span><span>&nbsp;' + suggestion.value + '</span>';

                }
                return span_return;
            },
            onSelect: function (suggestion) {

            }
        });

    });
</script>