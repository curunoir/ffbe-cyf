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
                <table id="grid" class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nom</th>
                            <th>Max *</th>
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
            {data: 'name', name: 'name', trad: "{{ _t('Nom') }}" , searchable: true},
            {data: 'max_stars', name: 'max_stars', trad: "{{ _t('Level max') }}" , searchable: true}
        ];

        $(document).ready(function() {
            var table =  $('#grid').DataTable({
                bAutoWidth: true,
                pageLength: 10,
                colReorder: true,
                columns: ColumnSetting,
                drawCallback: function (settings) {

                }
            });
            table.draw();
        });
    </script>
@endsection