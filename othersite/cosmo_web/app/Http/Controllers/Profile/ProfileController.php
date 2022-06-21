<?php

namespace App\Http\Controllers\Profile;

use App\Achievements\Designer;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileForm;
use App\Models\User;
use Illuminate\Support\Arr;

class ProfileController extends Controller
{
    public function index()
    {
        $search = request('search');
        $query = User::with('role');

        if ($search) {
            $query
                ->where('username', 'LIKE', '%' . request()->get('search') . '%')
                ->orWhere('steamid', 'LIKE', '%' . request()->get('search') . '%');
        }

        return view('users.index', [
            'search' => $search,
            'users' => $query
                ->orderBy('created_at', 'DESC')
                ->paginate(16)
                ->appends('search', $search)
        ]);
    }

    public function search()
    {
        return redirect()->route('users.index', [
            'search' => request('search')
        ]);
    }

    public function show(User $user)
    {
        $user->profile->loadCount('likes');

        return view('users.show.index', [
            'user' => $user
        ]);
    }

    public function comments(User $user)
    {
        $user->profile->loadCount('likes');

        $comments = $user->profile->comments()
            ->with(['user', 'user.profile', 'user.role'])
            ->orderByDesc('created_at')
            ->paginate(5);

        return view('users.show.comments', [
            'user' => $user,
            'comments' => $comments
        ]);
    }

    public function threads(User $user)
    {
        $user->profile->loadCount('likes');

        $threads = $user->threads()
            ->withCount('posts')
            ->paginate(8);

        return view('users.show.threads', [
            'user' => $user,
            'threads' => $threads
        ]);
    }

    public function achievements(User $user)
    {
        $user->profile->loadCount('likes');

        return view('users.show.achievements', [
            'user' => $user
        ]);
    }

    public function edit(User $user)
    {
        $this->authorize('update', $user->profile);
        $user->profile->loadCount('likes');

        return view('users.show.edit', compact('user'));
    }

    public function update(ProfileForm $request, User $user)
    {
        $this->authorize('update', $user->profile);

        $user->update(Arr::only($request->validated(), ['username']));
        $user->profile->update(Arr::except($request->validated(), ['username']));

        if (!$request->user()->hasAchievement(Designer::class)) {
            $request->user()->achieve(Designer::class);
        }

        toastr()->success('Successfully updated profile!');
        return redirect()->route('users.show', $user->steamid);
    }
}
