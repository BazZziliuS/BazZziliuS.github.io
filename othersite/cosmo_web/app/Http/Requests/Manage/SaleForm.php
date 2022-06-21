<?php

namespace App\Http\Requests\Manage;

use App\Traits\NotifiesOnValidationFail;
use Illuminate\Foundation\Http\FormRequest;

class SaleForm extends FormRequest
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
            'title' => 'required|string',
            'percentage' => 'required|integer|min:0|max:100',
            'packages' => 'nullable',
            'starts_at' => 'required|date|before:ends_at',
            'ends_at' => 'required|date|after:starts_at',
        ];
    }
}
