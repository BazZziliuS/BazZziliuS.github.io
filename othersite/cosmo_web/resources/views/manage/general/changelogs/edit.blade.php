<x-manage>
    <form action="{{ route('manage.general.changelogs.update', $changelog->id) }}" method="post">
        @csrf
        @method('PATCH')

        <div class="page-title row justify-content-between">
            <h1 class="col-auto font-weight-bold text-lg">Changelogs <smalL>Creating Changelog</smalL></h1>

            <button type="submit" class="col-auto btn btn-primary btn-icon-split btn-sm mr-3">
                <span class="icon text-white-50">
                  <i class="fad fa-check"></i>
                </span>
                <span class="text">Update Changelog</span>
            </button>
        </div>

        <div class="container mt-5">
            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" class="form-control" id="title" name="title" value="{{ $changelog->title }}">
            </div>


            <div class="mb-3">
                <label class="form-label">Labels</label>

                <div x-data="{ labels: JSON.parse('{{ json_encode($changelog->labels) }}') }">

                    <div class="d-flex">
                        <div class="dropdown show mr-3" x-show="getAvailableLabels(labels).length > 0">
                            <a class="btn btn-secondary dropdown-toggle btn-circle" data-toggle="dropdown">
                                +
                            </a>

                            <div class="dropdown-menu" style="background: #2f3237">
                                <template x-for="(label, i) in getAvailableLabels(labels)" :key="i">
                                    <a class="dropdown-item" x-text="label.name" @click="labels.push(label)"></a>
                                </template>
                            </div>
                        </div>

                        <template x-for="(label, i) in labels" :key="i">
                            <div class="d-inline my-auto">
                                <input type="hidden" name="labels[]" :value="label.id"/>

                                <span class="badge badge-pill border mr-1 p-2" @click="delete labels[i]"
                                      :style="`background-color: ${label.color}2C; color: ${label.color}; border-color: ${label.color}!important;`">
                                    <i class="fad fa-times-circle"></i>
                                    <span x-text="label.name"></span>
                                </span>
                            </div>
                        </template>
                    </div>

                </div>
            </div>

            <div class="mb-3">
                <label for="content" class="form-label">Content</label>
                <textarea name="content" id="content">
                    {{ $changelog->content }}
                </textarea>
            </div>
        </div>
    </form>

    <x-slot name="scripts">
        <script src="{{ asset('js/tinymce.js') }}"></script>
        <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>

        <script>
            const labels = @json($labels);

            function getAvailableLabels(curLabels) {
                return labels.filter(function(label) {
                    for (let curLabel of curLabels) {
                        if (curLabel && label.id === curLabel.id) return false;
                    }

                    return true;
                });
            }
        </script>
    </x-slot>
</x-manage>