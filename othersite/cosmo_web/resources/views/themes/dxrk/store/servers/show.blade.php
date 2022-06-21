@extends('themes.dxrk.layout')

@section('title')
    {{$server->name}}
@endsection

@section('header')
    <h3 class="section-subheader">@lang('cosmo.store.browse_packages', ['server' => $server->name])</h3>
    <h1 class="section-header">{{$server->name}}</h1>
@endsection

@section('content')
    @include('themes.dxrk.includes.hero')
    <div class="container mb-5" id="store" style="margin-top: -10rem !important">
        <div class="categories position-relative z-10">
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
                    <div class="card package h-100 border-0">
                        @if ($package->image)
                            <div class="card-header" style="background: linear-gradient(180deg, rgba(28, 28, 33, 0.70) 34%,
                                         rgba(28, 28, 33, 0.75) 50%, rgba(28, 28, 33, 1) 100%),
                                         url('{{ $package->image }}') no-repeat center center;
                                                background-position-x: center;
                                                background-position-y: center;
                                                background-size: auto, auto;
                                                height: 150px !important;">
                                <h3 class="title text-truncate">{{$package->name}}</h3>
                                @if(!$package->custom_price)
                                    @if($package->sales->first())
                                        <h5 class="price sale">{{ $currency . ($package->price - $package->price * $package->sales->first()->percentage / 100) }}</h5> <!-- NEW PRICE -->
                                        <h6 class="price old">
                                            <del>{{ $currency . $package->price }}</del>
                                        </h6> <!-- OLD PRICE -->
                                    @else
                                        <h5 class="price">{{$currency}}{{ $package->price }}</h5>
                                        <!-- DEFAULT PRICE IF NOT SALE -->
                                    @endif
                                @endif
                            </div>
                        @else
                            <div class="card-header" style="background: linear-gradient(180deg, rgba(28, 28, 33, 0.70) 34%,
                                    rgba(28, 28, 33, 0.75) 50%, rgba(28, 28, 33, 1) 100%); height: 150px !important;">
                                <h3 class="title text-truncate">{{$package->name}}</h3>
                                @if(!$package->custom_price)
                                    <h5 class="price">{{$currency}}{{ $package->price }}</h5>
                                @endif
                            </div>
                        @endif

                        <div class="card-body">
                            {{ $package->description }}
                        </div>

                        <div class="card-footer">
                            @if($package->custom_price)
                                <input type="number" min="0" class="form-control" name="custom-price"
                                       placeholder="4.99">
                            @endif
                            <div class="purchase">
                                <div class="row">
                                    <div class="col-md-6">
                                        @if ($package->permanent)
                                            <span class="badge perma">@lang('cosmo.store.permanent')</span>
                                        @else
                                            <span class="badge non-permanent perma">
                                                @lang('cosmo.store.non-permanent')
                                            </span>
                                        @endif
                                    </div>
                                    <div class="col-md-6">
                                        @if(auth()->check())
                                            <button class="btn">
                                                <span class="fix">
                                                    @lang('cosmo.store.checkout')
                                                </span>
                                            </button>
                                        @else
                                            <a class="btn loggedOut" href="{{route('login.steam')}}">
                                                <span class="fix">
                                                    @lang('cosmo.store.login_to-checkout')
                                                </span>
                                            </a>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            @endforeach
        </div>
    </div>
@endsection
