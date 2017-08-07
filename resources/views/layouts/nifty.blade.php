
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name', 'FFBE - CYF') }}</title>

    <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=latin" rel="stylesheet">
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/nifty.min.css') }}" rel="stylesheet">
    <link href="{{ asset('premium/icon-sets/icons/line-icons/premium-line-icons.min.css') }}" rel="stylesheet">
    <link href="{{ asset('premium/icon-sets/icons/solid-icons/premium-solid-icons.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/pace.min.css') }}" rel="stylesheet">

    <link href="{{ asset('css/demo/nifty-demo-icons.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/demo/nifty-demo.min.css') }}" rel="stylesheet">


    <script src="{{ asset('js/pace.min.js') }}"></script>
    <script src="{{ asset('js/jquery.min.js') }}"></script>



</head>

<body>
<div id="container" class="effect mainnav-lg">

    @include('layouts.navbar-nifty')

    <div class="boxed">
        <!--CONTENT CONTAINER-->
        <div id="content-container">
            @yield('content')
        </div>
    </div>

    @if (!Auth::guest())
        <!--MAIN NAVIGATION-->
            @include('layouts.navigation-nifty')
        @endif
</div>

@if (!Auth::guest())
<div id="demo-set" class="demo-set">
    <div id="demo-set-body" class="demo-set-body collapse">
        <div id="demo-set-alert"></div>
        <div class="pad-hor bord-btm clearfix">
            <div class="pull-right pad-top">
                <button id="demo-btn-close-settings" class="btn btn-trans">
                    <i class="pci-cross pci-circle icon-lg"></i>
                </button>
            </div>
            <div class="media">
                <div class="media-left">
                    <i class="demo-pli-gear icon-2x"></i>
                </div>
                <div class="media-body">
                    <span class="text-semibold text-lg text-main">Costomize</span>
                    <p class="text-muted text-sm">Customize Nifty's layout, sidebars, and color schemes.</p>
                </div>
            </div>
        </div>
        <div class="demo-set-content clearfix">
            <div class="col-lg-9 pos-rel">
                <div class="row">
                    <div class="col-lg-12">
                        <div id="demo-theme">
                            <div class="row bg-gray-light pad-top">
                                <p class="text-semibold text-main text-lg pad-lft">Color Schemes</p>
                                <div class="demo-theme-btn col-md-4 pad-ver">
                                    <p class="text-semibold text-main">Header</p>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-a-light add-tooltip" data-theme="theme-light" data-type="a" data-title="(A). Light" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-a-navy add-tooltip" data-theme="theme-navy" data-type="a" data-title="(A). Navy Blue" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-a-ocean add-tooltip" data-theme="theme-ocean" data-type="a" data-title="(A). Ocean" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-a-lime add-tooltip" data-theme="theme-lime" data-type="a" data-title="(A). Lime" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-a-purple add-tooltip" data-theme="theme-purple" data-type="a" data-title="(A). Purple" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-a-dust add-tooltip" data-theme="theme-dust" data-type="a" data-title="(A). Dust" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-a-mint add-tooltip" data-theme="theme-mint" data-type="a" data-title="(A). Mint" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-a-yellow add-tooltip" data-theme="theme-yellow" data-type="a" data-title="(A). Yellow" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-a-well-red add-tooltip" data-theme="theme-well-red" data-type="a" data-title="(A). Well Red" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-a-coffee add-tooltip" data-theme="theme-coffee" data-type="a" data-title="(A). Coffee" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-a-prickly-pear add-tooltip" data-theme="theme-prickly-pear" data-type="a" data-title="(A). Prickly pear" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-a-dark add-tooltip" data-theme="theme-dark" data-type="a" data-title="(A). Dark" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                    </div>
                                </div>
                                <div class="demo-theme-btn col-md-4 pad-ver">
                                    <p class="text-semibold text-main">Brand</p>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-b-light add-tooltip" data-theme="theme-light" data-type="b" data-title="(B). Light" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-b-navy add-tooltip" data-theme="theme-navy" data-type="b" data-title="(B). Navy Blue" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-b-ocean add-tooltip" data-theme="theme-ocean" data-type="b" data-title="(B). Ocean" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-b-lime add-tooltip" data-theme="theme-lime" data-type="b" data-title="(B). Lime" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-b-purple add-tooltip" data-theme="theme-purple" data-type="b" data-title="(B). Purple" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-b-dust add-tooltip" data-theme="theme-dust" data-type="b" data-title="(B). Dust" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-b-mint add-tooltip" data-theme="theme-mint" data-type="b" data-title="(B). Mint" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-b-yellow add-tooltip" data-theme="theme-yellow" data-type="b" data-title="(B). Yellow" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-b-well-red add-tooltip" data-theme="theme-well-red" data-type="b" data-title="(B). Well red" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-b-coffee add-tooltip" data-theme="theme-coffee" data-type="b" data-title="(B). Coofee" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-b-prickly-pear add-tooltip" data-theme="theme-prickly-pear" data-type="b" data-title="(B). Prickly pear" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-b-dark add-tooltip" data-theme="theme-dark" data-type="b" data-title="(B). Dark" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                    </div>
                                </div>
                                <div class="demo-theme-btn col-md-4 pad-ver">
                                    <p class="text-semibold text-main">Navigation</p>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-c-light add-tooltip" data-theme="theme-light" data-type="c" data-title="(C). Light" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-c-navy add-tooltip" data-theme="theme-navy" data-type="c" data-title="(C). Navy Blue" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-c-ocean add-tooltip" data-theme="theme-ocean" data-type="c" data-title="(C). Ocean" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-c-lime add-tooltip" data-theme="theme-lime" data-type="c" data-title="(C). Lime" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-c-purple add-tooltip" data-theme="theme-purple" data-type="c" data-title="(C). Purple" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-c-dust add-tooltip" data-theme="theme-dust" data-type="c" data-title="(C). Dust" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-c-mint add-tooltip" data-theme="theme-mint" data-type="c" data-title="(C). Mint" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-c-yellow add-tooltip" data-theme="theme-yellow" data-type="c" data-title="(C). Yellow" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-c-well-red add-tooltip" data-theme="theme-well-red" data-type="c" data-title="(C). Well Red" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-c-coffee add-tooltip" data-theme="theme-coffee" data-type="c" data-title="(C). Coffee" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-c-prickly-pear add-tooltip" data-theme="theme-prickly-pear" data-type="c" data-title="(C). Prickly pear" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                        <a href="#" class="demo-theme demo-c-dark add-tooltip" data-theme="theme-dark" data-type="c" data-title="(C). Dark" data-original-title="" title="">
                                            <div class="demo-theme-brand"></div>
                                            <div class="demo-theme-head"></div>
                                            <div class="demo-theme-nav"></div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="demo-bg-boxed" class="demo-bg-boxed">
                    <div class="demo-bg-boxed-content">
                        <p class="text-semibold text-main text-lg mar-no">Background Images</p>
                        <p class="text-sm text-muted">Add an image to replace the solid background color</p>
                        <div class="row">
                            <div class="col-lg-4 text-justify">
                                <p class="text-semibold text-main">Blurred</p>
                                <div id="demo-blurred-bg" class="text-justify">
                                    <!--Blurred Backgrounds-->
                                </div>
                            </div>
                            <div class="col-lg-4 text-justify">
                                <p class="text-semibold text-main">Polygon &amp; Geometric</p>
                                <div id="demo-polygon-bg" class="text-justify">
                                    <!--Polygon Backgrounds-->
                                </div>
                            </div>
                            <div class="col-lg-4 text-justify">
                                <p class="text-semibold text-main">Abstract</p>
                                <div id="demo-abstract-bg" class="text-justify">
                                    <!--Abstract Backgrounds-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-bg-boxed-footer">
                        <button id="demo-close-boxed-img" class="btn btn-primary">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button id="demo-set-btn" class="btn" data-toggle="collapse" data-target="#demo-set-body"><i class="demo-psi-gear icon-lg"></i></button>
</div>
@endif
<!-- Scripts -->


<script src="{{ asset('js/bootstrap.min.js') }}"></script>
<script src="{{ asset('js/nifty.min.js') }}"></script>
<script src="{{ asset('js/demo/nifty-demo.js') }}"></script>
</body>
</html>