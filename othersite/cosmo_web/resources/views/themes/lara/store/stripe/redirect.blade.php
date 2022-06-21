@extends('themes.lara.layout')

@section('title', 'Redirecting...')

@section('header_title')
    <h3 class="title">Please hold on while you're being redirect to Stripe</h3>
    <p class="subtitle">Redirecting...</p>
@endsection

@section('content')
    @include('themes.lara.includes.header')

    <div class="container text-center text-white">
        You're being redirect to the Stripe checkout page
    </div>
@endsection

@include('includes.store.stripe-redirect')
