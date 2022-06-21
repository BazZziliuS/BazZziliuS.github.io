@extends('themes.havart.layout')

@section('title')
    Change Logs
@endsection

@section('header_title')
    <h1 class="title">Change Logs</h1>
    <h3 class="subtitle">View the changes and updates made to this community</h3>
@endsection

@section('content')
    @include('themes.havart.includes.header')

    <div class="container" id="changelog">
        @foreach($changes as $createdAt => $changelogs)
            <div class="day">
                <h3><b>{{ $createdAt }}</b></h3>

                <div class="row justify-content-center">
                    @foreach($changelogs as $changelog)
                        <div class="col-md-6 my-4" id="changelog-{{ $changelog->id }}">
                            <div class="card h-100 border-0 shadow">
                                <div class="card-header">
                                    <h4 class="card-title">{{ $changelog->title }}</h4>
                                    <small class="card-desc">{{ $changelog->created_at->diffForHumans() }}</small>
                                </div>
                                @if ($changelog->labels->isNotEmpty())
                                    <div class="card-labels text-center py-2">
                                        @foreach($changelog->labels as $label)
                                            <span class="badge" style="background-color: {{ $label->color }}20 !important; color: {{ $label->color }} !important;">
                                                {{ $label->name }}
                                            </span>
                                        @endforeach
                                    </div>
                                @else
                                    <hr class="my-0" style="background-color: #757575 !important;" />
                                @endif
                                <div class="card-body">
                                    {{ $changelog->content }}
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        @endforeach

        {{ $paginator->links('themes.havart.pagination') }}
    </div>
@endsection