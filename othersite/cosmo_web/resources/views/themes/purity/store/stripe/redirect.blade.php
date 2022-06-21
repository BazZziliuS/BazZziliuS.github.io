@extends('themes.purity.layout')

@section('title', 'Redirecting...')

@section('page_titles')
    <h3 class="subtitle text-truncate">Please hold on while you're being redirect to Stripe</h3>
    <h1 class="title text-truncate">Redirecting...</h1>
@endsection

@section('content')
    <div class="container text-center text-white" id="store">
        <div class="card shadow checkout">
            <div class="card-header gradient_bottom position-relative">
                Stripe Checkout
            </div>
            <div class="card-body">
                You're being redirect to the Stripe checkout page
            </div>
        </div>
    </div>
@endsection

@include('includes.store.stripe-redirect')
