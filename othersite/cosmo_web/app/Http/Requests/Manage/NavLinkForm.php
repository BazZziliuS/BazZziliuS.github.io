<?php

namespace App\Http\Requests\Manage;

use App\Rules\HexColor;
use App\Traits\NotifiesOnValidationFail;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class NavLinkForm
 * @package App\Http\Requests\Manage
 */
class NavLinkForm extends FormRequest
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
            'name' => 'required|string',
            'icon' => 'nullable|string',
            'color' => ['required', new HexColor],
            'url' => 'required|string',
            'category' => 'nullable|string'
        ];
    }
}