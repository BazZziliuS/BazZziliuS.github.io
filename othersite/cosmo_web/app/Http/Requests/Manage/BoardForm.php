<?php

namespace App\Http\Requests\Manage;

use App\Rules\HexColor;
use App\Traits\NotifiesOnValidationFail;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class BoardForm
 * @package App\Http\Requests\Manage
 */
class BoardForm extends FormRequest
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
            'description' => 'nullable|string',
            'icon' => 'required',
            'color' => ['required', new HexColor],
            'category' => 'required|exists:mysql.categories,name',
            'roles' => 'nullable|array'
        ];
    }
}
