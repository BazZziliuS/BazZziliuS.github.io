@extends('themes.dxrk.layout')

@section('title', $poll->title)

@section('header')
    <h1 class="title">{{ $poll->title }}</h1>
@endsection

@section('crumbs')
    <li class="breadcrumb-item"><a href="{{ route('home') }}">@lang('cosmo.core.home')</a></li>
    <li class="breadcrumb-item"><a href="{{ route('forums.index') }}">@lang('cosmo.core.forums')</a></li>
    <li class="breadcrumb-item"><a href="{{ route('forums.polls.index') }}">Polls</a></li>
    <li class="breadcrumb-item"><a href="{{ route('forums.polls.show', $poll->id) }}">Poll {{ $poll->id }}</a></li>
    <li class="breadcrumb-item"><a href="{{ route('forums.polls.show', $poll->id) }}">Results</a></li>

@endsection

@section('content')
    @include('themes.dxrk.includes.hero')

    <div class="container mt-4 polls" id="forumBoards">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <article class="card h-100 border-0 p-2" id="board">
                    <div class="card-header d-flex">
                        <h3 class="d-inline-flex card-title my-auto mr-auto">{{ $poll->title }}</h3>
                        <h5 class="d-inline-flex my-auto">
                            <span class="badge w-100 align-items-center p-2 gradient_bottom
                                        {{ $poll->closed ? 'badge-danger' : 'badge-success' }}">
                                {{ $poll->closed ? 'Closed' : 'Open' }}
                            </span>
                        </h5>
                    </div>
                    @if (auth()->check() && $hasAnswered)
                        <div class="card-body">
                            <p class="description">{{ $poll->description }}</p>

                            <div class="answers"></div>

                            @elseif (auth()->check() && !$hasAnswered)
                                <form action="{{route('forums.polls.store', $poll->id)}}" method="POST">
                                    @csrf

                                    <div class="card-body mb-0 pb-1">
                                        <ul class="polls-group list-unstyled">
                                            <p>{{ $poll->description }}</p>

                                            @foreach($poll->answers as $id => $answer)
                                                <li class="group">
                                                    <div class="custom-control custom-radio mb-1">
                                                        <input type="radio" class="custom-control-input"
                                                               id="answer-{{$id}}" name="answer" value="{{$id}}">
                                                        <label class="custom-control-label text-white"
                                                               for="answer-{{$id}}"> {{ $answer }}</label>
                                                    </div>
                                                </li>
                                            @endforeach
                                        </ul>
                                    </div>
                                    <div class="card-footer text-center">
                                        <button type="submit" class="btn btn-primary w-100 h-100">
                                            Vote
                                        </button>
                                    </div>
                                </form>
                            @else
                                <div class="card-body">
                                    <p class="pb-0 mb-0">Log in to vote or see the results.</p>
                                </div>
                            @endif
                        </div>
                </article>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        let data = JSON.parse('@json($poll->userAnswers)');
        let dAnswers = JSON.parse('@json($poll->answers)');
        let dat = [];

        for (let i = 0; i < dAnswers.length; i++) {
            let amount = 0;
            for (let answer of data) {
                if (answer.answer === i) {
                    amount++;
                }
            }
            dat[i] = amount;
        }


        let answers = [];
        for (let answer of dAnswers) {
            answers.push(answer);
        }


        let i = 0;
        for (const value of dat.values()) {
            $(`
                <div class="row justify-content-between progressSort">
                    <div class="col-sm-2">
                        <div class="text-white">${answers[i]}</div>
                    </div>

                    <div class="col-sm-8">
                        <div class="progress">
                          <div class="progress-bar" role="progressbar" style="width: ${value}%"
                                aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>

                    <div class="col-sm-2">
                        <div class="text-white">${value} Vote(s)</div>
                    </div>
                </div>
            `).appendTo($('.answers'));
            i++;
        }

    </script>
@endpush