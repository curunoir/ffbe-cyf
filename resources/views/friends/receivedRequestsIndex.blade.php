@extends('layouts.app')

@section('content')
    <div id="page-content">
        <div id="page-title">
            <h1 class="page-header text-overflow">{{ _t("Vos requêtes d'amis en attente") }}</h1>
        </div>
        <ol class="breadcrumb">
            <li><a href="#">{{ _t('Accueil') }}</a></li>
            <li class="active"><a href="#">{{ _t('Requêtes') }}</a></li>
        </ol>
        <div class="row">
            <div class="col-md-12">
                <div class="panel">
                    <div class="panel-body">

                        <table id="grid" class="table table-striped table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>{{ _t('Icon') }}</th>
                                <th>{{ _t('Unit') }}</th>
                                <th>{{ _t('Rang') }}</th>
                                <th>{{ _t('Message') }}</th>
                                <th>{{ _t('Description') }}</th>
                                <th>{{ _t('Nom du joueur') }}</th>
                                <th>{{ _t('Serveur') }}</th>
                                <th></th>
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
            {name: 'requester_account.rank', data: 'requester_account.rank', 'className': 'text-center', trad: "{{ _t('Rang') }}" , searchable: true},
            {name: 'message', data: 'message', 'className': 'text-center', trad: "{{ _t('Message') }}" , searchable: true},
            {name: 'requester_account.current_unit_description', data: 'requester_account.current_unit_description', trad: "{{ _t('Description') }}" , searchable: true},
            {name: 'users.name', data: 'user_name', trad: "{{ _t('Joueur') }}" , searchable: true},
            {name: 'requester_account.server', data: 'requester_account.server', trad: "{{ _t('Serveur') }}" , searchable: true},
            {name: 'btn_request', data: 'btn_request', 'className': 'text-center', trad: "{{ _t('Demande ami') }}" , searchable: false, orderable: false}
        ];

        $(document).ready(function() {

            var table =  $('#grid').DataTable({
                processing: true,
                serverSide: true,
                ajax: {
                    "url"   : '/ajax/receivedrequests',
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
            table.on( 'draw', function () {
                $('.accept_friend').off();
                $('.accept_friend').on('click', function() {
                    var accid = $(this).attr('data-id');
                    $.post(prefix_ajax+"ajax/acceptfriend", { id : accid },
                        function(returnedData){
                            if(returnedData.status == 'OK') {
                                table.draw();
                                successS("Ami accepté");
                            }
                            else
                                errorS(returnedData.status);
                        })

                });
            });

        });
    </script>
@endsection