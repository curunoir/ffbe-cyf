@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">{{ _t('Test Pusher') }}</div>

                    <div class="panel-body">

                        <div>
                            <a href="#" class="test-pusher">Test pusher</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('script)
    <script type="text/javascript">
        $('.test-pusher').click( function() {
            $.ajax('ajax/testpusher');
        });
    </script>
@endsection