<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="og:title" content="{{$configs['meta_title']}}">
    <meta name="description" content="{{$configs['meta_description']}}">
    <meta name="og:description" content="{{$configs['meta_description']}}">
    <meta name="keywords" content="{{$configs['meta_keywords']}}">
    <meta name="theme-color" content="{{$configs['meta_color']}}">

    <meta name="og:type" content="{{$configs['meta_type']}}">
    <meta name="og:url" content="{{config('app.url')}}">
    <meta name="url" content="{{config('app.url')}}">
    <meta name="identifier-URL" content="{{config('app.url')}}">
    <meta name="author" content="TBDScripts">
    <meta name="designer" content="TBDScripts">
    <meta name="revisit-after" content="2 days">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="Security-Hash" content="{{config('auth.enhanced_security')}}">
    <meta name="robots" content="index,follow">

    <!-- Safari Browser -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-touch-fullscreen" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">

    <!-- Icons -->
    <link rel="shortcut icon" href="{{ $configs['site_logo'] }}" type="image/x-icon">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ $configs['site_logo'] }}">
    <link rel="icon" type="image/png" sizes="96x96" href="{{ $configs['site_logo'] }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ $configs['site_logo'] }}">
    <link rel="shortcut icon" type="image/x-icon" href="{{ $configs['site_logo'] }}">

    <!-- Twitter Embed -->
    <meta name="og:image" content="{{ $configs['site_logo'] }}">
    <meta name="twitter:image" content="{{ $configs['site_logo'] }}">
    <meta name="twitter:card" content="summary">

    <!-- Global CSS -->
    <script src="https://kit.fontawesome.com/74de4910c5.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}"/>

    {{-- Include per-page meta --}}
    {{$meta ?? ''}}
</head>
<body>
    {{-- Include content --}}
    {{$slot ?? ''}}

    <script src="{{ asset('js/app.js') }}"></script>

    {{-- Initialize the widget bot if it is  enabled --}}
    @if($configs['discord_widget_bot_enabled'])
        <script src="https://cdn.jsdelivr.net/npm/@widgetbot/crate@3" async defer>
            new Crate({
                server: '{{ $configs['discord_widget_id'] }}',
                channel: '{{ $configs['discord_channel_id'] }}',
                shard: '{{ $configs['discord_widget_shard'] ?? 'https://e.widgetbot.io' }}'
            })
        </script>
    @endif

    {{-- Include per-page scripts --}}
    {{$scripts ?? ''}}

    {!! app('toastr')->render() !!}

    @if (config('cosmo.analytics_enabled'))
    <script async defer data-website-id="897c8415-bc4d-4dd3-89a7-71aa6abe9c7b" src="https://stats.tbdscripts.com/umami.js"></script>
    @endif
</body>
</html>
