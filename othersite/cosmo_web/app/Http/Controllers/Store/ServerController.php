<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Index\Server;
use App\Models\Store\Order;
use Illuminate\Support\Facades\Cache;

class ServerController extends Controller
{
    public function index()
    {
        $servers = Server::all();

        $goalProgress = Cache::remember('store.goal', 60, function () {
            if (!(bool) config('cosmo.configs.monthly_goal_enabled', false)) {
                return null;
            }

            $goal = (float) config('cosmo.configs.monthly_goal');

            return clamp(
                (Order::completed()->sum('price') / $goal) * 100,
                0, 100
            );
        });

        $recent = Cache::remember('store.recent', 60, function () {
            return Order::completed()
                ->with('package', 'buyer')
                ->where('price', '>', 0)
                ->whereHas('package')
                ->orderByDesc('created_at')
                ->limit(5)
                ->get();
        });

        $top = Cache::remember('store.top', 60, function () {
            return Order::completed()
                ->with('package', 'buyer')
                ->select('buyer_id')
                ->selectRaw('SUM(price) AS sum')
                ->where('price', '>', 0)
                ->groupBy('buyer_id')
                ->orderByDesc('sum')
                ->get();
        });

        return view('store.index', compact('servers', 'goalProgress', 'recent', 'top'));
    }

    public function show(Server $server)
    {
        $category = request()->input('category');

        $packages = $server->packages()->with('sales', function ($query) {
            $curDate = now();

            $query->where([
                ['starts_at', '<', $curDate],
                ['ends_at', '>', $curDate],
            ])->orderByDesc('percentage');
        })->where(function($query) use ($category) {
            if (!empty($category) && $category !== 'all') {
                $query->where('category', $category);
            }
        })->get();

        $packages->each(function($item) {
            $item->sale = $item->sales->first();
        });

        $categories = Cache::remember('store-categories', 60, function() use ($server) {
            return $server->packages()
                ->whereNotNull('category')
                ->get(['category'])
                ->map(fn($item) => $item->category)
                ->unique();
        });

        return view('store.servers.show', compact('server', 'packages', 'categories'));
    }
}
