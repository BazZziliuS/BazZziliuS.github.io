@extends('themes.purity.layout')

@section('title')
    @lang('cosmo.core.threads')
@endsection

@section('header_title')
    <h1 class="title text-truncate">@lang('cosmo.core.threads')</h1>
    <h3 class="subtitle">@lang('cosmo.core.browse_threads')</h3>
@endsection

@section('crumbs')
    <li class="breadcrumb-item"><a href="{{ route('home') }}">@lang('cosmo.core.home')</a></li>
    <li class="breadcrumb-item"><a href="{{ route('forums.index') }}">@lang('cosmo.core.forums')</a></li>
    <li class="breadcrumb-item"><a href="{{ route('forums.threads') }}">@lang('cosmo.core.threads')</a></li>
    <li class="breadcrumb-item"><a href="javascript:void(0)">@lang('cosmo.forums.search')</a></li>
@endsection

@section('content')

    <div class="container mt-4" id="forums">
        <form action="{{route('forums.threads.search')}}" method="post" class="mb-3">
            @csrf
            <input type="text" name="search" placeholder="DarkRP Rules" class="form-control" value="">
        </form>

        @include('themes.purity.forums.breadcrumb')

        @foreach($threads as $thread)
            <div class="card shadow mb-2 category">
                <div class="card-body">
                    <a href="{{route('forums.threads.show', $thread->id)}}" class="text-decoration-none text-white">
                        <div class="row">
                            @if((bool)$thread->locked or (bool)$thread->stickied)
                            <div style="display: inline-grid !important; margin-right: .5rem;">
                                @if($thread->stickied)
                                    <span class="badge badge-info my-auto p-1">@lang('cosmo.forums.threads.pinned')</span>
                                @endif
                                @if($thread->locked)
                                    <span class="badge badge-danger my-auto p-1 ml-1">@lang('cosmo.forums.threads.locked')</span>
                                @endif
                            </div>
                            @endif
                            <div class="col-auto {{ $thread->stickied ? 'ml-n3' : 'pr-0' }}">
                                <p class="mb-0 mt-0 title">{{$thread->title}}</p>
                                <small class="username_full">
                                    @lang('cosmo.forums.replies'): {{ $thread->posts->count() }}
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
        {{ $threads->links('themes.purity.pagination') }}
    </div>
@endsection