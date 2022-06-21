@extends('themes.lara.users.show._layout')

@section('profile-content')
    <div class="row justify-content-center">
        @foreach($threads as $thread)
            <div class="col-md-6 my-2">
                <div class="card threads h-100">
                    <div class="card-body">
                        <a href="{{ route('forums.threads.show', $thread->id) }}">
                            <div class="row">
                                <div class="col-md-2 my-auto">
                                    <img src="{{ $thread->user->avatar }}" alt="Thread Author Avatar" class="img-fluid rounded">
                                </div>
                                <div class="col-md-10 my-auto text-muted" style="margin-left: -1rem">
                                    <h3 class="card-title text-truncate mb-0 pb-0 text-white">{{ $thread->title }}</h3>
                                    @lang('cosmo.forums.replies'): {{ $thread->posts->count() }}
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="gradient"></div>
                </div>
            </div>
        @endforeach
    </div>
    <div class="spacer" style="margin-top: 1rem; margin-bottom: 1rem"></div>
    {{ $threads->links('themes.lara.pagination') }}
@endsection