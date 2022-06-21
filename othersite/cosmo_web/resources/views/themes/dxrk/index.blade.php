@extends('themes.dxrk.layout')

@section('title')
    @lang('cosmo.core.home')
@endsection

@section('header')
    <h1 class="title">{{$configs['header_title']}}</h1>
    <h3 class="subtitle">{{$configs['header_description']}}</h3>
@endsection

@section('content')
    @include('themes.dxrk.includes.hero')
    <div id="home">
        @if(!$features->isEmpty())
            <section class="features container">
                <div class="row justify-content-center">
                @foreach($features as $feature)
                    <div class="col-xl-3 col-lg-6 col-md-5 my-4">
                        <div class="card feature h-100 shadow">
                            <span class="fa-stack fa-2x">
                                <i class="fas fa-square fa-stack-2x" style="color: {{ $feature->color }}"></i>
                                <i class="{{ $feature->icon }} fa-stack-1x fa-inverse text-white"></i>
                            </span>
                            <div class="card-body">
                                <h5 class="card-title">{{ $feature->name }}</h5>
                                <p class="card-desc mb-0">{{ $feature->content }}</p>
                            </div>
                        </div>
                    </div>
                @endforeach
                </div>
            </section>
        @endif
        @if(is_array($steamData))
            <section class="steamData text-center">
                <div class="container">
                    <h3>@lang('cosmo.dxrk.steam_title')</h3>
                    <p>
                        @lang('cosmo.dxrk.steam_desc', [
                            "here" => '<span class="alt"><a href="https://steamcommunity.com/groups/'.$configs['steam_group_slug'].'">Here</a></span>'
                        ])
                    </p>

                    <div class="row justify-content-center">
                        <div class="col-md-4 my-2">
                            <div class="card h-100 stat border-0 shadow">
                                <div class="card-body d-flex">
                                    <p class="value d-inline-flex flex-shrink-0">{{number_format($steamData['total'])}}</p>
                                    <p class="text d-inline-flex flex-grow-1 my-auto">@lang('cosmo.core.theme_specific.group_members')</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 my-2">
                            <div class="card h-100 stat border-0 shadow">
                                <div class="card-body d-flex">
                                    <p class="value d-inline-flex flex-shrink-0">{{number_format($steamData['online'])}}</p>
                                    <p class="text d-inline-flex flex-grow-1 my-auto">@lang('cosmo.core.theme_specific.online_members')</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 my-2">
                            <div class="card h-100 stat border-0 shadow">
                                <div class="card-body d-flex">
                                    <p class="value d-inline-flex flex-shrink-0">{{number_format($steamData['ingame'])}}</p>
                                    <p class="text d-inline-flex flex-grow-1 my-auto">@lang('cosmo.core.theme_specific.in-game_members')</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        @endif
        @if(!$servers->isEmpty())
            <section class="servers container">
                <div class="title-area">
                    <h3 class="title">{{ $configs['servers_title'] }}</h3>
                    <p class="description">{{ $configs['servers_description'] }}</p>
                </div>

                <div class="row justify-content-center">
                    @foreach($servers as $server)
                        <div class="col-md-5 my-4">
                            @if($server->image)
                                <div class="image position-relative">
                                <img src="{{$server->image}}" server-image alt="Server Image"
                                     class="img-fluid mt-4 rounded">
                                </div>
                            @else
                                <span class="server-background" server-color
                                      style="background-color: {{ $server->color }} !important;
                                              display: block; height: 300px !important">
                                </span>
                            @endif
                            <div class="server card shadow border-0 text-center" data-server-id="{{ $server->id }}">
                                <div class="card-body">
                                    <span class="fa-stack fa-2x">
                                      <i class="fas fa-circle fa-stack-2x" style="color: {{$server->color}}"></i>
                                      <i server-icon class="{{ $server->icon }} fa-stack-1x fa-inverse text-white"></i>
                                    </span>

                                    <h5 class="card-title" server-name>{{$server->name}}</h5>
                                    <div server-loading>
                                        <i class="fa fa-spin fa-spinner-third fa-2x text-center"></i>
                                    </div>
                                    <div style="display:none;" server>
                                        <p server-description class="description">{{$server->description}}</p>
                                        <div class="d-flex">
                                            <div class="d-inline-flex mr-auto">
                                                <a join_server href="steam://connect/{{$server->ip}}:{{$server->port}}"
                                                   class="btn text-white">
                                                    <code>@lang('cosmo.dxrk.join_server')</code>
                                                </a>
                                            </div>
                                            <div class="d-inline-flex ml-auto">
                                                <p class="card-text text-white-50" server-map-name>rp_gathering_information</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </section>
        @endif
        @if(!$leadership->isEmpty())
            <section class="leadership">
                <div class="container">
                    <div class="title-area">
                        <h3 class="title">{{ $configs['leadership_title'] }}</h3>
                        <p class="description">{{ $configs['leadership_description'] }}</p>
                    </div>

                    <div class="row justify-content-center">
                        @foreach($leadership as $user)
                            <div class="col-md-3 my-2">
                                <a class="card leader shadow mb-4 h-100" href="{{ route('users.show', $user->steamid) }}">
                                    <div class="card-header mb-2" style="background-color: {{$user->role->color}};"></div>
                                    <div class="card-body">
                                        <div class="text-center avatar">
                                            <img src="{{$user->avatar}}" alt="User Avatar" class="rounded-sm"
                                                 height="90" width="90">
                                        </div>
                                        <div class="text-center mt-3">
                                            <h4 class="card-title text-truncate"
                                                data-tippy-content="{{$user->steamid}}">{{$user->username}}</h4>
                                            <h6 class="card-role"
                                                style="color: {{$user->role->color}};">{{$user->role->display_name}}</h6>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        @endforeach
                    </div>
                </div>
            </section>
        @endif
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/server-fetch.js') }}"></script>
@endpush
