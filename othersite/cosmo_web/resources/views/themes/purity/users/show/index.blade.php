@extends('themes.purity.users.show._layout')

@section('profile-content')
    <div class="card-header d-flex mb-0">
        <h3 class="card-title text-truncate d-inline mr-auto">@lang('cosmo.navbar.profile')</h3>

        <div class="like d-inline">
            <button class="btn btn-like" onclick="giveLike('{{$user->steamid}}');">
                <i class="fas fa-heart {{ $user->profile->likes_count > 0 ? 'fa-beat fa-green' : 'text-white'}}"></i>
                <span class="likes" id="likes-amount">{{ $user->profile->likes_count }}</span>
            </button>
        </div>
    </div>
    <div class="card-body">
        <div class="upper d-flex">
            <div class="d-inline-flex mr-auto">
                <div class="d-inline-flex">
                    <img src="{{ $user->avatar }}" alt="{{ $user->username }}'s avatar" class="img-fluid rounded avatar my-auto">
                </div>
                <div class="info d-inline my-auto">
                    <h4 class="username">{{ $user->username }}</h4>
                    <h5 class="role"
                        style="color: {{ $user->role->color ? $user->role->color : '#fff' }} !important">{{ $user->role->name }}</h5>
                </div>
            </div>
            <div class="d-inline ml-auto my-auto">
                <div class="d-block">
                    <p class="created mb-0 pb-0">@lang('cosmo.users.user_joined')
                        : {{ $user->created_at->diffForHumans() }}</p>
                </div>
                <div class="d-block signature">
                    {!! $user->profile->signature !!}
                </div>
            </div>
        </div>
        <div class="bio mt-2 w-50" style="color: rgba(255,255,255,.75)">{!! $user->profile->bio !!}</div>
    </div>
@endsection