<x-manage>
    <div class="page-title">
        <h1 class="font-weight-bold text-lg">Roles <small>Manage Roles</small></h1>
    </div>

    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Create new role</h6>
        </div>
        <div class="card-body">
            <form action="{{route('manage.general.roles.store')}}" method="post" id="create-role">
                @csrf

                <div class="row">
                    <div class="col-md-4">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="name">Role Name</label>
                            </div>
                            <input type="text" class="form-control bg-light border-0 small" id="name"
                               placeholder="administrator" name="name" value="{{old('name')}}">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="name">Role Display</label>
                            </div>
                            <input id="name" type="text" class="form-control bg-light border-0 small"
                                   placeholder="Administrator" name="display_name" value="{{old('display_name')}}">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="name">Role Color</label>
                            </div>
                            <input id="name" type="text" class="form-control bg-light border-0 small"
                                   name="color" value="{{old('color', '#673AB7')}}">
                        </div>
                    </div>

                    @foreach(config('cosmo.permissions') as $perm => $permInfo)
                        <div class="col-md-2 mt-3">
                            <div class="custom-control custom-checkbox">
                                <input class="custom-control-input" type="checkbox" value="{{$permInfo['reference']}}"
                                       id="check-{{$perm}}" name="permissions[]">
                                <label class="custom-control-label" for="check-{{$perm}}"
                                       data-tippy-content="{{$permInfo['description']}}">
                                    {{$permInfo['display']}}
                                </label>
                            </div>
                        </div>
                    @endforeach
                </div>
            </form>

            <button class="btn btn-primary btn-sm mt-4" id="select-all">Select All</button>
            <button class="btn btn-secondary btn-sm mt-4" id="unselect-all">Select None</button>
        </div>
        <div class="card-footer">
            <button type="submit" form="create-role" class="btn btn-primary btn-icon-split">
                <span class="icon text-white-50">
                  <i class="fad fa-check"></i>
                </span>
                <span class="text">Submit</span>
            </button>
        </div>
    </div>

    <div class="row">
    @foreach($roles as $role)
        <!-- Edit Modal -->
            <div class="modal fade" id="edit-{{$role->id}}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Editing Role: {{$role->name}}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="form-{{$role->id}}" action="{{route('manage.general.roles.update', $role->id)}}"
                                  method="post">
                                @csrf
                                @method('PATCH')

                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="name">Role Name</label>
                                    </div>
                                    <input id="name" type="text" class="form-control bg-light border-0 small"
                                        placeholder="administrator" name="name" value="{{$role->name}}">
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="name">Role Display</label>
                                    </div>
                                    <input id="name" type="text" class="form-control bg-light border-0 small"
                                           placeholder="Administrator" name="display_name"
                                           value="{{$role->display_name}}">
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="name">Role Color</label>
                                    </div>
                                    <input id="name" type="text" class="form-control bg-light border-0 small"
                                           placeholder="#673AB7" name="color" value="{{$role->color}}">
                                </div>

                                <div class="row">
                                    @foreach(config('cosmo.permissions') as $perm => $permInfo)
                                        <div class="col-md-6 mt-3">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input" type="checkbox"
                                                       value="{{$permInfo['reference']}}"
                                                       id="check-{{$perm}}-{{$role->id}}"
                                                       name="permissions[]" {{$role->hasPermission($permInfo['reference']) ? 'checked' : ''}}>
                                                <label class="custom-control-label" for="check-{{$perm}}-{{$role->id}}"
                                                       data-tippy-content="{{$permInfo['description']}}">
                                                    {{$permInfo['display']}}
                                                </label>
                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" form="form-{{$role->id}}" class="btn btn-primary">Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Delete Modal -->
            @if($role->deletable)
                <div class="modal fade" id="delete-{{$role->id}}" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Deleting Role: {{$role->name}}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Are you sure you want to delete this role?
                                You won't be able to recover it later.
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                                <form action="{{route('manage.general.roles.destroy', $role->id)}}" method="POST">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-danger">Delete</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            @endif

            <div class="col-md-3 mb-3">
                <div class="card shadow">
                    <div class="card-body text-center">
                        <h4 style="color: {{$role->color}};">{{$role->display_name}}</h4>
                        <p>{{$role->name}} ({{$role->users->count()}} users)</p>

                        <div class="row">
                            <div class="col-md-12 text-center">
                                <div class="btn-group">
                                    <button class="btn btn-sm btn-circle btn-primary" data-toggle="modal"
                                            data-target="#edit-{{$role->id}}">
                                        <i class="fad fa-pencil"></i>
                                    </button>

                                    @if($role->deletable)
                                        <button class="btn btn-sm btn-circle btn-danger" data-toggle="modal"
                                                data-target="#delete-{{$role->id}}">
                                            <i class="fad fa-trash"></i>
                                        </button>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
    </div>

    <x-slot name="scripts">
        <script>
            const allPermissions = @json(array_keys(config('cosmo.permissions')));

            $('#select-all').click(() => {
                for (let perm of allPermissions) {
                    $(`#check-${perm}`).prop('checked', true);
                }
            });

            $('#unselect-all').click(() => {
                for (let perm of allPermissions) {
                    $(`#check-${perm}`).prop('checked', false);
                }
            });
        </script>
    </x-slot>
</x-manage>
