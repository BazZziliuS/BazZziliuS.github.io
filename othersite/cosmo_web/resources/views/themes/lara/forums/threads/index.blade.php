@extends('themes.lara.layout')

@section('title')
    @lang('cosmo.core.threads')
@endsection

@section('header_title')
    <h3 class="title text-truncate">@lang('cosmo.core.threads')</h3>
    <p class="subtitle">@lang('cosmo.core.browse_threads')</p>
@endsection

@section('crumbs')
    <li class="breadcrumb-item"><a href="{{ route('home') }}">@lang('cosmo.core.home')</a></li>
    <li class="breadcrumb-item"><a href="{{ route('forums.index') }}">@lang('cosmo.core.forums')</a></li>
    <li class="breadcrumb-item"><a href="{{ route('forums.threads') }}">@lang('cosmo.core.threads')</a></li>
    <li class="breadcrumb-item"><a href="javascript:void(0)">@lang('cosmo.forums.search')</a></li>
@endsection

@section('content')
    @include('themes.lara.includes.header')

    <div class="container mt-4" id="threads">
        <form action="{{route('forums.threads.search')}}" method="post" class="mb-3">
            @csrf
            <input type="text" name="search" placeholder="DarkRP Rules" class="form-control" value="">
        </form>
        @include('themes.lara.forums.breadcrumb')

        @foreach($threads as $thread)
            <div class="card shadow mb-2 thread">
                <div class="card-body">
                    <a href="{{route('forums.threads.show', $thread->id)}}" class="text-decoration-none">
                        <div class="row">
                            @if($thread->stickied)
                                <div class="pr-0 col-auto mr-4 d-flex justify-content-center">
                                    <div class="my-auto">
                                        <i class="fad fa-thumbtack" style="color: #00b894" data-tippy-content="@lang('cosmo.forums.threads.pinned')"></i>
                                    </div>
                                </div>
                            @endif

                            @if($thread->locked)
                                <div class="px-0 col-auto d-flex justify-content-center mr-4">
                                    <div class="my-auto">
                                        <i class="fad fa-lock-alt" style="color: #d63031" data-tippy-content="@lang('cosmo.forums.threads.locked')"></i>
                                    </div>
                                </div>
                            @endif
                            <div class="col-auto {{ $thread->stickied ? 'ml-n3' : 'pr-0' }}">
                                <p class="mb-0 mt-0 title">{{$thread->title}}</p>
                                <small class="username_full">
                                    Replies: {{ $thread->posts->count() }}
                                </small>
                            </div>
                            @if($latestPost = $thread->latestPost)
                                <div class="col-auto ml-auto">
                                    <span class="mr-2 username_full">{{ $latestPost->user->username }}</span>
                                    <img data-tippy-content="{{ $latestPost->user->username }}" src="{{$latestPost->user->avatar}}" class="rounded" style="max-height: 40px;"
                                         alt="Author Profile Picture">
                                </div>
                            @endif

                        </div>
                    </a>
                </div>
            </div>
        @endforeach
        {{ $threads->links('themes.lara.pagination') }}
    </div>
@endsection