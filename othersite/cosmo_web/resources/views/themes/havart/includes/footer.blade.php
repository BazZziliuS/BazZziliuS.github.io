<div class="page-footer footer py-4 pt- mt-5" id="footer">
    <div class="container text-center text-md-left">
        <div class="row">
            <div class="col-md-5 mt-3">
                <h6 class="text-uppercase title">{{$configs['footer_title']}}</h6>
                <p class="mb-0 desc">{{$configs['footer_description']}}</p>
            </div>

            @foreach($footerlinks as $cat => $links)
                <div class="col-md-2 mb-md-0 mb-3">
                    <h6 class="text-white category">{{$cat}}</h6>
                    <ul class="list-unstyled">
                        @foreach($links as $link)
                            <li class="footer-link"><a href="{{$link->url}}" class="text-white-50">{{$link->name}}</a></li>
                        @endforeach
                    </ul>
                </div>
            @endforeach

            @include('includes.theme-select')
        </div>

        @if(config('cosmo.general.show_copyright') || config('cosmo.general.show_credits'))
            <div class="copyright mb-0 pb-0 mt-2">
                <div class="row justify-content-between">
                    @if(config('cosmo.general.show_copyright'))
                        <div class="col-auto">
                            <p class="mb-0 pb-0">@lang('cosmo.core.licensed_to', ['licensee' => $configs['site_name']])!</p>
                        </div>
                    @endif
                    @if(config('cosmo.general.show_credits'))
                        <div class="col-auto">
                            <p class="mb-0 pb-0">Designed By <b>Havasu</b>, @lang('cosmo.core.created_by', ['author' => 'TBDScripts']) {{ date('Y') }}</p>
                        </div>
                    @endif
                </div>
            </div>
        @endif
    </div>
</div>