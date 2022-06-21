@extends('themes.havart.layout')

@section('title')
    @lang('cosmo.core.terms')
@endsection

@section('header_title')
    <h1 class="title">
        {{ $configs['tos_title'] }}
    </h1>
@endsection

@section('content')
    @include('themes.havart.includes.header')

    <div class="container" id="terms">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    {{ $configs['tos_title'] }}
                </h3>
            </div>
            <div class="card-body">
                {!! $tos !!}
            </div>
            <div class="card-footer">
                <a href="{{route('store.index')}}" class="btn btn-custom"><i class="fad fa-arrow-alt-left"></i> @lang('cosmo.actions.go_back')</a>
            </div>
        </div>
    </div>
@endsection