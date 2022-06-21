@extends('themes.lara.users.show._layout')

@section('profile-content')
    <div class="p-2 profile-bio text-center">
        {!! $user->profile->bio !!}
    </div>
    <div class="d-flex">
        <div class="d-inline flex-grow-1">
            <div class="p-1 profile-signature text-left">
                {!! $user->profile->signature !!}
            </div>
        </div>
        <div class="d-inline flex-shrink-0 mt-auto">
            <div class="p-1 profile-signature text-right">
                @lang('cosmo.users.user_joined'): {!! $user->created_at->diffForHumans() !!}
            </div>
        </div>
    </div>
@endsection