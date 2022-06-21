@extends('themes.dxrk.layout')

@section('title')
    {{$board->name}}
@endsection

@section('header')
    <h2 class="section-header">{{$board->name}}</h2>
@endsection

@can('create', ['App\Models\Forums\Thread', $board])
    @section('header_misc')
        <div class="text-center">
            <a href="{{route('forums.threads.create', $board->id)}}" role="button" class="btn btn-primary">
                @lang('cosmo.forums.threads.create_thread')
            </a>
        </div>
    @endsection
@endcan

@section('content')
    @include('themes.dxrk.includes.hero')


    <div class="container mt-4" id="threads" style="margin-top: -7rem !important;">
        @foreach($board->subBoards as $board)
            <div class="card shadow mb-3">
                <div class="card-body">
                    <a href="{{route('forums.boards.show', $board->id)}}" class="text-decoration-none">
                        <div class="d-flex">

                            <div class="d-inline justify-content-center mr-3 pr-0">
                                <div class="my-auto">
                                    <i class="{{$board->icon}} fa-2x"
                                       style="color: {{$board->color}}; float: left;"></i>
                                </div>
                            </div>
                            <div class="d-inline">
                                <p class="mb-0 mt-0 title" style="line-height: 200%">{{$board->name}}</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        @endforeach
        {{ $threads->links('themes.dxrk.pagination') }}
    </div>

    {{--    $thread->stickied --}}
    <div class="container mt-4" id="threads">
        @foreach($threads as $thread)
            <div class="card shadow mb-3">
                <div class="card-body">
                    <a href="{{route('forums.threads.show', $thread->id)}}" class="text-decoration-none">
                        <div class="d-flex">

                            @if($thread->stickied)
                                <div class="pr-0 mr-2 d-flex justify-content-center">
                                    <div class="my-auto">
                                        <i class="fad fa-thumbtack" style="color: #00b894"></i>
                                    </div>

                                </div>
                            @endif

                            @if($thread->locked)
                                <div class="pr-0 mr-2 d-flex justify-content-center">
                                    <div class="my-auto">
                                        <i class="fad fa-lock-alt" style="color: #d63031"></i>
                                    </div>
                                </div>
                            @endif

                            <div class="d-flex mr-2 ml-1 justify-content-center">
                                <div class="my-auto">
                                    <img src="{{$thread->user->avatar}}" class="rounded" style="max-height: 40px;"
                                         alt="Author Profile Picture">
                                </div>
                            </div>
                            <div class="overflow-hidden text-nowrap">
                                <p class="mb-0 mt-0 title">{{$thread->title}}</p>
                                <small class="username_full">
                                    @lang('cosmo.forums.threads.posted_by'): <span class="username">{{$thread->user->username}}</span>
                                </small>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        @endforeach
        {{ $threads->links('themes.dxrk.pagination') }}
    </div>
@endsection
