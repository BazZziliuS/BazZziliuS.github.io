<x-app>
    <x-slot name="meta">
        <!-- Core Meta -->
        <title>{{$configs['site_name']}}: @yield('title')</title>

        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Theme Styling -->
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

        @yield('meta')

        <style>
            :root {
                @if(!empty($configs['site_color']))
                    --Accent_Color: {{ $configs['site_color'] }};
                    --Accent_Background: {{ $configs['site_color'] . '40' }};
                    --Accent_Buttons: {{ $configs['site_color'] . '26' }};
                    --Accent_Buttons_hover: {{ $configs['site_color'] . '59' }};
                    --Accent_Icons: {{ $configs['site_color'] . '22' }};
                @else
                    --Accent_Color: rgba(9, 132, 227, 0);
                    --Accent_Background: rgba(9, 132, 227, 0.25);
                    --Accent_Buttons: rgba(9, 132, 227, 0.15);
                    --Accent_Buttons_hover: rgba(9, 132, 227, 0.35);
                    --Accent_Icons: #006aba;
                @endif

                --Background_Image: url({{ !empty($configs['site_background']) ? $configs['site_background']
                    : 'https://i.pinimg.com/originals/e9/3c/b5/e93cb57c2ff7c0efb01598ba1b3f105e.jpg' }});
            }
        </style>

        <link rel="stylesheet" href="{{asset('themes/purity/style.css')}}">

        @stack('style')
    </x-slot>

    <!-- Content -->
    <div class="app">
        @include('themes.purity.includes.header')

        @if (!$sales->isEmpty())
            @include('includes.sale')
        @endif

        @yield('content')
    </div>

    @include('themes.purity.includes.footer')

    <x-slot name="scripts">
        <script src="{{ asset('themes/purity/main.js') }}"></script>

        @stack('scripts')
    </x-slot>
</x-app>
