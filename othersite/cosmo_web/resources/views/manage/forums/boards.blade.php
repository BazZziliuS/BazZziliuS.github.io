<x-manage>
    <div class="page-title">
        <h1 class="font-weight-bold text-lg">Boards <smalL>Manage Boards</smalL></h1>
    </div>

    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Create new board</h6>
        </div>
        <div class="card-body">
            <form action="{{route('manage.forums.boards.store')}}" method="post" id="create-board">
                @csrf

                <div class="row">
                    <div class="col-md-4 mb-3">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="name">Board Name</label>
                            </div>
                            <input type="text" class="form-control bg-light border-0 small" id="name"
                                   placeholder="Announcements" name="name" value="{{old('name')}}">
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="icon">Board Icon</label>
                            </div>
                            <input type="text" class="form-control bg-light border-0 small" id="icon"
                                   placeholder="fad fa-server" name="icon" value="{{old('icon') ?? 'fad fa-server'}}">
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="color">Board Color</label>
                            </div>
                            <input type="text" class="form-control bg-light border-0 small" id="color"
                                   placeholder="#3F51B5" name="color" value="{{old('color') ?? '#3F51B5'}}">
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="description">Board Description</label>
                            </div>
                            <input type="text" class="form-control bg-light border-0 small" id="description"
                                   placeholder="This is the most awesome board there is" name="description"
                                   value="{{old('description')}}">
                            <div class="input-group-append">
                                <span class="input-group-text" id="description">Optional</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="input-group">
                            <select class="custom-control custom-select" name="category">
                                <option value="00" selected disabled>Board Category</option>

                                @foreach($categories as $category)
                                    <option>{{$category->name}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>

                <label class="font-weight-bold mt-3">
                    Roles
                </label>
                <small>These are roles that can post inside the board.</small>
                @foreach($roles as $role)
                    <div class="custom-control custom-checkbox">
                        <input class="custom-control-input" type="checkbox" value="{{$role->name}}"
                               id="check-{{$role->id}}" name="roles[]" checked>
                        <label class="custom-control-label" for="check-{{$role->id}}">
                            {{$role->display_name}}
                        </label>
                    </div>
                @endforeach
            </form>
        </div>
        <div class="card-footer">
            <button type="submit" form="create-board" class="btn btn-primary btn-icon-split">
                <span class="icon text-white-50">
                  <i class="fad fa-check"></i>
                </span>
                <span class="text">Submit</span>
            </button>
        </div>
    </div>

    @if($boards->has(''))
        @foreach($categories as $cat)
            <div class="cat-title my-3">
                <h5>{{$cat->name}}</h5>
            </div>

            <div id="nested-{{$cat->id}}" class="row">
                <div id="nested-list-{{$cat->id}}" class="list-group col nested-sortable">
                    @include('manage.forums.includes.sortable', ['boardsCol' => $boards->get('', [])])
                </div>
            </div>
        @endforeach
    @else
        <div class="cat-title my-3">
            <h5>No boards exist</h5>
        </div>
    @endif

    <x-slot name="scripts">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.10.2/Sortable.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery-sortablejs@latest/jquery-sortable.js"></script>

        <script>
            $(document).ready(function() {
                var sortables = [].slice.call(document.querySelectorAll('.nested-sortable-1'));

                for (var i = 0; i < sortables.length; i++) {
                    $(sortables[i]).sortable({
                        group: 'nested-4',
                        animation: 150,
                        fallbackOnBody: true,
                        swapThreshold: 0.1,
                        onEnd: function (sortable) {
                            const newParent = sortable.item.parentElement.parentElement;
                            const oldParent = sortable.target.parentElement;
                            const item = sortable.item;
                            if (typeof (item) === 'undefined' || !item.dataset.id) return;

                            let boardId = item.dataset.id;
                            if (!boardId) return;

                            if (newParent && oldParent && newParent.dataset['id'] === oldParent.dataset['id']) return;

                            Axios.patch('{{ route('manage.forums.boards.sort') }}', {
                                boardId,
                                parentId: newParent.dataset['id']
                            }).then(function () {
                                location.reload();
                            }).catch(function () {
                                toastr.error('An error occurred while trying to sort the boards.');
                            });
                        }
                    })
                }
            });
        </script>
    </x-slot>
</x-manage>
