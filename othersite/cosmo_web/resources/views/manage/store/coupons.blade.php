<x-manage>
    <div class="page-title">
        <h1 class="font-weight-bold text-lg">Coupon Codes <smalL>Manage Coupons</smalL></h1>
    </div>

    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Create new coupon</h6>
        </div>
        <div class="card-body">
            <form action="{{route('manage.store.coupons.store')}}" method="post" id="create-coupon">
                @csrf

                <div class="row">
                    <div class="col">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="code">Coupon Code</label>
                            </div>
                            <input type="text" class="form-control bg-light border-0 small" id="code" placeholder="SUMMERSALE2020" name="code" value="{{old('code')}}">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="percentage">Percentage</label>
                            </div>
                            <input type="number" class="form-control bg-light border-0 small" id="percentage" placeholder="50" name="percentage" value="{{old('percentage')}}">
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col">
                        <label class="font-weight-bold mb-0" for="package-select">Packages</label><br>
                        <small>These are the packages the coupon can be used on</small><br>

                        <select name="_packages" id="package-select" class="selectpicker mt-3" multiple data-live-search="true" data-width="100%">
                            @foreach($packages as $name => $id)
                                <option value="{{$id}}">{{$name}}</option>
                            @endforeach
                        </select>

                        <input type="hidden" id="packages" name="packages"/>
                    </div>
                    <div class="col">
                        <label class="font-weight-bold mb-0" for="use_amount">Use Amount</label><br>
                        <small>The amount of time the coupon can be used, 0 for unlimited.</small><br>

                        <input type="number" min="0" id="use_amount" name="use_amount" class="form-control mt-3">
                    </div>
                    <div class="col">
                        <label class="font-weight-bold mb-0" for="start_date">Start Date</label><br>
                        <small>The coupon will become active once this date passes</small><br>

                        <input id="start_date" class="form-control mt-3 date-picker" type="text" name="starts_at">
                    </div>
                    <div class="col">
                        <label class="font-weight-bold mb-0" for="expiration_date">Expiration Date</label><br>
                        <small>After this date, the coupon will not be able to get used again</small><br>

                        <input id="expiration_date" class="form-control mt-3 date-picker" type="text" name="expires_at">
                    </div>
                </div>
            </form>
        </div>
        <div class="card-footer">
            <button type="submit" form="create-coupon" class="btn btn-primary btn-icon-split">
                <span class="icon text-white-50">
                  <i class="fad fa-check"></i>
                </span>
                <span class="text">Submit</span>
            </button>
        </div>
    </div>

    <div class="row">
        @foreach($coupons as $coupon)
            <div class="modal fade" id="edit-{{$coupon->id}}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Editing Coupon: <code>{{$coupon->code}}</code></h5>
                        </div>
                        <div class="modal-body">
                            <form id="form-{{$coupon->id}}" action="{{route('manage.store.coupons.update', $coupon->id)}}" method="post">
                                @csrf
                                @method('PATCH')

                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="code">Coupon Code</label>
                                    </div>
                                    <input type="text" class="form-control bg-light border-0 small" id="code" placeholder="SUMMER" name="code" value="{{$coupon->code}}">
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="code">Percentage</label>
                                    </div>
                                    <input type="number" min="0" max="100" class="form-control bg-light border-0 small" id="percentage" placeholder="50" name="percentage" value="{{$coupon->percentage}}">
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="code">Packages</label>
                                    </div>
                                    <select name="_packages" id="package-select" title="Select packages" class="form-control selectpicker package-selector" data-coupon-id="{{$coupon->id}}" multiple data-live-search="true">
                                        @foreach($packages as $name => $id)
                                            <option value="{{$id}}">{{$name}}</option>
                                        @endforeach
                                    </select>

                                    <input type="hidden" name="packages" id="package-{{$coupon->id}}" value="{{$coupon->packagesMapped}}" />
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="use_amount">Use Amount</label>
                                    </div>
                                    <input type="number" min="0" class="form-control bg-light border-0 small" id="use_amount" placeholder="50" name="use_amount" value="{{$coupon->use_amount}}">
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="starts_at">Start Date</label>
                                    </div>
                                    <input class="date-picker form-control border-0 bg-light" id="starts_at" type="text" name="starts_at" value="{{$coupon->starts_at}}">
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="expires_at">Expiration Date</label>
                                    </div>
                                    <input class="date-picker form-control border-0 bg-light" id="expires_at" type="text" name="expires_at" value="{{$coupon->expires_at}}">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" form="form-{{$coupon->id}}" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="delete-{{$coupon->id}}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Deleting Coupon: <code>{{$coupon->code}}</code></h5>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete this coupon?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                            <form action="{{route('manage.store.coupons.destroy', $coupon->id)}}" method="post">
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
                        <h4><code>{{$coupon->code}}</code></h4>

                        <div>
                            <div class="d-inline-block">
                                <i class="fad fa-clock"></i> {{$coupon->uses->count()}} uses
                            </div>
                            <div class="d-inline-block ml-2">
                                <i class="fad fa-alarm-clock"></i> {{$coupon->timeDifference}}
                            </div>
                        </div>

                        <div class="btn-group mt-3">
                            <button class="btn btn-sm btn-circle btn-primary" data-toggle="modal" data-target="#edit-{{$coupon->id}}">
                                <i class="fad fa-pencil"></i>
                            </button>

                            <button class="btn btn-sm btn-circle btn-danger" data-toggle="modal" data-target="#delete-{{$coupon->id}}">
                                <i class="fad fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
    </div>

    <x-slot name="meta">
        <!-- TODO: add these to public folder -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    </x-slot>

    <x-slot name="scripts">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>

        <script>
            // Active date pickers
            $(document).ready(function() {
              $('.date-picker').each(function(_, el) {
                $(el).flatpickr({
                  enableTime: true
                });
              });
            });

            $('#package-select').change(function () {
              $('#packages').val($('#package-select').val())
            });

            $('.package-selector').each(function() {
              const select = $(this);
              const couponId = select.data("coupon-id");
              const inp = $(`#package-${couponId}`);

              if (inp.val()) {
                select.selectpicker('val', inp.val().split(','));
              }

              select.change(function() {
                inp.val(select.val());
              });
            });
        </script>
    </x-slot>
</x-manage>