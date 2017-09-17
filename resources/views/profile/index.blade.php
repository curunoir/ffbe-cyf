@extends('layouts.nifty')

@section('content')
    <div id="page-content">
        <div id="page-title">
            <h1 class="page-header text-overflow">{{ _t('Gérer vos comptes FFBE') }}</h1>
        </div>
        <ol class="breadcrumb">
            <li><a href="{{ route('home') }}">{{ _t('Accueil') }}</a></li>
            <li class="active">{{ _t('Profil') }}</li>
        </ol>

        <div class="panel panel-default">
            <div class="panel-title">{{ _t('Ajouter un compte') }}</div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-3">


                        {!! Form::open(['method' => 'put', route('account.new')]) !!}
                        {!! BootForm::text("Friend code account", 'ffbe_id') !!}
                        {!! BootForm::select('Server',  'server', ['GLOBAL' => 'GLOBAL', 'JAPAN' => 'JAPAN'])  !!}
                        {!! BootForm::text("Rank", 'rank') !!}
                        {!! BootForm::submit("Add account") !!}
                        {!! BootForm::close() !!}

                    </div>

                    <div class="col-md-4">
                        <div>
                            <div class="panel panel-trans col-md-offset-3">
                                @include('friends._searchForm')
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                @include('profile._accounts')
            </div>
        </div>


    </div>
@endsection