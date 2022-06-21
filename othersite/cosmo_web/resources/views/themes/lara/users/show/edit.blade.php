@extends('themes.lara.users.show._layout')

@section('profile-content')
    <form action="{{route('users.update', $user->steamid)}}" method="post" id="edit-form">
        @csrf
        @method('PATCH')
        <div class="row">
            <div class="col-lg-12">
                <p class="mt-4 profile_edit-text">@lang('cosmo.users.edit.display_name'):</p>
                <input type="text" class="form-control" name="username" id="username" value="{{$user->username}}" placeholder="Display name">
            </div>

            <div class="col-lg-12 mb-2">
                <p class="mt-4 profile_edit-text">@lang('cosmo.users.edit.background_image'):</p>
                <input type="text" class="form-control" name="background_img" id="background-image" value="{{$user->profile->background_img}}" placeholder="Background Image">
            </div>


            <div class="col-md-6 mb-2">
                <p class="profile_edit-text">@lang('cosmo.users.edit.biography'):</p>
                <textarea name="bio">{!! $user->profile->bio !!}</textarea>
            </div>

            <div class="col-md-6 mb-2">
                <p class="profile_edit-text">@lang('cosmo.users.edit.signature'):</p>
                <textarea name="signature"> {{$user->profile->signature}} </textarea>
            </div>
        </div>
    </form>

    <div class="row justify-content-between">
        <div class="col-auto">
            <button type="submit" class="btn btn-success" form="edit-form">@lang('cosmo.actions.save_changes')</button>
        </div>
        <div class="col-auto d-flex d-inline-flex">
            @if($configs['discord_sync_enabled'])
                <form action="{{route('login.discord')}}" method="get">
                    <button type="submit" class="btn btn-primary"> @lang('cosmo.users.edit.sync_discord') </button>
                </form>
            @endif
        </div>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/tinymce.js') }}"></script>
@endpush