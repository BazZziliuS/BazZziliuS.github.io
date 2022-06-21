<?php

namespace App\Http\Controllers\Manage\General;

use App\Http\Controllers\Controller;
use App\Models\Configuration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SettingsController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:manage-settings');
    }

    public function index($category)
    {
        $categories = Cache::rememberForever('settings-categories', function () {
            return Configuration::query()
                ->whereNotNull('category')
                ->groupBy('category')->get(['category'])
                ->sortBy('id')
                ->map(function ($config) {
                    return Str::of($config->category)->before('.')->title();
                })->unique()->keyBy(function ($value) {
                    return Str::lower($value);
                });
        });

        $configurations = Configuration::query()
            ->where('category', 'like', "%$category%")
            ->get()->groupBy('category')
            ->keyBy(function ($val, $key) use ($category) {
                return Str::of($key)->after('.')->title();
            });

        return view('manage.general.settings', [
            'activeCategory' => $category,
            'categories' => $categories,
            'configurations' => $configurations
        ]);
    }

    public function save(Request $request, $category)
    {
        Configuration::query()
            ->where('category', 'like', "%$category%")
            ->get()->each(function ($config) use ($request) {
                $config->update([
                    'value' => $request->has($config->key) ? $request->input($config->key) : null
                ]);
            });

        Cache::forget('configurations');

        toastr()->success('Successfully updated the application settings!');
        return redirect()->back();
    }
}
