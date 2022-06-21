<nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
        <a href="{{ route('home') }}" class="navbar-brand">
            @if (!empty($configs['site_logo']))
                <img src="{{$configs['site_logo']}}" alt="{{$configs['site_name']}}" class="img-fluid"><span class="ml-2">{{$configs['site_name']}}</span>
            @else
                <h4>{{$configs['site_name']}}</h4>
            @endif
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarText">
            <ul class="navbar-nav ml-auto">
                @foreach($navlinks as $category => $links)
                    @if (!empty($category))
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown"
                               aria-haspopup="true" aria-expanded="false">{{ $category }}
                            </a>
                            <div class="dropdown-menu" style="margin-top: 1.55rem !important" aria-labelledby="navbarDropdown">
                                @foreach($links as $link)
                                    <a class="dropdown-item" href="{{$link->url}}">
                                        <span class="fa-stack fa-2x" style="font-size: 1.4em !important">
                                          <i class="fas fa-square fa-stack-2x" style="color: {{ $link->color }}"></i>
                                          <i class="{{ $link->icon }} fa-stack-1x fa-inverse"></i>
                                        </span>
                                        <span class="my-auto">{{ $link->name }}</span>
                                    </a>
                                @endforeach
                            </div>
                        </li>
                    @else
                        @foreach($links as $link)
                            <li class="nav-item">
                                <a class="nav-link" href="{{ $link->url }}">{{ $link->name }}</a>
                            </li>
                        @endforeach
                    @endif
                @endforeach

                @if(auth()->check())
                    <li class="nav-item dropdown my-auto">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false">
                            {{ trans('cosmo.navbar.welcome_back', ['username' => auth()->user()->username]) }}
                        </a>
                        <div class="dropdown-menu" style="margin-top: 1.55rem !important" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item mb-2" href="{{ route('users.show', auth()->user()->steamid) }}">
                                <span class="fa-stack fa-2x" style="font-size: 1.55em !important;">
                                  <i class="fas fa-square fa-stack-2x"></i>
                                  <i class="fad fa-user fa-stack-1x fa-inverse"></i>
                                </span>
                                <div class="d-inline-block my-auto content">
                                    <h5>@lang('cosmo.navbar.profile')</h5>
                                    <p class="m-0 p-0">@lang('cosmo.navbar.visit_profile')</p>
                                </div>
                            </a>
                            <a class="dropdown-item mb-2" href="{{ route('notifications') }}">
                                <span class="fa-stack fa-2x" style="font-size: 1.55em !important;">
                                  <i class="fas fa-square fa-stack-2x" style="color: {{ auth()->user()->unreadNotifications->count() > 0 ? '#00b894' : '#6c5ce7' }}"></i>
                                  <i class="fad fa-bell fa-stack-1x fa-inverse"></i>
                                </span>
                                <div class="d-inline-block my-auto content">
                                    <h5>@lang('cosmo.navbar.notifications')
                                    @if(auth()->user()->unreadNotifications->count() > 0)
                                        <span class="badge badge-warning text-white">{{auth()->user()->unreadNotifications->count()}}</span>
                                    @endif
                                    </h5>
                                    <p class="m-0 p-0">@lang('cosmo.notifications.manage')</p>
                                </div>
                            </a>
                            @if(auth()->user()->can('view-management'))
                                <a class="dropdown-item mb-2" href="{{ route('manage.dashboard') }}" target="_blank">
                                <span class="fa-stack fa-2x" style="font-size: 1.55em !important;">
                                  <i class="fas fa-square fa-stack-2x" style="color: #0984e3"></i>
                                  <i class="fad fa-cogs fa-stack-1x fa-inverse"></i>
                                </span>
                                    <div class="d-inline-block my-auto content">
                                        <h5>@lang('cosmo.navbar.management')</h5>
                                        <p class="m-0 p-0">@lang('cosmo.navbar.manage_cosmo')</p>
                                    </div>
                                </a>
                            @endif

                            <form action="{{ route('logout') }}" method="post">
                                @csrf

                                <button type="submit" class="dropdown-item">
                                    <span class="fa-stack fa-2x" style="font-size: 1.55em !important;">
                                      <i class="fas fa-square fa-stack-2x" style="color: #d63031"></i>
                                      <i class="fad fa-portal-exit fa-stack-1x fa-inverse"></i>
                                    </span>
                                    <div class="d-inline-block my-auto content">
                                        <h5>@lang('cosmo.navbar.logout')</h5>
                                    </div>
                                </button>
                            </form>
                        </div>
                    </li>
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