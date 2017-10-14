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
                <div role="content">
                    {!! BootForm::open($account, ['class' => 'form-horizontal','id' => 'Form','enctype' => 'multipart/form-data']) !!}
                    @include('accounts._form')
                    {!! BootForm::close() !!}
                </div>
            </div>
        </div>
    </div>
@stop