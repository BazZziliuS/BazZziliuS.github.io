<x-manage>
    <div class="page-title">
        <h1 class="font-weight-bold text-lg">Categories <smalL>Manage Categories</smalL></h1>
    </div>

    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Create new category</h6>
        </div>
        <div class="card-body">
            <form action="{{route('manage.forums.categories.store')}}" method="post" id="create-category">
                @csrf

                <div class="input-group">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="name">Category Name</label>
                    </div>
                    <input type="text" class="form-control bg-light border-0 small" id="name" placeholder="Important" name="name" value="{{old('name')}}">
                </div>
                <div class="input-group mt-2">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="description">Category Description</label>
                    </div>
                    <input type="text" class="form-control bg-light border-0 small" id="description" placeholder="This is where we post all of our important stuff" name="description" value="{{old('description')}}">
                    <div class="input-group-append">
                        <span class="input-group-text" id="description">Optional</span>
                    </div>
                </div>
            </form>
        </div>
        <div class="card-footer">
            <button type="submit" form="create-category" class="btn btn-primary btn-icon-split">
                <span class="icon text-white-50">
                  <i class="fad fa-check"></i>
                </span>
                <span class="text">Submit</span>
            </button>
        </div>
    </div>

    <div class="row">
        @foreach($categories as $cat)
            <div class="modal fade" id="edit-{{$cat->id}}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Editing Category: {{$cat->name}}</h5>
                        </div>
                        <div class="modal-body">
                            <form id="form-{{$cat->id}}" action="{{route('manage.forums.categories.update', $cat->id)}}" method="post">
                                @csrf
                                @method('PATCH')

                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="name">Category Name</label>
                                    </div>
                                    <input type="text" class="form-control bg-light border-0 small" id="name" placeholder="Important" name="name" value="{{$cat->name}}">
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="description">Category Description</label>
                                    </div>
                                    <input type="text" class="form-control bg-light border-0 small" id="description" placeholder="This is where we post all of our important stuff" name="description" value="{{$cat->description}}">
                                </div>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" form="form-{{$cat->id}}" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="delete-{{$cat->id}}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Deleting Category: {{$cat->name}}</h5>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete this category?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                            <form action="{{route('manage.forums.categories.destroy', $cat->id)}}" method="post">
                                @csrf
                                @method('DELETE')

                                <button type="submit" class="btn btn-danger">Delete</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-3 mb-3">
                <div class="card shadow h-100">
                    <div class="card-body text-center">
                        <h2>{{$cat->name}}</h2>

                        <div class="row">
                            <div class="col-md-12 text-center">
                                <div class="btn-group">
                                    <button class="btn btn-sm btn-circle btn-primary" data-toggle="modal" data-target="#edit-{{$cat->id}}">
                                        <i class="fad fa-pencil"></i>
                                    </button>

                                    <button class="btn btn-sm btn-circle btn-danger" data-toggle="modal" data-target="#delete-{{$cat->id}}">
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
