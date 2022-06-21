@extends('themes.havart.layout')

@section('title')
    @lang('cosmo.store.fail.fail')
@endsection

@section('header_title')
    <h1 class="title">@lang('cosmo.core.store')</h1>
    <h3 class="subtitle">@lang('cosmo.store.fail.fail')</h3>
@endsection

@section('content')
    @include('themes.havart.includes.header')

    <div class="container text-center text-white">
        @lang('cosmo.store.fail.msg')
    </div>
@endsection