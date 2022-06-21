@extends('themes.purity.users.show._layout')

@section('profile-content')
    <div class="card-header mb-0">
        <h3 class="card-title text-truncate d-inline mr-auto">@lang('cosmo.users.pills.edit')</h3>
    </div>
    <div class="card-body edit">
        <form action="{{route('users.update', $user->steamid)}}" method="post" id="edit-form">
            @csrf
            @method('PATCH')
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <p class="mt-4 profile_edit-text">@lang('cosmo.users.edit.display_name'):</p>
                    <input type="text" class="form-control" name="username" id="username"
                           value="{{$user->username}}" placeholder="Display Name">
                </div>
                <div class="col-md-6">
                    <p class="mt-4 profile_edit-text">@lang('cosmo.users.edit.background_image'):</p>
                    <input type="text" class="form-control" name="background_img" id="background-image"
                           placeholder="Disabled" disabled>
                </div>

                <div class="col-md-6">
                    <p class="mt-4 profile_edit-text">@lang('cosmo.users.edit.biography'):</p>
                    <textarea name="bio">{!! $user->profile->bio !!}</textarea>
                </div>

                <div class="col-md-6">
                    <p class="mt-4 profile_edit-text">@lang('cosmo.users.edit.signature'):</p>
                    <textarea name="signature"> {{$user->profile->signature}} </textarea>
                </div>
            </div>
        </form>
        <div class="buttons d-flex">
            <button type="submit" id="saveProfile" class="btn btn-success" form="edit-form">@lang('cosmo.actions.update')</button>

            <div class="d-inline-flex ml-auto">
                @if($configs['discord_sync_enabled'])
                    <form action="{{route('login.discord')}}" method="get">
                        <button type="submit" class="btn btn-discord"> @lang('cosmo.users.edit.sync_discord') </button>
                    </form>
                @endif
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/tinymce.js') }}"></script>
@endpush()