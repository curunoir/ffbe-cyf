<header id="navbar">
    <div id="navbar-container" class="boxed">

        <!--Brand logo & name-->
        <div class="navbar-header">
            <a href="{{ route('home') }}" class="navbar-brand">
                <div class="brand-title">
                    <span class="brand-text"><img src="{{ asset('img/200px-Game-logo.png') }}" alt="FFBE Logo" style="width:36px;"> {{ config('app.name', 'FFBE-CYF') }}</span>
                </div>
            </a>
        </div>
        <!--End brand logo & name-->

        <!--Navbar Dropdown-->
        <div class="navbar-content clearfix">
            <ul class="nav navbar-top-links pull-left">

            @if (!Auth::guest())
                <!--Navigation toogle button-->
                <li class="tgl-menu-btn">
                    <a class="mainnav-toggle" href="#">
                        <i class="fa fa-list"></i>
                    </a>
                </li>
                <!--End Navigation toogle button-->

             @endif

            </ul>
            <ul class="nav navbar-top-links pull-right">
                @if (Auth::guest())
                    <li><a href="{{ route('login') }}"><i class="fa fa-sign-in"></i> {{ _t('Connexion') }}</a></li>
                    <li><a href="{{ route('register') }}"><i class="fa fa-user-plus" aria-hidden="true"></i> {{ _t("Nouveau ?") }}</a></li>
                @else
                <!--User dropdown-->
                    <li id="dropdown-user" class="dropdown">
                        <a href="{{ route('accounts.index') }}" data-toggle="" class="text-right">
                            <span class="pull-left">
                                <i class="fa fa-user"></i>
                                <span class="hidden-xs"> {{ Auth::user()->name }}</span>
                            </span>

                        </a>

                        <a href="{{ route('logout') }}"
                           onclick="event.preventDefault();
                                             document.getElementById('logout-form').submit();" class="btn">
                           <span class="pull-right">
                                <i class="fa fa-sign-out"></i>{{ _t('Déconnexion') }}
                           </span>
                        </a>

                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            {{ csrf_field() }}
                        </form>

                    </li>
                @endif
            </ul>
        </div>
    </div>
</header>
<!--END NAVBAR-->