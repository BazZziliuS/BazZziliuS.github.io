@extends('themes.dxrk.layout')

@section('title')
    @lang('cosmo.forums.threads.edit_thread')
@endsection

@section('header')
    <h2 class="section-header">@lang('cosmo.forums.threads.editing_thread')</h2>
@endsection

@section('content')
    @include('themes.dxrk.includes.hero')

    <div class="container mt-3" id="threads">
        <form action="{{route('forums.threads.update', $thread->id)}}" method="post">
            @csrf
            @method('PATCH')

            <div class="form-group">
                <label for="thread-title" class="thread-title">@lang('cosmo.forums.threads.thread_title')</label>
                <input type="text" name="title" class="form-control" id="thread-title" placeholder="@lang('cosmo.forums.threads.thread_title')" value="{{$thread->title}}">
            </div>

            <textarea name="content">{!! $thread->content !!}</textarea>

            <button type="submit" class="btn btn-primary mt-3">
                <i class="fad fa-edit"></i>
                @lang('cosmo.forums.threads.update_thread')
            </button>
        </form>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/tinymce.js') }}"></script>
@endpush
