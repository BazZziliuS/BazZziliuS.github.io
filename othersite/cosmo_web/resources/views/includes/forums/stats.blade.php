<div class="col-12 col-md-3 forum_stats">
    @if(!is_null($poll) && auth()->check())
        <a href="{{route('forums.polls.index')}}"
           class="badge btn-primary w-100 align-items-center p-3 mb-2 gradient_bottom position-relative">
            <h6 class="text-truncate">{{ $pollCount }} @lang('cosmo.forums.unanswered_polls')
                <i class="ml-2 fad fa-level-down-alt"></i>
            </h6>
        </a>
        <div class="card mb-4 polls" id="forum_polls">
            <div class="card-header gradient_bottom">
                <h5 class="card-title mb-0 pb-0 text-truncate">@lang('cosmo.forums.polls')</h5>
                <p class="card-desc mb-0 pb-0 pt-0 text-truncate">@lang('cosmo.forums.polls_desc')</p>
            </div>
            <form action="{{route('forums.polls.store', $poll->id)}}" method="POST">
                @csrf

                <div class="card-body">
                    <ul class="polls-group list-unstyled">
                        <h5 class="text-truncate">{{ $poll->title }}</h5>
                        <p>{{ $poll->description }}</p>

                        @foreach($poll->answers as $id => $answer)
                            <li class="group">
                                <div class="custom-control custom-radio mb-1">
                                    <input type="radio" class="custom-control-input" id="answer-{{$id}}" name="answer"
                                           value="{{$id}}">
                                    <label class="custom-control-label" for="answer-{{$id}}"> {{ $answer }}</label>
                                </div>
                            </li>
                        @endforeach
                    </ul>
                </div>
                <div class="card-footer text-right">
                    <button type="submit" class="btn btn-primary">@lang('cosmo.actions.submit')</button>
                </div>
            </form>
        </div>
    @endif

    <div class="card mb-4 search" id="search_threads">
        <div class="card-header gradient_bottom">
            <i class="fad fa-search"></i>
            <h5 class="card-title mb-0 pb-0 text-truncate">@lang('cosmo.forums.search')</h5>
            <p class="mb-0 pb-0 card-desc pt-0 text-truncate">@lang('cosmo.forums.search_desc')</p>
        </div>
        <div class="card-body" id="latest_threads">
            <div class="form-group">
                <form action="{{route('forums.threads.search')}}" method="post">
                    @csrf
                    <input type="text" name="search" placeholder="DarkRP Rules" class="form-control" value="">
                </form>
            </div>
        </div>
    </div>

    @if($recentPosts->count() > 0)
        <div class="card mb-4" id="latest_posts">
            <div class="card-header gradient_bottom">
                <h5 class="card-title mb-0 pb-0 text-truncate">@lang('cosmo.forums.latest_posts')</h5>
                <p class="mb-0 pb-0 card-desc pt-0 text-truncate">@lang('cosmo.forums.latest_posts-desc')</p>
            </div>
            <div class="card-body" id="latest_threads">
                @foreach($recentPosts as $post)
                    <div class="d-flex mb-3">
                        <div class="h-100" style="margin-top: 0.3rem;">
                            <a href="{{ route('users.show', $post->user->steamid) }}">
                                <img src="{{ $post->user->avatar }}" alt="User Avatar" class="rounded-lg"
                                     width="36" height="36">
                            </a>
                        </div>
                        <div class="flex-1 ml-2 overflow-hidden text-nowrap">
                            <a href="{{ route('forums.posts.show', $post->id) }}"
                               class="font-weight-bold text-nowrap" style="font-size: 15px; color: #ccc;">
                                {{ $post->thread->title }}
                            </a>
                            <div class="text-muted" style="font-size: 13px;">
                                <div class="d-inline">
                                    {{ $post->created_at->diffForHumans() }}
                                </div>
                                by
                                <a href="{{ route('users.show', $post->user->steamid) }}"
                                   class="text-decoration-none" style="color: var(--Accent_Color);">
                                    {{ $post->user->username }}
                                </a>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    @endif

    @if($recentThreads->count() > 0)
        <div class="card" id="latest_threads">
            <div class="card-header gradient_bottom">
                <h5 class="card-title mb-0 pb-0 text-truncate">@lang('cosmo.forums.latest_threads')</h5>
                <p class="mb-0 pb-0 card-desc pt-0 text-truncate">@lang('cosmo.forums.latest_threads-desc')</p>
            </div>
            <div class="card-body" id="latest_threads">
                @foreach($recentThreads as $thread)
                    <div class="d-flex mb-3">
                        <div class="h-100" style="margin-top: 0.3rem;">
                            <a href="{{ route('users.show', $thread->user->steamid) }}">
                                <img src="{{ $thread->user->avatar }}" alt="User Avatar" class="rounded-lg"
                                     width="36" height="36">
                            </a>
                        </div>
                        <div class="flex-1 ml-2 overflow-hidden text-nowrap">
                            <a href="{{ route('forums.threads.show', $thread->id) }}"
                               class="font-weight-bold" style="font-size: 15px; color: #ccc;">
                                {{ $thread->title }}
                            </a>
                            <div class="text-muted" style="font-size: 13px;">
                                <div class="d-inline">
                                    {{ $thread->created_at->diffForHumans() }}
                                </div>
                                by
                                <a href="{{ route('users.show', $thread->user->steamid) }}"
                                   class="text-decoration-none" style="color: var(--Accent_Color);">
                                    {{ $thread->user->username }}
                                </a>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    @endif

    @if($configs['discord_widget_enabled'])
        <iframe src="https://discordapp.com/widget?id={{$configs['discord_widget_id']}}&theme=dark"
                class="position-relative mt-4" style="z-index: 999" width="330" height="400"
                allowtransparency="true" frameborder="0">
        </iframe>
    @endif
</div>