@extends('themes.purity.layout')

@section('title')
    {{ $user->username }}
@endsection

@section('page_titles')
    <h3 class="subtitle text-truncate">@lang('cosmo.users.welcome_to_profile')</h3>
    <h1 class="title text-truncate">{{ $user->username }}</h1>
@endsection

@section('content')
    <div class="container" id="profile">
        <div class="card mb-3 shadow border-0 h-100 gradient_bottom">
            <div class="card-body">
                <ul class="nav nav-pills" id="pills-tab" role="tablist">
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
                </ul>
            </div>
        </div>

        <div class="card h-100 shadow border-0">
            @yield('profile-content')
        </div>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/likes.js') }}"></script>
@endpush