<?php

namespace App\Http\Controllers\Manage\Index;

use App\Http\Controllers\Controller;
use App\Models\Configuration;
use Igaster\LaravelTheme\Facades\Theme;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\View\View;

/**
 * Class ThemeController
 * @package App\Http\Controllers\Manage\Index
 */
class ThemeController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:manage-theme');
    }

    /**
     * @return Application|Factory|View
     */
    public function index()
    {
        $themes = Theme::all();
        $current = config('cosmo.configs.active_theme', config('themes.default'));

        return view('manage.index.theme', compact('themes', 'current'));
    }

    /**
     * @param $theme
     * @return RedirectResponse|void
     */
    public function update($theme)
    {
        if(!Theme::exists($theme)) {
            abort(404);
        }

        Configuration::firstWhere('key', 'active_theme')->update([
            'value' => $theme
        ]);

        toastr()->success('Successfully updated the theme!');
        return redirect()->route('manage.index.theme');
    }
}
