@extends('themes.lara.layout')

@section('title', $server->name)

@section('header_title')
    <h3 class="title">{{ $server->name }}</h3>
    <p class="subtitle">@lang('cosmo.store.browse_packages', ['server' => $server->name])</p>
@endsection

@section('content')
    @include('themes.lara.includes.header')

    <div class="container my-5" id="store">
        <div class="categories card border-0 bg-transparent mb-4">
            <ul class="nav nav-tabs border-0" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <a class="nav-link" href="?category=all">All Packages</a>
                </li>
                @foreach($categories as $cat)
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" href="?category={{ strtolower($cat)}}">{{$cat}}</a>
                    </li>
                @endforeach
            </ul>
        </div>


        <div class="row justify-content-center">
            @foreach($packages as $package)
                <form class="col-lg-4 col-md-6 col-sm-12 my-4" action="{{route('store.checkout.show', $package->id)}}">
                    <div class="card h-100 shadow border-0 package">
                        <span class="badge shadow name">{{ $package->name }} @if(!$package->custom_price)-@endif
                            @if ($package->sale && !$package->custom_price)
                                <span style="font-weight: bold">
                                    <del style="color: #e74c3c"> <!-- OLD PRICE -->
                                        {{ $currency. $package->price }}
                                    </del>

                                    <color style="color: #27ae60"> <!-- SALE PRICE -->
                                        {{  $currency . $package->finalPrice }}
                                    </color>
                                </span>
                            @elseif (!$package->custom_price)
                                <span style="font-weight: bold">{{ $currency. $package->price }}</span>
                            @endif
                        </span>

                        @if ($package->image)
                            <div class="card-header"
                                 style="background: url('{{ $package->image }}') no-repeat center center;
                                        background-position-x: center; background-position-y: center;
                                        background-size: auto, auto;">
                                    <span class="badge badge-dark perma">
                                        {{ $package->permanent ? trans('cosmo.store.permanent') : trans('cosmo.store.non-permanent') }}
                                    </span>
                            </div>
                        @else
                            <div class="card-header" style="background: var(--accent); height: 80px;">
                                    <span class="badge badge-dark perma">
                                        {{ $package->permanent ? trans('cosmo.store.permanent') : trans('cosmo.store.non-permanent') }}
                                    </span>
                            </div>
                        @endif
                        <div class="card-body text-white">
                            {{ $package->description }}
                        </div>
                        <div class="card-footer p-0 w-100">
                            @if($package->custom_price)
                                <input type="number" min="0" class="form-control" name="custom-price"
                                       placeholder="4.99">
                            @endif
                            <div class="purchase">
                                @auth
                                    <button class="btn">
                                        <span class="fix">@lang('cosmo.store.checkout')</span>
                                    </button>
                                @elseauth
                                    <a class="btn loggedOut" href="{{route('login.steam')}}">
                                        <span class="fix">@lang('cosmo.store.login_to-checkout')</span>
                                    </a>
                                @endauth
                            </div>
                        </div>
                    </div>
                </form>
            @endforeach
        </div>
    </div>
@endsection
