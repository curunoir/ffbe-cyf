
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <META http-equiv="Cache-Control" content="no-cache">
    <META http-equiv="Pragma" content="no-cache">
    <META http-equiv="Expires" content="0">
    <title>{{ config('app.name', 'FFBE - CYF') }}</title>
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=latin" rel="stylesheet">
    <?= Assets::css(); ?>
    <?php
        Assets::add(BootForm::asset_css());
        Assets::add(BootForm::asset_js());
     ?>
    <script>
        window.Laravel = <?php echo json_encode([
            'csrfToken' => csrf_token(),
        ]); ?>;
        var module = { }; /*   <-----THIS LINE */
    </script>
    <script src="https://js.pusher.com/4.1/pusher.min.js"></script>
</head>
<body>
    <div id="container" class="effect mainnav-lg navbar-fixed aside-fixed footer-fixed">
        @include('layouts.navbar')
        <div id="content-container">
            @include('partials._flash')
            @if (!Auth::guest())
                @include('partials._aside_menu')
            @endif
            @yield('content')
        </div>
        @if (!Auth::guest())
            @include('layouts.navgauche')
        @endif
    </div>
    @include('layouts._footer')
    @php Assets::add('app.js') @endphp
    <?=Assets::js(); ?>
    <script type="text/javascript">
        var prefix_ajax = '{{asset('/')}}';
        @if (!Auth::guest())
            var myid = '{{ _c(Auth::user()->id) }}';
        @endif
    </script>
    @yield('script')

</body>
</html>