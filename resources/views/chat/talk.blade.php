@extends('layouts.app')

@section('content')
    <script>
        window.Laravel = <?php echo json_encode([
            'csrfToken' => csrf_token(),
        ]); ?>;
        var module = { }; /*   <-----THIS LINE */
    </script>
    <div id="page-content">
        <div id="page-title">
            <h1 class="page-header text-overflow">{{ _t('Discussion avec') .' '.$partner->name }}</h1>
        </div>
        <ol class="breadcrumb">
            <li><a href="{{ action('HomeController@index') }}">{{ _t('Accueil') }}</a></li>
            <li class="active"><a href="#">{{ _t('Discussion') }}</a></li>
        </ol>
        <div class="row">
            <div class="col-md-8 col-md-offset-2">

                <!--Chat widget-->
                <!--===================================================-->
                <div class="panel">
                    <!--Heading-->
                    <div class="panel-heading">
                        <div class="panel-control">
                        <!--
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
                            -->
                        </div>
                        <h3 class="panel-title">Chat</h3>
                    </div>

                    <!--Widget body-->
                    <div>
                        <div class="nano" style="height:510px">
                            <div class="nano-content pad-all">
                                <ul class="list-unstyled media-block" id="ulchat1" style="height: 500px; overflow: auto">
                                    @include('chat._conversation')
                                </ul>
                            </div>
                        </div>

                        <!--Widget footer-->
                        <div class="panel-footer">
                            <div class="row">
                                <div class="col-xs-9">
                                    <input type="text" placeholder="{{ _t('Saisissez un message') }}" class="form-control chat-input" id="chat-input">
                                </div>
                                <div class="col-xs-3">
                                    <button class="btn btn-primary btn-block" id="sendMessage" type="button">{{ _t('Envoyer') }} <i class="fa fa-paper-plane" aria-hidden="true"></i></button>
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
    <script src="https://js.pusher.com/4.1/pusher.min.js"></script>
    <script type="text/javascript">
        var token = document.head.querySelector('meta[name="csrf-token"]');

        /**
         *
         * @param name
         * @param message
         * @param time
         * @param place left or right
         * @returns {string}
         */
        function chatMessage(name, message, time, place, picture) {
            if (place == 'right') {
                speechclass = 'speech-right';
                imgflip = '';
            }
            else {
                speechclass = '';
                imgflip = 'img-flip';
            }

            var html = ' <li class="mar-btm">';
            html += '    <div class="media-' + place + '">';
            html += '        <img src="'+picture+'" class="img-circle img-user ' + imgflip + '" alt="Profile Picture">';
            html += '    </div>';
            html += '    <div class="media-body pad-hor ' + speechclass + '">';
            html += '        <div class="speech">';
            html += '            <a href="#" class="media-heading">' + name + '</a>';
            html += '            <p>' + message + '</p>';
            html += '            <p class="speech-time">';
            html += '                <i class="fa fa-clock-o icon-fw"></i> ' + time;
            html += '           </p>';
            html += '        </div>';
            html += '    </div>';
            html += '</li>';
            return html;
        }

        function scrollDownChat() {
            $('#ulchat1').scrollTop($('#ulchat1')[0].scrollHeight);
        }

        $(document).ready(function () {

            scrollDownChat();

            // Enable pusher logging - don't include this in production
            Pusher.logToConsole = true;

            var pusher = new Pusher('{{ env('PUSHER_APP_KEY') }}', {
                cluster: '{{ env('PUSHER_APP_CLUSTER') }}',
                encrypted: true,
                authEndpoint: '/ajax/pusher/auth',
                auth: {
                    headers: {
                        'X-CSRF-Token': token.content
                    }
                }
            });

            var channel = pusher.subscribe('{{ $conversation->getPusherChannel() }}');

            channel.bind('pusher:subscription_error', function (data) {
                 console.log(data);
            });
            channel.bind('pusher:subscription_succeeded', function (data) {
                console.log(data);
            });

            channel.bind('NewMessage', function (data) {
                var mypicture = '{{ asset( 'storage/'.$user->getFirstAccount()->current_unit->icon_file)}}';
                var partnerpicture = '{{ asset( 'storage/'.$partner->getFirstAccount()->current_unit->icon_file)}}';
                if (data.userid == myid)
                    $('#ulchat1').append(chatMessage(data.username, data.message, data.time, 'left', mypicture));
                else
                    $('#ulchat1').append(chatMessage(data.username, data.message, data.time, 'right', partnerpicture));
                scrollDownChat();
            });

            $('.chat-input').on('keyup', function (e) {
                if (e.keyCode == 13) {
                    $('#sendMessage').click();
                }
            });

            $('#sendMessage').on('click', function (e) {
                e.preventDefault();
                var input = $('#chat-input').val();
                if (input != '') {
                    $.post(prefix_ajax + "ajax/message", { message : input, conversation : '{{ _c($conversation->id) }}' }, function (returnedData) {
                        if (returnedData.status == 'OK')
                            $('#chat-input').val('');
                    });
                }
            });
        });

    </script>
@endsection