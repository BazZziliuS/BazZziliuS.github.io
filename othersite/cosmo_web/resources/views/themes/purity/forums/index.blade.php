@extends('themes.purity.layout')

@section('title')
    @lang('cosmo.core.forums')
@endsection

@section('page_titles')
    <h3 class="subtitle text-truncate">{{ $configs['forums_description'] }}</h3>
    <h1 class="title text-truncate">{{ $configs['forums_title'] }}</h1>
@endsection

@section('crumbs')
    <li class="breadcrumb-item"><a href="{{ route('home') }}">@lang('cosmo.core.home')</a></li>
    <li class="breadcrumb-item"><a href="{{ route('forums.index') }}">@lang('cosmo.core.forums')</a></li>
@endsection

@section('content')
    <div class="container" id="forums">
        @include('themes.purity.forums.breadcrumb')

        <div class="row">
            @if(!(bool)config('cosmo.forums.left_layout'))
                <div class="col-12 col-md-9">
                    @foreach($categories as $category)
                        <div class="card mb-4 category">
                            <div class="card-header gradient_bottom">
                                <h5 class="card-title mb-0 pb-0">{{$category->name}}</h5>
                                <p class="card-desc mb-0 pb-0 text-truncate">{{$category->description}}</p>
                            </div>
                            <div class="justify-content-between p-2 mb-0">
                                @foreach($category->boards as $board)
                                    <div class="card mb-1 p-2 board border-0">
                                        <div class="row justify-content-between">
                                            <div class="col-md-9">
                                                <a href="{{route('forums.boards.show', $board->id)}}">
                                                    <div class="row">
                                                        <div class="col-1 mr-1 pl-0 my-auto">
                                                            <div class="text-center icon-holder">
                                                                <span class="fa-stack fa-2x">
                                                                  <i class="fas fa-square fa-stack-2x" style="color: {{$board->color}}"></i>
                                                                  <i class="{{$board->icon}} fa-stack-1x fa-inverse"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class="col-9 my-auto media-f" style="margin-top: 5px !important; padding-left: 0;">
                                                            <div class="info">
                                                                <h5 class="title mb-0 pb-0">{{$board->name}}</h5>
                                                                <p class="description mb-0 pb-0 text-truncate">{{ truncate($board->description, 70) }}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            @if($latestThread = $board->latestThread)
                                                <div class="col-md-3">
                                                    <div class="container pr-0 my-auto latest_info">
                                                        <div class="justify-content-end text-right d-flex my-auto text-truncate" style="margin-top: 5px !important;">
                                                            <div class="my-auto">
                                                                <a href="{{ route('forums.threads.show', $latestThread->id) }}">
                                                                    <h5 class="thread_title my-auto">{{ truncate($latestThread->title, 13) }}</h5>
                                                                </a>
                                                                <a href="{{ route('users.show', $latestThread->user->steamid) }}">
                                                                    <p class="thread_author my-auto"> - {{$latestThread->user->username}}</p>
                                                                </a>
                                                            </div>
                                                            <div class="my-auto">
                                                                <a href="{{ route('users.show', $latestThread->user->steamid) }}">
                                                                    <img src="{{$latestThread->user->avatar}}"
                                                                         class="d-none d-lg-block rounded-circle ml-2 my-auto thread_avatar"
                                                                         alt="Thread User Image" style="width: 50px; height: 50px">
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            @endif
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    @endforeach
                </div>
                @include('includes.forums.stats')
            @else
                @include('includes.forums.stats')
                <div class="col-12 col-md-9">
                @foreach($categories as $category)
                    <div class="card mb-4 category">
                        <div class="card-header gradient_bottom">
                            <h5 class="card-title mb-0 pb-0">{{$category->name}}</h5>
                            <p class="card-desc mb-0 pb-0 text-truncate">{{$category->description}}</p>
                        </div>
                        <div class="justify-content-between p-2 mb-0">
                            @foreach($category->boards as $board)
                                <div class="card mb-1 p-2 board border-0">
                                    <div class="row justify-content-between">
                                        <div class="col-md-9">
                                            <a href="{{route('forums.boards.show', $board->id)}}">
                                                <div class="row">
                                                    <div class="col-1 mr-1 pl-0 my-auto">
                                                        <div class="text-center icon-holder">
                                                                <span class="fa-stack fa-2x">
                                                                  <i class="fas fa-square fa-stack-2x" style="color: {{$board->color}}"></i>
                                                                  <i class="{{$board->icon}} fa-stack-1x fa-inverse"></i>
                                                                </span>
                                                        </div>
                                                    </div>
                                                    <div class="col-9 my-auto media-f" style="margin-top: 5px !important; padding-left: 0;">
                                                        <div class="info">
                                                            <h5 class="title mb-0 pb-0">{{$board->name}}</h5>
                                                            <p class="description mb-0 pb-0 text-truncate">{{ truncate($board->description, 70) }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>

                                        @if($latestThread = $board->latestThread)
                                            <div class="col-md-3">
                                                <div class="container pr-0 my-auto latest_info">
                                                    <div class="justify-content-end text-right d-flex my-auto text-truncate" style="margin-top: 5px !important;">
                                                        <div class="my-auto">
                                                            <a href="{{ route('forums.threads.show', $latestThread->id) }}">
                                                                <h5 class="thread_title my-auto">{{ truncate($latestThread->title, 13) }}</h5>
                                                            </a>
                                                            <a href="{{ route('users.show', $latestThread->user->steamid) }}">
                                                                <p class="thread_author my-auto"> - {{$latestThread->user->username}}</p>
                                                            </a>
                                                        </div>
                                                        <div class="my-auto">
                                                            <a href="{{ route('users.show', $latestThread->user->steamid) }}">
                                                                <img src="{{$latestThread->user->avatar}}"
                                                                     class="d-none d-lg-block rounded-circle ml-2 my-auto thread_avatar"
                                                                     alt="Thread User Image" style="width: 50px; height: 50px">
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        @endif
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                @endforeach
            </div>
            @endif
        </div>
    </div>
@endsection