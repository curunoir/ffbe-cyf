@extends('layouts.app')

@section('content')
    <div id="page-content">
        <div id="page-title">
            <h1 class="page-header text-overflow">{{ _t('Ajouter un compte') }}</h1>
        </div>
        <ol class="breadcrumb">
            <li><a href="{{ route('home') }}">{{ _t('Accueil') }}</a></li>
            <li><a href="{{ action('AccountsController@index') }}">{{ _t('Vos comptes') }}</a></li>
            <li class="active">{{ _t('Nouveau compte') }}</li>
        </ol>

        <div class="panel panel-default">
            <div class="panel-body">
                <div class=row">
                    <div class="col-sm-11">
                        {!! BootForm::open($account, ['class' => 'form-horizontal','id' => 'Form','enctype' => 'multipart/form-data']) !!}
                        @include('accounts._form')
                        {!! BootForm::close() !!}
                    </div>
                    <div class="col-sm-1">
                        <a class="btn btn-primary " href="{{action('AccountsController@index')}}"><i class="fa fa-plus"></i> {{_t('Retour')}}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop