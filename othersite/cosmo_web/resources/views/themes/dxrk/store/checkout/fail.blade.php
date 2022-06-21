@extends('themes.dxrk.layout')

@section('title')
    @lang('cosmo.store.fail.fail')
@endsection

@section('header')
    <h3 class="section-subheader">@lang('cosmo.store.fail.fail')</h3>
    <h1 class="section-header">@lang('cosmo.core.store')</h1>
@endsection

@section('content')
    @include('themes.dxrk.includes.hero')

    <div class="container text-center text-white">
        @lang('cosmo.store.fail.msg')
    </div>
@endsection