<header id="navbar">
    <div id="navbar-container" class="boxed">

        <!--Brand logo & name-->
        <div class="navbar-header">
            <a href="{{ route('home') }}" class="navbar-brand">
                <img src="img/200px-Game-logo.png" alt="FFBE Logo" class="brand-icon">
                <div class="brand-title">
                    <span class="brand-text">{{ config('app.name', 'Laravel') }}</span>
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
                        <i class="demo-pli-view-list"></i>
                    </a>
                </li>
                <!--End Navigation toogle button-->

             @endif

            </ul>
            <ul class="nav navbar-top-links pull-right">
                @if (Auth::guest())
                    <li><a href="{{ route('login') }}"><i class="fa fa-sign-in"></i> Login</a></li>
                    <li><a href="{{ route('register') }}"><i class="fa fa-user-plus" aria-hidden="true"></i> Sign in</a></li>
                @else
                <!--User dropdown-->
                    <li id="dropdown-user" class="dropdown">
                        <a href="#" data-toggle="" class="text-right">
                            <span class="pull-left">
                                <i class="pli-male ic-user"></i>
                            </span>
                            <div class="username hidden-xs">{{ Auth::user()->name }}</div>
                        </a>

                        <a href="{{ route('logout') }}"
                           onclick="event.preventDefault();
                                             document.getElementById('logout-form').submit();" class="btn">
                           <span class="pull-right">
                                <i class="pli-unlock icon-fw"></i>Logout
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