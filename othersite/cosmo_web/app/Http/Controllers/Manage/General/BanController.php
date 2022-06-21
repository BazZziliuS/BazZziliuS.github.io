<?php

namespace App\Http\Controllers\Manage\General;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\BanForm;
use App\Models\Ban;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class BanController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:manage-bans');
    }

    public function index(): View
    {
        $bans = Ban::with('user')->paginate(12);

        return view('manage.general.bans', [
            'bans' => $bans
        ]);
    }

    public function store(BanForm $request, User $user): RedirectResponse
    {
        $user->bans()->create($request->validated());

        toastr()->success('Successfully banned user!');
        return back();
    }

    public function update(BanForm $request, Ban $ban): RedirectResponse
    {
        $ban->update($request->validated());

        toastr()->success('Successfully updated ban!');
        return back();
    }

    public function destroy(Ban $ban): RedirectResponse
    {
        $ban->delete();

        toastr()->success("Successfully unbanned {$ban->user->username}!");
        return back();
    }
}
