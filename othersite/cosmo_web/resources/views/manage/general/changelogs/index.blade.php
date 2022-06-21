<x-manage>
    <div class="page-title">
        <h1 class="font-weight-bold text-lg d-inline-flex">
            Changelogs

            <form action="{{ route('manage.general.changelogs.toggle') }}" method="post">
                @csrf

                <button class="border-0 bg-transparent p-0 ml-2">
                    @if ((bool) config('cosmo.configs.changelogs_enabled', false))
                        <span class="badge bg-success text-white">
                            <i class="fas fa-check mr-1"></i>
                            Enabled
                        </span>
                    @else
                        <span class="badge bg-danger text-white">
                            <i class="fas fa-times mr-1"></i>
                            Disabled
                        </span>
                    @endif
                </button>
            </form>
        </h1>
    </div>

    <div class="container" x-data="{ creating: false, open: false }">
        <div class="card shadow my-4">
            <div class="card-header py-3">
                <div class="row justify-content-between mx-1">
                    <h6 class="m-0 font-weight-bold text-primary my-auto">
                        <i class="fas" :class="{ 'fa-chevron-right': !open, 'fa-chevron-down': open }"
                           @click="open = !open; creating = !open ? false : creating;" style="width: 16px;"></i>
                        Labels
                    </h6>
                    <button class="btn btn-sm" @click="open = open || true; creating = !creating"
                            x-text="creating ? 'Cancel' : 'Create Label'"
                            :class="{'btn-success': !creating, 'btn-secondary': creating}"></button>
                </div>
            </div>
            <div class="card-body p-0" x-show="open">
                <div x-show="creating" class="border-bottom px-4 py-3" style="border-width: 2px!important;">
                    <div x-data="{ name: '', color: randomColor() }">
                        <div class="mb-2">
                            <span x-text="name.trim() !== '' ? name : 'Label Preview'" class="badge badge-pill border"
                                  :style="`background-color: ${color}2C; color: ${color}; border-color: ${color} !important;`"></span>
                        </div>

                        <form action="{{ route('manage.general.changelogs.labels.store') }}" method="post">
                            @csrf

                            <div class="d-flex">
                                <div class="d-inline-flex w-25">
                                    <div>
                                        <label for="name">Label Name</label>
                                        <input type="text" class="form-control" id="name" name="name" x-model="name">
                                    </div>
                                </div>
                                <div class="d-inline-flex mr-3 my-auto">
                                    <div>
                                        <label for="description">Label Description</label>
                                        <input type="text" class="form-control" id="description" name="description">
                                    </div>
                                </div>
                                <div class="d-inline-flex mr-auto">
                                    <div class="h-100">
                                        <label for="color">Label Color</label>

                                        <div class="d-flex">
                                            <button class="btn btn-sm border-xl border" @click="color = randomColor()" type="button"
                                                    :style="`background-color: ${color}2C; color: ${color}; border-color: ${color} !important;`">
                                                <i class="fas fa-sync"></i>
                                            </button>

                                            <input type="text" class="form-control ml-2"
                                                   id="color" name="color" x-model="color">
                                        </div>
                                    </div>
                                </div>
                                <div class="d-inline-flex mt-auto flex-grow-1 justify-content-end" style="height: 38px">
                                    <button type="submit" class="btn btn-primary">Create</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                @foreach($labels as $label)
                    <div class="border-bottom px-4 py-3" x-data="{
                        editing: false,
                        name: '{{ $label->name }}',
                        color: '{{ $label->color }}'
                    }">
                        <template x-if="editing">
                            <div>
                                <div class="mb-2">
                                <span x-text="name.trim() !== '' ? name : 'Label Preview'" class="badge badge-pill border"
                                      :style="`background-color: ${color}2C; color: ${color}; border-color: ${color} !important;`"></span>
                                </div>

                                <form action="{{ route('manage.general.changelogs.labels.update', $label->id) }}"
                                      method="post">
                                    @csrf
                                    @method('PATCH')

                                    <div class="d-flex">
                                        <div class="d-inline-flex mr-2 my-auto">
                                            <div>
                                                <label for="name">Label Name</label>
                                                <input type="text" class="form-control" value="{{ $label->name }}"
                                                       id="name" name="name" x-model="name">
                                            </div>
                                        </div>
                                        <div class="d-inline-flex mr-2">
                                            <div>
                                                <label for="description">Label Description</label>
                                                <input type="text" class="form-control" value="{{ $label->description }}"
                                                       id="description" name="description">
                                            </div>
                                        </div>
                                        <div class="d-inline-flex flex-grow-1">
                                            <div>
                                                <label for="color">Label Color</label>

                                                <div class="d-flex">
                                                    <button class="btn btn-sm border-xl border"
                                                            @click="color = randomColor()" type="button"
                                                            :style="`background-color: ${color}2C; color: ${color};
                                                                border-color: ${color} !important;`">
                                                        <i class="fas fa-sync"></i>
                                                    </button>

                                                    <input type="text" class="ml-2 form-control" value="{{ $label->color }}"
                                                           id="color" name="color" x-model="color">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-inline-flex mt-auto" style="">
                                            <button type="button" class="btn btn-primary mr-1"
                                                    @click="editing = false">Cancel
                                            </button>
                                            <button type="submit" class="btn btn-warning">Update</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </template>
                        <template x-if="!editing">
                            <div class="row">
                                <div class="col-md-3 my-auto">
                                <span class="badge badge-pill border"
                                      style="background-color: {{ $label->color }}2C; color: {{ $label->color }};
                                              border-color: {{ $label->color }} !important;">
                                    {{ $label->name }}
                                </span>
                                </div>
                                <div class="col-md-4 my-auto">
                                    {{ $label->description ?? 'No description' }}
                                </div>
                                <div class="col-md-5 d-flex mt-auto">
                                    <div class="ml-auto">
                                        <div class="d-inline-block">
                                            <button type="button" class="btn btn-warning" @click="editing = true">
                                                Edit
                                            </button>
                                        </div>

                                        <div class="d-inline-block">
                                            <form action="{{ route('manage.general.changelogs.labels.destroy', $label->id) }}"
                                                  method="post">
                                                @csrf
                                                @method('DELETE')

                                                <button type="submit" class="btn btn-danger">Delete</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                @endforeach
            </div>
        </div>
    </div>

    <div class="container">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="row justify-content-between mx-1">
                    <h6 class="m-0 font-weight-bold text-primary my-auto">
                        Changelogs
                    </h6>
                    <form action="{{ route('manage.general.changelogs.create') }}">
                        <button class="btn btn-success btn-sm">
                            Create Changelog
                        </button>
                    </form>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table mb-2">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Labels</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        @forelse($changelogs as $i => $changelog)
                            <tr class="text-truncate">
                                <th scope="row">{{ $i }}</th>
                                <th scope="row">{{ $changelog->title }}</th>
                                <th scope="row">
                                    @forelse($changelog->labels as $label)
                                        <span class="badge py-2"
                                            style="color: {{ $label->color }}; background-color: {{ $label->color }}20">
                                            {{ $label->name }}
                                        </span>
                                    @empty
                                        <span class="badge badge-outline-danger">
                                            None
                                        </span>
                                    @endforelse
                                </th>
                                <th scope="row">{{ $changelog->created_at->diffForHumans() }}</th>
                                <th scope="row">
                                    <form class="d-inline" action="{{ route('manage.general.changelogs.edit', $changelog->id) }}">
                                        <button type="submit" class="btn btn-sm btn-warning"><i class="fad fa-pencil"></i></button>
                                    </form>
                                    <form class="d-inline" method="post"
                                          action="{{ route('manage.general.changelogs.destroy', $changelog->id) }}">
                                        @csrf
                                        @method('DELETE')

                                        <button type="submit" class="btn btn-sm btn-danger"><i class="fad fa-trash"></i></button>
                                    </form>
                                </th>
                            </tr>
                        @empty
                            <tr>
                                <th scope="row">0</th>
                                <th scope="row">Create a new changelog</th>
                                <th scope="row">None</th>
                                <th scope="row">00-00-00</th>
                                <th scope="row">##</th>
                            </tr>
                        @endforelse
                        </tbody>
                    </table>
                    {{ $changelogs->links() }}
                </div>
            </div>
        </div>
    </div>

    <x-slot name="scripts">
        <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>

        <script>
            function randomColor() {
                return '#' + Math.floor(Math.random()*16777215).toString(16);
            }
        </script>
    </x-slot>
</x-manage>