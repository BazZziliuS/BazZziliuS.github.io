@extends('themes.lara.layout')

@section('title')
    @lang('cosmo.core.users')
@endsection

@section('header_title')
    <h3 class="title">{{ $configs['users_title'] }}</h3>
    <p class="subtitle">{{ $configs['users_description'] }}</p>
@endsection

@section('content')
    @include('themes.lara.includes.header')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form action="{{route('users.search')}}" method="post">
                    @csrf
                    <div class="form-group">
                        <input type="text" name="search" placeholder="Search Users..." class="form-control" value="{{$search}}">
                    </div>
                </form>
            </div>
        </div>
    </div>


    <div class="container my-5" id="leaders">
        @if(!$users->isEmpty())
            <div class="row justify-content-center">
                @foreach($users as $user)
                    <div class="col-md-3 my-3">
                        <a href="{{ route('users.show', $user->steamid) }}" class="card leader shadow text-center p-4">
                            <img src="{{$user->avatar}}" alt="user profile picture" class="rounded-circle mb-3 mx-auto" height="60" width="60">
                            <div class="text-truncate">
                                <h4>{{$user->username}}</h4>
                                <h4 class="leader-role" style="color: {{$user->role->color}}">{{$user->role->name}}</h4>
                            </div>
                        </a>
                    </div>
                @endforeach
            </div>
        @else
            <h2>@lang('cosmo.users.no_users-found')</h2>
        @endif
    </div>
@endsection
