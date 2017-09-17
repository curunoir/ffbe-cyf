@extends('layouts.nifty')

@section('content')
    <div id="page-content">
        <div id="page-title">
            <h1 class="page-header text-overflow">{{ _t('Gérer vos comptes FFBE') }}</h1>
        </div>
        <ol class="breadcrumb">
            <li><a href="{{ route('home') }}">{{ _t('Accueil') }}</a></li>
            <li class="active">{{ _t('Comptes') }}</li>
        </ol>
        <div class="panel panel-default">
            <div class="panel-body">
                <div class="panel-title">{{ _t('Vos comptes') }}</div>
                @include('profile._accounts')
                <div class="col-xs-6 text-right">
                    <a class="btn btn-primary " href="{{action('AccountsController@create')}}"><i class="fa fa-plus"></i> {{_t('Ajouter un compte')}}</a>
                </div>
            </div>
        </div>
    </div>
@endsection