@extends('themes.dxrk.layout')

@section('title')
    @lang('cosmo.forums.posts.editing_post')
@endsection

@section('content')
    <div class="container mt-3">
        <form action="{{route('forums.posts.update', $post->id)}}" method="post">
            @csrf
            @method('PATCH')

            <textarea name="content">{!! $post->content !!}</textarea>

            <button type="submit" class="btn btn-primary mt-3">
                @lang('cosmo.forums.posts.update_post')
            </button>
        </form>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/tinymce.js') }}"></script>
@endpush