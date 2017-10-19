
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name', 'FFBE - CYF') }}</title>
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=latin" rel="stylesheet">
    <?= Assets::css(); ?>
    <?php
        Assets::add(BootForm::asset_css());
        Assets::add(BootForm::asset_js());
     ?>
</head>
<body>
<div id="container" class="effect mainnav-lg">
    <div id="content-container">
        @include('partials._flash')
    </div>
    @include('layouts.navbar')
    <div class="boxed">
        <div id="content-container">
            @yield('content')
        </div>
    </div>
    @if (!Auth::guest())
        @include('layouts.navgauche')
    @endif
</div>
<?=Assets::js(); ?>
<script type="text/javascript">
    var prefix_ajax = '{{asset('/')}}';
</script>
@yield('script')
@if(env('APP_DEBUG'))
    <script id="__bs_script__">//<![CDATA[
        document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.js?v=2.18.8'><\/script>".replace("HOST", location.hostname));
        //]]></script>
@endif
</body>
</html>