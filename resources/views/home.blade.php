@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">{{ _t('Tableau de bord') }}</div>

                <div class="panel-body">
                    {{ _t('T\'es loggé mec !') }}

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
