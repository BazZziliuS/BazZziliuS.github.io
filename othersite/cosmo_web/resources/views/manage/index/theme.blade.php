<x-manage>
    <div class="page-title">
        <h1 class="font-weight-bold text-lg">Theme <smalL>Manage Themes</smalL></h1>
    </div>
    <div id="themes">
        <div class="row">
            @foreach($themes as $theme)
                <div class="col-md-4 mb-3">
                    <img src="{{ asset($theme->settings['image']) }}" class="d-inline-flex img-fluid" alt="...">
                    <div class="form">
                        <form action="{{route('manage.index.theme.update', $theme->name)}}" method="post">
                            @csrf
                            @method('PATCH')

                            <button type="submit" class="btn btn-success" {{$theme->name === $current ? 'disabled' : ''}}>
                                {{$theme->name === $current ? 'Active' : 'Set Active'}}
                            </button>
                        </form>
                    </div>
                    <div class="info">
                        <span class="badge badge-custom"><h3 class="card-title mb-0 pb-0">{{ucfirst($theme->name)}}</h3></span>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</x-manage>