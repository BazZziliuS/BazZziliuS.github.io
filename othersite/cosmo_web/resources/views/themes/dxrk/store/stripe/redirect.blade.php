@extends('themes.dxrk.layout')

@section('title', 'Redirecting..')

@section('header')
    <h3 class="section-subheader">Please hold on while you're being redirect to Stripe</h3>
    <h1 class="section-header">Redirecting...</h1>
@endsection

@section('content')
    @include('themes.dxrk.includes.hero')

    <div class="container text-center text-white">
        You're being redirect to the Stripe checkout page
    </div>
@endsection

@include('includes.store.stripe-redirect')