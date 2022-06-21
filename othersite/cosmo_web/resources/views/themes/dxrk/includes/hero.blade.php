<section class="hero"
        style="{{Route::currentRouteName() === 'home' ?
            'padding-bottom: 15rem !important' : 'padding-bottom: 10rem !important' }}">
    <div class="overlay"></div>
    <div class="container text-center inner">@yield('header')</div>
    <div class="pattern-bottom" style="background-image: url('{{asset("themes/dxrk/img/wave.svg")}}')"></div>

    <div class="misc-content"
        style="margin-top: 5rem; padding-bottom: 0; margin-bottom: 0; position: relative; z-index: 1">
        @yield('header_misc')
    </div>
</section>