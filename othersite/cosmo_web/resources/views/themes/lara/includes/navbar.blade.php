<nav class="navbar navbar-expand-lg navbar-transparent navbar-dark">
    <div class="container">
        <a href="{{route('home')}}" class="navbar-brand">
            @if(!empty($configs["site_logo"]))
                <img src="{{$configs["site_logo"]}}" alt="Community Logo"
                     style="max-height: 1.5rem; margin-right: .3rem;">
            @endif
            {{$configs["site_name"]}}
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="nav navbar-nav ml-auto">
                @foreach($navlinks as $category => $links)
                    @if (!empty($category))
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{ $category }}
                            </a>
                            <div class="dropdown-menu drops" aria-labelledby="navbarDropdown">
                                @foreach($links as $link)
                                    <a class="dropdown-item" href="{{$link->url}}">
                                        <i class="{{$link->icon}}" style="color: {{ $link->color }}"></i> {{$link->name}}
                                    </a>
                                @endforeach
                            </div>
                        </li>
                    @else
                        @foreach($links as $link)
                            <li class="nav-item">
                                <a class="nav-link" href="{{$link->url}}">
                                    <i class="{{$link->icon}}" style="color: {{ $link->color }}"></i>
                                    {{$link->name}}
                                </a>
                            </li>
                        @endforeach
                    @endif
                @endforeach

                @if(auth()->check())
                    <div class="dropdown my-auto ml-1">
                        <a class="dropdown-toggle" type="button" id="navbar-dropdown" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false">
                            <img src="{{auth()->user()->avatar}}" class="rounded-circle"
                                 style="max-height: 24px; max-width: 24px">
                            <span>{{ auth()->user()->username }}</span>
                        </a>
                        <div class="dropdown-menu user-auth dropdown-menu-left" aria-labelledby="navbar-dropdown">
                            <div class="dropdown_content align-items-center justify-content-center align-content-center">
                                <a class="dropdown-item" href="{{route('users.show', auth()->user()->steamid)}}">
                                    <div class="d-flex">
                                        <div class="d-inline my-auto mr-3">
                                            <i class="fad fa-user fa-2x"></i>
                                        </div>
                                        <div class="d-inline">
                                            <h5 class="link-title mb-0">@lang('cosmo.navbar.profile')</h5>
                                            <p class="mb-0 link-desc description d-none d-md-inline-block">
                                                @lang('cosmo.navbar.visit_profile')</p>
                                        </div>
                                    </div>
                                </a>

                                @if(auth()->user()->can('view-management'))
                                    <a class="dropdown-item" href="{{route('manage.dashboard')}}" target="_blank">
                                        <div class="d-flex">
                                            <div class="d-inline my-auto mr-3">
                                                <i class="fad fa-cog fa-2x"></i>
                                            </div>
                                            <div class="d-inline">
                                                <h5 class="link-title mb-0">@lang('cosmo.navbar.management')</h5>
                                                <p class="mb-0 link-desc description d-none d-md-inline-block">
                                                    @lang('cosmo.navbar.manage_cosmo')</p>
                                            </div>
                                        </div>
                                    </a>
                                @endif
                            </div>
                            <div class="dropdown-menu_footer">
                                <div class="d-flex">
                                    <div class="d-inline my-auto">
                                        <form action="{{ route('logout') }}" method="post">
                                            @csrf

                                            <button class="dropdown-item logout" type="submit">
                                                <i class="fad fa-sign-out-alt"></i> @lang('cosmo.management.navigation.logout')</button>
                                        </form>
                                    </div>
                                    <div class="d-inline my-auto ml-auto">
                                        <a href="{{route('notifications')}}" class="dropdown-item notify">
                                            @if(auth()->user()->unreadNotifications->count() > 0)
                                                <span class="bell_color">
                                                        <i class="fad fa-bell"></i>
                                                </span>
                                            @else
                                                <i class="fad fa-bell"></i>
                                            @endif
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @else
                    <li class="nav-item my-auto">
                        <a class="nav-link" href="{{route('login.steam')}}">
                            <img src="{{ asset('img/steam_login.png') }}" alt="Steam Login"
                                 class="img-fluid">
                        </a>
                    </li>
                @endif
            </ul>
        </div>
    </div>
</nav>