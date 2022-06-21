<div class="modal fade" id="edit-{{$board->id}}" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Editing Board: {{$board->name}}</h5>
            </div>
            <div class="modal-body">
                <form id="form-{{$board->id}}" action="{{route('manage.forums.boards.update', $board->id)}}" method="post">
                    @csrf
                    @method('PATCH')

                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="name">Board Name</label>
                        </div>
                        <input type="text" class="form-control bg-light border-0 small" id="name" placeholder="Important" name="name" value="{{$board->name}}">
                    </div>
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="icon">Board Icon</label>
                        </div>
                        <input type="text" class="form-control bg-light border-0 small" id="icon" placeholder="fad fa-server" name="icon" value="{{$board->icon}}">
                    </div>
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="color">Board Color</label>
                        </div>
                        <input type="text" class="form-control bg-light border-0 small" id="color" placeholder="Important" name="color" value="{{$board->color}}">
                    </div>
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="description">Board Description</label>
                        </div>
                        <input type="text" class="form-control bg-light border-0 small" id="description" placeholder="Important" name="description" value="{{$board->description}}">
                    </div>
                    <div class="input-group mb-2">
                        <select class="custom-control custom-select" name="category">
                            <option disabled>Board Category</option>

                            @foreach($categories as $category)
                                <option {{$category->id == $board->category_id ? 'selected' : ''}}>{{$category->name}}</option>
                            @endforeach
                        </select>
                    </div>

                    <label class="font-weight-bold mt-3">Roles</label>
                    <small>These are roles that can post inside the board.</small>
                    @foreach($roles as $role)
                        <div class="custom-control custom-checkbox">
                            <input class="custom-control-input" type="checkbox" value="{{$role->name}}" id="check-{{$role->id}}-{{$board->id}}" name="roles[]" {{$board->roleHasAccess($role->name) ? 'checked' : ''}}>
                            <label class="custom-control-label" for="check-{{$role->id}}-{{$board->id}}">
                                {{$role->display_name}}
                            </label>
                        </div>
                    @endforeach
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" form="form-{{$board->id}}" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="delete-{{$board->id}}" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Deleting Board: {{$board->name}}</h5>
            </div>
            <div class="modal-body">
                Are you sure you want to delete this board?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                <form action="{{route('manage.forums.boards.destroy', $board->id)}}" method="post">
                    @csrf
                    @method('DELETE')

                    <button type="submit" class="btn btn-danger">Delete</button>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="p-2">
    {{$board->name}}

    <button class="btn btn-sm btn-circle btn-primary ml-3" data-toggle="modal" data-target="#edit-{{$board->id}}">
        <i class="fad fa-pencil"></i>
    </button>

    <button class="btn btn-sm btn-circle btn-danger" data-toggle="modal" data-target="#delete-{{$board->id}}">
        <i class="fad fa-trash"></i>
    </button>
</div>