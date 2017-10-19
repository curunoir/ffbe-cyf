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
                        <th>Unité</th>
                        <th>Rang</th>
                        <th>Nom ami</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($accounts as $account)
                        <tr>
                            <td>
                                <div><img src="{{ asset( 'storage/'.$account->current_unit->icon_file) }}"></div>
                                <div>{{ $account->current_unit->icon_file }}</div>
                            </td>
                            <td>
                                <div>
                                    <div>{{ $account->user->rank }}</div>
                                </div>
                            </td>
                            <td>
                                <div>{{ $account->user->name }}</div>
                            </td>
                            <td>
                                <div>{{ $account->current_unit_description }}</div>
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
        {{--var ColumnSetting = [--}}
            {{--{--}}
                {{--"className":        'unit-icon-table',--}}
                {{--"name":             'icon',--}}
                {{--"orderable":        false,--}}
                {{--"searchable":       false,--}}
                {{--"data":             'icon',--}}
                {{--"trad":             ''--}}
            {{--},--}}
            {{--{name: 'name', trad: "{{ _t('Nom') }}" , searchable: true},--}}
            {{--{name: 'max_stars', trad: "{{ _t('Level max') }}" , searchable: true},--}}
            {{--{name: 'validation', trad: "{{ _t('Validé ?') }}" , searchable: true},--}}
            {{--{name: 'edit', trad: "{{ _t('Modifier') }}" , "searchable": false, "orderable": false}--}}
        {{--];--}}



        $(document).ready(function() {
            var table =  $('#grid').DataTable({
                bAutoWidth: true,
                pageLength: 10,
                colReorder: true,
                //columns: ColumnSetting,
                drawCallback: function (settings) {
                    //attach_edit_btn();
                }
            });

        });
    </script>
@endsection