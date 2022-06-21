@extends('themes.dxrk.layout')

@section('title')
    @lang('cosmo.core.checkout')
@endsection

@section('header')
    <h3 class="section-subheader">@lang('cosmo.store.finalize_purchase')</h3>
    <h1 class="section-header">@lang('cosmo.core.checkout')</h1>
@endsection

@section('content')
    @include('themes.dxrk.includes.hero')

    <div class="container mb-5" id="checkout" style="margin-top: -10rem !important">
        <form id="checkout-form" method="post">
            @csrf

            <div class="row justify-content-between mb-3" style="position: relative; z-index: 99">
                <div class="col-md-3">
                    @if (!$package->custom_price)
                        <div class="card h-100 shadow borer-0 action">
                            <div class="card-body">
                                <label for="coupon"></label>
                                <input type="text" placeholder="Enter Coupon Code"
                                       style="background-color: #14151d !important; border-color: #14151d;color: white" id="coupon" name="coupon"/>
                                <h5 class="mb-0 mt-2 upper-title_small">@lang('cosmo.store.coupon-code')</h5>
                            </div>
                        </div>
                    @endif
                </div>
                <div class="col-md-3">
                    <div class="card h-100 shadow borer-0 action">
                        <div class="card-body">
                            <label for="gift"></label>
                            <input type="text" placeholder="Enter Steam ID"
                                   style="background-color: #14151d !important; border-color: #14151d;color: white" id="gift" name="gift"/>
                            <h5 class="mb-0 mt-2 upper-title_small">@lang('cosmo.store.gift-purchase')</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row justify-content-center">
                <div class="col-md-9 mr-auto">
                    <div class="card h-100 border-0 shadow">
                        <div class="card-header border-0">
                            <h3 class="card-title">{{ $package->name }}</h3>
                        </div>
                        <div class="card-body">{!! $package->description !!}</div>
                    </div>
                </div>

                @if($package->custom_price)
                    <input type="hidden" name="custom_price" value="{{request()->get('custom-price', 0)}}"/>
                @endif

                <div class="col-md-3 ml-auto">
                    <div class="card h-100 shadow border-0 text-left">
                        <div class="card-header">
                            <h3>@lang('cosmo.store.sub-total')</h3>
                        </div>
                        <div class="card-body">
                            <ul>
                                <li>
                                    {{ $package->name }} <br/>
                                    - {{ $package->permanent ? 'Permanent' : 'Non-Permanent' }} <br/>
                                    - Price: {{$currency}}{{ request()->get('custom-price', $package->price) }} <br/>
                                    @if($package->finalPrice < $package->price)
                                    - Discount: {{$currency}}{{(float)($package->price - $package->finalPrice)}} <br/>
                                    @endif
                                    - @lang('cosmo.store.servers'): @foreach($package->servers as $name => $server)
                                        <span class="mr-2">{{ $server->name }}</span>
                                    @endforeach
                                </li>
                            </ul>
                        </div>
                        <div class="card-footer">
                            <h5>
                                @lang('cosmo.store.package_price'):
                                @if ($package->custom_price)
                                    {{ $currency . (float)request()->get('custom-price') }}
                                @else
                                    {{ $currency . $package->finalPrice }}
                                @endif
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card h-100 shadow border-0 mt-4">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div class="my-auto">
                            <div class="custom-control custom-checkbox tos">
                                <input type="checkbox" class="custom-control-input" id="tosAccept" name="tos">
                                <label class="custom-control-label text-muted"
                                       for="tosAccept">@lang('cosmo.store.tos_agree')</label>
                            </div>
                        </div>
                        <div class="flex-grow">
                            @foreach ($gateways as $name => $gateway)
                                @if ($gateway::isEnabled())
                                    <button class="btn btn-outline-primary mr-2" onclick="setGateway('{{ $name }}')">
                                        <i class="{{ $gateway::$icon }}"></i>
                                    </button>
                                @endif
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
@endsection

@push('scripts')
    <script>
        const gatewayRoutes = @json($gateway_urls);
        const form = document.getElementById('checkout-form');

        function setGateway(name) {
            if (typeof gatewayRoutes[name] === 'undefined') return;

            form.action = gatewayRoutes[name];
        }
    </script>
@endpush