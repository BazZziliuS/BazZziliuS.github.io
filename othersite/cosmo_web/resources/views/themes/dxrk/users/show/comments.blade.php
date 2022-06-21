@extends('themes.dxrk.users.show._layout')

@section('profile-content')
    @foreach($comments as $comment)
        <div class="card shadow-sm border-0 mb-3 thread reps" id="post-{{$comment->id}}">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-2 border-right">
                        <div class="content text-center">
                            <img src="{{$comment->user->avatar}}" class="rounded" style="max-height: 80px;">
                            <h5 class="mt-3 font-weight-bold">{{$comment->user->username}}</h5>
                            <p style="color: {{$comment->user->role->color}};">{{$comment->user->role->display_name}}</p>

                            <div class="btn-group">
                            @can('update', $comment)
                                <!-- Modal -->
                                    <div class="modal fade" id="edit-comment-{{$comment->id}}" tabindex="-1"
                                         role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                                            <div class="modal-content">
                                                <form action="{{route('users.comments.update', ['user' => $user->steamid, 'comment' => $comment->id])}}"
                                                      method="post">
                                                    @csrf
                                                    @method('PATCH')

                                                    <div class="modal-header">
                                                        <h5 class="modal-title"
                                                            id="exampleModalLongTitle">@lang('cosmo.users.editing_comment')</h5>
                                                    </div>
                                                    <div class="modal-body">
                                                                            <textarea name="content">
                                                                                {!! $comment->content !!}
                                                                            </textarea>
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
                                    <!-- Modal End -->
                                    <button type="submit" class="btn btn-outline-primary btn-circle btn-sm mr-2"
                                            data-tippy-content="Edit Comment"
                                            data-toggle="modal" data-target="#edit-comment-{{$comment->id}}"
                                            style="border-radius: 0 !important;">
                                        <i class="fad fa-pencil"></i>
                                    </button>
                                @endcan
                                @can('delete', $comment)
                                    <form action="{{route('users.comments.destroy', ['user' => $user->steamid, 'comment' => $comment->id])}}"
                                          method="post">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-outline-danger btn-circle btn-sm"
                                                data-tippy-content="Delete Comment"
                                                style="border-radius: 0 !important;">
                                            <i class="fad fa-trash"></i>
                                        </button>
                                    </form>
                                @endcan
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        {!! $comment->content !!}

                        @if($comment->user->profile->signature)
                            <hr>
                            {!! $comment->user->profile->signature !!}
                        @endif
                    </div>
                </div>
            </div>
        </div>
    @endforeach

    {{ $comments->links('themes.dxrk.pagination') }}

    @auth
        <form action="{{route('users.comments.store', $user->steamid)}}" method="post">
            @csrf

            <div class="card">
                <div class="card-body">
                    <textarea name="content"></textarea>
                    <button type="submit" class="btn btn-primary mt-2">@lang('cosmo.actions.submit')</button>
                </div>
            </div>
        </form>
    @endauth
@endsection

@push('scripts')
    <script src="{{ asset('js/tinymce.js') }}"></script>
@endpush