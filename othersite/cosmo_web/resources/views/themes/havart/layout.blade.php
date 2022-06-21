<x-app>
    <x-slot name="meta">
        <!-- Core Meta -->
        <title>{{$configs['site_name']}}: @yield('title')</title>

        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Theme Styling -->
        <link rel="stylesheet" href="{{asset('themes/havart/style.css')}}">

        @stack('meta')

        <style>
            :root {
                @if(!empty($configs['site_color']))
                    --Accent_Color: {{ $configs['site_color'] }};
                    --Accent_Background: {{ $configs['site_color'] . '40' }};
                    --Accent_Buttons: {{ $configs['site_color'] . '26' }};
                    --Accent_Buttons_hover: {{ $configs['site_color'] . '59' }};
                    --Accent_Icons: {{ $configs['site_color'] . '22' }};
                @else
                    --Accent_Color: rgba(240, 24, 76, 0);
                    --Accent_Background: rgba(240, 24, 76, 0.25);
                    --Accent_Buttons: rgba(240, 24, 76, 0.15);
                    --Accent_Buttons_hover: rgba(240, 24, 76, 0.35);
                    --Accent_Icons: #3c1b27;
                @endif
            }
            .header_full {
                min-height: 380px;
                background: linear-gradient(180deg, rgba(28, 28, 33, 0.90) 34%, rgba(28, 28, 33, 0.95) 50%, rgba(28, 28, 33, 1) 100%),
                    url('{{ $configs['site_background'] ?? asset('themes/havart/img/default_hero.jpg')}}') !important;
                background-size: cover !important;
                background-repeat: no-repeat !important;
                background-position: center;
            }
        </style>

        @yield('style')
    </x-slot>

    <!-- Content -->
    <div class="app">
        @if (!$sales->isEmpty())
            @include('includes.sale')
        @endif

        @yield('content')
    </div>

    @include('themes.havart.includes.footer')

    <x-slot name="scripts">
        <script src="{{ asset('themes/havart/main.js') }}"></script>

        @stack('scripts')
    </x-slot>
</x-app>
