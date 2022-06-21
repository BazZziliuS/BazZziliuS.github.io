<?php

namespace App\Http\Requests\Manage;

use App\Traits\NotifiesOnValidationFail;
use Illuminate\Foundation\Http\FormRequest;

class AssignForm extends FormRequest
{
    use NotifiesOnValidationFail;

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'package' => ['required', 'exists:packages,id']
        ];
    }
}
