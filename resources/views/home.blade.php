@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">{{ _t('Tableau de bord') }}</div>

                <div class="panel-body">
                    {{ _t('T\'es loggé mec !') }}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('script')
    <script src="https://js.pusher.com/4.1/pusher.min.js"></script>
    <script type="text/javascript">

            Pusher.logToConsole = true;

            var pusher = new Pusher('ff317e0f3fd829e48367', {
                cluster: 'eu',
                encrypted: true
            });

            var channel = pusher.subscribe('my-channel');
            channel.bind('my-event', function(data) {
                alert(data.message);
            });

    </script>
@endsection