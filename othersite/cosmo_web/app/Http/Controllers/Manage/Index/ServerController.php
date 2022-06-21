<?php

namespace App\Http\Controllers\Manage\Index;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\ServerForm;
use App\Models\Index\Server;
use Exception;
use Illuminate\Http\RedirectResponse;

class ServerController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:manage-servers');
    }

    public function index()
    {
        $servers = Server::all();

        return view('manage.index.components.servers', compact('servers'));
    }

    public function store(ServerForm $request): RedirectResponse
    {
        $server = Server::create($request->validated());
        $plainToken = $server->refreshToken();
        $server->save();

        toastr()->success('Successfully created server!');

        return redirect()->route('manage.index.servers')
            ->with('server-token', $plainToken);
    }

    public function update(ServerForm $request, Server $server): RedirectResponse
    {
        $server->update($request->validated());

        toastr()->success('Successfully updated server!');
        return redirect()->route('manage.index.servers');
    }

    public function regenerateToken(Server $server): RedirectResponse
    {
        $plainToken = $server->refreshToken();
        $server->save();

        return redirect()->route('manage.index.servers')
            ->with('server-token', $plainToken);
    }

    public function destroy(Server $server): RedirectResponse
    {
        $server->delete();

        toastr()->success('Successfully deleted server!');
        return redirect()->route('manage.index.servers');
    }
}
