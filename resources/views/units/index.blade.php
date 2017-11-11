@extends('layouts.app')

@section('content')
    <div id="page-content">
        <div id="page-title">
            <h1 class="page-header text-overflow">{{ _t('Gérer les unités FFBE') }}</h1>
        </div>
        <ol class="breadcrumb">
            <li><a href="{{ route('home') }}">{{ _t('Accueil') }}</a></li>
            <li class="active">{{ _t('Unités') }}</li>
        </ol>
        <div class="panel panel-default panel-ffbe-logo">
            <div class="panel-body">
                <div class="panel-title">{{ _t('Gestion des unités') }}</div>
                <div class="row">
                    @foreach($units as $unit)
                        <div>{{ $unit->name }}</div>
                        <div>
                            <img src="{{ asset( 'storage/'.$unit->icon_file) }}">
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
@endsection