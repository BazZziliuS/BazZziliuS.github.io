@extends('themes.purity.layout')

@section('title')
    @lang('cosmo.store.success.success')
@endsection

@section('page_titles')
    <h3 class="subtitle text-truncate">@lang('cosmo.store.success.success')</h3>
    <h1 class="title text-truncate">@lang('cosmo.core.store')</h1>
@endsection

@section('content')
    <div class="container text-center text-white" id="store">
        <div class="card shadow checkout">
            <div class="card-header gradient_bottom position-relative">
                @lang('cosmo.store.success.success')
            </div>
            <div class="card-body">
                @lang('cosmo.store.success.msg')
            </div>
        </div>
    </div>
@endsection