<nav id="mainnav-container">
    <div id="mainnav">

        <!--Menu-->
        <div id="mainnav-menu-wrap">
            <div class="nano">
                <div class="nano-content">

                    <ul id="mainnav-menu" class="list-group">

                        <!--Category name-->
                        <li class="list-header">Navigation</li>
                            <!--Submenu-->
                            <ul class="collapse in" aria-expanded="true">
                                <li><a href="{{ route('profile') }}" class=""><i class="psi-male ic-user"></i> Profil</a></li>
                            </ul>
                            <ul class="collapse in" aria-expanded="true">
                                <li><a href="{{ action('FriendsController@index') }}" class=""><i class="psi-angel ic-user"></i> Search friends</a></li>
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