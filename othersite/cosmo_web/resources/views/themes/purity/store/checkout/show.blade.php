@extends('themes.purity.layout')

@section('title')
    @lang('cosmo.core.checkout')
@endsection

@section('page_titles')
    <h3 class="subtitle text-truncate">@lang('cosmo.store.checking_out-package', ['package' => $package->name])</h3>
    <h1 class="title text-truncate">@lang('cosmo.store.complete_purchase')</h1>
@endsection


@section('content')
    <div class="container" id="store">
        <form id="checkout-form" method="post">
            @csrf
            <div class="card h-100 shadow border-0 checkout">
                <div class="card-header position-relative gradient_bottom d-flex">
                    <h4 class="card-title mb-0 mr-auto">@lang('cosmo.store.checking_out-package', ['package' => $package->name])</h4>

                    @if ($package->custom_price)
                        <span class="badge badge-primary">{{ $currency . (float)request()->get('custom-price', 0) }}</span> {{--  DEFAULT PRICE - CUSTOM PRICE  --}}
                        <input type="hidden" name="custom_price" value="{{request()->get('custom-price', 0)}}"/>
                    @elseif ($package->finalPrice < $package->price)
                        <div class="d-inline-block">
                            <span class="badge badge-primary mr-2">
                                <del style="color: #d63031">{{ $currency . $package->price }}</del> {{--  OLD PRICE  --}}
                            </span>
                            <span class="badge badge-primary">
                                <color style="color: #00b894; font-size: 1rem;
                                    text-decoration: underline">
                                    {{ $currency . $package->finalPrice}} {{--  NEW PRICE  --}}
                                </color>
                            </span>
                        </div>
                    @else
                        <span class="badge badge-primary">{{ $currency . $package->price }}</span>
                    @endif
                </div>
                <div class="card-body">
                    @if ($package->image)
                        <div class="card-image mb-4"
                             style="background: linear-gradient(to bottom, rgba(0,0,0,.2),rgba(0,0,0,.55)),
                                     url('{{ $package->image }}');">
                        </div>
                    @endif
                    <div class="text-white">
                        {!! $package->description !!}
                    </div>
                </div>
            </div>

            <div class="card package h-100 border-0 mt-3 checkout">
                <div class="card-body">
                    <div class="row justify-content-between">
                        @if (!$package->custom_price)
                            <div class="col-md-6 my-auto">
                                <div class="card h-100 shadow borer-0">
                                    <h5 class="mb-0 mb-2 upper-title_small">@lang('cosmo.store.coupon-code')?</h5>
                                    <input type="text" placeholder="Enter Coupon Code" name="coupon"/>
                                </div>
                            </div>
                        @endif
                        <div class="col-md-6 ml-auto text-eft button">
                            <div class="card h-100 shadow borer-0">
                                <h5 class="mb-0 mb-2 upper-title_small">@lang('cosmo.store.gift-purchase')?</h5>
                                <input type="text" placeholder="Enter Steam ID" name="gift"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card package h-100 border-0 mt-3 checkout">
                <div class="card-header d-flex gradient_bottom position-relative">
                    <h4 class="card-title">@lang('cosmo.store.finalize_purchase')</h4>
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div class="my-auto">
                            <div class="custom-control custom-checkbox tos">
                                <input type="checkbox" class="custom-control-input" id="tosAccept" name="tos">
                                <label class="custom-control-label text-muted"
                                       for="tosAccept">@lang('cosmo.store.tos_agree')</label>
                            </div>
                        </div>
                        <div class="flex-grow ml-auto text-right button">
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