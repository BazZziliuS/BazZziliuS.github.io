<x-manage>
    <div class="page-title">
        <h1 class="font-weight-bold text-lg">Features <smalL>Manage Features</smalL></h1>
    </div>

    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Create new feature</h6>
        </div>
        <div class="card-body">
            <form action="{{route('manage.index.features.store')}}" method="post" id="create-feature">
                @csrf

                <div class="row">
                    <div class="col-md-4">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="name">Feature Name</label>
                            </div>
                            <input id="name" type="text" class="form-control bg-light border-0 small" placeholder="Custom Content" name="name" value="{{old('name')}}">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="icon">Feature Icon</label>
                            </div>
                            <input id="icon" type="text" class="form-control bg-light border-0 small" placeholder="fad fa-paint-brush" name="icon" value="{{old('icon') ?? 'fad fa-paint-brush'}}">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="color">Feature Color</label>
                            </div>
                            <input id="color" type="text" class="form-control bg-light border-0 small" placeholder="#673AB7" name="color" value="{{old('color') ?? '#673AB7'}}">
                        </div>
                    </div>
                    <div class="col-md-12 mt-4">
                        <label class="text-black-50 font-weight-bold" for="textarea">Feature Content</label>
                        <textarea id="textarea" name="content" cols="5" rows="5"></textarea>
                    </div>
                </div>
            </form>
        </div>
        <div class="card-footer">
            <button type="submit" form="create-feature" class="btn btn-primary btn-icon-split">
                <span class="icon text-white-50">
                  <i class="fad fa-check"></i>
                </span>
                <span class="text">Submit</span>
            </button>
        </div>
    </div>

    <div class="row">
        @foreach($features as $feature)
            <!-- Edit -->
            <div class="modal fade" id="edit-{{$feature->id}}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Editing Feature: {{$feature->name}}</h5>
                        </div>
                        <div class="modal-body">
                            <form id="form-{{$feature->id}}" action="{{route('manage.index.features.update', $feature->id)}}" method="post">
                                @csrf
                                @method('PATCH')

                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="name">Feature Name</label>
                                    </div>
                                    <input type="text" class="form-control bg-light border-0 small" id="name" placeholder="Custom Content" name="name" value="{{$feature->name}}">
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="name">Feature Icon</label>
                                    </div>
                                    <input type="text" class="form-control bg-light border-0 small" placeholder="fad fa-paint-brush" name="icon" value="{{$feature->icon}}">
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="name">Feature Color</label>
                                    </div>
                                    <input type="text" class="form-control bg-light border-0 small" placeholder="#673AB7" name="color" value="{{$feature->color}}">
                                </div>

                                <label class="text-black-50 font-weight-bold">Feature Content</label>
                                <textarea name="content" cols="5" rows="5">{{$feature->content}}</textarea>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" form="form-{{$feature->id}}" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="delete-{{$feature->id}}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Deleting Feature: {{$feature->name}}</h5>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete this feature?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                            <form action="{{route('manage.index.features.destroy', $feature->id)}}" method="post">
                                @csrf
                                @method('DELETE')

                                <button type="submit" class="btn btn-danger">Delete</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-3 mb-3">
                <div class="card shadow">
                    <div class="card-header py-4"></div>
                    <div class="card-body text-center">
                        <div class="icon mt-n5 mb-2">
                            <i class="{{$feature->icon}} fa-2x p-3 rounded-circle text-white" style="background-color: {{$feature->color}}"></i>
                        </div>
                        <h4 class="font-weight-bold">{{$feature->name}}</h4>
                        <p>{{$feature->content}}</p>

                        <div class="row">
                            <div class="col-md-12 text-center">
                                <div class="btn-group">
                                    <button class="btn btn-sm btn-circle btn-primary" data-toggle="modal" data-target="#edit-{{$feature->id}}">
                                        <i class="fad fa-pencil"></i>
                                    </button>

                                    <button class="btn btn-sm btn-circle btn-danger" data-toggle="modal" data-target="#delete-{{$feature->id}}">
                                        <i class="fad fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</x-manage>