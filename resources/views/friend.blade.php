@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Recherche d'amis pour FFBE</div>

                    <div class="panel-body">
                        {!! bootform::text("nom", "label", "valeur") !!}

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection