<?php

namespace App\Http\Controllers\Manage\General;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\AssignForm;
use App\Http\Requests\Manage\UpdateUserForm;
use App\Models\Role;
use App\Models\Store\Package;
use App\Models\Store\Order;
use App\Models\User;
use Illuminate\Support\Arr;
use PhpParser\Node\Expr\Assign;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:manage-users');
    }

    public function index()
    {
        if(request('search')) {
            $users = User::where('username','LIKE','%'. request()->get('search').'%')
                ->orWhere('steamid', 'LIKE', '%' . request()->get('search') . '%')
                ->paginate(18);
        } else {
            $users = User::paginate(18);
        }

        $roles = Role::all();
        $packages = Package::pluck('name', 'id');

        return view('manage.general.users', compact('users', 'roles', 'packages'));
    }

    public function search()
    {
        return redirect()->route('manage.general.users', ['search' => request('search')]);
    }

    public function update(UpdateUserForm $request, User $user)
    {
        $user->update(
            Arr::only($request->validated(), ['username', 'avatar']) + [
                'role_id' => $request->input('role')
            ]
        );

        $user->profile()->update(Arr::only($request->validated(), ['bio', 'signature', 'background_img']));

        toastr()->success('Successfully updated user!');
        return redirect()->route('manage.general.users');
    }

    public function assign(AssignForm $request, User $user)
    {
        $package = Package::findOrFail($request->input('package'));

        $trans = Order::create([
            'buyer_id' => $user->id,
            'package_id' => $package->id,
            'receiver' => $user->steamid,
            'status' => Order::STATUS_WAITING_FOR_PACKAGE,
            'price' => 0,
            'assigned' => true
        ]);

        $trans->createActions();

        toastr()->success('Successfully assigned package to the user!');
        return redirect()->back();
    }
}
