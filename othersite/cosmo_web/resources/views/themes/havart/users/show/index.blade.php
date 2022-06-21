@extends('themes.havart.users.show._layout')

@section('profile-content')
    <div class="card mt-4">
        <div class="card-body mb-0 pb-0">
            <div class="mb-5 profile-bio text-center">
                {!! $user->profile->bio !!}
            </div>

            <div class="d-flex">
                <div class="d-inline flex-grow-1 mt-auto">
                    <p>@lang('cosmo.users.user_joined'): {{$user->created_at->diffForHumans()}}</p>
                </div>
                <div class="d-inline flex-shrink-0 flex-shrink-0 my-auto">
                    {!! $user->profile->signature !!}
                </div>
            </div>
        </div>
    </div>
@endsection