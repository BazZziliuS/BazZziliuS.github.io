<div class="alert fixedBar" id="alert" data-aos="fade-up" data-aos-duration="500">
    @if ($sales->count() > 1)
        <button class="btn btn-custom" id="sale-prev"><i class="fad fa-chevron-left"></i> </button>
    @endif

    @foreach($sales as $sale)
        <div class="container-fluid sales sale" data-sale-id="{{$sale->id}}">
            <div class="d-flex">
                <div class="d-inline-flex text-left mr-auto px-0">
                    <div class="content">
                        <div class="icon">
                            <span class="fa-stack fa-2x d-inline-flex">
                                <i class="fas fa-square fa-stack-2x"></i>
                                <i class="fad fa-tags fa-stack-1x"></i>
                            </span>
                        </div>
                        <div class="body">
                            <p id="count-down" class="p-0 m-0">@lang('cosmo.store.sale.time-left', ['time' => $sale->timeDifference])</p>
                            @lang('cosmo.store.sale.info', ['percentage' => $sale->percentage])
                        </div>
                    </div>
                </div>
                <div class="d-inline-flex text-right my-auto">
                    <a href="{{ route('store.index') }}" class="btn btn-custom mr-2">@lang('cosmo.store.sale.go_to_store')</a>
                    <a href="javascript:void(0)" class="close-btn my-auto">
                        <i class="fad fa-times"></i>
                    </a>
                </div>
            </div>
        </div>
    @endforeach

    @if ($sales->count() > 1)
        <button class="btn btn-custom" id="sale-next"><i class="fad fa-chevron-right"></i> </button>
    @endif
</div>