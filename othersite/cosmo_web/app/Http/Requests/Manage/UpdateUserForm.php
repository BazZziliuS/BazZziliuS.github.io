<?php

namespace App\Http\Requests\Manage;

use App\Traits\NotifiesOnValidationFail;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserForm extends FormRequest
{
    use NotifiesOnValidationFail;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'username' => ['required', 'string'],
            'avatar' => ['required', 'url'],
            'bio' => ['nullable', 'max:2000'],
            'signature' => ['nullable', 'max:2000'],
            'background_img' => ['nullable', 'url'],
            'role' => ['required', 'exists:App\Models\Role,id']
        ];
    }
}
