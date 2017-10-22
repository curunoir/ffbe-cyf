@extends('layouts.app')

@section('content')
    <div id="page-content">
        <div id="page-title">
            <h1 class="page-header text-overflow">{{ _t('Gérer votre compte') }}</h1>
        </div>
        <ol class="breadcrumb">
            <li><a href="{{ route('home') }}">{{ _t('Accueil') }}</a></li>
            <li class="active">{{ _t('Profil') }}</li>
        </ol>

        <div class="panel panel-default">
            <div class="panel-title">{{ _t('Chercher des unités') }}</div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-4">
                        <div>
                            <div class="panel panel-trans col-md-offset-3">

                                @include('friends._searchForm')
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="panel-title">{{ _t('Vos comptes') }}</div>
                @include('accounts._accounts')
            </div>
        </div>
    </div>
@endsection