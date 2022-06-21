@extends('themes.havart.users.show._layout')

@section('profile-content')
    <div class="row justify-content-center">
        @foreach($threads as $thread)
            <div class="col-lg-6 col-md-12 my-2">
                <a href="{{route('forums.threads.show', $thread->id)}}" class="card thread p-4 shadow-sm">
                    <div class="row">
                        <div class="col-md-2">
                            @if($thread->locked or $thread->stickied)
                                @if($thread->locked)<span
                                        class="badge badge-danger flex-shrink-0 mb-2">@lang('cosmo.forums.threads.locked')</span>@endif
                                @if($thread->stickied)<span
                                        class="badge badge-warning flex-shrink-0 mb-2">@lang('cosmo.forums.threads.pinned')</span>@endif
                                <p class="mb-0">
                                    @lang('cosmo.forums.replies'): {{$thread->posts->count()}}
                                </p>
                            @endif
                        </div>
                        <div class="info {{ (!$thread->stickied && !$thread->locked) ? 'col-md-12' : 'col-md-6' }}">
                            <h3 class="text-truncate">{{$thread->title}}</h3>
                            @if(!$thread->stickied and !$thread->locked)
                                <p class="mb-0">
                                    @lang('cosmo.forums.replies'): {{$thread->posts_count}}
                                </p>
                            @endif
                        </div>
                    </div>
                </a>
            </div>
        @endforeach

        {{ $threads->links('themes.havart.pagination') }}
    </div>
@endsection