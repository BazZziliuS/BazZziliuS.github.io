@extends('themes.purity.layout')

@section('title')
    {{ $server->name }}
@endsection

@section('page_titles')
    <h3 class="subtitle text-truncate">@lang('cosmo.store.browse_packages', ['server' => $server->name])</h3>
    <h1 class="title text-truncate">{{ $server->name }}</h1>
@endsection

@section('content')
    <div class="container" id="store">
        <div class="packages">
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
                    <form class="col-lg-4 col-md-6 col-sm-12 my-2" action="{{route('store.checkout.show', $package->id)}}">
                        <div class="card package h-100 border-0">
                            <div class="card-header d-flex gradient_bottom position-relative">
                                <div class="d-inline-flex flex-grow-1">
                                    <h3 class="card-title mb-0 pb-0">{{ $package->name }}</h3>
                                </div>
                                <div class="d-inline-flex flex-shink-0 ml-auto my-auto">
                                    @if (!$package->custom_price)
                                        @if ($package->sale)
                                            <span class="badge badge-primary">
                                                <del style="color: #d63031">{{ $currency . $package->price }}</del>
                                            </span>
                                            <span class="badge badge-primary">
                                                <color style="color: #00b894; font-size: 1rem;
                                                    text-decoration: underline">
                                                    {{ $currency . $package->finalPrice }}
                                                </color>
                                            </span>
                                        @else
                                            <span class="badge badge-primary">{{ $currency . $package->price }}</span>
                                        @endif
                                    @endif
                                </div>
                            </div>
                            @if ($package->image)
                                <div class="card-image"
                                     style="background: linear-gradient(to right, rgba(0,0,0,.2),rgba(0,0,0,.55)),
                                             url('{{ $package->image }}') no-repeat center center;
                                             background-position-x: center; background-position-y: center;
                                             background-size: auto, auto;">
                                </div>
                            @endif
                            <div class="card-perma w-100 p-0 m-0">
                                <span class="badge badge-dark perma">{{ $package->permanent ? trans('cosmo.store.permanent') : trans('cosmo.store.non-permanent') }}</span>
                            </div>
                            <div class="card-body text-white mb-0 pb-0">
                                {{ $package->description }}
                            </div>
                            <div class="card-footer p-0 w-100">
                                @if($package->custom_price)
                                    <input type="number" min="0" class="form-control" name="custom-price"
                                           placeholder="4.99">
                                @endif
                                <div class="buttons">
                                    @if(auth()->check())
                                        <button class="btn purchase">
                                            <span class="fix">@lang('cosmo.store.checkout')</span>
                                        </button>
                                    @else
                                        <a class="btn loggedOut" href="{{route('login.steam')}}">
                                            <span class="fix">@lang('cosmo.store.login_to-checkout')</span>
                                        </a>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </form>
                @endforeach
            </div>
        </div>
    </div>
@endsection
