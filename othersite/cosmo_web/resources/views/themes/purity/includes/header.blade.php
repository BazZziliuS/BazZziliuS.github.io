@include('themes.purity.includes.navbar')

<section class="{{ Route::currentRouteName() === 'home' ? 'hero' : 'header' }}">
    <div class="container">
        <div class="titles top">
            @yield('page_titles')
        </div>

        @if (Route::currentRouteName() === 'home' && $steamData)
            @include('themes.purity.includes._steam')
        @endif
    </div>
</section>