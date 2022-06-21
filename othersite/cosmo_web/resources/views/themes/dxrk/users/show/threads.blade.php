@extends('themes.dxrk.users.show._layout')

@section('profile-content')
    <div class="row mb-3 mt-2">
        @foreach($threads as $thread)
            <div class="col-md-6 my-2">
                <a class="card h-100 shadow-sm" href="{{ route('forums.threads.show', $thread->id) }}">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-2">
                                <img src="{{ $thread->user->avatar }}" alt="" class="img-fluid rounded" style="max-height: 3.5rem; width: auto">
                            </div>
                            <div class="col-md-10 my-auto" style="margin-left: -2.5rem">
                                <h5 class="card-title text-truncate mb-0 pb-0">{{ $thread->title }}</h5>
                                <p class="mt-0 pt-0 mb-1 pb-0">@lang('cosmo.forums.replies'): {{ $thread->posts->count() }}</p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        @endforeach
    </div>

    {{ $threads->links('themes.dxrk.pagination') }}
@endsection