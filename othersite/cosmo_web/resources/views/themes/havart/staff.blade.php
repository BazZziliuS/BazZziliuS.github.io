@extends('themes.havart.layout')

@section('title')
    @lang('cosmo.core.staff')
@endsection

@section('header_title')
    <h1 class="title">{{ $configs['staff_title'] }}</h1>
    <h3 class="subtitle">{{ $configs['staff_description'] }}</h3>
@endsection

@section('content')
    @include('themes.havart.includes.header')
    <div id="staff-cont">
        <img src="{{ asset('themes/havart/img/svgs/f_circle.svg') }}" alt="" class="svg_1">
        <div class="container my-5 leadership">
            <img src="{{ asset('themes/havart/img/svgs/elipsis8x4.svg') }}" alt="" class="svg_2">
            <div class="row justify-content-center">
                @foreach($users as $leader)
                    <div class="col-md-3 my-3">
                        <a class="card leader h-100 border-0 shadow" href="{{route('users.show', $leader->steamid)}}">
                            <div class="card-header" style="background-color: {{ $leader->role->color }}"></div>
                            <div class="card-body">
                                <div class="content d-flex text-truncate">
                                    <img src="{{ $leader->avatar }}" alt="" class="img-fluid rounded-circle d-inline mr-2">
                                    <div>
                                        <h3 class="card-title d-inline">{{ $leader->username }}</h3>
                                        <h4 class="role">{{ $leader->role->display_name }}</h4>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
@endsection