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
                    <div class="col-md-2">

                        {!! BootForm::open()->action(route('account.new'))->put() !!}

                        {!! BootForm::text("Friend code account", 'ffbe_id') !!}
                        {!! BootForm::select('Server',  'server', ['GLOBAL' => 'GLOBAL', 'JAPAN' => 'JAPAN'])  !!}
                        {!! BootForm::submit("Add account") !!}
                        {!! BootForm::close() !!}

                    </div>
                </div>
                <hr />
                <div class="panel-title">Your accounts</div>
                <div class="row">
                        @foreach( $user->accounts as $account)
                            <div class="col-md-3">
                                <div class="panel">
                                    <div class="panel-heading">
                                        <h3 class="panel-title">FFBE ID = {{ $account->ffbe_id }}</h3>
                                    </div>
                                    <div class="panel-body">
                                        <p>Server = {{ $account->server }}</p>
                                        <p>Created at = {{ $account->created_at }}</p>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                </div>

            </div>
        </div>
    </div>
@endsection