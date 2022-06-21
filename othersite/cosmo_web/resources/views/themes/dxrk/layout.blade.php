<x-app>
    <x-slot name="meta">
        <!-- Core Meta -->
        <title>{{$configs['site_name']}}: @yield('title')</title>

        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Theme Styling -->
        <style>
            .hero {
                @if($configs['site_background'])
                background: linear-gradient(to bottom, rgba(20, 21, 29, .75) 0, rgba(20, 21, 29, 0) 100%),
                    url({{$configs['site_background']}}) no-repeat center center;
                @elseif($configs['site_color'])
                background-color: {{$configs['site_color']}};
                @else
                background: var(--accent);
                @endif
                background-size: cover;
            }
        </style>
        <link rel="stylesheet" href="{{asset('themes/dxrk/style.css')}}">

        @stack('meta')
        @stack('style')
    </x-slot>

    <header>
        @include('themes.dxrk.includes.navbar')
    </header>

    <!-- Content -->
    <div class="app">
        @if (!$sales->isEmpty())
            @include('includes.sale')
        @endif

        @yield('content')
    </div>

    @include('themes.dxrk.includes.footer')

    <x-slot name="scripts">
        @stack('scripts')
    </x-slot>
</x-app>
