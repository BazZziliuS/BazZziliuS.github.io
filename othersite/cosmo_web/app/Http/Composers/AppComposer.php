<?php

namespace App\Http\Composers;

use App\Models\Index\FooterLink;
use App\Models\Index\NavLink;
use App\Models\Store\Sale;
use Carbon\Carbon;
use Igaster\LaravelTheme\Facades\Theme;
use Illuminate\Support\Facades\Cache;
use Illuminate\View\View;

class AppComposer
{
    public function compose(View $view)
    {
        $viewName = request()->path();
        if (preg_match('/^(manage|install)/', $viewName) ||
            str_starts_with($view->getName(), 'errors')) {
            return;
        }

        $view->with('configs', config('cosmo.configs'));

        $navlinks = Cache::rememberForever('navlinks', function() {
            return NavLink::all()->groupBy('category');
        });
        $view->with('navlinks', $navlinks);

        $footerlinks = Cache::rememberForever('footerlinks', function() {
           return FooterLink::all()->groupBy('category');
        });
        $view->with('footerlinks', $footerlinks);

        $sales = Cache::remember('active_sales', 60, function() {
            return Sale::where('ends_at', '>', Carbon::now())->get();
        });
        $view->with('sales', $sales);

        $view->with('themes', Theme::all());
        $view->with('active_theme', Theme::current());

        $view->with('currency', config('cosmo.currencies')[config('cosmo.configs.store_currency', 'USD')]);
    }
}
