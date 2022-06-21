@extends('themes.havart.layout')

@section('title')
    @lang('cosmo.store.fail.fail')
@endsection

@section('header_title')
    <h1 class="title">@lang('cosmo.core.store')</h1>
    <h3 class="subtitle">'Redirecting..'</h3>
@endsection

@section('content')
    @include('themes.havart.includes.header')

    <div class="container text-center text-white">
        You're being redirect to the Stripe checkout page
    </div>
@endsection

@include('includes.store.stripe-redirect')