@extends('themes.lara.layout')

@section('title')
    {{$user->username}}
@endsection

@push('style')
    <style>
        .header {
            @if($user->profile->background_img)
                background: linear-gradient(180deg, rgba(28, 28, 33, 0.6) 34%, rgba(28, 28, 33, 0.7) 50%, rgba(28, 28, 33, 0.8) 100%), url({{ proxy_image($user->profile->background_img) }}) !important;
                background-repeat: no-repeat !important;
                background-size: cover !important;
                background-position: center !important;
            @else
                background: linear-gradient(to right, #4e73df 10%, #224abe 100%) !important;
            @endif
        }
    </style>
@endpush

@section('header_title')
    <h3 class="title">{{ $user->username }}</h3>
    <p class="subtitle">@lang('cosmo.users.welcome_to_profile')</p>
@endsection

@section('content')
    @include('themes.lara.includes.header')

    <div class="container p-3" id="users_show">
        <div class="d-flex mb-3">
            <div class="d-inline my-auto">
                <img src="{{$user->avatar}}" alt="User Avatar" class="rounded img-fluid" height="90" width="90">
            </div>
            <div class="d-inline-flex flex-grow-1 ml-2">
                <div class="text">
                    <h1 class="profile-name">{{$user->username}}</h1>
                    <h5>
                        <span class="badge user-role" style="background-color: {{$user->role->color}}">{{$user->role->display_name}}</span>
                    </h5>
                </div>
            </div>
            <div class="d-inline-flex ml-auto flex-shrink-0">
                <div class="likes mt-3">
                    <p class="d-inline" onclick="giveLike('{{$user->steamid}}');">
                        <i class="fas fa-heart text-white"></i>
                    </p>
                    <span class="text-muted" id="likes-amount">{{ $user->profile->likes_count }}</span>
                </div>
            </div>
        </div>

        <div class="row cards">
            <div class="col-md-3">
                <div class="card shadow border-0 lefty">
                    <div class="card-body">
                        <div class="nav flex-column nav-pills mt-4" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <li class="nav-item">
                                <a class="nav-link mb-sm-3 mb-md-0 {{ Route::currentRouteName() === 'users.show' ? 'active' : '' }}"
                                   href="{{ route('users.show', $user->steamid) }}">
                                    <i class="fad fa-home-alt mr-2"></i>@lang('cosmo.users.pills.home')
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link mb-sm-3 mb-md-0 {{ Route::currentRouteName() === 'users.show.comments' ? 'active' : '' }}"
                                   href="{{ route('users.show.comments', $user->steamid) }}">
                                    <i class="fad fa-comment-alt mr-2"></i>@lang('cosmo.users.pills.comments')
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link mb-sm-3 mb-md-0 {{ Route::currentRouteName() === 'users.show.threads' ? 'active' : '' }}"
                                   href="{{ route('users.show.threads', $user->steamid) }}">
                                    <i class="fad fa-comment-alt-dots mr-2"></i>@lang('cosmo.users.pills.threads')
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link mb-sm-3 mb-md-0 {{ Route::currentRouteName() === 'users.show.achievements' ? 'active' : '' }}"
                                   href="{{ route('users.show.achievements', $user->steamid) }}">
                                    <i class="fad fa-trophy-alt mr-2"></i>
                                    @lang('cosmo.users.pills.achievements')
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link mb-sm-3 mb-md-0"
                                   href="https://steamcommunity.com/profiles/{{$user->steamid}}">
                                    <i class="fab fa-steam mr-2"></i>
                                    Steam Profile
                                </a>
                            </li>
                            @can('update', $user->profile)
                                <li class="nav-item">
                                    <a class="nav-link mb-sm-3 mb-md-0 {{ Route::currentRouteName() === 'users.edit' ? 'active' : '' }}"
                                       href="{{ route('users.edit', $user->steamid) }}">
                                        <i class="fad fa-user-edit mr-2"></i>@lang('cosmo.users.pills.edit')
                                    </a>
                                </li>
                            @endcan
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-9">
                <div class="card h-100 shadow border-0 righty">
                    <div class="card-body">
                        @yield('profile-content')
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/likes.js') }}"></script>
@endpush