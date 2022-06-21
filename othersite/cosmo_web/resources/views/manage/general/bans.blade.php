<x-manage>
    <div class="page-title">
        <h1 class="font-weight-bold text-lg">Bans <small>Manage Bans</small></h1>
    </div>

    @if ($bans->isEmpty())
    <div class="container text-center" style="margin-top: 5rem;">
        <i class="far fa-folder-open fa-4x"></i>
        <h2 class="font-weight-bold mt-2">No bans yet</h2>
    </div>
    @else
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Reason</th>
                <th scope="col">Platforms</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($bans as $ban)
            <div class="modal fade" id="edit-{{ $ban->id }}" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <form action="{{ route('manage.general.bans.update', $ban->id) }}" method="post">
                        @method('PATCH')
                        @csrf

                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Editing Ban</h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="edit-{{ $ban->id }}-reason">Reason</label>
                                    <input type="text" class="form-control" id="edit-{{ $ban->id }}-reason"
                                           placeholder="Chargeback" name="reason" value="{{ $ban->reason }}">
                                </div>

                                <label class="mt-2">Platforms</label>
                                @foreach (['forums', 'store'] as $platform)
                                    <div class="custom-control custom-checkbox mt-2">
                                        <input type="checkbox" class="custom-control-input" name="platforms[]"
                                               id="edit-{{ $ban->id }}-platform-{{ $platform }}" value="{{ $platform }}"
                                                {{ in_array($platform, $ban->platforms) ? 'checked=""' : '' }}>
                                        <label class="custom-control-label text-capitalize"
                                               for="edit-{{ $ban->id }}-platform-{{ $platform }}">
                                            {{ $platform }}
                                        </label>
                                    </div>
                                @endforeach
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <tr>
                <th scope="row">{{ $ban->id }}</th>
                <td><a href="{{ route('users.show', $ban->user->steamid) }}">{{ $ban->user->username }}</a></td>
                <td>{{ $ban->reason }}</td>
                <td>
                    @foreach ($ban->platforms as $platform)
                        <span class="badge badge-primary text-uppercase">
                            {{ str_replace('*', 'all', $platform) }}
                        </span>
                    @endforeach
                </td>
                <td scope="row">
                    <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#edit-{{ $ban->id }}">
                        <i class="fad fa-pencil"></i>
                    </button>

                    <button class="btn btn-sm btn-danger" onclick="deleteBan({{ $ban->id }})">
                        <i class="fad fa-trash"></i>
                    </button>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    {{ $bans->links() }}
    @endif

    <x-slot name="scripts">
        <script src="//cdn.jsdelivr.net/npm/sweetalert2@10"></script>

        <script>
            function deleteBan(banId) {
                Swal.fire({
                    icon: 'error',
                    titleText: 'Deleting Ban',
                    text: 'Are you sure you want to delete this ban?',
                    showDenyButton: true,
                    showConfirmButton: false,
                    denyButtonText: 'Delete'
                }).then(function(result) {
                    console.log(result);
                    if (!result.isDenied) return;

                    Axios.delete('/manage/general/bans/' + banId)
                        .then(function() { location.reload() })
                        .catch(function() { location.reload() });
                });
            }
        </script>
    </x-slot>
</x-manage>