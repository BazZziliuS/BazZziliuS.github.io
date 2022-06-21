@extends('themes.purity.layout')

@section('title')
    @lang('cosmo.core.store')
@endsection

@section('page_titles')
    <h3 class="subtitle text-truncate">{{ $configs['store_description'] }}</h3>
    <h1 class="title text-truncate">{{ $configs['store_title'] }}</h1>
@endsection

@section('content')
    <div class="container" id="store">
        @if ($configs['monthly_goal_enabled'])
            <h3 class="top-donors_title">@lang('cosmo.store.monthly_goal')</h3>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: {{ $goalProgress }}%"
                     aria-valuenow="{{$goalProgress}}" aria-valuemin="0" aria-valuemax="100">
                    {{ ceil($goalProgress) }}%
                </div>
            </div>
        @endif

        @if ($configs['show_store_statistics'])
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <h3 class="top_donors">@lang('cosmo.store.table.top_donations')</h3>
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
                <div class="col-md-6">
                    <h3 class="top_donors">@lang('cosmo.store.table.recent_donations')</h3>
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
            </div>
        @endif

        <div class="store-content">
            {!! $configs['store_header'] !!}
        </div>

        <div class="row justify-content-center">
            @foreach($servers as $server)
            <div class="col-lg-3 my-3">
                <a class="server card h-100 border-0 shadow" data-aos="zoom-in-up" data-aos-duration="200" href="{{ route('store.servers.show', $server->id) }}">
                    <div class="card-title mt-3 mb-3">
                            <span class="fa-stack fa-2x">
                              <i class="fas fa-square fa-stack-2x" style="color: {{ $server->color ? $server->color : '#00cec9' }}"></i>
                              <i class="{{ $server->icon }} fa-stack-1x fa-inverse"></i>
                            </span>
                        <h4 class="d-inline my-auto text-truncate">{{$server->name}}</h4>
                    </div>
                </a>
            </div>
            @endforeach
        </div>
    </div>
@endsection