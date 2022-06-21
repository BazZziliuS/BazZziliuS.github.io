<x-manage>
    <div class="page-title">
        <h1 class="font-weight-bold text-lg">Polls <smalL>Manage Polls</smalL></h1>
    </div>

    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Create new poll</h6>
        </div>
        <div class="card-body">
            <form action="{{route('manage.forums.polls.store')}}" method="post" id="create-poll-form">
                @csrf

                <div class="input-group">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="title">Poll Title</label>
                    </div>
                    <input type="text" class="form-control bg-light border-0 small" id="title" placeholder="Watch the next Harry Potter?" name="title" value="{{old('title')}}">
                </div>

                <div class="input-group mt-2">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="description">Poll Description</label>
                    </div>
                    <input type="text" class="form-control bg-light border-0 small" id="description" placeholder="We will be watching the 6th movie" name="description" value="{{old('description')}}">
                    <div class="input-group-append">
                        <span class="input-group-text" id="description">Optional</span>
                    </div>
                </div>

                <div class="input-group mt-2">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="icon">Poll Icon</label>
                    </div>
                    <input type="text" class="form-control bg-light border-0 small" id="icon" placeholder="fad fa-quidditch" name="icon" value="{{old('icon')}}">
                    <div class="input-group-append">
                        <span class="input-group-text" id="icon">Optional</span>
                    </div>
                </div>

                <div class="answers mt-4">
                    Answers <button class="ml-2 btn btn-sm btn-circle btn-success create-button"><i class="fas fa-plus"></i></button>

                    <div class="content"></div>
                </div>
            </form>
        </div>
        <div class="card-footer">
            <button type="submit" form="create-poll-form" class="btn btn-primary btn-icon-split">
                <span class="icon text-white-50">
                  <i class="fad fa-check"></i>
                </span>
                <span class="text">Submit</span>
            </button>
        </div>
    </div>

    <div class="row">
        @foreach($polls as $poll)
            <div class="modal fade" id="edit-{{$poll->id}}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <form action="{{route('manage.forums.polls.update', $poll->id)}}" method="post">
                        @csrf
                        @method('PATCH')

                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Editing Poll: {{$poll->title}}</h5>
                            </div>
                            <div class="modal-body">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Poll Title</label>
                                    </div>
                                    <input type="text" class="form-control bg-light border-0 small" placeholder="Watch the next Harry Potter?" name="title" value="{{$poll->title}}">
                                </div>

                                <div class="input-group mt-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Poll Description</label>
                                    </div>
                                    <input type="text" class="form-control bg-light border-0 small" placeholder="We will be watching the 6th movie" name="description" value="{{$poll->description}}">
                                </div>

                                <div class="input-group mt-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Poll Icon</label>
                                    </div>
                                    <input type="text" class="form-control bg-light border-0 small" placeholder="fad fa-quidditch" name="icon" value="{{$poll->icon}}">
                                </div>

                                <div class="answers mt-4">
                                    Answers <button class="ml-2 btn btn-sm btn-circle btn-success create-button"><i class="fas fa-plus"></i></button>

                                    <div class="content">
                                        @foreach($poll->answers as $answer)
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="input-group mt-2">
                                                        <input type="text" name="answers[]" class="form-control" placeholder="Answer" value="{{$answer}}">
                                                    </div>
                                                </div>
                                            </div>
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="modal fade" id="delete-{{$poll->id}}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Delete Poll</h5>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete the <strong>{{$poll->title}}</strong> poll?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                            <form action="{{route('manage.forums.polls.destroy', $poll->id)}}" method="post">
                                @csrf
                                @method('DELETE')

                                <button type="submit" class="btn btn-danger">Delete</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="answers-{{$poll->id}}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Answers for {{$poll->title}}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <canvas id="answer-chart-{{$poll->id}}"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <form action="{{route('manage.forums.polls.close', $poll->id)}}" method="post" id="close-{{$poll->id}}">
                @csrf
                @method('PATCH')
            </form>

            <div class="col-md-3 mb-3">
                <div class="card">
                    <div class="card-body">
                        <div class="title text-dark font-weight-bold mb-2">
                            <i class="{{$poll->icon}}"></i>
                            {{$poll->title}}
                        </div>

                        <p class="text-muted">
                            {{$poll->description}}
                        </p>

                        <div class="btn-toolbar">
                            <button class="btn btn-outline-primary mr-2" data-toggle="modal" data-target="#edit-{{$poll->id}}">Edit</button>
                            <button type="submit" class="btn btn-outline-warning mr-2" form="close-{{$poll->id}}">{{ $poll->closed ? 'Open' : 'Close' }}</button>
                            <button class="btn btn-outline-info mr-2" data-toggle="modal" data-target="#answers-{{$poll->id}}">Answers</button>
                            <button class="btn btn-outline-danger" data-toggle="modal" data-target="#delete-{{$poll->id}}">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
    </div>

    <x-slot name="scripts">
        <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>

        <script>
            $(document).ready(function() {
                @foreach($polls as $poll)
                    var data = JSON.parse('@json($poll->userAnswers)');
                    var answers = JSON.parse('@json($poll->answers)');

                    var dat = [];
                    for (var i = 0; i < answers.length; i++) {
                        let amount = 0;
                        for (let answer of data) {
                            if (answer.answer === i) {
                                amount++;
                            }
                        }

                        dat[i] = amount;
                    }

                    new Chart(document.getElementById('answer-chart-{{$poll->id}}'), {
                        type: 'pie',
                        data: {
                            labels: answers,
                            datasets: [{
                                data: dat,
                                backgroundColor: ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6', '#1abc9c'],
                                borderWidth: 0
                            }],
                        },
                        options: {
                            legend: {
                                display: true,
                                position: 'right'
                            },
                            tooltips: {
                                enabled: true,
                                backgroundColor: "#232328",
                                bodyFontColor: "#fff",
                                borderColor: '#232328',
                                borderWidth: 1,
                                xPadding: 10,
                                yPadding: 10,
                                displayColors: false,
                                caretPadding: 10,
                                zIndex: 9999
                            },
                            maintainAspectRatio: true
                        }
                    });
                @endforeach
             });

            $('.answers').each(function() {
                let btn = $(this).find('.create-button')
                let answers = btn.parent();
                let contentObj = answers.find('.content');

                btn.click(function(e) {
                    let child = $(`
                        <div class="row">
                            <div class="col-md-4">
                                <div class="input-group mt-2">
                                    <input type="text" name="answers[]" class="form-control" placeholder="Answer">
                                    <div class="input-group-append">
                                        <button class="btn btn-danger" type="button"><i class="fad fa-trash"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).appendTo(contentObj);

                    child.find('button').click(function() {
                        child.remove();
                    });

                    e.preventDefault();
                });
            });
        </script>
    </x-slot>
</x-manage>