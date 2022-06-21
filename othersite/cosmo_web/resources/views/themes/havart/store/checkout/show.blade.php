@extends('themes.havart.layout')

@section('title')
    @lang('cosmo.core.checkout')
@endsection

@section('header_title')
    <h1 class="title">@lang('cosmo.store.complete_purchase')</h1>
    <h3 class="subtitle">@lang('cosmo.store.checking_out-package', ['package' => $package->name])</h3>
@endsection

@section('content')
    @include('themes.havart.includes.header')

    <div class="container my-5" id="checkout">
        <form method="post" id="checkout-form">
            @csrf

            <div class="row justify-content-between mb-3" style="position: relative; z-index: 99">
                <div class="col-md-3">
                    @if (!$package->custom_price)
                        <div class="card h-100 shadow borer-0 action">
                            <input type="text" placeholder="Enter Coupon Code" name="coupon"/>
                            <h5 class="mb-0 mt-2 upper-title_small">@lang('cosmo.store.coupon-code')</h5>
                        </div>
                    @endif
                </div>
                <div class="col-md-3">
                    <div class="card h-100 shadow borer-0 action">
                        <input type="text" placeholder="Enter Steam ID" name="gift"/>
                        <h5 class="mb-0 mt-2 upper-title_small">@lang('cosmo.store.gift-purchase')</h5>
                    </div>
                </div>
            </div>

            @if($package->custom_price)
                <input type="hidden" name="custom_price" value="{{request()->get('custom-price', 0)}}"/>
            @endif

            <div class="card h-100 shadow border-0 package_item">
                <div class="card-body mb-0 pb-1">
                    <div class="card h-100 border-0">
                        @if ($package->image)
                            <div class="card-header"
                                 style="background: linear-gradient(180deg, rgba(28, 28, 33, 0.70) 34%,
                                     rgba(28, 28, 33, 0.75) 50%, rgba(28, 28, 33, 1) 100%),
                                     url('{{ $package->image }}') no-repeat center center; height: 150px !important">
                                <h4 class="text-white text-center font-weight-bold" style="margin-top: 3rem !important;">{{ $package->name }}</h4>
                            </div>
                        @else
                            <div class="card-header non-image">
                                <h4>{{ $package->name }}</h4>
                            </div>
                        @endif

                        <div class="card-body pb-0 mb-0 text-white">
                            {!! $package->description !!}

                            <div class="card_price mb-0 pb-0">
                                <h5 class="text-right text-white font-weight-light">
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
            </div>
            <div class="card h-100 border-0 mt-4 shadow finalize">
                <div class="card-header border-0">
                    <h4 class="card-title font-weight-bold text-white mb-0 pb-0">@lang('cosmo.store.finalize_purchase')</h4>
                </div>
                <div class="card-body">
                    <div class="row justify-content-between">
                        <div class="col-md-9 my-auto">
                            <div class="custom-control custom-checkbox tos">
                                <input type="checkbox" class="custom-control-input" id="tosAccept" name="tos">
                                <label class="custom-control-label text-muted" for="tosAccept">@lang('cosmo.store.tos_agree')</label>
                            </div>
                        </div>
                        <div class="col-md-3 ml-auto text-right button">
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