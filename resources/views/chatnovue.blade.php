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
                                <button type="button" class="btn btn-default" data-toggle="dropdown" aria-expanded="false"><i class="demo-pli-gear icon-lg"></i></button>
                                <ul class="dropdown-menu dropdown-menu-right">
                                    <li><a href="#">Available</a></li>
                                    <li><a href="#">Busy</a></li>
                                    <li><a href="#">Away</a></li>
                                    <li class="divider"></li>
                                    <li><a id="demo-connect-chat" href="#" class="disabled-link" data-target="#demo-chat-body">Connect</a></li>
                                    <li><a id="demo-disconnect-chat" href="#" data-target="#demo-chat-body">Disconect</a></li>
                                </ul>
                            </div>
                        </div>
                        <h3 class="panel-title">Chat</h3>
                    </div>

                    <!--Widget body-->
                    <div>
                        <div class="nano" style="height:300px">
                            <div class="nano-content pad-all">
                                <ul class="list-unstyled media-block" id="ulchat1">
                                    <li class="mar-btm">
                                        <div class="media-left">
                                            <img src="img/profile-photos/1.png" class="img-circle img-sm" alt="Profile Picture">
                                        </div>
                                        <div class="media-body pad-hor">
                                            <div class="speech">
                                                <a href="#" class="media-heading">Bot chat</a>
                                                <p>Début de la conversation</p>
                                                <p class="speech-time">
                                                    <i class="demo-pli-clock icon-fw"></i>09:12AM
                                                </p>
                                            </div>
                                        </div>
                                    </li>
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