@extends('themes.lara.layout')

@section('title')
    @lang('cosmo.core.home')
@endsection

@section('header_title')
    <h3 class="title">{{$configs['header_title']}}</h3>
    <p class="subtitle">{{$configs['header_description']}}</p>
@endsection

@section('content')
    @include('themes.lara.includes.header')


    @if(is_array($steamData))
        <div id="stats" class="section container d-flex flex-column mt-5">
            <div class="row justify-content-center">
                <div class="col-md-4 my-2">
                    <div class="card h-100 border-0 stat shadow">
                        <h5 class="card-title">{{ $steamData['total'] }}</h5>
                        <p class="text-muted">@lang('cosmo.core.theme_specific.group_members')</p>
                    </div>
                </div>
                <div class="col-md-4 my-2">
                    <div class="card h-100 border-0 stat shadow">
                        <h5 class="card-title">{{ $steamData['online'] }}</h5>
                        <p class="online">@lang('cosmo.core.theme_specific.online_members')</p>
                    </div>
                </div>
                <div class="col-md-4 my-2">
                    <div class="card h-100 border-0 stat shadow">
                        <h5 class="card-title">{{ $steamData['ingame'] }}</h5>
                        <p class="game">@lang('cosmo.core.theme_specific.in-game_members')</p>
                    </div>
                </div>
            </div>
            <a href="https://steamcommunity.com/groups/{{ $configs['steam_group_slug'] }}" class="btn btn-steamgroup btn-lg mt-4">@lang('cosmo.core.theme_specific.join_steam-group')</a>
        </div>
    @endif

    @if(!$features->isEmpty())
        <div class="section container mt-4" id="features">
            <div class="section-title text-white text-center">
                <p class="subtitle">{{$configs['features_description']}}</p>
                <h3 class="title">{{$configs['features_title']}}</h3>
            </div>

            <div class="row justify-content-center">
                @foreach($features as $feature)
                    <div class="col-xl-3 col-md-4 my-4">
                        <div class="card p-4 feature h-100 shadow">
                            <div class="row justify-content-center">
                                <div class="icon-holder"
                                     style="border-color: {{$feature->color}}; color: {{$feature->color}};">
                                    <i class="{{$feature->icon}} fa-2x"></i>
                                </div>
                            </div>
                            <h4 class="mb-3 text-uppercase">{{$feature->name}}</h4>
                            <p class="mb-0">{{$feature->content}}</p>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    @endif

    @if(!$servers->isEmpty())
        <div class="section-2 container" id="servers">
            <div class="section-title text-white text-center">
                <p class="subtitle">{{$configs['servers_description']}}</p>
                <h3 class="title">{{$configs['servers_title']}}</h3>
            </div>
            <div class="row justify-content-center">
                @foreach($servers as $server)
                    <div class="col-lg-6 col-md-12 my-4">
                        <div class="card server p-0 mt-3 shadow" data-server-id="{{ $server->id }}">
                            <div class="d-flex align-items-center mt-n3 mx-auto title" style="background-color: {{$server->color}}; ">
                                <div server-loading class="server-anim">
                                    <i class="fa fa-spin fa-spinner-third fa-2x text-center"></i>
                                </div>
                                <i class="{{$server->icon}} flex-shrink-0 text-white" server-icon style="display: none"></i>
                                <h3 class="flex-grow-1 text-white" server-name=>{{$server->name}}</h3>
                            </div>


                            <p class="text-white-50 text-center px-5 py-4 m-0" server-description>{{$server->description}}</p>
                            <p class="text-white-50 px-5 mb-4" server-map-name></p>
                            <div class="d-flex pb-5 px-5">
                                <div class="progress flex-grow-1">
                                    <div class="progress-bar" role="progressbar"
                                         style="background-color: {{ $server->color }}"
                                         aria-valuemin="0" server-player-count>
                                    </div>
                                </div>
                                <a href="steam://connect/{{$server->ip}}:{{$server->port}}" style="background-color: {{$server->color}}">
                                    <span>@lang('cosmo.store.select_server')</span>
                                </a>
                            </div>
                        </div>
                    </div>

                @endforeach
            </div>
        </div>
    @endif

    @if(!$leadership->isEmpty())
        <div class="section container" id="leaders">
            <div class="section-title text-white text-center">
                <p class="subtitle">{{$configs['leadership_description']}}</p>
                <h3 class="title">{{$configs['leadership_title']}}</h3>
            </div>

            <div class="row justify-content-center">
                @foreach ($leadership as $user)
                    <div class="col-md-3 my-3">
                        <a href="{{ route('users.show', $user->steamid) }}" class="card leader shadow text-center p-4">
                            <img src="{{$user->avatar}}" alt="user profile picture" class="rounded-circle mb-3" style="max-width: 5rem; height: auto; margin-left: 6rem">
                            <h4>{{$user->username}}</h4>
                            <h4 class="leader-role" style="color: {{$user->role->color}}">{{$user->role->name}}</h4>
                        </a>
                    </div>
                @endforeach
            </div>
        </div>
    @endif



@endsection

@push('scripts')
    <script src="{{ asset('js/server-fetch.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
@endpush