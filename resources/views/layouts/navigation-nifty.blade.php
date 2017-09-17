<nav id="mainnav-container">
    <div id="mainnav">

        <!--Menu-->
        <div id="mainnav-menu-wrap">
            <div class="nano">
                <div class="nano-content">

                    <ul id="mainnav-menu" class="list-group">

                        <!--Category name-->
                        <li class="list-header">{{ _t('Navigation') }}</li>
                            <!--Submenu-->
                            <ul class="collapse in" aria-expanded="true">
                                <li><a href="{{ route('profile') }}" class=""><i class="fa fa-user "></i> {{ _t('Votre profil') }}</a></li>
                            </ul>
                            <ul class="collapse in" aria-expanded="true">
                                <li><a href="{{ action('AccountsController@index') }}" class=""><i class="fa fa-gamepad"></i> {{ _t('Vos comptes') }}</a></li>
                            </ul>
                            <ul class="collapse in" aria-expanded="true">
                                <li><a href="{{ action('FriendsController@index') }}" class=""><i class="fa fa-users"></i> {{ _t('Chercher des amis') }}</a></li>
                            </ul>

                        <li class="list-divider"></li>

                    </ul>

                </div>
            </div>
        </div>
        <!--End menu-->

    </div>
</nav>
<!--END MAIN NAVIGATION-->