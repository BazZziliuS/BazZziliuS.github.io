<?php

namespace App\Http\Controllers\Manage;

use App\Http\Controllers\Controller;
use App\Models\Forums\Board;
use App\Models\Forums\Category;
use App\Models\Forums\Thread;
use App\Models\Role;
use App\Models\Store\Package;
use App\Models\Store\Order;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:view-management');
        $this->middleware('permission:clear-cache')->only('clearCache');
        $this->middleware('permission:reinstall-app')->only('reinstall');
        $this->middleware('permission:toggle-maintenance')->only('maintenance');
        $this->middleware('permission:update-app')->only('latestVersion');
    }

    public function index()
    {
        $data = Cache::remember('dashboard-data', 2, function () {
            $today = today();
            $transCount = Order::completed()->count();

            return [
                'earnings' => [
                    'total' => Order::completed()->sum('price'),
                    'monthly' => Order::completed()->where(
                        'updated_at', '>=', $today->subMonth()
                    )->sum('price'),
                    'weekly' => Order::completed()->where(
                        'updated_at', '>=', $today->subMonth()
                    )->sum('price'),
                    'daily' => Order::completed()->where(
                        'updated_at', '>=', $today->subDay()
                    )->sum('price'),
                ],
                'store' => [
                    'packages' => Package::count(),
                    'purchases' => $transCount,
                ],
                'forums' => [
                    'categories' => Category::count(),
                    'boards' => Board::count(),
                    'threads' => Thread::count(),
                ],
                'accounts' => [
                    'users' => User::count(),
                    'roles' => Role::count(),
                ],
                'tickets' => [
                    'support' => 'N/A',
                ],

                'graphs' => [
                    'yearly' => Order::completed()
                        ->selectRaw('EXTRACT(MONTH FROM created_at) AS month')
                        ->selectRaw('SUM(price) AS total')
                        ->groupBy('month')
                        ->get()->mapWithKeys(function ($data) {
                            return [$data->month => $data->total];
                        }),
                    'monthly' => Order::completed()
                        ->selectRaw('EXTRACT(DAY FROM created_at) AS day')
                        ->selectRaw('SUM(price) AS total')
                        ->groupBy('day')
                        ->whereMonth('created_at', '=', today()->month)
                        ->get()->mapWithKeys(function ($data) {
                            return [$data->day => $data->total];
                        }),
                    'packages' => Order::completed()
                        ->with('package')
                        ->select('package_id')
                        ->selectRaw('COUNT(*) AS amount')
                        ->groupBy('package_id')
                        ->get()->map(function ($data) {
                            return [
                                'name' => !is_null($data->package) ? $data->package->name : 'Deleted Package',
                                'amount' => $data->amount
                            ];
                        })
                ]
            ];
        });

        return view('manage.dashboard', ['data' => $data])
            ->with('currency', config('cosmo.currencies')[config('cosmo.configs.store_currency', 'USD')]);
    }

    public function clearCache()
    {
        Artisan::call('cache:clear');

        toastr()->success('Successfully cleared application cache!');
        return redirect()->route('manage.dashboard');
    }

    public function reinstall()
    {
        Artisan::call('migrate:refresh', ['--force' => true, '--seed' => true]);
        Artisan::call('cache:clear');

        toastr()->success('Successfully reinstalled application!');
        return redirect()->back();
    }

    public function maintenance()
    {
        if (app()->isDownForMaintenance()) {
            Artisan::call('up');
            toastr()->success('Successfully disabled maintenance mode');
        } else {
            Artisan::call('down', ['--secret' => ($secret = Str::random(5))]);
            $secretRoute = request()->root() . '/' . $secret;
            toastr()->success("Successfully enabled maintenance mode, if you want to view your application " .
                "while in maintenance you can go to $secretRoute.");
        }
        return redirect()->back();
    }

    /**
     * @return Response|array
     * @throws \Illuminate\Http\Client\RequestException
     */
    public function latestVersion()
    {
        $latestVersion = Http::get('https://api.tbdscripts.com/api/latest-version')
            ->throw()->json();

        if (!$latestVersion) {
            return response(null, 400);
        }

        $versionId = (string) $latestVersion['id'];
        if ($versionId === config('cosmo.version_id')) {
            return response(null);
        }

        return [
            'version_id' => (string) $latestVersion['id'],
            'version_name' => $latestVersion['name'],
        ];
    }
}
