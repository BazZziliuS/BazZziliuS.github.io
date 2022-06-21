<?php

namespace App\Http\Controllers;

use App\Http\Requests\SetThemeRequest;

class SetThemeController extends Controller
{
    public function __invoke(SetThemeRequest $request)
    {
        $request->session()->put('theme', $request->input('theme'));

        return redirect()->back();
    }
}