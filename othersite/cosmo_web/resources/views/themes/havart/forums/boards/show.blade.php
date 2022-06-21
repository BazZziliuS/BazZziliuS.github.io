@extends('themes.havart.layout')

@section('title')
    {{$board->name}}
@endsection


@section('header_title')
    <h1 class="title">{{ $board->name }}</h1>
    <h3 class="subtitle">{{ $board->name }}'s @lang('cosmo.core.threads')</h3>
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
    @include('themes.havart.includes.header')

    <div class="container mt-4" id="threads">
        @include('themes.havart.forums.breadcrumb')

        @foreach($board->subBoards as $subBoard)
            <div class="card mb-4 py-3" id="board">
                <div class="row justify-content-between">
                    <div class="col-md-9">
                        <div class="row">
                            <div class="col-1 d-flex justify-content-center">
                                <div class="icon_holder my-auto">
                                    <div class="container">
                                        <i class="{{$subBoard->icon}} fa-2x"
                                           style="color: {{$subBoard->color}}; float: left;"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-10 info my-auto" style="margin-top: 5px !important;">
                                <div class="container content text-truncate">
                                    <a href="{{route('forums.boards.show', $subBoard->id)}}" class="my-auto">
                                        <h5 class="title mb-0 pb-0">{{$subBoard->name}}</h5>
                                    </a>
                                    <p class="description mb-0 pb-0 my-auto">{{ truncate($subBoard->description, 70) }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach

        @foreach($threads as $thread)
            <div class="card shadow mb-2">
                <div class="card-body">
                    <div class="text-decoration-none">
                        <div class="row">
                            @if($thread->stickied)
                                <div class="pr-0 col-auto {{ $thread->locked ? '' : 'mr-2' }} d-flex justify-content-center">
                                    <div class="my-auto">
                                        <i class="fad fa-thumbtack" style="color: #00b894"
                                           data-tippy-content="@lang('cosmo.forums.threads.pinned')"></i>
                                    </div>
                                </div>
                            @endif
                            @if($thread->locked)
                                <div class="pr-0 col-auto d-flex justify-content-center mr-2 pl-1 ml-0">
                                    <div class="my-auto">
                                        <i class="fad fa-lock-alt" style="color: #d63031"
                                           data-tippy-content="@lang('cosmo.forums.threads.locked')"></i>
                                    </div>
                                </div>
                            @endif
                            <a class="col-auto {{ $thread->stickied ? 'ml-n3' : 'pr-0' }}" href="{{route('forums.threads.show', $thread->id)}}">
                                <p class="mb-0 mt-0 title">{{$thread->title}}</p>
                                <small class="username_full">
                                    @lang('cosmo.forums.replies'): {{ $thread->posts_count }}
                                </small>
                            </a>

                            @if($latestPost = $thread->latestPost)
                                <a class="col-auto ml-auto" href="{{route('users.show', $latestPost->user->steamid)}}">
                                    <span class="mr-2 username_full">{{ $latestPost->user->username }}</span>
                                    <img data-tippy-content="{{ $latestPost->user->username }}"
                                         src="{{$latestPost->user->avatar}}" class="rounded" style="max-height: 40px;"
                                         alt="Author Profile Picture">
                                </a>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
        {{ $threads->links('themes.havart.pagination') }}
    </div>
@endsection
