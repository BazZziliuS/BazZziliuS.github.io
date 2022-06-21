@extends('themes.dxrk.layout')

@section('title', 'Poll Listing')

@section('header')
    <h1 class="title">Poll Listings</h1>
@endsection

@section('crumbs')
    <li class="breadcrumb-item"><a href="{{ route('home') }}">@lang('cosmo.core.home')</a></li>
    <li class="breadcrumb-item"><a href="{{ route('forums.index') }}">@lang('cosmo.core.forums')</a></li>
    <li class="breadcrumb-item"><a href="{{ route('forums.polls.index') }}">Polls</a></li>
@endsection

@section('content')
    @include('themes.dxrk.includes.hero')

    <div class="container mt-4 polls" id="forumBoards">
        @if(!is_null($polls) && auth()->check())
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <form action="{{route('forums.polls.index')}}" method="get">
                        @csrf
                        <div class="form-group">
                            <label for="search"></label>
                            <input type="text" name="search" id="search" placeholder="Search Polls..."
                                   class="form-control" value="{{$search}}">
                        </div>
                    </form>
                </div>
            </div>

            <div class="row justify-content-center">
                @foreach($polls as $poll)
                    <div class="col-md-4 my-4">
                        <article class="card h-100 border-0" id="board">
                            <div class="card-header d-flex">
                                <h3 class="d-inline-flex card-title my-auto mr-auto">{{ $poll->title }}</h3>
                                <h5 class="d-inline-flex my-auto">
                                <span class="badge w-100 align-items-center p-2 gradient_bottom {{ $poll->closed ? 'badge-danger' : 'badge-success' }}">
                                    {{ $poll->closed ? 'Closed' : 'Open' }}
                                </span>
                                </h5>
                            </div>
                            <div class="card-body">
                                <p class="description">{{ $poll->description }}</p>
                            </div>
                            <div class="card-footer text-center">
                                <a href="{{ route('forums.polls.show', $poll->id) }}"
                                   class="btn btn-primary w-100 h-100">
                                    {{ $poll->closed || false || !auth()->check() ? 'View Results' : 'Vote' }}
                                </a>
                            </div>
                        </article>
                    </div>
                @endforeach
            </div>
        @elseif(!auth()->check())
            <span class="badge btn-warning w-100 align-items-center p-3 mb-2 gradient_bottom position-relative">
                <h6 class="text-truncate">Login to see the active poll listing!</h6>
            </span>
        @else
            <span class="badge btn-warning w-100 align-items-center p-3 mb-2 gradient_bottom position-relative">
                <h6 class="text-truncate">There are no polls!</h6>
            </span>
        @endif

        {{ $polls->links() }}
    </div>

@endsection