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
                                <a href="{{ action('UnitsController@index') }}" class="list-group-item">
                                    <i class="fa fa-pied-piper"></i> {{ _t('Gestion des unités') }}
                                </a>
                            </div>
                        @endif
                    </div>
                    <ul id="mainnav-menu" class="list-group">
                        <!--Category name-->
                        <li class="list-header ">{{ _t('Navigation') }}</li>
                            <!--Submenu-->
                        <li class="">
                            <a href="{{ route('profile') }}" class=""><i class="fa fa-user "></i> {{ _t('Votre profil') }}</a>
                        </li>
                        <li class="" >
                            <a href="{{ action('AccountsController@index') }}" class=""><i class="fa fa-gamepad"></i> {{ _t('Vos comptes') }}</a>
                        </li>
                        <li class="">
                            <a href="{{ action('FriendsController@index') }}" class=""><i class="fa fa-users"></i> {{ _t('Chercher des amis') }}</a>
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