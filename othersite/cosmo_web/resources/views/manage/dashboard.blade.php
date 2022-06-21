<x-manage>
    <x-slot name="meta">
        <script src="//unpkg.com/alpinejs" defer></script>
    </x-slot>

    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="font-weight-bold text-lg">
            {{__('cosmo.management.core.dashboard_title')}}
            <smalL>{{__('cosmo.management.core.dashboard_small')}}</smalL>
        </h1>

        <div class="dashButtons">
            <div class="button">
                <button type="submit" id="themeToggle" class="theme-toggle btn btn-success btn-sm btn-icon-split ml-3">
                    <span class="icon text-white-50">
                      <i class="fad fa-flashlight"></i>
                    </span>
                    <span class="text">{{__('cosmo.management.core.toggle_dark_mode')}}</span>
                </button>
            </div>

            @if (auth()->user()->can('update-app'))
                <div class="button" x-data="updater">
                    <button class="btn btn-sm btn-icon-split" :class="btnClass" @click="updateApp"
                            :disabled="loading || error || !latestVersion">
                        <span class="icon text-white-50">
                            <i class="fad" :class="btnIcon"></i>
                        </span>

                        <span class="text" x-text="btnText">
                            Checking for updates.
                        </span>
                    </button>
                </div>
            @endif

            <div class="button">
                @if (auth()->user()->can('toggle-maintenance'))
                    <form action="{{route('manage.dashboard.maintenance')}}" method="post">
                        @csrf

                        <button type="submit" class="btn btn-info btn-sm btn-icon-split">
                        <span class="icon text-white-50">
                          <i class="fad fa-hammer"></i>
                        </span>
                            <span class="text">
                            {{ __('cosmo.management.core.' . (app()->isDownForMaintenance() ? 'disable' : 'enable') . '_maintenance') }}
                        </span>
                        </button>
                    </form>
                @endif
            </div>
            <div class="button">
                @if(auth()->user()->can('clear-cache'))
                    <form action="{{route('manage.dashboard.cache')}}" method="post">
                        @csrf

                        <button type="submit" class="btn btn-danger btn-sm btn-icon-split">
                        <span class="icon text-white-50">
                          <i class="fad fa-ban"></i>
                        </span>
                            <span class="text">{{__('cosmo.management.core.clear_cache')}}</span>
                        </button>
                    </form>
                @endif
            </div>
            <div class="button">
                @if (auth()->user()->can('reinstall-app'))
                    <div class="modal fade" id="reinstall-modal" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">{{__('cosmo.core.confirmation')}}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">{{__('cosmo.management.core.reinstall_confirm')}}</div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                        {{__('cosmo.core.cancel')}}
                                    </button>

                                    <form action="{{route('manage.dashboard.reinstall')}}" method="POST">
                                        @csrf
                                        <button type="submit" class="btn btn-danger">
                                            {{__('cosmo.management.core.reinstall')}}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-danger btn-sm btn-icon-split" data-toggle="modal"
                            data-target="#reinstall-modal">
                    <span class="icon text-white-50">
                      <i class="fad fa-exclamation-triangle"></i>
                    </span>
                        <span class="text">{{__('cosmo.management.core.reinstall')}}</span>
                    </button>
                @endif
            </div>
        </div>
    </div>

    <div class="row">
        @include('manage.stats')
    </div>

    <div class="row">
        <div class="col-md-6">
            <div class="card shadow">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">
                        {{(__('cosmo.management.core.yearly_sales'))}}
                    </h6>
                </div>
                <div class="card-body">
                    <canvas id="yearly-chart" width="1000" height="500"></canvas>
                </div>
            </div>
        </div>
        <div class="col-md-6 mb-4">
            <div class="card shadow">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">
                        {{__('cosmo.management.core.monthly_sales')}}
                    </h6>
                </div>
                <div class="card-body">
                    <canvas id="monthly-chart" width="1000" height="500"></canvas>
                </div>
            </div>
        </div>
        <div class="col-md-6 mb-4">
            <div class="card shadow">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">
                        {{__('cosmo.management.navigation.packages.packages')}}
                    </h6>
                </div>
                <div class="card-body">
                    <canvas id="packages-chart" width="1000" height="500"></canvas>
                </div>
            </div>
        </div>
    </div>

    <x-slot name="scripts">
        <script src="{{ asset('js/manage/dashboard.js') }}"></script>

        <script>
            let yearlyData = fillInBlanks(@json($data['graphs']['yearly']), 12);
            let monthlyData = fillInBlanks(@json($data['graphs']['monthly']), 31);
            let packageData = @json($data['graphs']['packages']);

            let yearly = document.getElementById('yearly-chart').getContext('2d');
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            // Yearly chart
            window.createChart(yearly, months, Object.values(yearlyData),
                'rgb(155, 89, 182)', 'rgba(155, 89, 182, 0.5)');

            let monthly = document.getElementById('monthly-chart').getContext('2d');
            window.createChart(monthly, Object.keys(monthlyData), Object.values(monthlyData),
                'rgb(231, 76, 60)', 'rgba(231, 76, 60, 0.5)');


            let packages = document.getElementById('packages-chart').getContext('2d');

            let labels = [];
            let data = [];
            for (let p of packageData) {
                labels.push(p.name);
                data.push(p.amount);
            }

            window.createPieChart(packages, labels, data);
        </script>

        <script type="text/javascript">
            const themeSwitch = $('#themeToggle');
            themeSwitch.click(function () {
                const currentTheme = localStorage.getItem('manage-theme') || null;

                let newTheme;
                if (currentTheme === 'dark') newTheme = 'light';
                else if (currentTheme === 'light') newTheme = 'dark';

                setTheme(newTheme);
            });
        </script>

        @if (auth()->user()->can('update-app'))
            <script>
                document.addEventListener('alpine:init', function () {
                    Alpine.data('updater', () => ({
                        loading: true,
                        latestVersion: null,
                        error: null,

                        init() {
                            Axios.get('/manage/latest-version')
                                .then(res => {
                                    this.loading = false;

                                    this.latestVersion = res.data && {
                                        id: res.data.version_id,
                                        name: res.data.version_name,
                                    };
                                })
                                .catch(e => {
                                    this.loading = false;
                                    this.error = true;

                                    console.error(e);
                                });
                        },

                        get btnClass() {
                            if (this.loading) return 'btn-warning';
                            if (this.error) return 'btn-danger';

                            return this.latestVersion ? 'btn-success scale-pulse' : 'btn-info';
                        },

                        get btnIcon() {
                            if (this.loading) return 'fa-spinner-third fa-spin';
                            if (this.error) return 'fa-times';

                            return this.latestVersion ? 'fa-hammer' : 'fa-thumbs-up';
                        },

                        get btnText() {
                            if (this.loading) return 'Loading';
                            if (this.error) return 'Couldn\'t fetch';

                            return this.latestVersion ? `Update to v${this.latestVersion.name}` : 'On Latest Version';
                        },

                        updateApp() {
                            if (this.latestVersion === null) return;

                            window.location.href = '/update.php?token=penis&step=&version=' + this.latestVersion.id;
                        }
                    }));
                });
            </script>
        @endif
    </x-slot>
</x-manage>
