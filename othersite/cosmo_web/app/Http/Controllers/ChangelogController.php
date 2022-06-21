<?php

namespace App\Http\Controllers;

use App\Models\Changelog;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ChangelogController extends Controller
{
    public function __construct()
    {
        $this->middleware(function(Request $request, Closure $next) {
            if (!config('cosmo.configs.changelogs_enabled', false)) {
                abort(404);
            }

            return $next($request);
        });
    }

    public function __invoke()
    {
        $paginator = Changelog::with('labels')
            ->orderByDesc('created_at')
            ->paginate(8);

        $changes = collect($paginator->items())->groupBy(function (Changelog $item) {
            return $item->created_at->toDateString();
        })->keyBy(function($item, $key) {
            return Carbon::make($key)->settings([
                'locale' => config('app.locale'),
                'timezone' => config('app.timezone')
            ])->toFormattedDateString();
        });

        return view('changelogs.index', [
            'paginator' => $paginator,
            'changes' => $changes
        ]);
    }
}