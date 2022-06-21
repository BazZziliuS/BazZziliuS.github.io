@extends('themes.dxrk.layout')

@section('title')
    Change Logs
@endsection

@section('header')
    <h1 class="title">Change Logs</h1>
    <h3 class="subtitle">View the changes and updates made to this community</h3>
@endsection

@section('content')
    @include('themes.dxrk.includes.hero')

    <div class="container -mt-4" id="changelogs">
        @foreach($changes as $createdAt => $changelogs)
            <div class="day">
                <h3><b>{{ $createdAt }}</b></h3>

                <div class="row justify-content-center">
                    @foreach($changelogs as $changelog)
                        <div class="col-md-6 my-4" id="changelog-{{ $changelog->id }}">
                            <div class="card h-100 border-0 shadow">
                                <div class="card-header">
                                    <div class="d-flex">
                                        <div class="d-inline-flex flex-grow-1">
                                            <h4 class="card-title">{{ $changelog->title }}</h4>
                                        </div>
                                        <div class="d-inline-flex flex-shrink-0 ml-auto">
                                            @if ($changelog->labels->isNotEmpty())
                                                <div class="card-labels text-center py-2">
                                                    @foreach($changelog->labels as $label)
                                                        <span class="badge" style="background-color: {{ $label->color }}20 !important; color: {{ $label->color }} !important;">
                                                    {{ $label->name }}
                                                </span>
                                                    @endforeach
                                                </div>
                                            @endif
                                        </div>
                                    </div>
                                    <small class="card-desc pt-0 my-auto ml-auto">{{ $changelog->created_at->diffForHumans() }}</small>
                                </div>
                                <div class="card-body">
                                    {{ $changelog->content }}
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        @endforeach

        {{ $paginator->links('themes.dxrk.pagination') }}
    </div>
@endsection