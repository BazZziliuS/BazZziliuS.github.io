@extends('themes.havart.layout')

@section('title')
    @lang('cosmo.core.home')
@endsection

@section('header_title')
    <h1 class="title">{{$configs['header_title']}}</h1>
    <h3 class="subtitle">{{$configs['header_description']}}</h3>
@endsection

@section('content')
    <div id="home">
        @include('themes.havart.includes.header')

        @if(!$features->isEmpty() && is_array($steamData))
            <div class="section features_stats d-flex w-75 mx-auto flex-column flex-lg-row">
                <div class="features d-flex flex-column position-relative">
                    @foreach($features as $feature)
                        <div class="feature d-flex">
                            <div class="feature-container">
                                <span class="fa-stack fa-2x">
                                    <i class="fas fa-circle fa-stack-2x"></i>
                                    <i class="{{ $feature->icon }} fa-stack-1x"></i>
                                </span>
                                <div class="feature-line"></div>
                            </div>
                            <div class="mb-4">
                                <span class="content">{{ $feature->content }}</span>
                            </div>
                        </div>
                    @endforeach
                </div>

                <div class="stats d-flex flex-column ml-4 mt-5">
                    <div class="row">
                        <div class="col-md-4 my-2">
                            <div class="card h-100 border-0 stat">
                                <h5 class="card-title purecounter" data-purecounter-duration="2.5"
                                    data-purecounter-end="{{ $steamData['total'] }}">~~~</h5>
                                <p class="text-muted">@lang('cosmo.core.theme_specific.group_members')</p>
                            </div>
                        </div>
                        <div class="col-md-4 my-2">
                            <div class="card h-100 border-0 stat">
                                <h5 class="card-title purecounter" data-purecounter-duration="2.5"
                                    data-purecounter-end="{{ $steamData['online'] }}">~~~</h5>
                                <p class="online">@lang('cosmo.core.theme_specific.online_members')</p>
                            </div>
                        </div>
                        <div class="col-md-4 my-2">
                            <div class="card h-100 border-0 stat">
                                <h5 class="card-title purecounter" data-purecounter-duration="2.5"
                                    data-purecounter-end="{{ $steamData['ingame'] }}">~~~</h5>
                                <p class="game">@lang('cosmo.core.theme_specific.in-game_members')</p>
                            </div>
                        </div>
                    </div>
                    <a href="https://steamcommunity.com/groups/{{ $configs['steam_group_slug'] }}" class="btn btn-steamgroup btn-lg mt-4">@lang('cosmo.core.theme_specific.join_steam-group')</a>
                </div>
            </div>
        @elseif (!$features->isEmpty() && !is_array($steamData))
            <div class="section features container">
                <div class="row justify-content-center">
                    @foreach($features as $feature)
                        <div class="col-xl-3 col-lg-6 col-md-5 col-sm-12 my-xl-5 my-4">
                            <div class="feat card h-100 text-center d-flex">
                                <div class="w-100 spanner d-flex pt-3">
                                    <span class="fa-stack fa-2x d-inline-flex ml-2">
                                        <i class="fas fa-square fa-stack-2x"></i>
                                        <i class="{{ $feature->icon }} fa-stack-1x"></i>
                                    </span>
                                    <h3 class="card-title d-inline-flex my-auto ml-auto mr-4">{{ $feature->name }}</h3>
                                </div>
                                <div class="card-body">
                                    <span class="content">{{ $feature->content }}</span>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        @endif

        <div class="svg-2">
            <img src="{{ asset('themes/havart/img/svgs/elipsis5x4.svg') }}" alt="">
        </div>

        @if(!$servers->isEmpty())
            <div class="svg-1">
                <img src="{{ asset('themes/havart/img/svgs/elipsis8x4.svg') }}" alt="">
            </div>
            <div class="section servers" id="servers">
                <div class="svg-4">
                    <img src="{{ asset('themes/havart/img/svgs/f_circle.svg') }}" alt="">
                </div>
                <div class="container">
                    <div class="svg-3">
                        <img src="{{ asset('themes/havart/img/svgs/elipsis8x4.svg') }}" alt="">
                    </div>

                    @foreach($servers as $i => $server)
                        @if($i % 2 == 0)
                            <div class="server my-5" data-server-id="{{ $server->id }}">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="rect"></div>
                                        <div server-loading class="server-anim">
                                            <i class="fa fa-spin fa-spinner-third fa-2x text-center"></i>
                                        </div>
                                        <div class="map" server-map-container><span server-map-name></span></div>
                                        <img server-image class="img-fluid" src="{{ $server->image }}" alt="">
                                        <a href="steam://connect/{{ $server->ip }}:{{ $server->port }}"
                                           class="btn btn-sm btn-connect icon"><i class="fad fa-plug"></i></a>
                                    </div>
                                    <div class="col-md-6 my-auto">
                                        <h5 class="servers-title" server-name>{{ $server->name }}</h5>
                                        <p class="servers-desc" server-description>{{$server->description}}</p>
                                        <div class="row d-flex justify-content-left align-items-center chart-container">
                                            <div server-chart class="chart-inner">
                                                <canvas id="server_chart_{{ $server->id }}"></canvas>
                                            </div>
                                            <div>
                                                <span class="player-count num_value" server-player-count></span>
                                                <span class="player-count" server-player-text style="display:none"> @lang('cosmo.core.theme_specific.players_online')</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @else
                            <div class="server my-5" data-server-id="{{ $server->id }}">
                                <div class="row">
                                    <div class="col-md-6 my-auto">
                                        <h5 class="servers-title" server-name>{{ $server->name }}</h5>
                                        <p class="servers-desc" server-description>{{$server->description}}</p>
                                        <div class="row d-flex justify-content-left align-items-center chart-container">
                                            <div server-chart class="chart-inner">
                                                <canvas id="server_chart_{{ $server->id }}"></canvas>
                                            </div>
                                            <div>
                                                <span class="player-count num_value" server-player-count></span>
                                                <span class="player-count" server-player-text style="display:none"> @lang('cosmo.core.theme_specific.players_online')</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="rect"></div>
                                        <div server-loading class="server-anim">
                                            <i class="fa fa-spin fa-spinner-third fa-2x text-center"></i>
                                        </div>
                                        <div class="map" server-map-container><span server-map-name></span></div>
                                        <img server-image class="img-fluid" src="{{ $server->image }}" alt="">
                                        <a href="steam://connect/{{ $server->ip }}:{{ $server->port }}"
                                           class="btn btn-sm btn-connect icon">
                                            <i class="fad fa-plug"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        @endif
                    @endforeach
                </div>
            </div>
        @endif


        @if(!$leadership->isEmpty())
            <div class="section leadership container">
                <div class="titles text-center">
                    <h2 class="title">{{ $configs['leadership_title'] }}</h2>
                    <p class="subtitle">{{ $configs['leadership_description'] }}</p>
                </div>
                <div class="row justify-content-center">
                    @foreach($leadership as $leader)
                        <div class="col-md-3 my-3">
                            <a class="card leader h-100 border-0 shadow" href="{{ route('users.show', $leader->steamid) }}">
                                <div class="card-header" style="background-color: {{ $leader->role->color }}"></div>
                                <div class="card-body">
                                    <div class="content d-flex text-nowrap overflow-hidden">
                                        <img src="{{ $leader->avatar }}" alt="" class="img-fluid rounded-circle d-inline mr-2">
                                        <div>
                                            <h3 class="card-title d-inline">{{ $leader->username }}</h3>
                                            <h4 class="role">{{ $leader->role->display_name }}</h4>
                                        </div>
                                    </div>

                                </div>
                            </a>
                        </div>
                    @endforeach
                </div>
                <div class="svg-6">
                    <img src="{{ asset('themes/havart/img/svgs/elipsis8x4.svg') }}" alt="">
                </div>
            </div>
        @endif
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/server-fetch.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
    <script type="text/javascript">
        $('[data-server-id]').each(function (index, data) {
            let obj = $(this);

            obj.on('received-data', function () {
                let onlinePlayers = obj.data('player-count');
                let maxPlayers = obj.data('max-player-count');
                let offlinePlayers = maxPlayers - onlinePlayers;
                let serverId = obj.data('serverId');

                new Chart(document.getElementById('server_chart_' + serverId), {
                    type: 'pie',
                    data: {
                        labels: ["", ""],
                        datasets: [{
                            data: [onlinePlayers, offlinePlayers],
                            backgroundColor: ['#3D3D46', '#232328'],
                            borderWidth: 0
                        }],
                    },
                    options: {
                        legend: {
                            display: false
                        },
                        tooltips: {
                            enabled: false,
                            backgroundColor: "#232328",
                            bodyFontColor: "#fff",
                            borderColor: '#232328',
                            borderWidth: 1,
                            xPadding: 10,
                            yPadding: 10,
                            displayColors: false,
                            caretPadding: 10,
                            zIndex: 9999
                        },
                        maintainAspectRatio: false
                    },
                });
            });
        });
    </script>
@endpush
