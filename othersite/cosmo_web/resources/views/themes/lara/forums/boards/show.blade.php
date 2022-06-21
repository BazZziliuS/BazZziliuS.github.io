@extends('themes.lara.layout')

@section('title')
    {{$board->name}}
@endsection


@section('header_title')
    <h3 class="title">{{ $board->name }}</h3>
    <p class="subtitle">{{ $board->name }}'s @lang('cosmo.core.threads')</p>
@endsection

@can('create', ['App\Models\Forums\Thread', $board])
    @section('misc_content')
        <div class="text-center">
            <a href="{{route('forums.threads.create', $board->id)}}" role="button" class="btn btn-primary">
                @lang('cosmo.forums.threads.create_thread')
            </a>
        </div>
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
    @include('themes.lara.includes.header')

    <div class="container mt-4" id="threads">
        @include('themes.lara.forums.breadcrumb')

        @foreach($board->subBoards as $board)
            <div class="card shadow mb-2 thread">
                <div class="card-body">
                    <a href="{{route('forums.boards.show', $board->id)}}" class="text-decoration-none">
                        <div class="row">
                            <div class="d-flex justify-content-center col-auto pr-0">
                                <div class="my-auto">
                                    <i class="{{$board->icon}} fa-2x"
                                       style="color: {{$board->color}}; float: left;"></i>
                                </div>
                            </div>
                            <div class="col-auto pr-0">
                                <p class="mb-0 mt-0 title" style="line-height: 200%">{{$board->name}}</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        @endforeach
        {{ $threads->links('themes.lara.pagination') }}
    </div>

    <div class="container mt-4" id="threads">
        @foreach($threads as $thread)
            <div class="card shadow mb-2 thread">
                <div class="card-body">
                    <div class="text-decoration-none">
                        <div class="row">
                           <a href="{{route('forums.threads.show', $thread->id)}}"
                               class="col-auto ml-2">
                                <p class="mb-0 mt-0 title">{{$thread->title}}
                                    @if($thread->stickied)
                                        <i class="fad fa-thumbtack" style="color: #00b894"
                                           data-tippy-content="@lang('cosmo.forums.threads.pinned')">
                                        </i>
                                    @endif

                                    @if($thread->locked)
                                        <i class="fad fa-lock-alt" style="color: #d63031"
                                           data-tippy-content="@lang('cosmo.forums.threads.locked')">
                                        </i>
                                    @endif
                                </p>
                                <small class="username_full">
                                    <span class="mr-1">{{ $thread->created_at->diffForHumans() }}</span> <b>-</b>
                                    <span class="ml-1">{{ $thread->posts_count }} @lang('cosmo.forums.replies')</span>
                                </small>
                            </a>

                            @if($latestPost = $thread->latestPost)
                                <a href="{{ route('users.show', $latestPost->user->steamid) }}" class="col-auto ml-auto">
                                    <span class="mr-2 username_full">{{ $latestPost->user->username }}</span>
                                    <img src="{{$latestPost->user->avatar}}" class="rounded" height="40" width="40"
                                         alt="Author Profile Picture">
                                </a>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
        {{ $threads->links('themes.lara.pagination') }}
    </div>
@endsection
