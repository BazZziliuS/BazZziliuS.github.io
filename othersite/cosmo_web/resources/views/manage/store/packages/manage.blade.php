<x-manage>
    <div class="page-title row justify-content-between mb-3">
        <h1 class="col-auto font-weight-bold text-lg">Packages <smalL>Manage Packages</smalL></h1>
        <a role=button" href="{{route('manage.store.packages.create')}}" class="col-auto btn btn-success btn-icon-split btn-sm mr-3">
                <span class="icon text-white-50">
                    <i class="fad fa-check"></i>
                </span>
            <span class="text">Create Package</span>
        </a>
    </div>

    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="row">
                <div class="col">
                    <h6 class="m-0 font-weight-bold text-primary">Filter Packages</h6>
                </div>
                <div class="col">
                    <button type="submit" form="filter-packages" class="btn btn-primary btn-icon-split btn-sm float-right">
                        <span class="icon text-white-50">
                            <i class="fad fa-search"></i>
                        </span>
                        <span class="text">Filter</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <form action="{{route('manage.store.packages.filter')}}" method="get" id="filter-packages">
                <div class="row">
                    <div class="col-md-4">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="search">Search Term</label>
                            </div>
                            <input type="text" class="form-control bg-light border-0 small" id="search" placeholder="Search for packages" name="search" value="{{$searchFilter}}">
                        </div>
                    </div>
                    <div class="col-auto">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="search">Select Server</label>
                            </div>
                            <select name="_servers" class="selectpicker" id="server-select" multiple data-live-search="true">
                                @foreach($servers as $name => $id)
                                    <option value="{{$id}}" {{ in_array($id, $serverFilter) ? 'selected' : '' }}>{{$name}}</option>
                                @endforeach
                            </select>
                        </div>
                        <input type="hidden" name="servers" id="servers">
                    </div>
                    <div class="col-md-4 my-auto">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="with-disabled" value="1"
                                   name="withDisabled" {{ request('withDisabled') ? 'checked=""' : '' }}>
                            <label class="custom-control-label" for="with-disabled">
                                Show disabled
                            </label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="row justify-content-center">
        @foreach($packages as $package)
            <div class="modal fade" id="delete-{{$package->id}}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Deleting Package: {{$package->name}}</h5>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete this package?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                            <form action="{{route('manage.store.packages.destroy', $package->id)}}" method="post">
                                @csrf
                                @method('DELETE')

                                <button type="submit" class="btn btn-danger">Delete</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-3 mb-3">
                <div class="card shadow {{ $package->deleted_at ? 'deleted' : '' }}">
                    @if ($package->image)
                        <div class="card-header"
                             style="background: url('{{ $package->image }}') no-repeat center center;
                                     background-size: cover;
                                     padding: 6rem 6rem 2rem;">
                        </div>
                    @endif
                    <div class="card-body text-center">
                        <h4 class="mt-0 pt-0">{{$package->name}}</h4>
                        <small class="d-block">Price: {{$package->price}}</small>
                        <small class="d-block">Category: {{$package->category}}</small>
                        <small class="d-block">PackageID: {{$package->id}}</small>

                        <div class="btn-toolbar">
                            <a href="{{route('manage.store.packages.edit', $package->id)}}"
                               class="btn btn-primary mr-auto">Edit
                            </a>

                            @if ($package->deleted_at)
                                <form action="{{ route('manage.store.packages.enable', $package->id) }}" method="post">
                                    @csrf

                                    <button type="submit" class="btn btn-success">
                                        Enable
                                    </button>
                                </form>
                            @else
                                <a href="{{route('manage.store.packages.edit', $package->id)}}" class="btn btn-danger"
                                   data-toggle="modal" data-target="#delete-{{$package->id}}">Delete
                                </a>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
    </div>

    <x-slot name="meta">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css" />
    </x-slot>

    <x-slot name="scripts">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>

        <script>
            $('#server-select').change(function() {
                $('#servers').val($('#server-select').val())
            });
        </script>
    </x-slot>
</x-manage>