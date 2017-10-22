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
                <div class="panel-title">{{ _t('Serveur') }}</div>
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
                        <th>{{ _t('Serveur') }}</th>
                        <th>{{ _t('Icon') }}</th>
                        <th>{{ _t('Unit') }}</th>
                        <th>{{ _t('Rang') }}</th>
                        <th>{{ _t('Joueur') }}</th>
                        <th>{{ _t('Description') }}</th>
                        <th>{{ _t('Demande ami') }}</th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection

@section('script')

    <script type="text/javascript">
        var ColumnSetting = [
            {name: 'server', data: 'server', trad: "{{ _t('Serveur') }}" , searchable: true},
            {
                "className":        'unit-icon-table',
                "name":             'icon',
                "orderable":        false,
                "searchable":       false,
                "data":             'icon',
                "trad":             ''
            },
            {name: 'units.name', data: 'units.name', trad: "{{ _t('Unit') }}" , searchable: true},
            {name: 'rank', data: 'rank', trad: "{{ _t('Rang') }}" , searchable: true},
            {name: 'users.name', data: 'users.name', trad: "{{ _t('Joueur') }}" , searchable: true},
            {name: 'current_unit_description', data: 'current_unit_description', trad: "{{ _t('Description') }}" , searchable: true},
            {name: 'btn_request', data: 'btn_request', trad: "{{ _t('Demande ami') }}" , searchable: false, orderable: false},
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
                    }
                },
                bAutoWidth: true,
                pageLength: 10,
                colReorder: false,
                columns: ColumnSetting,
                drawCallback: function (settings) {

                }
            });

        });
    </script>
@endsection