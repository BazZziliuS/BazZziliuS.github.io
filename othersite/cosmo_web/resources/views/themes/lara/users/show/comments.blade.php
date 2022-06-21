@extends('themes.lara.users.show._layout')

@section('profile-content')
    @foreach($comments as $comment)
        <div class="card border-0 mb-3 thread comment" id="post-{{$comment->id}}">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-2 border-right">
                        <div class="content text-center">
                            <img alt="UserAvatar" src="{{$comment->user->avatar}}" class="rounded"
                                height="80" width="80">
                            <h5 class="mt-3 font-weight-bold">{{$comment->user->username}}</h5>
                            <p style="color: {{$comment->user->role->color}};">
                                {{$comment->user->role->display_name}}
                            </p>

                            <div class="btn-group">
                                @can('update', $comment)
                                    <!-- Modal -->
                                        <div class="modal fade" id="edit-comment-{{$comment->id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                                                <div class="modal-content">
                                                    <form action="{{route('users.comments.update', ['user' => $user->steamid, 'comment' => $comment->id])}}" method="post">
                                                        @csrf
                                                        @method('PATCH')

                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="exampleModalLongTitle">@lang('cosmo.users.editing_comment')</h5>
                                                        </div>
                                                        <div class="modal-body">
                                                            <textarea name="content">
                                                                {!! $comment->content !!}
                                                            </textarea>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">@lang('cosmo.actions.close')</button>
                                                            <button type="submit" class="btn btn-primary">@lang('cosmo.actions.save_changes')</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Modal End -->
                                        <button type="submit" class="btn btn-outline-primary fixr mr-2" data-tippy-content="@lang('cosmo.core.edit')"
                                                data-toggle="modal" data-target="#edit-comment-{{$comment->id}}">
                                            <i class="fad fa-pencil"></i>
                                        </button>
                                    @endcan
                                @can('delete', $comment)
                                    <form action="{{route('users.comments.destroy', ['user' => $user->steamid, 'comment' => $comment->id])}}" method="post">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-outline-danger fixr" data-tippy-content="@lang('cosmo.actions.delete')">
                                            <i class="fad fa-trash"></i>
                                        </button>
                                    </form>
                                @endcan
                            </div>
                        </div>
                    </div>
                    <div class="col my-auto">
                        {!! $comment->content !!}

                        @if($comment->user->profile->signature)
                            {!! $comment->user->profile->signature !!}
                        @endif
                    </div>
                </div>
            </div>
            <div class="gradient"></div>
        </div>
    @endforeach

    {{ $comments->links('themes.lara.pagination') }}

    @auth
        <form action="{{route('users.comments.store', $user->steamid)}}" method="post">
            @csrf
            <label for="content"></label>
            <textarea name="content" id="content"></textarea>
            <button type="submit" class="btn btn-primary mt-2">@lang('cosmo.actions.post')</button>
        </form>
    @endauth
@endsection

@push('scripts')
    <script src="{{ asset('js/tinymce.js') }}"></script>
@endpush