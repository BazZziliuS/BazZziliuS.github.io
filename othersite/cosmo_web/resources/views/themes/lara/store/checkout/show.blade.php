@extends('themes.lara.layout')

@section('title')
    @lang('cosmo.core.checkout')
@endsection

@section('header_title')
    <h3 class="title">@lang('cosmo.core.checkout')</h3>
    <p class="subtitle">@lang('cosmo.store.checking_out-package', ['package' => $package->name])</p>
@endsection

@section('content')
    @include('themes.lara.includes.header')

    <div class="container my-5" id="checkout">
        <form id="checkout-form" method="post">
            @csrf

            <div class="row justify-content-between mb-4">
                <div class="col-md-3">
                    <div class="card h-100 shadow border-0 action">
                        <h5 class="mb-0 mb-3 upper-title_small">@lang('cosmo.store.coupon-code')?</h5>
                        <input type="text" placeholder="Enter Coupon Code" name="coupon"/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card h-100 shadow border-0 action">
                        <div class="card-body">
                            <div class="d-flex">
                                <div class="flex-grow text-left my-auto">
                                    <div class="custom-control custom-checkbox tos">
                                        <input type="checkbox" class="custom-control-input" id="tosAccept" name="tos"
                                               required>
                                        <label class="custom-control-label text-muted"
                                               for="tosAccept">@lang('cosmo.store.tos_agree')</label>
                                    </div>
                                </div>
                                <div class="flex-grow text-right ml-auto my-auto">
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
                </div>
                <div class="col-md-3">
                    <div class="card h-100 shadow border-0 action">
                        <h5 class="mb-0 mb-3 upper-title_small">@lang('cosmo.store.gift-purchase')?</h5>
                        <input type="text" placeholder="Enter Steam ID" name="gift"/>
                    </div>
                </div>
            </div>

            @if($package->custom_price)
                <input type="hidden" name="custom_price" value="{{request()->get('custom-price', 0)}}"/>
            @endif

            <div class="card h-100 shadow border-0 package">
                <div class="card-header"><h3 class="card-title">{{ $package->name }}</h3></div>
                <div class="card-body">{!! $package->description !!}</div>
                <div class="card-footer">
                    <div class="row justify-content-between">
                        <div class="col-md-6 text-left">
                            <span class="badge perma">
                                {{ $package->permanent ? trans('cosmo.store.permanent') : trans('cosmo.store.non-permanent') }}
                            </span>
                        </div>
                        <div class="col-md-6 text-right"> <!-- CURRENT PRICE -->
                            <span class="badge price">
                                @lang('cosmo.store.package_price'):

                                @if ($package->custom_price)
                                    {{ $currency . (float)request()->get('custom-price') }}
                                @else
                                    {{ $currency . $package->finalPrice }}
                                @endif
                            </span>
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