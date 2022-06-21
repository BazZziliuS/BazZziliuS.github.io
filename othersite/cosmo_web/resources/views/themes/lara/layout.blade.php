<x-app>
    <x-slot name="meta">
        <!-- Core Meta -->
        <title>{{$configs['site_name']}}: @yield('title')</title>

        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Theme Styling -->
        <link rel="stylesheet" href="{{asset('themes/lara/style.css')}}">
        @stack('meta')

        <style>
            @if (!empty($configs["site_background"]))
                .header {
                    background: linear-gradient(to bottom, rgba(0, 0, 0, .4), rgba(0, 0, 0, .6)), url('{{$configs["site_background"]}}') center center fixed;
                    background-position: center !important;
                    background-size: cover !important;
                }
            @else
                .header {
                    background-color: {{$configs['site_color']}};
                }
            @endif
        </style>
        @stack('style')
    </x-slot>

    <!-- Content -->
    <div class="app">
        @if (!$sales->isEmpty())
            @include('includes.sale')
        @endif

        @yield('content')
    </div>

    @include('themes.lara.includes.footer')

    <x-slot name="scripts">
        @stack('scripts')
    </x-slot>

</x-app>
