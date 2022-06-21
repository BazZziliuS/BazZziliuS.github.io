@extends('themes.purity.layout')

@section('title')
    @lang('cosmo.core.viewing_thread')
@endsection

@section('page_titles')
    <h1 class="title text-truncate">{{ $thread->title }}</h1>
@endsection

@section('crumbs')
    <li class="breadcrumb-item"><a href="{{ route('home') }}">@lang('cosmo.core.home')</a></li>
    <li class="breadcrumb-item"><a href="{{ route('forums.index') }}">@lang('cosmo.core.forums')</a></li>
    <li class="breadcrumb-item"><a href="{{ route('forums.boards.show', $thread->board->id) }}">{{ $thread->board->name }}</a></li>
    <li class="breadcrumb-item"><a class="text-truncate" href="{{ route('forums.threads.show', $thread->id) }}">{{ $thread->title }}</a></li>
@endsection

@section('content')
    <div class="container" id="forums">
        @include('themes.purity.forums.breadcrumb')

        @if($canMoveThreads)
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
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">@lang('cosmo.actions.close')</button>
                                <button type="submit" class="btn btn-primary">@lang('cosmo.forums.threads.move_thread')</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        @endif
        @if($canManageThreads || $thread->user->is(auth()->user()))
            <form action="{{route('forums.threads.destroy', $thread->id)}}" method="post">
                @csrf
                @method('DELETE')
                <div class="modal" id="threadConfirmDelete-{{ $thread->id  }}" tabindex="-1"
                     role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle"
                                    style="color: white">Delete Thread</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body" style="color: rgba(255,255,255,.75)">
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
        @endif

        <div class="card mb-4 category thread_show">
            <div class="card-header gradient_bottom">
                <h5 class="card-title mb-0 pb-0">{{$thread->title}}
                    @if($thread->stickied)
                        <span class="badge badge-info p-1 my-auto">@lang('cosmo.forums.threads.pinned')</span>
                    @endif
                    @if($thread->locked)
                        <span class="badge badge-danger p-1 ml-1 my-auto">@lang('cosmo.forums.threads.locked')</span>
                    @endif
                </h5>
                <p class="card-desc mb-0 pb-0 text-truncate">@lang('cosmo.forums.threads.created_at'): {{$thread->created_at}}</p>
                <div class="container d-flex">
                    <div class="d-flex ml-auto">
                        @if($canManageThreads || $thread->user->is(auth()->user()))
                            <form action="{{route('forums.threads.edit', $thread->id)}}" method="get" class="mr-2 ml-auto">
                                <button type="submit" class="btn btn-outline-primary btn-circle btn-sm" data-tippy-content="@lang('cosmo.forums.threads.edit_thread')">
                                    <i class="fad fa-pencil"></i>
                                </button>
                            </form>
                        @endif
                        @can('sticky', $thread)
                            <form action="{{route('forums.threads.sticky', $thread->id)}}" method="post" class="mr-2">
                                @csrf
                                <button type="submit" class="btn btn-outline-info btn-circle btn-sm" data-tippy-content="{{ $thread->stickied ? trans('cosmo.forums.threads.unpin_thread') : trans('cosmo.forums.threads.pin_thread') }}">
                                    <i class="fad fa-thumbtack"></i>
                                </button>
                            </form>
                        @endcan
                        @can('lock', $thread)
                            <form action="{{route('forums.threads.lock', $thread->id)}}" method="post" class="mr-2">
                                @csrf
                                <button type="submit" class="btn btn-outline-warning btn-circle btn-sm" data-tippy-content="{{ $thread->locked ? trans('cosmo.forums.threads.unlock_thread') : trans('cosmo.forums.threads.lock_thread') }}">
                                    <i class="{{ $thread->locked ? 'fad fa-lock-open-alt' : 'fad fa-lock-alt' }}"></i>
                                </button>
                            </form>
                        @endcan
                        @if($canMoveThreads)
                            <div class="mr-2">
                                <button type="button" class="btn btn-outline-success btn-circle btn-sm" data-tippy-content="@lang('cosmo.forums.threads.move_thread')" data-toggle="modal" data-target="#move-modal">
                                    <i class="fad fa-exchange"></i>
                                </button>
                            </div>
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
                    <div class="col-md-2 gradient_right position-relative">
                        <div class="content text-center">
                            <a href="{{ route('users.show', $thread->user->steamid) }}">
                                <img alt="{{$thread->user->avatar}}'s Avatar" src="{{$thread->user->avatar}}" class="rounded" style="max-height: 80px; width: auto">
                                <h5 class="mt-2 font-weight-bold text-white">{{$thread->user->username}}</h5>
                                <p style="color: {{$thread->user->role->color}};">{{$thread->user->role->display_name}}</p>
                            </a>
                        </div>
                    </div>
                    <div class="col-md-10" style="color: rgba(255,255,255,.75)">
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
                                        <div class="reaction">
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
            <div class="card mb-4 category thread_show" id="post-{{ $post->id }}">
                <div class="card-header gradient_bottom">
                    <div class="d-flex">
                        <div class="d-flex text-white">
                            @lang('cosmo.forums.threads.created_at'): {{ $post->created_at }}
                        </div>
                        <div class="d-flex ml-auto">
                            @if($canManageThreads || $post->user->is(auth()->user()))
                                <form action="{{route('forums.posts.edit', $post->id)}}" method="get" class="mr-2 ml-auto">
                                    <button type="submit" class="btn btn-outline-primary btn-circle btn-sm" data-tippy-content="@lang('cosmo.forums.posts.editing_post')">
                                        <i class="fad fa-pencil"></i>
                                    </button>
                                </form>

                                <form action="{{route('forums.posts.destroy', $post->id)}}" method="post">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-outline-danger btn-circle btn-sm" data-tippy-content="@lang('cosmo.forums.posts.delete_post')">
                                        <i class="fad fa-trash"></i>
                                    </button>
                                </form>
                            @endif
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-2 gradient_right position-relative">
                            <div class="content text-center">
                                <a href="{{ route('users.show', $post->user->steamid) }}">
                                    <img alt="{{$post->user->avatar}}'s Avatar" src="{{$post->user->avatar}}" class="rounded" style="max-height: 80px; width: auto">
                                    <h5 class="mt-2 font-weight-bold text-white">{{$post->user->username}}</h5>
                                    <p style="color: {{$post->user->role->color}};">{{$post->user->role->display_name}}</p>
                                </a>
                            </div>
                        </div>
                        <div class="col-md-10">
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
            <h5>@lang('cosmo.forums.threads.locked_no_reply')</h5>
        @else
            @auth
                <div class="mb-3">
                    <form action="{{route('forums.posts.store', $thread->id)}}" method="post">
                        @csrf
                        <textarea name="content"></textarea>
                        <button type="submit" class="btn btn-primary mt-3">@lang('cosmo.actions.post')</button>
                    </form>
                </div>
            @endauth
        @endif

        {{ $posts->links('themes.purity.pagination') }}
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/reactions.js') }}"></script>
    <script src="{{ asset('js/tinymce.js') }}"></script>
@endpush