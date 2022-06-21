@extends('themes.havart.layout')

@section('title')
    @lang('cosmo.core.success')
@endsection

@section('header_title')
    <h1 class="title">@lang('cosmo.core.store')</h1>
    <h3 class="subtitle">@lang('cosmo.store.success.success')</h3>
@endsection

@section('content')
    @include('themes.havart.includes.header')

    <div class="container text-center text-white">
        @lang('cosmo.store.success.msg')
    </div>
@endsection