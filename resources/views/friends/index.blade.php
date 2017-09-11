@extends('layouts.nifty')

@section('content')
    <div id="page-content">
        <div id="page-title">
            <h1 class="page-header text-overflow">Searching FFBE friends</h1>
        </div>
        <ol class="breadcrumb">
            <li><a href="#">Home</a></li>
            <li><a href="#">Miscellaneous</a></li>
            <li class="active">Frequently Asked Questions</li>
        </ol>
        <div class="row">

            <div class="col-md-3">
                <div class="panel panel-trans">
                    <div class="col-md-offset-3">
                        <img src="img/200px-Game-logo.png" alt="FFBE Logo" class="">
                    </div>
                </div>
                <div class="panel panel-trans col-md-offset-3">
                    @include('friends._searchForm')
                </div>
            </div>

            <div class="col-md-9">
                <div class="panel">
                    <div class="panel-body">
                        <div class="pad-hor mar-top">
                            <h2 class="text-thin mar-no">160 results found for: <i class="text-primary text-normal">"Dashboard Theme"</i></h2>
                            <small>Request time  (0.23 seconds)</small>
                        </div>

                        <hr>

                        <ul class="list-group bord-no">
                            <li class="list-group-item list-item-lg">
                                <div class="media-heading mar-no">
                                    <a class="h4 text-primary" href="#">Theme Features</a>
                                </div>
                                <a class="btn-link text-success box-inline" href="#">http://www.example.com/nifty/admin</a>
                                <p class="text-sm">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
                            </li>
                            <li class="list-group-item list-item-lg">
                                <div class="media-heading mar-no">
                                    <a class="h4 text-primary" href="#">Nifty - Responsive Admin Template</a>
                                </div>
                                <a class="btn-link text-success box-inline" href="#">http://www.example.com/nifty/admin</a>
                                <p class="text-sm">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
                            </li>

                        </ul>
                        <hr class="hr-wide">

                        <!--Pagination-->
                        <div class="text-center">
                            <ul class="pagination mar-no">
                                <li class="disabled"><a class="demo-pli-arrow-left" href="#"></a></li>
                                <li class="active"><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">4</a></li>
                                <li><span>...</span></li>
                                <li><a href="#">20</a></li>
                                <li><a class="demo-pli-arrow-right" href="#"></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div> <!-- END <div class="ROW"> -->

        @include('profile._accounts')
    </div>


@endsection