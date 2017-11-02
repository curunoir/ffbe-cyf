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
                        <a href="#" data-toggle="dropdown" class="dropdown-toggle text-right" aria-expanded="false">
                            <span class="pull-right">
                                @if(!empty(Auth::getUser()->getFirstAccount()))
                                    <img class="img-circle img-user media-object" src="{{ asset( 'storage/'.Auth::getUser()->getFirstAccount()->current_unit->icon_file)}}" alt="Unit Picture">
                                @else
                                    <i class="fa fa-user fa-2x"></i>
                                @endif
                            </span>
                            <div class="username hidden-xs">{{ Auth::user()->name }}</div>
                        </a>

                        <div class="dropdown-menu dropdown-menu-md dropdown-menu-right panel-default">

                            <!-- User dropdown menu -->
                            <ul class="head-list">
                                <li>
                                    <a href="#">
                                        <i class="demo-pli-male icon-lg icon-fw"></i> {{ _t('Profil') }}
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span class="badge badge-danger pull-right">9</span>
                                        <i class="demo-pli-mail icon-lg icon-fw"></i> {{ _t('Messages') }}
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="demo-pli-information icon-lg icon-fw"></i> {{ _t('Aide') }}
                                    </a>
                                </li>
                            </ul>

                            <!-- Dropdown footer -->
                            <div class="pad-all text-right">
                                <a href="{{ route('logout') }}" class="btn btn-primary" onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                                    <i class="fa fa-lock "></i> {{ _t('Déconnexion') }}
                                </a>
                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                </form>
                            </div>
                        </div>
                    </li>

                    <li>
                        <i class="pointer pad-rgt aside-toggle navbar-aside-icon fa fa-comment fa-2x"> </i>
                    </li>
                @endif
            </ul>
        </div>
    </div>
</header>
<!--END NAVBAR-->