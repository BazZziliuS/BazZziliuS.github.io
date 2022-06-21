@extends('themes.dxrk.layout')

@section('title')
    @lang('cosmo.core.success')
@endsection

@section('header')
    <h3 class="section-subheader">@lang('cosmo.store.success.success')</h3>
    <h1 class="section-header">@lang('cosmo.core.store')</h1>
@endsection

@section('content')
    @include('themes.dxrk.includes.hero')

    <div class="container text-center text-white">
        @lang('cosmo.store.success.msg')
    </div>
@endsection