@extends('themes.lara.layout')

@section('title')
    @lang('cosmo.store.fail.fail')
@endsection

@section('header_title')
    <h3 class="title">@lang('cosmo.core.store')</h3>
    <p class="subtitle">@lang('cosmo.store.fail.fail')</p>
@endsection

@section('content')
    @include('themes.lara.includes.header')

    <div class="container text-center text-white">
        @lang('cosmo.store.fail.msg')
    </div>
@endsection