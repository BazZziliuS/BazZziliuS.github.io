@extends('themes.dxrk.layout')

@section('title')
    @lang('cosmo.core.store')
@endsection

@section('header')
    <h3 class="section-subheader">{{ $configs['store_description'] }}</h3>
    <h1 class="section-header">{{ $configs['store_title'] }}</h1>
@endsection

@section('content')
    @include('themes.dxrk.includes.hero')

    <div class="container mb-5" id="store" style="margin-top: -6rem;">

        @if($configs['monthly_goal_enabled'])
            <h3 class="store_section-title">@lang('cosmo.store.monthly_goal')</h3>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: {{ $goalProgress }}%;" aria-valuenow="{{ $goalProgress }}" aria-valuemin="0" aria-valuemax="100">{{ $goalProgress }}%</div>
            </div>
        @endif

        @if($configs['show_store_statistics'])
            <div class="row justify-content-between mb-4">
                <div class="col-md-6">
                    <h3 class="store_section-title">@lang('cosmo.store.table.recent_donations')</h3>
                    <table class="table table-stripped" style="margin-bottom: 3rem">
                        <thead class="thead">
                        <tr>
                            <th scope="col">@lang('cosmo.store.table.name')</th>
                            <th scope="col">@lang('cosmo.store.table.package')</th>
                            <th scope="col">@lang('cosmo.store.table.amount')</th>
                        </tr>
                        </thead>
                        <tbody class="tbody">
                        @forelse($recent as $trans)
                            <tr>
                                <td>{{ $trans->buyer->username }}</td>
                                <td>{{ $trans->package->name }}</td>
                                <td>{{ $currency . $trans->price }}</td>
                            </tr>
                        @empty
                            <tr>
                                <td>Empty</td>
                                <td></td>
                                <td></td>
                            </tr>
                        @endforelse
                        </tbody>
                    </table>
                </div>
                <div class="col-md-6">
                    <h3 class="store_section-title">@lang('cosmo.store.table.top_donations')</h3>
                    <table class="table table-stripped" style="margin-bottom: 3rem">
                        <thead class="thead">
                        <tr>
                            <th scope="col">@lang('cosmo.store.table.name')</th>
                            <th scope="col">@lang('cosmo.store.table.amount')</th>
                        </tr>
                        </thead>
                        <tbody class="tbody">
                        @forelse($top as $trans)
                            <tr>
                                <td>{{ $trans->buyer->username }}</td>
                                <td>{{ $currency . $trans->sum }}</td>
                            </tr>
                        @empty
                            <tr>
                                <td>Empty</td>
                                <td></td>
                            </tr>
                        @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        @endif

        <div class="store-content mb-5 mt-3">
            {!! $configs['store_header'] !!}
        </div>

        <div class="row justify-content-center">
            @foreach($servers as $server)
                <div class="col-md-4">
                    <div class="card border-0 h-100 shadow server-select">
                        <i class="{{ $server->icon ? $server->icon : 'fas fa-server' }}"></i>
                        <div class="card-body">
                            <div class="row justify-content-between">
                                <div class="col text-left">
                                    <h3 class="card-title">{{$server->name}}</h3>
                                    <p class="p-0 m-0"> <code>{{ $server->ip }}:{{ $server->port }}</code> </p>
                                </div>
                                <div class="col text-right my-auto">
                                    <a href="{{route('store.servers.show', $server->id)}}" class="btn btn-outline-primary">@lang('cosmo.store.select_server')</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

    </div>
@endsection