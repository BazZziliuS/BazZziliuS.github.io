@extends('themes.purity.users.show._layout')

@section('profile-content')
    <div class="card-header d-flex mb-0">
        <h3 class="card-title text-truncate d-inline mr-auto">@lang('cosmo.users.pills.threads')</h3>
    </div>
    <div class="card-body threads">
        <div class="row">
            @foreach($threads as $thread)
                <div class="col-lg-6 col-md-12 my-2">
                    <a href="{{route('forums.threads.show', $thread->id)}}" class="card h-100 thread border-0 gradient_bottom">
                        <div class="card-body">
                            <div class="info d-flex">
                                <h3 class="text-truncate title d-inline">{{$thread->title}}</h3>
                                @if($thread->locked or $thread->stickied)
                                    <small class="d-inline my-auto ml-2 text-white">@lang('cosmo.forums.replies'): {{ $thread->posts->count() }}</small>
                                @endif
                            </div>
                            @if($thread->locked or $thread->stickied)
                                <div class="badges d-flex">
                                    @if($thread->locked)<span class="d-inline-flex p-2 badge badge-danger flex-shrink-0 mr-2 text-white">@lang('cosmo.forums.threads.locked')</span>@endif
                                    @if($thread->stickied)<span class="d-inline-flex p-2 badge badge-warning flex-shrink-0 text-white">@lang('cosmo.forums.threads.pinned')</span>@endif
                                </div>
                            @else
                                <p class="mb-0 pb-0 text-white">@lang('cosmo.forums.replies'): {{ $thread->posts->count() }}</p>
                            @endif
                        </div>
                    </a>
                </div>
            @endforeach
        </div>
        <div class="card editor border-0">
            {{ $threads->links('themes.purity.pagination') }}
        </div>
    </div>
@endsection