<div class="nav-top"></div>
<div class="nav-top_line"></div>
<div class="header_full">

    @include('themes.havart.includes.navbar')

    <div class="py-5" id="hero overflow-hidden">
        <div class="container py-5" id="hero-inner">
            <div class="titles">
                @yield('header_title')
            </div>
            <div id="misc_content">
                @yield('misc_content')
            </div>
        </div>
    </div>
</div>