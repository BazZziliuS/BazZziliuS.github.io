@extends('themes.purity.users.show._layout')

@section('profile-content')
        <div class="card-body comments mt-3">
        @foreach($comments as $comment)
            @can('update', $comment)
                <div class="modal fade" id="edit-comment-{{$comment->id}}" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <form action="{{route('users.comments.update', ['user' => $user->steamid, 'comment' => $comment->id])}}" method="post">
                                @csrf
                                @method('PATCH')
                                <div class="modal-header">
                                    <h5 class="modal-title"
                                        id="exampleModalLongTitle">@lang('cosmo.users.editing_comment')</h5>
                                </div>
                                <div class="modal-body">
                                    <label>
                                    <textarea name="content">
                                        {!! $comment->content !!}
                                    </textarea>
                                    </label>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                            data-dismiss="modal">@lang('cosmo.actions.close')</button>
                                    <button type="submit"
                                            class="btn btn-primary">@lang('cosmo.actions.save_changes')</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            @endcan

            <div class="card border-0 comment" id="post-{{$comment->id}}">
                <div class="card-body d-flex">
                    <div class="d-inline-flex first">
                        <a href="{{ route('users.show', $comment->user->steamid) }}"
                           data-tippy-content='{{ trans('cosmo.navbar.profile') }} <br />
                            <color style="color: {{$comment->user->role->color ? $comment->user->role->color:'#fff'}}; margin-right: 0">
                            ({{ $comment->user->role->display_name }})</color>'>
                            <img src="{{$comment->user->avatar}}" alt="{{ $comment->user->username }}'s Avatar"
                                 class="rounded mr-1 avatar" style="max-height: 50px;">
                        </a>
                    </div>
                    <div class="d-inline my-auto ml-2">
                        <h5 class="username mb-0">
                            {{$comment->user->username}}

                            <small class="ml-1" style="color: {{ $comment->created_at->diffInMinutes() < 10 ? '#27ae60' : 'rgba(255,255,255,.75)' }}">
                                {{ $comment->created_at->diffInMinutes() < 10 ? 'Just Now' : $comment->created_at->diffForHumans()}}
                                {!! $comment->created_at->lessThan($comment->updated_at) ? '<small style="color: rgba(255,255,255,.75) !important">(edited)</small>': '' !!}
                            </small>
                        </h5>
                        <div class="my-auto text">{!! $comment->content !!}</div>
                    </div>
                    <div class="d-inline-flex ml-auto buttons my-auto">
                        @can('update', $comment)
                            <button type="submit" class="btn btn-outline-warning mr-2"
                                    data-tippy-content="@lang('cosmo.core.edit')"
                                    data-toggle="modal" data-target="#edit-comment-{{$comment->id}}"
                                    style="max-height: 40px !important;">
                                <i class="fad fa-pencil"></i>
                            </button>
                        @endcan
                        @can('delete', $comment)
                            <form action="{{route('users.comments.destroy', ['user' => $user->steamid, 'comment' => $comment->id])}}" method="post">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-outline-danger"
                                        data-tippy-content="@lang('cosmo.actions.delete')">
                                    <i class="fad fa-trash"></i>
                                </button>
                            </form>
                        @endcan
                    </div>

                </div>
            </div>
        @endforeach

        {{ $comments->links('themes.purity.pagination') }}
    </div>

    @auth
        <div class="card-body editor mt-n5">
            <form action="{{route('users.comments.store', $user->steamid)}}" method="post">
                @csrf
                <div class="mt-5">
                    <textarea name="content"></textarea>
                    <button type="submit" class="btn btn-primary mt-2">@lang('cosmo.users.comment')</button>
                </div>
            </form>
        </div>
    @endauth
@endsection

@push('scripts')
    <script src="{{ asset('js/tinymce.js') }}"></script>
@endpush