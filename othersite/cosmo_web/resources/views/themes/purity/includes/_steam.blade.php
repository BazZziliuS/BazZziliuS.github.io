<div class="steam-group">
    <div class="container">
        <div class="list">
            <div class="stat card h-100 shadow border-0" data-aos="fade-down-right" data-aos-duration="200">
                <div class="card-body">
                    <div class="counter purecounter" data-purecounter-duration="2.5"
                         data-purecounter-end="{{ $steamData['ingame'] }}">~~~</div>
                    <div class="title">@lang('cosmo.core.theme_specific.in-game_members')</div>
                </div>
            </div>
            <div class="stat card h-100 shadow border-0" data-aos="fade-down" data-aos-duration="200">
                <div class="card-body">
                    <div class="counter purecounter" data-purecounter-duration="2.5"
                         data-purecounter-end="{{ $steamData['online'] }}">~~~</div>
                    <div class="title">@lang('cosmo.core.theme_specific.online_members')</div>
                </div>
            </div>
            <div class="stat card h-100 shadow border-0" data-aos="fade-up-left" data-aos-duration="200">
                <div class="card-body">
                    <div class="counter purecounter" data-purecounter-duration="2.5"
                         data-purecounter-end="{{ $steamData['total'] }}">~~~</div>
                    <div class="title">@lang('cosmo.core.theme_specific.group_members')</div>
                </div>
            </div>
        </div>
        <a href="https://steamcommunity.com/groups/{{ $configs['steam_group_slug'] }}"
           class="btn btn-steam_group" data-aos="fade-up" data-aos-duration="500">
            @lang('cosmo.core.theme_specific.join_steam-group')
        </a>
    </div>
</div>