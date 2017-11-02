@extends('layouts.app')

@section('content')
    <div id="page-content">
        <div id="page-title">
            <h1 class="page-header text-overflow">{{ _t('Chercher des amis dans Final Fantasy Brave Exvius') }}</h1>
        </div>
        <ol class="breadcrumb">
            <li><a href="#">{{ _t('Accueil') }}</a></li>
            <li class="active"><a href="#">{{ _t('Chercher des amis') }}</a></li>
        </ol>
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-bordered-primary">
                    <div class="panel-body">
                        <h5>{{ _t('Serveur') }}</h5>
                        <div class="filters-checkboxes filters-verified">
                            <select id="filter-server" name="filter-server">
                                <option value="GLOBAL">{{ _t('Global') }}</option>
                                <option value="JAPAN">{{ _t('Japon') }}</option>
                            </select>
                            <label for="filter-server" class="control-label">{{ _t('Serveur') }}</label>
                        </div>

                        <table id="grid" class="table table-striped table-bordered table-hover display dt-responsive no-wrap" cellspacing="0" width="100%">
                            <thead>
                            <tr>
                                <th data-priority="1">{{ _t('Icon') }}</th>
                                <th data-priority="2">{{ _t('Unit') }}</th>
                                <th data-priority="3">{{ _t('Rang') }}</th>
                                <th data-priority="3">{{ _t('Description') }}</th>
                                <th data-priority="2">{{ _t('Nom du compte') }}</th>
                                <th data-priority="1">{{ _t('Nom du joueur') }}</th>
                                <th data-priority="2">{{ _t('Serveur') }}</th>
                                <th data-priority="1">{{ _t('Actions') }}</th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection


@section('script')

    <script type="text/javascript">
        var ColumnSetting = [
            {
                "className":        'unit-icon-table text-center',
                "name":             'icon',
                "orderable":        false,
                "searchable":       false,
                "data":             'icon',
                "trad":             ''
            },
            {name: 'units.name', data: 'units.name', trad: "{{ _t('Unit') }}" , searchable: true},
            {name: 'rank', data: 'rank', 'className': 'text-center', trad: "{{ _t('Rang') }}" , searchable: true},
            {name: 'current_unit_description', data: 'current_unit_description', trad: "{{ _t('Description') }}" , searchable: true},
            {name: 'accounts.name', data: 'account_name', trad: "{{ _t('Nom du compte') }}" , searchable: true},
            {name: 'users.name', data: 'user_name', trad: "{{ _t('Joueur') }}" , searchable: true},
            {name: 'server', data: 'server', trad: "{{ _t('Serveur') }}" , searchable: true},
            {name: 'btn_request', data: 'btn_request', 'className': 'text-center', trad: "{{ _t('Demande ami') }}" , searchable: false, orderable: false}
        ];

        $(document).ready(function() {

            var table =  $('#grid').DataTable({
                processing: true,
                serverSide: true,
                ajax: {
                    "url"   : '/ajax/searchfriends',
                    "type"  : 'POST',
                    "data"  : function (request) {
                        request.fnofriends = true;
                        request.fserver = $('#filter-server').val();
                    }
                },
                bAutoWidth: true,
                pageLength: 10,
                colReorder: false,
                columns: ColumnSetting,
                drawCallback: function (settings) {
                }
            });
            table.on( 'draw', function () {
                attach_confirm_request();
                $('.request_friend').on('click', function() {
                    var accid = $(this).attr('data-id');
                    var name = $(this).attr('data-name');
                    request_friend(accid, name, table);
                });
            } );

            $('#filter-server').on('change', function() {
                table.draw();
            });

        });
    </script>
@endsection