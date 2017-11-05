<!--ASIDE-->
<!--===================================================-->
<aside id="aside-container" class="aside-fixed">
    <div id="aside">
        <div class="nano">
            <div class="nano-content">
                <li class="list-header ">{{ _t('Discussions') }}</li>
                <div>
                <!--
                    <p class="pad-hor mar-top text-semibold text-main">
                        <span class="pull-left badge badge-success">{{ _t('En ligne') }}</span>
                        <span class="pull-right badge badge-warning">3</span>
                    </p>
                       <hr>
-->


                    <div class="list-group bg-trans">
                        @foreach(Auth::getUser()->friends as $frienduser)
                        <a href="{{ action('ChatsController@talk', _c($frienduser->user_friend->id)) }}" class="list-group-item gochat" data-id="{{ _c($frienduser->user_friend->id) }}">
                            <span class="pull-left">
                                <img class="img-circle img-user media-object"
                                                         src="{{ asset( 'storage/'.$frienduser->friend_account->current_unit->icon_file)}}" alt="Unit Picture">
                            </span>
                            <span class="padt-lft">{{ $frienduser->user_friend->name }} - {{ $frienduser->friend_account->name }}</span>
                        </a>
                        @endforeach
                    </div>
                </div>

                <!-- options
                <ul class="list-group pad-btm bg-trans">
                    <li class="list-header"><p class="text-semibold text-main mar-no">{{ _t('Options rapides') }}</p></li>
                    <li class="list-group-item">
                        <div class="pull-right">
                            <input class="toggle-switch" id="demo-switch-4" type="checkbox" checked>
                            <label for="demo-switch-4"></label>
                        </div>
                        {{ _t('Apparaître connecté') }}
                    </li>
                    <li class="list-group-item">
                        <div class="pull-right">
                            <input class="toggle-switch" id="demo-switch-5" type="checkbox" checked>
                            <label for="demo-switch-5"></label>
                        </div>
                        {{ _t('Montrer amis hors-ligne') }}
                    </li>
                </ul>
-->
            </div>
        </div>
    </div>
</aside>
<!--===================================================-->
<!--END ASIDE-->
