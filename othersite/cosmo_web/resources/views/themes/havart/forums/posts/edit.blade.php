@extends('themes.havart.layout')

@section('title')
    @lang('cosmo.forums.posts.editing_post')
@endsection

@section('header_title')
    <h1 class="title text-truncate">Editing Post</h1>
@endsection

@section('content')
    @include('themes.havart.includes.header')

    <div class="container mt-3">
        <form action="{{route('forums.posts.update', $post->id)}}" method="post">
            @csrf
            @method('PATCH')

            <textarea name="content">{!! $post->content !!}</textarea>

            <button type="submit" class="btn btn-primary mt-3">
                @lang('cosmo.actions.update')
            </button>
        </form>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/tinymce.js') }}"></script>
@endpush