@extends('layouts.nifty')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <div class="panel panel-default">
                    <div class="panel-heading">Vos comptes de jeu</div>
                    <div class="panel-body">
                        {!! BootForm::open()->action(route('account.new'))->put() !!}

                        {!! BootForm::text("ID de l'ami", 'ffbe_id') !!}
                        {!! BootForm::select('Serveur',  'server', ['GLOBAL' => 'GLOBAL', 'JAPAN' => 'JAPAN'])  !!}
                        {!! BootForm::submit("Ajouter un compte") !!}
                        {!! BootForm::close() !!}

                    </div>
                </div>
            </div>

            @include('layouts.profile_sidebar')

        </div>
    </div>
@endsection