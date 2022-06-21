@extends('themes.purity.layout')

@section('title')
    {{ $board->name }}
@endsection

@section('page_titles')
    <h3 class="subtitle text-truncate">{{ $board->name }}'s @lang('cosmo.core.threads')</h3>
    <h1 class="title text-truncate">{{ $board->name }}</h1>
@endsection

@can('create', [ 'App\Models\Forums\Thread', $board ])
    @section('button')
        <a href="{{route('forums.threads.create', $board->id)}}" role="button" class="btn btn-outline-success btn-sm">
            @lang('cosmo.forums.threads.create_thread')
        </a>
    @endsection
@endcan

@section('crumbs')
    <li class="breadcrumb-item"><a href="{{ route('home') }}">@lang('cosmo.core.home')</a></li>
    <li class="breadcrumb-item"><a href="{{ route('forums.index') }}">@lang('cosmo.core.forums')</a></li>

    @foreach($board->breadcrumbs as $breadcrumb)
        <li class="breadcrumb-item">
            <a href="{{ route('forums.boards.show', $breadcrumb->id) }}">
                {{ $breadcrumb->name }}
            </a>
        </li>
    @endforeach
@endsection

@section('content')
    <div class="container" id="forums">
        @include('themes.purity.forums.breadcrumb')

        <div class="card mb-4 category">
            <div class="card-header gradient_bottom">
                <h5 class="card-title mb-0 pb-0">{{$board->name}}</h5>
                <p class="card-desc mb-0 pb-0 text-truncate">{{$board->description}}</p>
            </div>

            @if ($board->subBoards->isNotEmpty())
                <div class="justify-content-between p-2 mb-0">
                    @foreach($board->subBoards as $board)
                        <a class="card mb-1 p-2 board border-0" href="{{route('forums.boards.show', $board->id)}}">
                            <div class="row justify-content-between">
                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-1 pl-0 my-auto mr-0">
                                            <div class="container text-center icon-holder">
                                                <span class="fa-stack fa-2x">
                                                  <i class="fas fa-square fa-stack-2x" style="color: {{$board->color}}"></i>
                                                  <i class="{{$board->icon}} fa-stack-1x fa-inverse"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-9 my-auto pl-0 ml-0 media-g" style="margin-top: 5px !important;">
                                            <div class="container info pl-0">
                                                <h5 class="title mb-0 pb-0">{{$board->name}}</h5>
                                                <p class="description mb-0 pb-0 text-truncate">{{ truncate($board->description, 70) }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    @endforeach
                </div>
            @endif
        </div>


        <div class="card mt-4 category">
            <div class="justify-content-between p-2 mb-0">
                @foreach($threads as $thread)
                    <a class="card mb-1 p-2 board border-0" href="{{route('forums.threads.show', $thread->id)}}">
                        <div class="row justify-content-between">
                            <div class="col-md-6 mr-auto">
                                <div class="row">
                                    <div class="col-1 pl-0 my-auto mr-0" >
                                        <div class="container text-center icon-holder" style="padding-left: 3px !important;">
                                            <span class="fa-stack fa-2x">
                                              <i class="fas fa-square fa-stack-2x" style="color: {{$thread->color}}"></i>
                                              <i class="fad fa-scroll-old fa-stack-1x fa-inverse"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-8 my-auto pl-0 ml-0 media-g" style="margin-top: 5px !important;">
                                        <div class="container info pl-0">
                                            <h5 class="title mb-0 pb-0">{{$thread->title}}</h5>
                                            <p class="description mb-0 pb-0 text-truncate">@lang('cosmo.forums.replies'): {{ $thread->posts_count }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-1 my-auto justify-content-end text-right d-inline-flex">
                                @if($thread->stickied)
                                    <span class="badge badge-success text-center p-2" style="background-color: #0984e3 !important;">
                                        @lang('cosmo.forums.threads.pinned')
                                    </span>
                                @endif
                                @if($thread->locked)
                                    <span class="badge badge-success text-center p-2 ml-2" style="background-color: #d63031 !important;">
                                        @lang('cosmo.forums.threads.locked')
                                    </span>
                                @endif
                            </div>
                        </div>
                    </a>
                @endforeach
                {{ $threads->links('themes.purity.pagination') }}
            </div>
        </div>
    </div>
@endsection
