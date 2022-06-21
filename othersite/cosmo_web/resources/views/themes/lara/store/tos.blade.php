@extends('themes.lara.layout')

@section('title')
    @lang('cosmo.core.terms')
@endsection

@section('header_title')
    <h3 class="title">{{ $configs['tos_title'] }}</h3>
@endsection

@section('content')
    @include('themes.lara.includes.header')

    <div class="container" id="tos">
        <div class="card">
            <div class="card-body">
                {!! $tos !!}
            </div>
        </div>
    </div>
@endsection