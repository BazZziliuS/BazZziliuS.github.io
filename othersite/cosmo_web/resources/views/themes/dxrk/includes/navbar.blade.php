<nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container">
        <a class="navbar-brand" href="#">{{$configs['site_name']}}</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="nav navbar-nav ml-auto">
                @foreach($navlinks as $category => $links)
                    @if (!empty($category))
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                               role="button" data-toggle="dropdown" aria-haspopup="true"
                               aria-expanded="false"><i class="fad fa-folders mr-1"></i>{{$category}}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                @foreach($links as $link)
                                    <a class="dropdown-item" href="{{$link->url}}">
                                        @if($link->icon)
                                            <i class="{{$link->icon}}" style="color: {{$link->color}}"></i>
                                        @endif
                                        {{$link->name}}
                                    </a>
                                @endforeach
                            </div>
                        </li>
                    @else
                        @foreach($links as $link)
                            <li class="nav-item">
                                <a class="nav-link" href="{{$link->url}}">
                                    @if($link->icon)
                                        <i class="{{$link->icon}}" style="color: {{$link->color}}"></i>
                                    @endif
                                    {{$link->name}}
                                </a>
                            </li>
                        @endforeach
                    @endif
                @endforeach
            </ul>

            <span class="ml-auto navbar-text w-25">
                @if(auth()->check())
                    <div class="dropdown">
                        <a class="dropdown-toggle text-truncate" type="button" id="navbar-dropdown" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false">{{ auth()->user()->username }}
                            <img alt="profilePicture" src="{{auth()->user()->avatar}}"
                                 class="rounded ml-1" height="35" width="35">
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-dropdown">
                            <a class="dropdown-item" href="{{route('users.show', auth()->user()->steamid)}}">
                                @lang('cosmo.navbar.profile')
                            </a>
                            <a class="dropdown-item" href="{{route('notifications')}}">
                                @lang('cosmo.navbar.notifications')
                                @if(auth()->user()->unreadNotifications->count() > 0)
                                    <span class="ml-2 badge badge-danger">NEW</span>
                                @endif
                            </a>

                            @if(auth()->user()->can('view-management'))
                                <a href="{{route('manage.dashboard')}}" class="dropdown-item" target="_blank">
                                    @lang('cosmo.navbar.management')
                                </a>
                            @endif
                            <div class="dropdown-divider"></div>

                            <form action="{{ route('logout') }}" method="post">
                                @csrf
                                <button class="dropdown-item" type="submit">@lang('cosmo.navbar.logout')</button>
                            </form>
                        </div>
                    </div>
                @else
                    <a href="{{route('login.steam')}}">
                        <img src="{{ asset('img/steam_login.png') }}" alt="Steam Login"
                             class="img-fluid">
                    </a>
                @endif
            </span>
        </div>
    </div>
</nav>
