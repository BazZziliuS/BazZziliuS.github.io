@extends('themes.dxrk.layout')

@section('title')
    @lang('cosmo.forums.threads.create_thread')
@endsection

@section('header')
    <h2 class="section-header">@lang('cosmo.forums.threads.create_thread')</h2>
@endsection

@section('content')
    @include('themes.dxrk.includes.hero')

    <div class="container mt-3" id="threads">
        <form action="{{route('forums.threads.store', $board->id)}}" method="post">
            @csrf

            <div class="form-group">
                <label for="thread-title" class="thread-title">@lang('cosmo.forums.threads.thread_title'):</label>
                <input type="text" name="title" class="form-control" id="thread-title" placeholder="Thread title..." value="{{old('title')}}">
            </div>

            <textarea name="content">{!! old('content') !!}</textarea>

            <button type="submit" class="btn btn-primary mt-3">
                <i class="fad fa-edit"></i>
                @lang('cosmo.forums.threads.create_thread')
            </button>
        </form>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/tinymce.js') }}"></script>
@endpush