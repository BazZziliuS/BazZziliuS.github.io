<x-manage>
    <div class="page-title">
        <h1 class="font-weight-bold text-lg">Footer Links <smalL>Manage Footer Links</smalL></h1>
    </div>

    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Create new link</h6>
        </div>
        <div class="card-body">
            <form action="{{route('manage.index.footerlinks.store')}}" method="post" id="create-footerlink">
                @csrf

                <div class="row">
                    <div class="col-md-4">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text">Link Name</label>
                            </div>
                            <input type="text" class="form-control bg-light border-0 small" placeholder="Google" name="name" value="{{old('name')}}">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text">Link URL</label>
                            </div>
                            <input type="text" class="form-control bg-light border-0 small" placeholder="https://google.com" name="url" value="{{old('url')}}">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text">Link Category</label>
                            </div>
                            <input type="text" class="form-control bg-light border-0 small" placeholder="Other" name="category" value="{{old('category')}}">
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="card-footer">
            <button type="submit" form="create-footerlink" class="btn btn-primary btn-icon-split">
                <span class="icon text-white-50">
                  <i class="fad fa-check"></i>
                </span>
                <span class="text">Submit</span>
            </button>
        </div>
    </div>

    <div class="row">
        @foreach($links as $link)
            <!-- Edit -->
            <div class="modal fade" id="edit-{{$link->id}}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Editing Link: {{$link->name}}</h5>
                        </div>
                        <div class="modal-body">
                            <form action="{{route('manage.index.footerlinks.update', $link->id)}}" method="post" id="form-{{$link->id}}">
                                @csrf
                                @method('PATCH')

                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Link Name</label>
                                    </div>
                                    <input type="text" class="form-control bg-light border-0 small" placeholder="Google" name="name" value="{{$link->name}}">
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Link URL</label>
                                    </div>
                                    <input type="text" class="form-control bg-light border-0 small" placeholder="https://google.com" name="url" value="{{$link->url}}">
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Link Category</label>
                                    </div>
                                    <input type="text" class="form-control bg-light border-0 small" placeholder="Other" name="category" value="{{$link->category}}">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" form="form-{{$link->id}}" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="delete-{{$link->id}}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Deleting Link: {{$link->name}}</h5>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete this link?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                            <form action="{{route('manage.index.footerlinks.destroy', $link->id)}}" method="post">
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
                    <div class="card-body text-center">
                        <h4 class="font-weight-bold">{{$link->name}}</h4>
                        <p>{{$link->url}}</p>
                        @if($link->category)
                            <p class="font-weight-bold">{{$link->category}}</p>
                        @endif

                        <div class="row">
                            <div class="col-md-12 text-center">
                                <div class="btn-group">
                                    <button class="btn btn-sm btn-circle btn-primary" data-toggle="modal" data-target="#edit-{{$link->id}}">
                                        <i class="fad fa-pencil"></i>
                                    </button>

                                    <button class="btn btn-sm btn-circle btn-danger" data-toggle="modal" data-target="#delete-{{$link->id}}">
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