@extends('layouts.app')

@section('content')
    <script>
        window.Laravel = <?php echo json_encode([
            'csrfToken' => csrf_token(),
        ]); ?>;
        var module = { }; /*   <-----THIS LINE */
    </script>
    <div class="container">
        <div class="row">
            <div class="col-md-12 col-lg-6">

                <!--Chat widget-->
                <!--===================================================-->
                <div class="panel">
                    <!--Heading-->
                    <div class="panel-heading">
                        <div class="panel-control">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-gear fa-2x"></i></button>
                                <ul class="dropdown-menu dropdown-menu-right">
                                    <li><a href="#">{{ _t('Disponible') }}</a></li>
                                    <li><a href="#">{{ _t('Occupé') }}</a></li>
                                    <li><a href="#">{{ _t('Absent') }}</a></li>
                                    <li class="divider"></li>
                                    <li><a id="demo-connect-chat" href="#" class="disabled-link" data-target="#demo-chat-body">{{ _t('Connecté') }}</a></li>
                                    <li><a id="demo-disconnect-chat" href="#" data-target="#demo-chat-body">{{ _t('Déconnexion') }}</a></li>
                                </ul>
                            </div>
                        </div>
                        <h3 class="panel-title">Chat</h3>
                    </div>

                    <!--Widget body-->
                    <div>
                        <div class="nano" style="height:310px">
                            <div class="nano-content pad-all">
                                <ul class="list-unstyled media-block" id="ulchat1" style="height: 300px; overflow: auto">
                                    @include('chat._conversation')
                                </ul>
                            </div>
                        </div>

                        <!--Widget footer-->
                        <div class="panel-footer">
                            <div class="row">
                                <div class="col-xs-9">
                                    <input type="text" placeholder="Enter your text" class="form-control chat-input" id="chat-input">
                                </div>
                                <div class="col-xs-3">
                                    <button class="btn btn-primary btn-block" id="sendMessage" type="button">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--===================================================-->
                <!--Chat widget-->

            </div>
        </div>
    </div>

@endsection

@section('script')

@endsection