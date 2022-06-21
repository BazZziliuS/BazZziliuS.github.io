@extends('themes.purity.layout')

@section('title')
    @lang('cosmo.core.home')
@endsection

@section('page_titles')
    <h3 class="subtitle">{{$configs['header_description']}}</h3>
    <h1 class="title">{{$configs['header_title']}}</h1>
@endsection

@section('content')
@if (!$features->isEmpty())
    <section class="features" style="{{ $steamData ? 'margin-top: 3rem;' : 'margin-top: 12rem;' }}">
        <div class="container">
            @if ($steamData)
                <div class="titles">
                    <h4 class="subtitle text-truncate">{{ $configs['features_description'] }}</h4>
                    <h2 class="title text-truncate">{{ $configs['features_title'] }}</h2>
                </div>
            @endif
            <div class="row justify-content-center mt-2">
                @foreach($features as $feature)
                <div class="col-lg-3 my-3" data-aos="zoom-in-up" data-aos-duration="400">
                    <div class="feature card shadow border-0 h-100">
                        <div class="card-title mt-3">
                            <span class="fa-stack fa-2x">
                              <i class="fas fa-square fa-stack-2x" style="color: {{ $feature->color ? $feature->color : '#00cec9' }}"></i>
                              <i class="{{ $feature->icon }} fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 class="d-inline my-auto text-truncate">{{$feature->name}}</h4>
                        </div>
                        <div class="card-body">
                            <div class="card-desc">{{$feature->content}}</div>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </section>
@endif

@if(!$servers->isEmpty())
    <section class="servers" style="{{ !$features->isEmpty() ? 'margin-top: 8.5rem !important' : '' }}">
        <div class="container">
            <div class="titles">
                <h4 class="subtitle text-truncate">{{ $configs['servers_description'] }}</h4>
                <h2 class="title text-truncate">{{ $configs['servers_title'] }}</h2>
            </div>
            <div class="row justify-content-center mt-3">
                @foreach($servers as $server)
                <div class="col-lg-3 my-3">
                    <div class="server card h-100 border-0 shadow" data-server-id="{{ $server->id }}" data-aos="zoom-in-up" data-aos-duration="200">
                        <div class="card-title mt-3">
                            <span class="fa-stack fa-2x">
                              <i class="fas fa-square fa-stack-2x" style="color: {{ $server->color ? $server->color : '#00cec9' }}"></i>
                              <i server-icon_loading class="fas fa-spinner fa-spin fa-stack-1x fa-inverse"></i>
                              <i server-icon_loaded class=" {{ $server->icon }} fa-stack-1x fa-inverse" style="display: none"></i>
                            </span>
                            <h4 class="d-inline my-auto text-truncate" server-name>{{$server->name}}</h4>
                        </div>
                        <div class="card-body">
                            <p server-description>{{ $server->description }}</p>
                            <div class="text-center">
                                <div class="m-auto">
                                    <div class="map"><span server-map-name></span></div>
                                    <div class="players"><span server-player-count>~~</span> Players</div>
                                </div>
                                <div>
                                    <a href="steam://connect/{{ $server->ip }}:{{ $server->port }}"
                                       class="btn btn-sm btn-connect icon mb-0 mt-1"><i class="fad fa-plug"></i> @lang('cosmo.store.select_server')</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </section>
@endif

@if(!$leadership->isEmpty())
    <section class="leaders" style="margin-top: 8.5rem !important">
        <div class="container">
            <div class="titles">
                <h4 class="subtitle text-truncate">{{ $configs['leadership_description'] }}</h4>
                <h2 class="title text-truncate">{{ $configs['leadership_title'] }}</h2>
            </div>

            <div class="row justify-content-center mt-3">
                @foreach($leadership as $leader)
                    <div class="col-lg-3 col-md-6 col-sm-12 my-3">
                        <a class="leader card bg-inner mx-4 rounded-lg shadow-lg" href="{{ route('users.show', $leader->steamid) }}" data-aos="zoom-in-up" data-aos-duration="200">
                            <div class="card-body d-flex text-nowrap overflow-hidden">
                                <img class="d-inline" src="{{ $leader->avatar }}" alt="{{ $leader->username }}'s avatar">
                                <div class="d-inline my-auto">
                                    <h5 class="d-inline text-white-50 text-truncate">{{ $leader->username }}</h5>
                                    <h6 style="color: {{ $leader->role->color ? $leader->role->color : 'white' }}"
                                        class="text-uppercase mb-0 text-truncate">{{ $leader->role->display_name }}
                                    </h6>
                                </div>
                            </div>
                        </a>
                    </div>
                @endforeach
            </div>
        </div>
    </section>
@endif

@endsection

@push('scripts')
    <script src="{{ asset('js/server-fetch.js') }}"></script>
@endpush
