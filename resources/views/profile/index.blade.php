@extends('layouts.nifty')

@section('content')
    <div id="page-content">
        <div id="page-title">
            <h1 class="page-header text-overflow">Manage your FFBE accounts</h1>
        </div>
        <ol class="breadcrumb">
            <li><a href="{{ route('home') }}">Home</a></li>
            <li class="active">Profile</li>
        </ol>

        <div class="panel panel-default">
            <div class="panel-title">Add a new account</div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-3">

                        {!! BootForm::open()->action(route('account.new'))->put() !!}

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