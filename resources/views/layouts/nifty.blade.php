
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name', 'FFBE - CYF') }}</title>

    <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=latin" rel="stylesheet">
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('premium/icon-sets/icons/line-icons/premium-line-icons.min.css') }}" rel="stylesheet">
    <link href="{{ asset('premium/icon-sets/icons/solid-icons/premium-solid-icons.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/font-awesome/css/font-awesome.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/pace.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/ffbe.css') }}" rel="stylesheet">

    <link href="{{ asset('css/demo/nifty-demo-icons.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/demo/nifty-demo.min.css') }}" rel="stylesheet">

    <script src="{{ asset('js/jquery.min.js') }}"></script>
    <script src="{{ asset('js/jquery.autocomplete.min.js') }}"></script>

</head>

<body>
<div id="container" class="effect mainnav-lg">
    <div id="content-container">
        @include('partials._flash')

    </div>
    @include('layouts.navbar-nifty')

    <div class="boxed">
        <!--CONTENT CONTAINER-->
        <div id="content-container">
            @yield('content')
        </div>

    </div>

    @if (!Auth::guest())
        @include('layouts.navigation-nifty')
    @endif
</div>

@if (!Auth::guest())
    @include('partials._dashboard')
@endif

<!-- Scripts -->
<script src="{{ asset('js/bootstrap.min.js') }}"></script>
<script src="{{ asset('js/nifty.min.js') }}"></script>
<script src="{{ asset('js/demo/nifty-demo.js') }}"></script>

<script src="{{ asset('js/app.js') }}"></script>

@if(env('APP_DEBUG'))
    <script id="__bs_script__">//<![CDATA[
        document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.js?v=2.18.8'><\/script>".replace("HOST", location.hostname));
        //]]></script>
@endif
</body>
</html>