<x-manage>
    <div class="page-title">
        <h1 class="font-weight-bold text-lg">Servers <smalL>Manage Servers</smalL></h1>
    </div>

    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Create new server</h6>
        </div>
        <div class="card-body">
            <form action="{{route('manage.index.servers.store')}}" method="post" id="create-server">
                @csrf

                <div class="row">
                    <div class="col-md-4 mb-2">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="name">Server Name</label>
                            </div>
                            <input type="text" class="form-control bg-light border-0 small" id="name" placeholder="DarkRP #1" name="name" value="{{old('name')}}">
                        </div>
                    </div>
                    <div class="col-md-4 mb-2">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="icon">Server Icon</label>
                            </div>
                            <input id="icon" type="text" class="form-control bg-light border-0 small" placeholder="fad fa-server" name="icon" value="{{old('icon')}}">
                            <div class="input-group-append">
                                <span class="input-group-text" id="icon">Optional</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-2">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="color">Server Color</label>
                            </div>
                            <input id="color" type="text" class="form-control bg-light border-0 small" placeholder="#673AB7" name="color" value="{{old('color', '#673AB7')}}">
                        </div>
                    </div>
                    <div class="col-md-4 mb-2">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="type">Server Type</label>
                            </div>

                            <select class="custom-select" id="type" name="type">
                                @foreach(config('cosmo.games') as $name => $game)
                                    <option value="{{ $name }}">{{ $game['display'] ?? $name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="image">Server Image</label>
                            </div>
                            <input id="image" type="text" class="form-control bg-light border-0 small" id="name" placeholder="https://i.imgur.com/JYCysVw.jpg" name="image" value="{{old('image')}}">
                            <div class="input-group-append">
                                <span class="input-group-text" id="image">Optional</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="name">Server IP</label>
                            </div>
                            <input type="text" class="form-control bg-light border-0 small" placeholder="208.103.169.207" name="ip" value="{{ old('ip') }}">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="port">Server Port</label>
                            </div>
                            <input id="port" type="text" class="form-control bg-light border-0 small" placeholder="27015" name="port" value="{{ old('port', 27015) }}">
                        </div>
                    </div>
                    <div class="col-md-12 mt-4">
                        <label class="text-black-50 font-weight-bold" for="desc">Server Description (optional)</label>
                        <textarea id="desc" name="description" cols="5" rows="2"></textarea>
                    </div>
                </div>
            </form>
        </div>
        <div class="card-footer">
            <button type="submit" form="create-server" class="btn btn-primary btn-icon-split">
                <span class="icon text-white-50">
                  <i class="fad fa-check"></i>
                </span>
                <span class="text">Submit</span>
            </button>
        </div>
    </div>

    @if (session('server-token'))
        <div class="alert alert-success" role="alert">
            Here is the token to use for your integration: <strong>{{ session('server-token') }}</strong>
        </div>
    @endif

    <div class="row">
        @foreach($servers as $server)
            <!-- Edit -->
            <div class="modal fade" id="edit-{{$server->id}}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Editing Server: {{$server->name}}</h5>
                        </div>
                        <div class="modal-body">
                            <form id="form-{{$server->id}}" action="{{route('manage.index.servers.update', $server->id)}}" method="post">
                                @csrf
                                @method('PATCH')

                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="name">Server Name</label>
                                    </div>
                                    <input type="text" class="form-control bg-light border-0 small" id="name" placeholder="DarkRP #1" name="name" value="{{$server->name}}">
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="icon">Server Icon</label>
                                    </div>
                                    <input type="text" class="form-control bg-light border-0 small" id="icon"
                                           placeholder="fad fa-server" name="icon" value="{{$server->icon}}">
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="color">Server Color</label>
                                    </div>
                                    <input type="text" class="form-control bg-light border-0 small" id="color"
                                           placeholder="#673AB7" name="color" value="{{$server->color}}">
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="type">Server Color</label>
                                    </div>
                                    <select class="custom-select" id="type" name="type">
                                        @foreach(config('cosmo.games') as $name => $game)
                                            <option value="{{ $name }}" {{ $server->type === $name ? 'selected=""' : '' }}>
                                                {{ $game['display'] ?? $name }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="image">Server Image</label>
                                    </div>
                                    <input type="text" class="form-control bg-light border-0 small" id="image"
                                           placeholder="https://i.imgur.com/JYCysVw.jpg" name="image" value="{{$server->image}}">
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="ip">Server IP</label>
                                    </div>
                                    <input type="text" class="form-control bg-light border-0 small" id="ip"
                                           placeholder="208.103.169.207" name="ip" value="{{$server->ip}}">
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="port">Server Port</label>
                                    </div>
                                    <input type="text" class="form-control bg-light border-0 small" id="port"
                                           placeholder="27015" name="port" value="{{$server->port}}">
                                </div>

                                <label class="text-black-50 font-weight-bold" for="description">Server Description</label>
                                <textarea name="description" cols="5" rows="2" id="description">
                                    {{$server->description}}
                                </textarea>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <form action="{{ route('manage.index.servers.regenerate-token', $server->id) }}" method="POST">
                                @csrf
                                @method('PUT')

                                <button type="submit" class="btn btn-danger">Regenerate Token</button>
                            </form>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" form="form-{{$server->id}}" class="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="delete-{{$server->id}}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Deleting Server: {{$server->name}}</h5>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete this server
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                            <form action="{{route('manage.index.servers.destroy', $server->id)}}" method="post">
                                @csrf
                                @method('DELETE')

                                <button type="submit" class="btn btn-danger">Delete</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4 mb-3">
                <div class="card shadow">
                    <div class="card-header py-5" style="background: {{$server->image ? 'url(' . $server->image .')' : $server->color}} no-repeat center center;"></div>
                    <div class="card-body text-center">
                        <div class="icon mt-n5 mb-2">
                            <i class="{{$server->icon}} fa-2x p-3 rounded-circle {{$server->image ? 'text-white' : 'text-black'}}"
                               style="background-color: {{$server->image ? $server->color : '#f8f9fc'}};"></i>
                        </div>

                        <h4 class="font-weight-bold">{{$server->name}} ({{ $server->id }})</h4>
                        @if($server->description)
                            <p>{{$server->description}}</p>
                        @endif
                        <p><code>{{$server->ip}}:{{$server->port}}</code></p>

                        <div class="row">
                            <div class="col-md-12 text-center">
                                <div class="btn-group">
                                    <button class="btn btn-sm btn-circle btn-primary" data-toggle="modal" data-target="#edit-{{$server->id}}">
                                        <i class="fad fa-pencil"></i>
                                    </button>

                                    <button class="btn btn-sm btn-circle btn-danger" data-toggle="modal" data-target="#delete-{{$server->id}}">
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