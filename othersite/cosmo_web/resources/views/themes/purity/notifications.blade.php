@extends('themes.purity.layout')

@section('title')
    @lang('cosmo.notifications.notifications')
@endsection

@section('page_titles')
    <h3 class="subtitle">{{$configs['notifications_description']}}</h3>
    <h1 class="title">{{$configs['notifications_title']}}</h1>
@endsection

@section('content')
    <div class="container" id="notifications">
        <div class="card h-100 shadow border-0">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h4 class="card-title mb-0 d-inline-flex">@lang('cosmo.notifications.notifications')</h4>
                <div class="forms d-flex">
                    <form action="{{route('notifications.markRead')}}" method="post" class="read">
                        @csrf
                        <button type="submit" class="btn btn-info d-inline-flex mr-2">@lang('cosmo.notifications.mark_all_as_read')</button>
                    </form>

                    <form action="{{route('notifications.deleteAll')}}" method="post">
                        @csrf
                        <button type="submit" class="btn btn-danger d-inline-flex">@lang('cosmo.notifications.delete_all')</button>
                    </form>
                </div>
            </div>
            <div class="card-body">
                <ul class="notification_list">
                    @include('includes.notifications')
                </ul>
            </div>
        </div>
        {{ $notifications->links('themes.purity.pagination') }}
    </div>
@endsection