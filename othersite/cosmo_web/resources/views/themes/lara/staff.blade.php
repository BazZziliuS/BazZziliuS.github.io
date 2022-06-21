 @extends('themes.lara.layout')

@section('title')
    @lang('cosmo.core.staff')
@endsection

@section('header_title')
    <h3 class="title">{{ $configs['staff_title'] }}</h3>
    <p class="subtitle">{{ $configs['staff_description'] }}</p>
@endsection

@section('content')
    @include('themes.lara.includes.header')

    <div class="container my-5" id="leaders">
        <div class="row justify-content-center">
            @foreach($users as $user)
                <div class="col-md-3 my-3">
                    <a href="{{ route('users.show', $user->steamid) }}" class="card leader shadow text-center p-4">
                        <img src="{{$user->avatar}}" alt="user profile picture" class="rounded-circle mb-3" style="max-width: 5rem; height: auto; margin-left: 6rem">
                        <div class="text-truncate">
                            <h4>{{$user->username}}</h4>
                            <h4 class="leader-role" style="color: {{$user->role->color}}">{{$user->role->display_name}}</h4>
                        </div>
                    </a>
                </div>
            @endforeach
        </div>
    </div>
@endsection