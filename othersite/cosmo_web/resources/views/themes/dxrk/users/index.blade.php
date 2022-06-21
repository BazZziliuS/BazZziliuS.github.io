@extends('themes.dxrk.layout')

@section('title')
    @lang('cosmo.core.users')
@endsection

@section('header')
    <h4 class="section-subheader">{{$configs['users_description']}}</h4>
    <h2 class="section-header">{{$configs['users_title']}}</h2>
@endsection

@section('header_misc')
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
@endsection

@section('content')
    @include('themes.dxrk.includes.hero')

    <div class="container my-4 staff" style="margin-top: -10rem !important">
        @if(!$users->isEmpty())
            <div class="row justify-content-center">
                @foreach($users as $user)
                    <div class="col-md-3 my-2">
                        <a class="card leader shadow mb-4 h-100" href="{{ route('users.show', $user->steamid) }}">
                            <div class="card-header mb-2" style="background-color: {{$user->role->color}};"></div>
                            <div class="card-body">
                                <div class="text-center avatar">
                                    <img src="{{$user->avatar}}" alt="User Avatar" class="rounded-sm"
                                         height="90" width="90">
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

            {{$users->links()}}
        @else
            <h2>@lang('cosmo.users.no_users-found')</h2>
        @endif
    </div>
@endsection
