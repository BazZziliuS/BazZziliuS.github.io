@extends('themes.lara.layout')

@section('title')
    @lang('cosmo.forums.threads.editing_thread')
@endsection

@section('header_title')
    <h3 class="title text-truncate">{{ $thread->title }}</h3>
    <p class="subtitle">@lang('cosmo.forums.threads.editing_thread')</p>
@endsection

@section('crumbs')
    <li class="breadcrumb-item"><a href="{{ route('home') }}">@lang('cosmo.core.home')</a></li>
    <li class="breadcrumb-item"><a href="{{ route('forums.index') }}">@lang('cosmo.core.forums')</a></li>
    <li class="breadcrumb-item"><a href="{{ route('forums.boards.show', $thread->board->id) }}">{{ $thread->board->name }}</a></li>
    <li class="breadcrumb-item"><a class="text-truncate" href="{{ route('forums.threads.show', $thread->id) }}">{{ $thread->title }}</a></li>
    <li class="breadcrumb-item"><a class="text-truncate" href="{{ route('forums.threads.edit', $thread->id) }}">@lang('cosmo.core.edit')</a></li>
@endsection

@section('content')
    @include('themes.lara.includes.header')

    <div class="container mt-3" id="threads">
        @include('themes.lara.forums.breadcrumb')
        <form action="{{route('forums.threads.update', $thread->id)}}" method="post">
            @csrf
            @method('PATCH')

            <div class="form-group">
                <label for="thread-title" class="thread-title">@lang('cosmo.forums.threads.thread_title')</label>
                <input type="text" name="title" class="form-control" id="thread-title" placeholder="@lang('cosmo.forums.threads.thread_title')..." value="{{$thread->title}}">
            </div>

            <textarea name="content">{!! $thread->content !!}</textarea>

            <button type="submit" class="btn btn-primary mt-3">
                <i class="fad fa-edit"></i>
                @lang('cosmo.actions.update')
            </button>
        </form>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/tinymce.js') }}"></script>
@endpush