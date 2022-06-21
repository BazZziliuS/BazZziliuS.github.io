@extends('themes.dxrk.layout')

@section('title')
    @lang('cosmo.core.staff')
@endsection

@section('header')
    <h4 class="section-subheader">{{ $configs['staff_description'] }}</h4>
    <h2 class="section-header">{{ $configs['staff_title'] }}</h2>
@endsection

@section('content')
    @include('themes.dxrk.includes.hero')

    <div class="container mb-5 staff" id="leadership">
        <div class="row justify-content-center">
            @foreach($users as $user)
                <div class="col-md-3 my-2">
                    <a class="card leader shadow mb-4 h-100" href="{{ route('users.show', $user->steamid) }}">
                        <div class="card-header mb-2" style="background-color: {{$user->role->color}};"></div>
                        <div class="card-body">
                            <div class="text-center avatar">
                                <img src="{{$user->avatar}}" alt="User Avatar" class="rounded-sm"
                                     style="max-height: 90px;">
                            </div>
                            <div class="text-center mt-3 text-truncate">
                                <h4 class="card-title"
                                    data-tippy-content="{{$user->steamid}}">{{$user->username}}</h4>
                                <h6 class="card-role"
                                    style="color: {{$user->role->color}};">{{$user->role->display_name}}</h6>
                            </div>
                        </div>
                    </a>
                </div>
            @endforeach
        </div>
    </div>
@endsection