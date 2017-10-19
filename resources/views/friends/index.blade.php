@extends('layouts.app')

@section('content')
    <div id="page-content">
        <div id="page-title">
            <h1 class="page-header text-overflow">Search FFBE friends</h1>
        </div>
        <ol class="breadcrumb">
            <li><a href="#">Home</a></li>
            <li class="active"><a href="#">Search friends</a></li>
        </ol>
        <div class="row">
            <div class="col-md-10">
                <div class="panel">
                    <div class="panel-body">
                        <hr>
                        <div class="panel panel-trans">
                            @include('friends._searchForm')
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection