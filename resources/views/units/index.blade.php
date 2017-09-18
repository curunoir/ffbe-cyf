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
        <div class="panel panel-default">
            <div class="panel-body">
                <div class="panel-title">{{ _t('Gestion des unités') }}</div>

                <div class="col-xs-6 text-right">
                    <a class="btn btn-primary " href="{{action('UnitsController@create')}}"><i class="fa fa-plus"></i> {{_t('Ajouter une unité')}}</a>
                </div>
            </div>
        </div>
    </div>
@endsection