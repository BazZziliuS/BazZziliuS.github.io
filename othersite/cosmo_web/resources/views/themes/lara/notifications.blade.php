@extends('themes.lara.layout')

@section('title')
    @lang('cosmo.notifications.notifications')
@endsection


@section('header_title')
    <h3 class="title">{{ $configs['notifications_title'] }}</h3>
    <p class="subtitle">{{ $configs['notifications_description'] }}</p>
@endsection

@section('content')

    @include('themes.lara.includes.header')

    <div class="container my-5" id="notifications">
        <div class="card">
            <div class="card-header">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h4 class="card-title mb-0">@lang('cosmo.notifications.notifications')</h4>
                    </div>
                    <div class="forms">
                        <form action="{{route('notifications.markRead')}}" method="post" class="read">
                            @csrf
                            <button type="submit" class="btn btn-info">@lang('cosmo.notifications.mark_all_as_read')</button>
                        </form>

                        <form action="{{route('notifications.deleteAll')}}" method="post">
                            @csrf
                            <button type="submit" class="btn btn-danger">@lang('cosmo.notifications.delete_all')</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <ul class="notification_list">
                    @if($notifications->isEmpty())
                        <li class="notification_list_item">
                            <h4 class="notification_title">@lang('cosmo.notifications.no_notifications')</h4>
                            <h6 class="notification_time">~~/~~/~~~~</h6>
                        </li>
                    @else
                        @include('includes.notifications')
                        {{ $notifications->links() }}
                    @endif
                </ul>
            </div>
        </div>
    </div>
@endsection