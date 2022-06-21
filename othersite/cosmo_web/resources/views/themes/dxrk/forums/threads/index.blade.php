@extends('themes.dxrk.layout')

@section('title')
    @lang('cosmo.core.threads')
@endsection

@section('header')
    <h4 class="section-subheader">@lang('cosmo.core.browse_threads')</h4>
    <h2 class="section-header">@lang('cosmo.core.threads')</h2>
@endsection

@section('content')
    @include('themes.dxrk.includes.hero')

    <div class="container mt-4" id="threads">
        <form action="{{route('forums.threads.search')}}" method="post" class="mb-3">
            @csrf
            <input type="text" name="search" placeholder="DarkRP Rules" class="form-control" value="">
        </form>

        @foreach($threads as $thread)
            <div class="card shadow mb-2">
                <div class="card-body">
                    <a href="{{route('forums.threads.show', $thread->id)}}" class="text-decoration-none">
                        <div class="row">
                            @if($thread->stickied)
                                <div class="pr-0 col-auto {{ $thread->locked ? '' : 'mr-2' }} d-flex justify-content-center">
                                    <div class="my-auto">
                                        <i class="fad fa-thumbtack" style="color: #00b894" data-tippy-content="Sticky"></i>
                                    </div>
                                </div>
                            @endif

                            @if($thread->locked)
                                <div class="pr-0 col-auto d-flex justify-content-center">
                                    <div class="my-auto">
                                        <i class="fad fa-lock-alt" style="color: #d63031" data-tippy-content="Locked"></i>
                                    </div>
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
        {{ $threads->links('themes.dxrk.pagination') }}
    </div>
@endsection