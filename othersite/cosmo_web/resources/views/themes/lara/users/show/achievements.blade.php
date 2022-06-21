@extends('themes.lara.users.show._layout')

@section('profile-content')
    <div class="row">
        @foreach($user->achievements as $achievement)
            <div class="col-md-6 my-2">
                <div class="card h-100 achievement">
                    <div class="card-body">
                        <img src="{{ asset($achievement->icon) }}" alt="" class="img-fluid" style="height: 2.5rem; width: auto;">
                        <span class="my-auto">{{$achievement->name}}</span>
                        <p class="text-muted mb-0 pb-0 pt-2">@lang('cosmo.users.achievements.achievement_unlocked') <color style="color: rgba(255,255,255,.75); font-weight: bold">
                                {{$achievement->created_at->diffForHumans()}}</color>. {{$achievement->description}}</p>
                    </div>
                    <div class="gradient"></div>
                </div>
            </div>
        @endforeach

        <div class="col-md-12 my-2">
            <div class="card h-100 achievement">
                <div class="card-body">
                    <img src="{{ asset('img/achievements/more.png') }}" alt="" class="img-fluid" style="height: 2.5rem; width: auto;">
                    <span class="my-auto">@lang('cosmo.users.achievements.unlock_more')</span>
                    <p class="text-muted mb-0 pb-0 pt-2">@lang('cosmo.users.achievements.default')</p>
                </div>
                <div class="gradient"></div>
            </div>
        </div>
    </div>
@endsection