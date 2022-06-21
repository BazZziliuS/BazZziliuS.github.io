@extends('themes.dxrk.layout')

@section('title')
    @lang('cosmo.core.viewing_thread')
@endsection

@section('header')
    <h2 class="section-header">{{ $thread->title }}</h2>
@endsection

@section('content')
    @include('themes.dxrk.includes.hero')

    @if ($canManageThreads || $thread->user->is(auth()->user()))
        <form action="{{route('forums.threads.destroy', $thread->id)}}" method="post">
            @csrf
            @method('DELETE')
            <div class="modal" id="threadConfirmDelete-{{ $thread->id  }}" tabindex="-1"
                 role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle"
                                style="color: black">Delete Thread</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" style="color: rgba(0,0,0,.75)">
                            Are you sure you wish to delete "{{ $thread->title }}"? <br />
                            This action is irreversible!
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary"
                                    data-dismiss="modal">Close
                            </button>
                            <button type="submit" class="btn btn-danger"
                                    data-tippy-content="{{ trans('cosmo.forums.threads.delete_thread') }}">DELETE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    @endcan

    @if ($canMoveThreads)
        <div class="modal fade" id="move-modal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <form action="{{route('forums.threads.move', $thread->id)}}" method="post">
                        @csrf

                        <div class="modal-header">
                            <h5 class="modal-title">@lang('cosmo.forums.threads.move_thread')</h5>
                        </div>
                        <div class="modal-body">
                            <label for="move-board-id">@lang('cosmo.core.board')</label>
                            <select class="form-control" id="move-board-id" name="board">
                                @foreach($categories as $category)
                                    <option disabled>-={{$category->name}}=-</option>

                                    @foreach($category->boards as $board)
                                        <option class="text-truncate" value="{{$board->id}}">
                                            {{$board->name}}
                                        </option>
                                    @endforeach
                                @endforeach
                            </select>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                @lang('cosmo.actions.close')
                            </button>
                            <button type="submit" class="btn btn-primary">
                                @lang('cosmo.forums.threads.move_thread')
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    @endcan

    <div class="container mt-4" id="threads">
        <div class="card shadow border-0 mb-3">
            <div class="card-header border-bottom-0">
                <div class="row justify-content-between">
                    <div class="col-auto">
                        <h3>{{$thread->title}}
                            @if($thread->stickied)
                                <span class="badge badge-info">@lang('cosmo.forums.threads.pinned')</span>
                            @endif
                            @if($thread->locked)
                                <span class="badge badge-danger">@lang('cosmo.forums.threads.locked')</span>
                            @endif
                        </h3>
                        <p> @lang('cosmo.forums.threads.created_at') : {{$thread->created_at}}</p>
                    </div>

                    <div class="col-auto btn-group">
                        @if($canManageThreads || $thread->user->is(auth()->user()))
                            <form action="{{route('forums.threads.edit', $thread->id)}}" method="get" class="mr-2">
                                <button type="submit" class="btn btn-outline-primary btn-circle btn-sm"
                                        data-tippy-content="@lang('cosmo.forums.threads.edit_thread')">
                                    <i class="fad fa-pencil"></i>
                                </button>
                            </form>
                        @endif
                        @can('sticky', $thread)
                            <form action="{{route('forums.threads.sticky', $thread->id)}}" method="post" class="mr-2">
                                @csrf
                                <button type="submit" class="btn btn-outline-info btn-circle btn-sm"
                                        data-tippy-content="{{ $thread->stickied ? trans('cosmo.forums.threads.unpin_thread') : trans('cosmo.forums.threads.pin_thread') }}">
                                    <i class="fad fa-thumbtack"></i>
                                </button>
                            </form>
                        @endcan
                        @can('lock', $thread)
                            <form action="{{route('forums.threads.lock', $thread->id)}}" method="post" class="mr-2">
                                @csrf
                                <button type="submit" class="btn btn-outline-warning btn-circle btn-sm"
                                        data-tippy-content="{{ $thread->locked ? trans('cosmo.forums.threads.unlock_thread') : trans('cosmo.forums.threads.lock_thread') }}">
                                    <i class="{{ $thread->locked ? 'fad fa-lock-open-alt' : 'fad fa-lock-alt' }}"></i>
                                </button>
                            </form>
                        @endcan
                        @if ($canMoveThreads)
                            <form action="">
                                <div class="mr-2">
                                    <button type="button" class="btn btn-outline-success btn-circle btn-sm"
                                            data-tippy-content="@lang('cosmo.forums.threads.move_thread')"
                                            data-toggle="modal" data-target="#move-modal">
                                        <i class="fad fa-exchange"></i>
                                    </button>
                                </div>
                            </form>
                        @endif
                        @if($canManageThreads || $thread->user->is(auth()->user()))
                            <form>
                                <button type="button" class="btn btn-outline-danger btn-circle btn-sm"
                                        data-toggle="modal" data-target="#threadConfirmDelete-{{ $thread->id  }}">
                                    <i class="fad fa-trash"></i>
                                </button>
                            </form>
                        @endif
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-2 border-right">
                        <div class="content text-center">
                            <img src="{{$thread->user->avatar}}" class="rounded" style="max-height: 80px;">
                            <h5 class="mt-3 font-weight-bold">{{$thread->user->username}}</h5>
                            <p style="color: {{$thread->user->role->color}};">{{$thread->user->role->display_name}}</p>
                        </div>
                    </div>
                    <div class="col">
                        {!! $thread->content !!}
                        @if($thread->user->profile->signature)
                            {!! $thread->user->profile->signature !!}
                        @endif

                        <div class="reactions d-flex mt-2" style="color: rgba(255,255,255,1)">
                            <div class="reacted d-inline-flex mr-auto">
                                @foreach($thread->reactions as $emoji => $count)
                                    <div class="reaction d-flex">
                                        <img src="{{asset($emoji)}}" alt="" class="mr-1">
                                        <small class="mr-1 my-auto">X</small> <span class="my-auto">{{ $count }}</span>
                                    </div>
                                @endforeach
                            </div>

                            @if($thread->canReact(auth()->id()))
                                <div class="add-reaction d-inline-flex ml-auto">
                                    @foreach(config('cosmo.reactions') as $id => $reaction)
                                        <div class="reaction d-flex">
                                            <img reaction-thread data-thread-id="{{$thread->id}}" data-reaction-id="{{$id}}"
                                                 src="{{ asset($reaction['emoji']) }}" alt="{{ $reaction['display'] }}"
                                                 data-tippy-content="{{$reaction['display']}}" class="img-fluid">
                                        </div>
                                    @endforeach
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>

        @foreach($posts as $post)
            <div class="card shadow border-0 mb-3" id="post-{{$post->id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-2 border-right">
                            <div class="content text-center">
                                <img alt="Avatar" src="{{$post->user->avatar}}" class="rounded" style="max-height: 80px;">
                                <h5 class="mt-3 font-weight-bold">{{$post->user->username}}</h5>
                                <p style="color: {{$post->user->role->color}};">{{$post->user->role->display_name}}</p>

                                <div class="btn-group">
                                    @if ($canManageThreads || $post->user->is(auth()->user()))
                                        <form action="{{route('forums.threads.edit', $post->id)}}" method="get" class="mr-2">
                                            <button type="submit" class="btn btn-outline-primary btn-circle btn-sm" data-tippy-content="@lang('cosmo.forums.posts.update_post')">
                                                <i class="fad fa-pencil"></i>
                                            </button>
                                        </form>

                                        <form action="{{route('forums.posts.destroy', $post->id)}}" method="post">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-outline-danger btn-circle btn-sm" data-tippy-content="{{ trans('cosmo.forums.posts.delete_post') }}">
                                                <i class="fad fa-trash"></i>
                                            </button>
                                        </form>
                                    @endif
                                </div>
                            </div>
                        </div>
                        <div class="col pl-2">
                            {!! $post->content !!}

                            @if($post->user->profile->signature)
                                {!! $post->user->profile->signature !!}
                            @endif

                        <div class="reactions d-flex mt-2" style="color: rgba(255,255,255,1)">
                            <div class="reacted d-inline-flex mr-auto">
                                @foreach($post->reactions as $emoji => $count)
                                    <div class="reaction d-flex">
                                        <img src="{{asset($emoji)}}" alt="" class="mr-1">
                                        <small class="mr-1 my-auto">X</small> <span class="my-auto">{{ $count }}</span>
                                    </div>
                                @endforeach
                            </div>

                            @if($post->canReact(auth()->id()))
                                <div class="add-reaction d-inline-flex ml-auto">
                                    @foreach(config('cosmo.reactions') as $id => $reaction)
                                        <div class="reaction">
                                            <img reaction-post data-post-id="{{$post->id}}" data-reaction-id="{{$id}}"
                                                 src="{{ asset($reaction['emoji']) }}" alt="{{ $reaction['display'] }}"
                                                 data-tippy-content="{{$reaction['display']}}" class="img-fluid">
                                        </div>
                                    @endforeach
                                </div>
                            @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach

        @if($thread->locked)
            <div class="card shadow mb-5">
                <div class="card-body">
                    <h5>@lang('cosmo.forums.threads.locked_no_reply')</h5>
                </div>
            </div>
        @else
            @auth
                <div class="card shadow mb-3">
                    <div class="card-body">
                        <form action="{{route('forums.posts.store', $thread->id)}}" method="post">
                            @csrf
                            <textarea name="content"></textarea>
                            <button type="submit" class="btn btn-primary mt-3">@lang('cosmo.actions.submit')</button>
                        </form>
                    </div>
                </div>
            @endauth
        @endif

        {{ $posts->links('themes.dxrk.pagination') }}
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/reactions.js') }}"></script>
    <script src="{{ asset('js/tinymce.js') }}"></script>
@endpush