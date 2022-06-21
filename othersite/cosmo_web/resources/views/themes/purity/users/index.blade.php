@extends('themes.purity.layout')

@section('title')
    @lang('cosmo.core.users')
@endsection

@section('page_titles')
    <h3 class="subtitle text-truncate">{{ $configs['users_description'] }}</h3>
    <h1 class="title text-truncate">{{ $configs['users_title'] }}</h1>
@endsection

@section('content')
    <div class="container" id="users">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <form action="{{ route('users.search') }}" method="POST">
                    @csrf
                    <label for="search"></label>
                    <input id="search" type="text" class="form-control" name="search" placeholder="Search..." value="{{ $search }}" />
                </form>
            </div>
        </div>

        <div class="card h-100 shadow border-0 mt-3">
            <div class="card-header mb-0">
                <h3 class="card-title text-truncate d-inline mr-auto">@lang('cosmo.core.users')</h3>
            </div>
            <div class="card-body text-truncate">
                <div class="row justify-content-center">
                    @forelse($users as $user)
                        <div class="col-lg-3 col-md-6 col-sm-12 my-3">
                            <a class="user card bg-inner rounded-lg" href="{{ route('users.show', $user->steamid) }}"
                               data-aos="zoom-in-up" data-aos-duration="{{ $loop->iteration * 125 }}">
                                <div class="card-body d-flex text-nowrap overflow-hidden">
                                    <img class="d-inline" src="{{ $user->avatar }}" alt="{{ $user->username }}'s avatar">
                                    <div class="d-inline my-auto text-truncate">
                                        <h5 class="d-inline text-white-50">{{ $user->username }}</h5>
                                        <h6 style="color: {{ $user->role->color ? $user->role->color : 'white' }}"
                                            class="text-uppercase mb-0">{{ $user->role->name }}
                                        </h6>
                                    </div>
                                </div>
                            </a>
                        </div>
                    @empty
                        <h2>@lang('cosmo.users.no_users-found')</h2>
                    @endforelse

                    {{ $users->links('themes.purity.pagination') }}
                </div>
            </div>
        </div>
    </div>
@endsection