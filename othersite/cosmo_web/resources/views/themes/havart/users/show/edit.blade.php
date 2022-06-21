@extends('themes.havart.users.show._layout')

@section('profile-content')
    <div  id="users_edit" role="tabpanel" aria-labelledby="pills-users_edit-tab">
        <div class="card">
            <div class="card-body">
                <form action="{{route('users.update', $user->steamid)}}" method="post" id="edit-form">
                    @csrf
                    @method('PATCH')
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <p class="mt-4 profile_edit-text">@lang('cosmo.users.edit.display_name'):</p>
                            <input type="text" class="form-control" name="username" id="username"
                                   value="{{$user->username}}" placeholder="Display Name">
                        </div>

                        <div class="col-lg-8">
                            <p class="mt-4 profile_edit-text">@lang('cosmo.users.edit.background_image')
                                :</p>
                            <input type="text" class="form-control" name="background_img"
                                   id="background-image" value="{{$user->profile->background_img}}"
                                   placeholder="Background Image">
                        </div>

                        <div class="col-md-8">
                            <p class="mt-4 profile_edit-text">@lang('cosmo.users.edit.biography'):</p>
                            <textarea name="bio">{!! $user->profile->bio !!}</textarea>
                        </div>

                        <div class="col-md-8">
                            <p class="mt-4 profile_edit-text">@lang('cosmo.users.edit.signature'):</p>
                            <textarea name="signature"> {{$user->profile->signature}} </textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="card-footer">
                <div class="row justify-content-between">
                    <div class="col-auto">
                        <button type="submit" class="btn btn-primary"
                                form="edit-form">@lang('cosmo.actions.update')</button>
                    </div>
                    <div class="col-auto d-flex d-inline-flex">
                        @if($configs['discord_sync_enabled'])
                            <form action="{{route('login.discord')}}" method="get">
                                <button type="submit"
                                        class="btn btn-primary"> @lang('cosmo.users.edit.sync_discord') </button>
                            </form>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/tinymce.js') }}"></script>
@endpush