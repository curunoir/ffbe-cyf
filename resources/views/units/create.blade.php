@extends('layouts.app')

@section('content')

    <div class="text-right margin-bottom-10">
        <a class="btn btn-primary" href="{{action('UnitsController@index')}}"><i class="fa fa-reply"></i> {{_t('retour')}}</a>
    </div>

    <div class="panel panel-default">
        <div class="panel-title">{{ _t('Ajouter une unité') }}</div>
        <div class="panel-body">
            <div role="content">
                {!! BootForm::open($unit, ['class' => 'form-horizontal','id' => 'Form']) !!}
                @include('units._form')
                {!! BootForm::close() !!}
            </div>
        </div>
    </div>
@stop