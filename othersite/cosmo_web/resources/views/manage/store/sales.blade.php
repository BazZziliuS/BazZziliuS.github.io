<x-manage>
    <div class="page-title">
        <h1 class="font-weight-bold text-lg">Sales <smalL>Manage Sales</smalL></h1>
    </div>

    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Create new sale</h6>
        </div>
        <div class="card-body">
            <form action="{{route('manage.store.sales.store')}}" method="post" id="create-sale">
                @csrf

                <div class="row">
                    <div class="col">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="title">Sale Title</label>
                            </div>
                            <input type="text" class="form-control bg-light border-0 small" id="title" placeholder="Summer Sale" name="title" value="{{old('title')}}">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group">
                                <label class="input-group-text" for="percentage">Sale Percentage</label>
                            <input type="number" min="0" max="100" class="form-control bg-light border-0 small" id="percentage" placeholder="50" name="percentage" value="{{old('percentage')}}">
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col">
                        <label class="font-weight-bold mb-0" for="package-select">Packages</label><br>

                        <select name="_packages" id="package-select" class="selectpicker mt-2" multiple data-live-search="true" data-width="100%">
                            @foreach($packages as $id => $name)
                                <option value="{{$id}}">{{$name}}</option>
                            @endforeach
                        </select>

                        <input type="hidden" name="packages" id="packages">
                    </div>
                    <div class="col">
                        <label class="font-weight-bold mb-0" for="starts_at">Start Date</label><br>

                        <input id="starts_at" class="form-control mt-2 date-picker" type="text" name="starts_at">
                    </div>
                    <div class="col">
                        <label class="font-weight-bold mb-0" for="ends_at">End Date</label><br>

                        <input id="ends_at" class="form-control mt-2 date-picker" type="text" name="ends_at">
                    </div>
                </div>
            </form>
        </div>
        <div class="card-footer">
            <button type="submit" form="create-sale" class="btn btn-primary btn-icon-split">
                <span class="icon text-white-50">
                  <i class="fad fa-check"></i>
                </span>
                <span class="text">Submit</span>
            </button>
        </div>
    </div>

    <div class="row mt-3">
        @foreach($sales as $sale)
            <div class="modal fade" id="edit-{{$sale->id}}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Editing Sale: {{$sale->title}}</h5>
                        </div>
                        <div class="modal-body">
                            <form id="form-{{$sale->id}}" action="{{route('manage.store.sales.update', $sale->id)}}" method="post">
                                @csrf
                                @method('PATCH')

                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="title">Title</label>
                                    </div>
                                    <input type="text" class="form-control bg-light border-0 small" id="title" placeholder="Summer Sale" name="title" value="{{$sale->title}}">
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="code">Percentage</label>
                                    </div>
                                    <input type="number" min="0" max="100" class="form-control bg-light border-0 small" id="percentage" placeholder="50" name="percentage" value="{{$sale->percentage}}">
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="code">Packages</label>
                                    </div>

                                    <select name="_packages" title="Select packages" class="form-control selectpicker package-selector" multiple data-live-search="true" data-sale-id="{{$sale->id}}">
                                        @foreach($packages as $id => $name)
                                            <option value="{{$id}}">{{$name}}</option>
                                        @endforeach
                                    </select>

                                    <input type="hidden" name="packages" id="package-{{$sale->id}}" value="{{$sale->packagesMapped}}">
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="starts_at">Start Date</label>
                                    </div>
                                    <input class="date-picker form-control border-0 bg-light" id="starts_at" type="text" name="starts_at" value="{{$sale->starts_at}}">
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="ends_at">End Date</label>
                                    </div>
                                    <input class="date-picker form-control border-0 bg-light" id="ends_at" type="text" name="ends_at" value="{{$sale->ends_at}}">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" form="form-{{$sale->id}}" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="delete-{{$sale->id}}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Deleting Sale: {{$sale->title}}</h5>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete this sale?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                            <form action="{{route('manage.store.sales.destroy', $sale->id)}}" method="post">
                                @csrf
                                @method('DELETE')

                                <button type="submit" class="btn btn-danger">Delete</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-3 mb-3">
                <div class="card shadow h-100">
                    <div class="card-body text-center">
                        <h4>{{$sale->title}}</h4>

                        <div>
                            <div class="d-inline-block">
                                <i class="fad fa-percentage"></i> {{$sale->percentage}}%
                            </div>
                            <div class="d-inline-block ml-2">
                                <i class="fad fa-alarm-clock"></i> Ends in {{$sale->timeDifference}}
                            </div>
                        </div>

                        <div class="btn-group mt-3">
                            <button class="btn btn-sm btn-circle btn-primary" data-toggle="modal" data-target="#edit-{{$sale->id}}">
                                <i class="fad fa-pencil"></i>
                            </button>

                            <button class="btn btn-sm btn-circle btn-danger" data-toggle="modal" data-target="#delete-{{$sale->id}}">
                                <i class="fad fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
    </div>

    <x-slot name="meta">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    </x-slot>

    <x-slot name="scripts">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>

        <script>
          $('#package-select').change(function () {
            $('#packages').val($('#package-select').val())
          });

          $('.package-selector').each(function() {
            const select = $(this);
            const saleId = select.data("sale-id");
            const inp = $(`#package-${saleId}`);

            if (inp.val()) {
                select.selectpicker('val', inp.val().split(','));
            }

            select.change(function() {
              inp.val(select.val());
            });
          });

          $(document).ready(function() {
            $('.date-picker').each(function(_, el) {
              $(el).flatpickr({
                enableTime: true
              });
            });
          });
        </script>
    </x-slot>
</x-manage>