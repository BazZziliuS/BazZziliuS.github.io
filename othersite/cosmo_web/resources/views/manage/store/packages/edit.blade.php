<x-manage>
    <div class="page-title">
        <h1 class="font-weight-bold text-lg">Editing Package <smalL>{{$package->name}}</smalL></h1>
    </div>

    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Edit Package</h6>
        </div>
        <div class="card-body">
            <form action="{{route('manage.store.packages.update', $package->id)}}" method="post" id="create-package">
                @csrf
                @method('PATCH')

                <div class="row">
                    <div class="col-md-4">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="name">Package Name</label>
                            </div>
                            <input type="text" class="form-control bg-light border-0 small" id="name" placeholder="VIP" name="name" value="{{$package->name}}">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="price">Package Price</label>
                            </div>
                            <input type="text" class="form-control bg-light border-0 small" id="price" placeholder="$5.00" name="price" value="{{$package->price}}">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="image">Package Image</label>
                            </div>
                            <input type="text" class="form-control bg-light border-0 small" id="image" placeholder="https://i.imgur.com/JYCysVw.jpg" name="image" value="{{$package->image}}">
                        </div>
                    </div>
                    <div class="col-md-2 mt-3">
                        <label class="font-weight-bold" for="server-select">Servers</label><br>
                        <select name="_servers" id="server-select" class="selectpicker" multiple data-live-search="true">
                            @foreach($servers as $name => $id)
                                <option value="{{$id}}" {{ $package->servers->contains($id) ? 'selected=""' : '' }}>{{$name}}</option>
                            @endforeach
                        </select>
                        <input type="hidden" name="servers" id="servers" value="{{$package->servers->values()->join(',')}}">
                    </div>
                    <div class="col-md-2 mt-3">
                        <label class="font-weight-bold" for="category">Category</label><br>
                        <input type="text" id="category" name="category" class="form-control mb-4" placeholder="Ranks" value="{{$package->category}}">
                    </div>
                </div>

                <div class="mt-3">
                    <label for="description" class="font-weight-bold">Package Description</label>
                    <textarea id="description" name="description">{!! $package->description !!}</textarea>
                </div>

                <div class="mt-3">
                    <div class="font-weight-bold">Package Options</div>

                    <div class="custom-control custom-checkbox mt-2">
                        <input type="checkbox" class="custom-control-input" id="permanent" name="permanent" value="1" {{ $package->permanent ? 'checked=""' : '' }}>
                        <label class="custom-control-label" for="permanent">Permanent Package</label>
                    </div>

                    <div class="custom-control custom-checkbox mt-2">
                        <input type="checkbox" class="custom-control-input" id="rebuyable" name="rebuyable" value="1" {{ $package->rebuyable ? 'checked=""' : '' }}>
                        <label class="custom-control-label" for="rebuyable">Can buy more than once</label>
                    </div>

                    <div class="custom-control custom-checkbox mt-2">
                        <input type="checkbox" class="custom-control-input" id="custom_price" name="custom_price" value="1" {{ $package->custom_price ? 'checked=""' : '' }}>
                        <label class="custom-control-label" for="custom_price">Custom Price</label>
                    </div>
                </div>

                <div class="mt-3" id="expires_after_div">
                    <label class="font-weight-bold" for="expires_after">Expires After (in days, not needed if the package is permanent)</label><br>
                    <input class="form-control border-0 bg-light" id="expires_after" type="number" name="expires_after" min="0" value="{{ $package->expires_after }}">
                </div>

                <div class="mt-3">
                    <label class="font-weight-bold">Package Actions</label>

                    <div class="accordion" id="actions-accordion">
                        @foreach(config('cosmo.actions') as $id => $action)
                            <div class="action-collapse" id="action-accordion-{{ $id }}">
                                <input type="hidden" name="action-{{ $id }}-check" class="action-check"
                                    value="{{ isset($package->actions[$id]) ? '1' : '0' }}"/>

                                <a class="cursor d-inline-flex card-header accordion__ w-100 mb-2"
                                   data-toggle="collapse" data-target="#action-{{ $id }}" aria-controls="action-{{ $id }}"
                                   aria-expanded="{{ isset($package->actions[$id]) ? 'true' : 'false' }}">
                                    <div class="my-auto d-inline-flex">
                                        <p class="card-title text-white mb-0 pb-0">
                                            <i class="fas fa-chevron-right mr-3"></i>{{ ucwords($id) }}
                                        </p>
                                    </div>
                                </a>
                                <div id="action-{{ $id }}" class="collapse {{ isset($package->actions[$id]) ? 'show' : '' }}"
                                     data-parent="#action-accordion-{{ $id }}">
                                    <div class="card-body">
                                        <x-dynamic-component :component="$action['component']" :action="isset($package->actions[$id]) ? $package->actions[$id] : null" />
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </form>
        </div>
        <div class="card-footer">
            <button type="submit" form="create-package" class="btn btn-primary btn-icon-split">
                <span class="icon text-white-50">
                  <i class="fad fa-check"></i>
                </span>
                <span class="text">Submit</span>
            </button>
        </div>
    </div>

    <x-slot name="meta">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css" />
    </x-slot>

    <x-slot name="scripts">
        <script src="{{ asset('js/tinymce.js') }}"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>

        <script>
            $(document).ready(function() {
                const permanent = document.getElementById('permanent');
                if (permanent.checked) {
                    $('#expires_after_div').hide();
                }

                $(permanent).change(function() {
                    if (this.checked) {
                        $('#expires_after_div').hide();
                    } else {
                        $('#expires_after_div').show();
                    }
                });

                $('#server-select').change(function() {
                    $('#servers').val($('#server-select').val())
                });

                $('.action-collapse')
                    .on('show.bs.collapse', function() {
                        $(this).find('input.action-check').val('1');
                    })
                    .on('hide.bs.collapse', function() {
                        $(this).find('input.action-check').val('0');
                    });
            });
        </script>
    </x-slot>
</x-manage>