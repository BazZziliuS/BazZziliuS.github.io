@extends('themes.dxrk.layout')

@section('title')
    @lang('cosmo.notifications.notifications')
@endsection

@section('header')
    <h2 class="section-header mb-0 pb-0">{{ $configs['notifications_title'] }}</h2>
@endsection

@section('content')
    @include('themes.dxrk.includes.hero')

    <div class="container" id="notifications">
        <div class="card">
            <div class="card-header">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h4 class="card-title mb-0">{{ $configs['notifications_title'] }}</h4>
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
                @if(!$notifications->isEmpty())
                    <ul class="notification_list">
                        @include('includes.notifications')

                        {{ $notifications->links() }}
                    </ul>
                @else
                    <h5 class="text-muted">@lang('cosmo.notifications.no_notifications')</h5>
                @endif
            </div>
        </div>
    </div>
@endsection