<x-manage>
    <div class="page-title">
        <h1 class="font-weight-bold text-lg">Users <small>Browse Users</small></h1>
    </div>

    <div class="row justify-content-center mb-2">
        <div class="col-md-6">
            <form action="{{route('manage.general.users.search')}}" method="POST">
                @csrf
                <div class="input-group">
                    <input type="text" class="form-control bg-white border-0 small" placeholder="Search user"
                           name="search" value="{{request()->get('search')}}">
                    <div class="input-group-append">
                        <button class="btn btn-primary" type="submit">
                            <i class="fad fa-search fa-sm"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="card shadow mb-4 mt-3">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">All Users</h6>
        </div>
        <div class="card-body">
            @if(!$users->isEmpty())
                <div class="table-responsive">
                    <table class="table mb-2">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Steam Name</th>
                            <th scope="col">SteamID</th>
                            <th scope="col">Rank</th>
                            <th scope="col">Created</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($users as $user)
                            <!-- Edit Modal -->
                            <div class="modal fade" id="edit-{{$user->id}}" tabindex="-1" role="dialog"
                                 aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Editing User: {{$user->username}}</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <form id="form-{{$user->id}}"
                                                  action="{{ route('manage.general.users.update', $user->steamid) }}"
                                                  method="post">
                                                @csrf
                                                @method('PATCH')

                                                <div class="form-row">
                                                    <div class="form-group col-md-6">
                                                        <div class="input-group mb-2">
                                                            <div class="input-group-prepend">
                                                                <label class="input-group-text"
                                                                       for="username">Username</label>
                                                            </div>
                                                            <input id="username" type="text" class="form-control"
                                                                   value="{{ $user->username }}"
                                                                   aria-label="Username" name="username"
                                                                   aria-describedby="Username">
                                                        </div>
                                                    </div>
                                                    <div class="form-group col-md-6">
                                                        <div class="input-group mb-2">
                                                            <div class="input-group-prepend">
                                                                <label class="input-group-text" for="name">Role</label>
                                                            </div>
                                                            <select class="form-control" name="role" id="name">
                                                                @foreach($roles as $role)
                                                                    <option {{$user->role->id === $role->id ? 'selected': ''}}
                                                                            value="{{ $role->id }}">{{$role->name}}</option>
                                                                @endforeach
                                                            </select>
                                                        </div>
                                                    </div>

                                                </div>


                                                <div class="input-group mb-2">
                                                    <div class="input-group-prepend">
                                                        <label class="input-group-text"
                                                               for="avatarURL">AvatarURL</label>
                                                    </div>
                                                    <input id="avatarURL" type="text" class="form-control"
                                                           value="{{ $user->avatar }}" aria-label="AvatarURL"
                                                           name="avatar" aria-describedby="AvatarURL">
                                                </div>


                                                <h4 class="card-title text-muted mt-3 mb-1">Profile</h4>
                                                <div class="input-group mb-2">
                                                    <div class="input-group-prepend">
                                                        <label class="input-group-text"
                                                               for="backgroundURL">BackgroundURL</label>
                                                    </div>
                                                    <input id="backgroundURL" type="text" class="form-control"
                                                           value="{{ $user->profile->background_img }}"
                                                           aria-label="backgroundURL" name="background_img"
                                                           aria-describedby="backgroundURL">
                                                </div>

                                                <div class="mb-2">
                                                    <label class="font-weight-bold" for="signature">Signature</label>
                                                    <textarea class="form-control" name="signature" id="signature">
                                                        {{ $user->profile->signature }}
                                                    </textarea>
                                                </div>

                                                <div class="mb-2">
                                                    <label class="font-weight-bold" for="bio">BIO</label>
                                                    <textarea class="form-control" name="bio" id="bio">
                                                        {{ $user->profile->bio }}
                                                    </textarea>
                                                </div>

                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close
                                            </button>
                                            <button type="submit" form="form-{{$user->id}}" class="btn btn-primary">Save
                                                changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Assign Modal -->
                            <div class="modal fade" id="assign-{{$user->id}}" tabindex="-1" role="dialog"
                                 aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Assigning Package To: {{$user->username}}</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <form action="{{ route('manage.general.users.assign', $user->steamid) }}"
                                              method="post">
                                            @csrf

                                            <div class="modal-body">
                                                <div class="input-group mb-2">
                                                    <div class="input-group-prepend">
                                                        <label class="input-group-text"
                                                               for="package">Package Name</label>
                                                    </div>
                                                    <select id="package" class="form-control" name="package">
                                                        @foreach($packages as $id => $name)
                                                            <option value="{{ $id }}">{{ $name }} (ID: {{ $id }})
                                                            </option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                                    Close
                                                </button>
                                                <button type="submit" class="btn btn-primary">Assign</button>
                                            </div>
                                        </form>
                                        <code>Note: This will not affect your monthly goal!</code>
                                    </div>
                                </div>
                            </div>

                            <!-- Ban Modal -->
                            <div class="modal fade" id="ban-{{ $user->id }}" tabindex="-1" role="dialog">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <form action="{{ route('manage.general.bans.store', $user->steamid) }}" method="post">
                                        @csrf

                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title">Banning user: {{ $user->username }}</h5>
                                                <button type="button" class="close" data-dismiss="modal">
                                                    <span>&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="form-group">
                                                    <label for="ban-{{ $user->id }}-reason">Reason</label>
                                                    <input type="text" class="form-control" id="ban-{{ $user->id }}-reason"
                                                           placeholder="Chargeback" name="reason">
                                                </div>

                                                <label class="mt-2">Platforms</label>
                                                @foreach (['forums', 'store'] as $platform)
                                                    <div class="custom-control custom-checkbox mt-2">
                                                        <input type="checkbox" class="custom-control-input" name="platforms[]"
                                                               id="ban-{{ $user->id }}-platform-{{ $platform }}" value="{{ $platform }}">
                                                        <label class="custom-control-label text-capitalize"
                                                               for="ban-{{ $user->id }}-platform-{{ $platform }}">
                                                            {{ $platform }}
                                                        </label>
                                                    </div>
                                                @endforeach
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="submit" class="btn btn-danger">Ban User</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <!-- Table Rows -->
                            <tr>
                                <th scope="row">{{ $user->id }}</th>
                                <th scope="row">{{ $user->username }}</th>
                                <th scope="row">{{ $user->steamid }}</th>
                                <th scope="row">
                                    <color style="color: {{ $user->role->color }}">{{ $user->role->display_name }}</color>
                                </th>
                                <th scope="row">{{ $user->created_at->diffForHumans() }}</th>
                                <th scope="row">
                                    <button class="btn btn-sm btn-primary" data-toggle="modal"
                                            data-target="#edit-{{$user->id}}"
                                            data-tippy-content="Edit User">
                                        <i class="fad fa-pencil"></i>
                                    </button>

                                    <button class="btn btn-sm btn-info" data-toggle="modal"
                                            data-target="#assign-{{$user->id}}"
                                            data-tippy-content="Assign Package">
                                        <i class="fad fa-gift"></i>
                                    </button>

                                    <button class="btn btn-sm btn-danger" data-toggle="modal"
                                            data-target="#ban-{{$user->id}}"
                                            data-tippy-content="Ban User">
                                        <i class="fad fa-ban"></i>
                                    </button>
                                </th>

                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
                {{ $users->links() }}
            @else
                <div class="text-center mt-5">
                    <h1>No users found</h1>
                </div>
            @endif
        </div>
    </div>

    <x-slot name="scripts">
        <script src="{{ asset('js/tinymce.js') }}"></script>
    </x-slot>
</x-manage>

