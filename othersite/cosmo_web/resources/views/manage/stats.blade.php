{{--                      STORE STATS                           --}}

{{-- Toal Earnings --}}
<div class="col-md-2 mb-4">
    <div class="card border-left-danger shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">
                        {{__('cosmo.management.core.stats.earnings.total')}}
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">
                        {{$currency}}{{$data['earnings']['total']}}
                    </div>
                </div>
                <div class="col-auto">
                    <i class="fad fa-money-check fa-2x text-gray-300"></i>
                </div>
            </div>
        </div>
    </div>
</div>
{{-- Monthly Earnings --}}
<div class="col-md-2 mb-4">
    <div class="card border-left-danger shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">
                        {{__('cosmo.management.core.stats.earnings.monthly')}}
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">
                        {{$currency}}{{$data['earnings']['monthly']}}
                    </div>
                </div>
                <div class="col-auto">
                    <i class="fad fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
            </div>
        </div>
    </div>
</div>
{{-- Weekly Earnings --}}
<div class="col-md-2 mb-4">
    <div class="card border-left-danger shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">
                        {{__('cosmo.management.core.stats.earnings.weekly')}}
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">
                        {{$currency}}{{$data['earnings']['weekly']}}
                    </div>
                </div>
                <div class="col-auto">
                    <i class="fad fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
            </div>
        </div>
    </div>
</div>
{{-- Daily Earnings --}}
<div class="col-md-2 mb-4">
    <div class="card border-left-danger shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">
                        {{__('cosmo.management.core.stats.earnings.daily')}}
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">
                        {{$currency}}{{$data['earnings']['daily']}}
                    </div>
                </div>
                <div class="col-auto">
                    <i class="fad fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="col-md-2 mb-4">
    <div class="card border-left-danger shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">
                        {{__('cosmo.management.core.stats.total_packages')}}
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{$data['store']['packages']}}</div>
                </div>
                <div class="col-auto">
                    <i class="fad fa-store-alt fa-2x text-gray-300"></i>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="col-md-2 mb-4">
    <div class="card border-left-danger shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">
                        {{__('cosmo.management.core.stats.total_purchases')}}
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{$data['store']['purchases']}}</div>
                </div>
                <div class="col-auto">
                    <i class="fad fa-store fa-2x text-gray-300"></i>
                </div>
            </div>
        </div>
    </div>
</div>


{{--                   FORUM STATS                     --}}
{{-- Categories --}}
<div class="col-md-2 mb-4">
    <div class="card border-left-primary shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        {{__('cosmo.management.core.stats.forum.categories')}}
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{$data['forums']['categories']}}</div>
                </div>
                <div class="col-auto">
                    <i class="fad fa-box fa-2x text-gray-300"></i>
                </div>
            </div>
        </div>
    </div>
</div>
{{-- Boards --}}
<div class="col-md-2 mb-4">
    <div class="card border-left-primary shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        {{__('cosmo.management.core.stats.forum.boards')}}
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{$data['forums']['boards']}}</div>
                </div>
                <div class="col-auto">
                    <i class="fad fa-file-archive fa-2x text-gray-300"></i>
                </div>
            </div>
        </div>
    </div>
</div>
{{-- Threads --}}
<div class="col-md-2 mb-4">
    <div class="card border-left-primary shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        {{__('cosmo.management.core.stats.forum.threads')}}
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{$data['forums']['threads']}}</div>
                </div>
                <div class="col-auto">
                    <i class="fad fa-scroll fa-2x text-gray-300"></i>
                </div>
            </div>
        </div>
    </div>
</div>
{{-- Users --}}
<div class="col-md-2 mb-4">
    <div class="card border-left-primary shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        {{__('cosmo.management.core.stats.users')}}
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{$data['accounts']['users']}}</div>
                </div>
                <div class="col-auto">
                    <i class="fad fa-users fa-2x text-gray-300"></i>
                </div>
            </div>
        </div>
    </div>
</div>
{{-- Roles --}}
<div class="col-md-2 mb-4">
    <div class="card border-left-primary shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        {{__('cosmo.management.core.stats.roles')}}
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{$data['accounts']['roles']}}</div>
                </div>
                <div class="col-auto">
                    <i class="fad fa-users-cog fa-2x text-gray-300"></i>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="col-md-2 mb-4">
    <div class="card border-left-warning shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                        {{__('cosmo.management.core.stats.tickets')}}
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{$data['tickets']['support']}}</div>
                </div>
                <div class="col-auto">
                    <i class="fad fa-ticket-alt fa-2x text-gray-300"></i>
                </div>
            </div>
        </div>
    </div>
</div>
