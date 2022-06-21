<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\View\View;

/**
 * Class StaffController
 * @package App\Http\Controllers
 */
class StaffController extends Controller
{
    /**
     * @return Application|Factory|View
     */
    public function __invoke()
    {
        $displayStaffPerm = $this->findDisplayStaffPermission();

        $users = User::with('role')
            ->whereHas('role.permissions', function($query) use ($displayStaffPerm) {
                $query->where('permission', $displayStaffPerm);
            })->get()->sortByDesc('role_id');

        return view('staff', compact('users'));
    }

    protected function findDisplayStaffPermission()
    {
        $permission = null;
        foreach(config('cosmo.permissions') as $id => $permission) {
            if ($permission['reference'] !== 'display-staff') continue;

            $permission = $id;
            break;
        }

        return $permission;
    }
}
