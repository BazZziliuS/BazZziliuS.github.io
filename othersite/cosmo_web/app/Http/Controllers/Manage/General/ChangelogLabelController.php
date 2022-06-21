<?php

namespace App\Http\Controllers\Manage\General;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\ChangelogLabelForm;
use App\Models\ChangelogLabel;
use Illuminate\Http\Request;

class ChangelogLabelController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:manage-changelogs');
    }

    public function store(ChangelogLabelForm $request)
    {
        ChangelogLabel::create($request->validated());

        toastr()->success("Successfully created a new label called: {$request->name}");
        return redirect()->back();
    }

    public function update(ChangelogLabelForm $request, ChangelogLabel $label)
    {
        $label->update($request->validated());

        toastr()->success('Successfully updated the label!');
        return redirect()->back();
    }

    public function destroy(ChangelogLabel $label)
    {
        $label->delete();

        toastr()->success("Successfully deleted the label called: {$label->name}");
        return redirect()->back();
    }
}
