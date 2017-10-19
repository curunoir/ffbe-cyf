@extends('layouts.app')

@section('content')
    <div id="page-content">
        <div id="page-title">
            <h1 class="page-header text-overflow">{{ _t('Editer les unités FFBE') }}</h1>
        </div>
        <ol class="breadcrumb">
            <li><a href="{{ route('home') }}">{{ _t('Accueil') }}</a></li>
            <li class="active">{{ _t('Unités') }}</li>
        </ol>
        <div class="panel panel-default">
            <div class="panel-body">
                <div class="panel-title">{{ _t('Gestion des unités') }}</div>
                <div>
                    <select id="validation-filter">
                        <option value="Tous">Tous</option>
                        <option value="Oui">Oui</option>
                        <option value="Non">Non</option>
                    </select>
                </div>
                <table id="grid" class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nom</th>
                            <th>Max *</th>
                            <th>Validé ?</th>
                            <th>Modifier</th>
                        </tr>
                    </thead>
                    <tbody>
                    @foreach($units as $unit)
                        <tr>
                            <td>
                                <div>
                                    <img src="{{ asset( 'storage/'.$unit->icon_file) }}">
                                </div>
                            </td>
                            <td>
                                <div>{{ $unit->name }}</div>
                            </td>
                            <td>
                                <div>{{ $unit->max_stars }}</div>
                            </td>
                            <td>
                                <div>{{ $unit->validation ? 'Oui' : 'Non' }}</div>
                            </td>
                            <td>
                                <div class="form-group form-text">
                                    <div class="input-group mar-btm">
                                        <input class="form-control" id="unit-name-{{ $unit->id }}" name="unit-name-{{ $unit->id }}" type="text" value="{{ $unit->name }}">
                                        <span class="input-group-btn">
                                            <button class="btn btn-mint maj_unit_name" data-id="{{ $unit->id }}" type="button"><i class="fa fa-pencil"></i></button>
                                        </span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection

@section('script')

    <script type="text/javascript">
        var ColumnSetting = [
            {
                "className":        'unit-icon-table',
                "name":             'icon',
                "orderable":        false,
                "searchable":       false,
                "data":             'icon',
                "trad":             ''
            },
            {name: 'name', trad: "{{ _t('Nom') }}" , searchable: true},
            {name: 'max_stars', trad: "{{ _t('Level max') }}" , searchable: true},
            {name: 'validation', trad: "{{ _t('Validé ?') }}" , searchable: true},
            {name: 'edit', trad: "{{ _t('Modifier') }}" , "searchable": false, "orderable": false}
        ];

        $.fn.dataTable.ext.search.push(
            function( settings, data, dataIndex ) {
                var filter = $('#validation-filter').val();
                if(filter == 'Tous')
                    return true;
                console.log(data);
                return data[3] == filter;
            }
        );

        $(document).ready(function() {
            var table =  $('#grid').DataTable({
                bAutoWidth: true,
                pageLength: 10,
                colReorder: true,
                columns: ColumnSetting,
                drawCallback: function (settings) {
                    attach_edit_btn();
                }
            });
            attach_edit_btn();
            $('#validation-filter').change( function() {
                table.draw();
            } );

            function attach_edit_btn() {
                $( ".maj_unit_name" ).unbind();
                $('.maj_unit_name').click(function () {
                    var id = $(this).attr('data-id');
                    var name = $('#unit-name-' + id).val();
                    if (name != '')
                        $.ajax({
                            url: '/ajax/unit/update',
                            type: 'POST',
                            data: {
                                id: id,
                                name: name
                            },
                            dataType: 'html',
                            success: function (data) {
                                if (data) {
                                    $.niftyNoty({
                                        type: 'success',
                                        icon: 'fa fa-cross icon-2x',
                                        message: 'Unité éditée avec succès',
                                        container: 'floating',
                                        timer: 3000
                                    });
                                }
                            },
                            error: function (status) {
                                console.log(status);
                                alert("Erreur ajax/unitedit :" + status);
                            }
                        });

                });
            }
        });
    </script>
@endsection