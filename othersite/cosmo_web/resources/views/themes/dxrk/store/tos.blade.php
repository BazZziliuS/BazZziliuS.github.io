@extends('themes.dxrk.layout')

@section('title')
    @lang('cosmo.core.terms')
@endsection

@section('header')
    <h1 class="section-header">{{ $configs['tos_title'] }}</h1>
@endsection

@section('content')
    @include('themes.dxrk.includes.hero')

    <div class="container" id="checkout">
        <div class="card mt-4">
            <div class="card-body">
                {!! $tos !!}
            </div>
        </div>
    </div>
@endsection