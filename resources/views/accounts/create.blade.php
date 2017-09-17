@extends('layouts.nifty')

@section('content')

    <div class="text-right margin-bottom-10">
        <a class="btn btn-primary" href="{{action('AccountsController@index')}}"><i
                    class="fa fa-reply"></i> {{_t('retour')}}</a>
    </div>

    <section class="clearfix" id="widget-grid">
        <div class="jarviswidget jarviswidget-color-bluemega" id="wid-id-0">
            <header>
                <h2>{{ _t('Comptes') }}</h2>

            </header>
            <div role="content">
                <div class="widget-body">
                    {!! BootForm::open($account, ['class' => 'form-horizontal','id' => 'Form','enctype' => 'multipart/form-data']) !!}
                    @include('widgets._form')
                    {!! BootForm::close() !!}
                </div>
            </div>
        </div>
    </section>
@stop