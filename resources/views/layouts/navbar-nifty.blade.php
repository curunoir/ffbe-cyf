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

                    <li class="mega-dropdown">
                        <a href="#" class="mega-dropdown-toggle">
                            <i class="demo-pli-layout-grid"></i>
                        </a>
                        <div class="dropdown-menu mega-dropdown-menu">
                            <div class="row">
                                <div class="col-sm-4 col-md-3">

                                    <!--Mega menu list-->
                                    <ul class="list-unstyled">
                                        <li class="dropdown-header"><i class="demo-pli-file icon-fw"></i> Pages</li>
                                        <li><a href="{{ route('profile') }}"><i class="pli-male ic-user"></i> Profile</a></li>
                                        <li><a href="#">Search Result</a></li>
                                    </ul>

                                </div>
                                <div class="col-sm-4 col-md-3">

                                    <!--Mega menu list-->
                                    <ul class="list-unstyled">
                                        <li class="dropdown-header"><i class="demo-pli-mail icon-fw"></i> Mailbox</li>
                                        <li><a href="#"><span class="pull-right label label-danger">Hot</span>Indox</a></li>
                                        <li><a href="#">Read Message</a></li>
                                        <li><a href="#">Compose</a></li>
                                    </ul>
                                    <p class="pad-top mar-top bord-top text-sm">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.</p>
                                </div>
                                <div class="col-sm-4 col-md-3">
                                    <!--Mega menu list-->
                                    <ul class="list-unstyled">
                                        <li>
                                            <a href="#" class="media mar-btm">
                                                <span class="badge badge-success pull-right">90%</span>
                                                <div class="media-left">
                                                    <i class="demo-pli-data-settings icon-2x"></i>
                                                </div>
                                                <div class="media-body">
                                                    <p class="text-semibold text-dark mar-no">Data Backup</p>
                                                    <small class="text-muted">This is the item description</small>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="media mar-btm">
                                                <div class="media-left">
                                                    <i class="demo-pli-support icon-2x"></i>
                                                </div>
                                                <div class="media-body">
                                                    <p class="text-semibold text-dark mar-no">Support</p>
                                                    <small class="text-muted">This is the item description</small>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="media mar-btm">
                                                <div class="media-left">
                                                    <i class="demo-pli-computer-secure icon-2x"></i>
                                                </div>
                                                <div class="media-body">
                                                    <p class="text-semibold text-dark mar-no">Security</p>
                                                    <small class="text-muted">This is the item description</small>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="media mar-btm">
                                                <div class="media-left">
                                                    <i class="demo-pli-map-2 icon-2x"></i>
                                                </div>
                                                <div class="media-body">
                                                    <p class="text-semibold text-dark mar-no">Location</p>
                                                    <small class="text-muted">This is the item description</small>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>

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