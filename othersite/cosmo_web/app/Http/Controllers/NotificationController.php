<?php

namespace App\Http\Controllers;

use Illuminate\Notifications\DatabaseNotification as Notification;

class NotificationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $notifications = auth()->user()->notifications()->paginate(10);
        return view('notifications', compact('notifications'));
    }

    public function show(Notification $notification)
    {
        $notification->markAsRead();
        return redirect($notification->data['url']);
    }

    public function markAllRead()
    {
        auth()->user()->unreadNotifications->markAsRead();
        toastr()->success('You have marked all your notifications as read!');

        return redirect()->route('notifications');
    }

    public function deleteAll()
    {
        auth()->user()->notifications()->delete();
        toastr()->success('You have successfully cleared your notifications!');

        return redirect()->route('notifications');
    }
}
