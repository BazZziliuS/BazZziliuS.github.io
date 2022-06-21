<div class="header">
    @include('themes.lara.includes.navbar')
    <div class="d-flex header-mid">
        <div class="container text-center">
            @if(Route::currentRouteName() === 'home' && $configs['discord_widget_enabled'])
                <div class="row justify-content-center">
                    <div class="col-md-6 my-auto">
                        <div class="hero-title mt-5">
                            <div class="card hero-card shadow p-5">
                                @yield('header_title')
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mt-3">
                        <iframe src="https://discordapp.com/widget?id={{$configs['discord_widget_id']}}&theme=dark" width="350" height="450" allowtransparency="true" frameborder="0"></iframe>
                    </div>
                </div>
            @else
                <div class="hero-title mt-5">
                    <div class="card hero-card shadow p-5">
                        @yield('header_title')
                        <div class="mt-3 mb-0 mb-0">
                            @yield('misc_content')
                        </div>
                    </div>
                </div>
            @endif
        </div>
    </div>

    <div class="header-bottom">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
            <polygon class="fill" points="2560 0 2560 100 0 100"></polygon>
        </svg>
    </div>
</div>