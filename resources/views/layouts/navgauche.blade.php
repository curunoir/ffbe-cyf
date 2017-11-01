<nav id="mainnav-container">
    <div id="mainnav">
        <!--Menu-->
        <div id="mainnav-menu-wrap">
            <div class="nano">
                <div class="nano-content">
                    <div id="mainnav-profile" class="mainnav-profile">
                        <div class="profile-wrap">
                            <a href="#profile-nav" class="box-block collapsed" data-toggle="collapse" aria-expanded="false">
                                            <span class="pull-right dropdown-toggle">
                                                <i class="dropdown-caret"></i>
                                            </span>
                                <p class="mnp-name">{{ Auth::user()->name }}</p>
                                <span class="mnp-desc">{{ Auth::user()->email }}</span>
                            </a>
                        </div>
                        @if( admin())
                            <div id="profile-nav" class="list-group bg-trans collapse" aria-expanded="false" style="height: 2px;">
                                <a href="{{ action('UnitsController@create6') }}" class="list-group-item">
                                    <i class="fa fa-pied-piper"></i> {{ _t('Ajouter une unité 6 étoiles') }}
                                </a>
                                <a href="{{ action('UnitsController@create5') }}" class="list-group-item">
                                    <i class="fa fa-pied-piper"></i> {{ _t('Ajouter une unité 5 étoiles') }}
                                </a>
                                <a href="{{ action('UnitsController@multiple') }}" class="list-group-item">
                                    <i class="fa fa-pied-piper"></i> {{ _t('Editer les unites') }}
                                </a>
                            </div>
                        @endif
                    </div>

                    <ul id="mainnav-menu" class="list-group">
                        <!--Category name-->
                        <li class="list-header ">{{ _t('Navigation') }}</li>

                        <li class="" >
                            <a href="{{ action('AccountsController@index') }}" class=""><i class="fa fa-gamepad"></i> {{ _t('Vos comptes') }}</a>
                        </li>
                        <li class="">
                            <a href="{{ action('FriendsController@index') }}" class=""><i class="fa fa-users"></i> {{ _t('Chercher des amis') }}</a>
                        </li>
                        <li class="">
                            <a href="{{ action('FriendsController@receivedRequestsIndex') }}" class=""><i class="fa fa-handshake-o"></i> {{ _t('Requêtes reçues') }}</a>
                        </li>
                        <li class="">
                            <a href="{{ action('ChatsController@index') }}" class=""><i class="fa fa-weixin"></i> {{ _t('Chat') }}</a>
                        </li>
                        <li class="list-divider"></li>
                    </ul>

                </div>

            </div>
        </div>
        <!--End menu-->
    </div>
</nav>
<!--END MAIN NAVIGATION-->