@extends('themes.dxrk.users.show._layout')

@section('profile-content')
    <div class="row justify-content-center">
        @foreach($user->achievements as $achievement)
            <div class="col-md-4">
                <div class="card h-100 achievement shadow-sm">
                    <div class="card-body">
                        <div class="info">
                            <img src="{{ asset($achievement->icon) }}"
                                 style="height: 2.5rem; width: auto;" class="img-fluid" alt="form-post">
                            <span class="my-auto">{{$achievement->name}}</span>
                            <p class="text-muted mb-0 pb-0 pt-2">@lang('cosmo.users.achievements.achievement_unlocked') <color style="color: rgba(255,255,255,.75); font-weight: bold">{{$achievement->created_at->diffForHumans()}}</color>. {{$achievement->description}}</p>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
        <div class="col-md-8 my-2">
            <div class="card h-100 achievement shadow-sm">
                <div class="card-body">
                    <div class="info">
                        <img src="{{ asset('img/achievements/more.png') }}"
                             style="height: 2.5rem; width: auto;" class="img-fluid" alt="more-contine">
                        <span class="my-auto">@lang('cosmo.users.achievements.unlock_more')</span>
                        <p class="text-muted mb-0 pb-0 pt-2">@lang('cosmo.users.achievements.default')</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection