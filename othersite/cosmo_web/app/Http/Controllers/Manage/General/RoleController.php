<?php

namespace App\Http\Controllers\Manage\General;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\RoleForm;
use App\Models\Permission;
use App\Models\Role;
use Exception;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

/**
 * Class RoleController
 * @package App\Http\Controllers\Manage\General
 */
class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:manage-roles');
    }

    /**
     * @return Application|Factory|View
     */
    public function index()
    {
        $roles = Role::all();
        return view('manage.general.roles', compact('roles'));
    }

    /**
     * @param RoleForm $request
     * @return RedirectResponse
     */
    public function store(RoleForm $request)
    {
        $role = Role::create($request->validated());
        $permissions = $request->get('permissions', []);

        $permissionStrings = Permission::permissionStrings();
        $role->permissions()->createMany(array_map(function($permission) use ($permissionStrings) {
            return ['permission' => array_search($permission, $permissionStrings)];
        }, $permissions));

        toastr()->success('Successfully created a new role!');
        return redirect()->route('manage.general.roles');
    }

    /**
     * @param RoleForm $request
     * @param Role $role
     * @return RedirectResponse
     */
    public function update(RoleForm $request, Role $role)
    {
        $role->update($request->validated());

        $permissions = $request->get('permissions', []);

        $permissionStrings = Permission::permissionStrings();
        $role->permissions()->delete();
        $role->permissions()->createMany(array_map(function($permission) use ($permissionStrings) {
            return ['permission' => array_search($permission, $permissionStrings)];
        }, $permissions));

        toastr()->success('Successfully updated role!');
        return redirect()->route('manage.general.roles');
    }

    /**
     * @param Role $role
     * @return RedirectResponse|void
     * @throws Exception
     */
    public function destroy(Role $role)
    {
        if(!$role->deletable) return abort(403);

        $role->delete();

        toastr()->success('Successfully deleted role!');
        return redirect()->route('manage.general.roles');
    }
}
