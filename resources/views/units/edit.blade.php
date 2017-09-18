@extends('layouts.app')

@section('content')

    <div class="text-right margin-bottom-10">
        <a class="btn btn-primary" href="{{action('AccountsController@index')}}"><i class="fa fa-reply"></i> {{_t('retour')}}</a>
    </div>

    <div class="panel panel-default">
        <div class="panel-title">{{ _t('Editer un compte') }}</div>
        <div class="panel-body">
            <div role="content">
                {!! BootForm::open($account, ['class' => 'form-horizontal','id' => 'Form','enctype' => 'multipart/form-data']) !!}
                @include('accounts._form')
                {!! BootForm::close() !!}
            </div>
        </div>
    </div>
@stop