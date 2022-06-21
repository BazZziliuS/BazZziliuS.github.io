@extends('themes.havart.users.show._layout')

@section('profile-content')
    @foreach($comments as $comment)
        <div class="card shadow border-0 mb-1 mt-2 thread reps" id="post-{{$comment->id}}">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-2 border-right">
                        <div class="content text-center">
                            <img src="{{$comment->user->avatar}}" class="rounded" style="max-height: 80px;">
                            <h5 class="mt-3 font-weight-bold">{{$comment->user->username}}</h5>
                            <p style="color: {{$comment->user->role->color}};">{{$comment->user->role->display_name}}</p>

                            <div class="btn-edit d-inline-flex">
                                @can('update', $comment)
                                    <button type="submit" class="btn btn-outline-warning mr-2 fixr"
                                            data-tippy-content="@lang('cosmo.core.edit')"
                                            data-toggle="modal"
                                            data-target="#edit-comment-{{$comment->id}}">
                                        <i class="fad fa-pencil"></i>
                                    </button>
                                @endcan
                                @can('delete', $comment)
                                    <form action="{{route('users.comments.destroy', ['user' => $user->steamid, 'comment' => $comment->id])}}"
                                          method="post">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-outline-danger fixr"
                                                data-tippy-content="@lang('cosmo.actions.delete')">
                                            <i class="fad fa-trash"></i>
                                        </button>
                                    </form>
                                @endcan
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        {!! $comment->content !!}
                        @if(!empty($comment->user->profile->signature))
                            <hr>
                            {!! $comment->user->profile->signature !!}
                        @endif
                    </div>
                </div>
            </div>
        </div>
    @endforeach

    @auth
        <form action="{{route('users.comments.store', $user->steamid)}}" method="post">
            @csrf

            <div class="mt-5">
                <textarea name="content"></textarea>
                <button type="submit" class="btn btn-primary mt-2">@lang('cosmo.users.comment')</button>
            </div>
        </form>
    @endauth

    {{ $comments->links('themes.havart.pagination') }}
@endsection

@push('scripts')
    <script src="{{ asset('js/tinymce.js') }}"></script>
@endpush