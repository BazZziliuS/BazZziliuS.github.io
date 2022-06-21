@extends('themes.purity.layout')

@section('title')
    @lang('cosmo.core.terms')
@endsection

@section('page_titles')
    <h1 class="title text-truncate">{{$configs['tos_title']}}</h1>
@endsection

@section('content')
    <div class="container" id="terms">
        <div class="card shadow border-0">
            <div class="card-header gradient_bottom">
                <h3 class="card-title">{{ $configs['tos_title'] }}</h3>
            </div>
            <div class="card-body">
                {!! $tos !!}
            </div>
            <div class="card-footer">
                <a href="{{route('store.index')}}" class="btn btn-outline-danger">
                    <i class="fad fa-arrow-alt-left"></i>
                    @lang('cosmo.actions.go_back')
                </a>
            </div>
        </div>
    </div>
@endsection

