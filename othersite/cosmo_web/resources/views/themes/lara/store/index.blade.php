@extends('themes.lara.layout')

@section('title')
    @lang('cosmo.core.store')
@endsection

@section('header_title')
    <h3 class="title">{{ $configs['store_title'] }}</h3>
    <p class="subtitle">{{ $configs['store_description'] }}</p>
@endsection

@section('content')
    @include('themes.lara.includes.header')

    <div class="container my-5" id="store">
        @if($configs['monthly_goal_enabled'])
            <h3 class="store_section-title">@lang('cosmo.store.monthly_goal')</h3>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: {{ $goalProgress }}%;" aria-valuenow="{{ $goalProgress }}" aria-valuemin="0" aria-valuemax="100">{{ ceil($goalProgress) }}%</div>
            </div>
        @endif

        @if($configs['show_store_statistics'])
            <div class="row justify-content-between mb-4 mt-4">
                <div class="col-md-6">
                    <h3 class="store_section-title">@lang('cosmo.store.table.recent_donations')</h3>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">@lang('cosmo.store.table.name')</th>
                                <th scope="col">@lang('cosmo.store.table.package')</th>
                                <th scope="col">@lang('cosmo.store.table.amount')</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($recent as $transaction)
                                <tr>
                                    <td>{{ $transaction->buyer->username }}</td>
                                    <td>{{ $transaction->package->name }}</td>
                                    <td>{{$currency}}{{ $transaction->price }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                <div class="col-md-6">
                    <h3 class="store_section-title">@lang('cosmo.store.table.top_donations')</h3>
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">@lang('cosmo.store.table.name')</th>
                            <th scope="col">@lang('cosmo.store.table.amount')</th>
                        </tr>
                        </thead>
                        <tbody>
                            @foreach($top as $transaction)
                                <tr>
                                    <td>{{ $transaction->buyer->username }}</td>
                                    <td>{{$currency}}{{ $transaction->sum }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        @endif

        <div class="store-content mb-5 mt-3">
            {!! $configs['store_header'] !!}
        </div>

        <div class="row justify-content-center" id="servers">
            @foreach($servers as $server)
                <div class="col-md-3">
                    <a class="server p-0 mt-3 shadow" href="{{ route('store.servers.show', $server->id) }}">
                        <div class="d-flex align-items-center mt-n3 mx-auto title" style="background-color: {{$server->color}}; ">
                            <i class="{{$server->icon}} flex-shrink-0 text-white"></i>
                            <h3 class="flex-grow-1 text-white">{{$server->name}}</h3>
                        </div>
                    </a>
                </div>
            @endforeach
        </div>
    </div>
@endsection