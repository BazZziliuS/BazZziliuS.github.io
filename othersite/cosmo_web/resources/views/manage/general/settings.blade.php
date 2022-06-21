<x-manage>
    <div class="container-fluid" id="settings">
        <div class="page-title row justify-content-between">
            <h1 class="col-auto font-weight-bold text-lg">Settings <smalL>Manage Site Meta</smalL></h1>
            <button type="submit" class="col-auto btn btn-primary btn-icon-split btn-sm mr-3" form="settings-form">
                <span class="icon text-white-50">
                  <i class="fad fa-check"></i>
                </span>
                <span class="text">Save Settings</span>
            </button>
        </div>

        <div class="my-4">
            <ul class="nav mb-4">
                @foreach($categories as $category => $name)
                    <li class="nav-item btn-primary">
                        @if($category !== $activeCategory)
                            <a class="nav-link"
                               href="{{ route('manage.general.settings', $category) }}">{{ $name }}
                            </a>
                        @else
                            <a class="nav-link active" href="#">{{ $name }}</a>
                        @endif
                    </li>
                @endforeach
            </ul>

            <div id="accordion">
                <form action="{{ route('manage.general.settings.save', $activeCategory) }}" method="POST"
                      id="settings-form">
                    @csrf
                    @method('PATCH')

                    @foreach($configurations as $category => $configs)
                        <article class="card mb-3 accord shadow">
                            <a class="card-header border-bottom category-name" id="heading-{{ $loop->index }}"
                               data-toggle="collapse"
                               data-target="#collapse-{{ $loop->index }}" aria-expanded="true"
                               aria-controls="collapse-{{ $loop->index }}">
                                <h5 class="mb-0 font-weight-bold">{{ $category ?? 'Uncategorized' }}</h5>
                            </a>

                            @foreach($configs as $configuration)
                                <div id="collapse-{{ $loop->parent->index }}"
                                     class="collapse {{ $loop->parent->first ? 'show' : '' }}"
                                     aria-labelledby="heading-{{ $loop->parent->index }}" data-parent="#accordion">

                                    <div class="card-body">
                                        <h6 class="config-name">{!! $configuration->display_name !!}</h6>

                                        <x-configuration :configuration="$configuration"/>
                                    </div>
                                </div>
                            @endforeach
                        </article>
                    @endforeach
                </form>
            </div>
        </div>
    </div>

    <x-slot name="scripts">
        <script src="{{ asset('js/tinymce.js') }}"></script>
    </x-slot>
</x-manage>