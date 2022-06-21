@extends('themes.purity.users.show._layout')

@section('profile-content')
    <div class="card-header mb-0">
        <h3 class="card-title text-truncate d-inline mr-auto">@lang('cosmo.users.pills.achievements')</h3>
    </div>
    <div class="card-body achievements">
        <div class="row justify-content-center">
            @foreach($user->achievements as $achievement)
                <div class="col-md-6 my-2">
                    <div class="card border-0 h-100 achievement">
                        <div class="card-body">
                            <div class="info">
                                <img src="{{ asset($achievement->icon) }}" alt="{{$achievement->name}}"
                                     style="height: 2.5rem; width: auto;" class="img-fluid">
                                <span class="my-auto name">{{$achievement->name}}</span>
                                <p class="text-muted mb-0 pb-0 pt-2">@lang('cosmo.users.achievements.achievement_unlocked')
                                    <color style="color: rgba(255,255,255,.75); font-weight: bold">
                                        {{$achievement->created_at->diffForHumans()}}
                                    </color>.
                                    {{$achievement->description}}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
            <div class="col-md-12 my-2">
                <div class="card border-0 h-100 achievement gradient_bottom">
                    <div class="card-body">
                        <div class="info">
                            <img src="{{ asset('img/achievements/more.png') }}"
                                 style="height: 2.5rem; width: auto;" class="img-fluid" alt="more-contine">
                            <span class="my-auto name">@lang('cosmo.users.achievements.unlock_more')</span>
                            <p class="text-muted mb-0 pb-0 pt-2">@lang('cosmo.users.achievements.default')</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection