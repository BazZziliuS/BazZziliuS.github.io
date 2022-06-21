<?php

namespace App\Http\Requests\Manage;

use App\Traits\NotifiesOnValidationFail;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Contracts\Validation\Validator as ValidatorContract;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class PackageForm extends FormRequest
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
            'description' => 'required|max:10000',
            'image' => 'nullable|url',
            'price' => 'required|regex:/^\d+(\.\d{1,2})?$/',
            'servers' => 'required',
            'actions' => 'array',
            'category' => 'nullable|string',
            'rebuyable' => 'nullable|boolean',
            'permanent' => 'nullable|boolean',
            'expires_after' => 'required_without:permanent|nullable|integer',
            'custom_price' => 'nullable|boolean'
        ];
    }

    /**
     * Remove unchecked actions
     *
     * @return ValidatorContract
     * @throws ValidationException
     */
    protected function getValidatorInstance()
    {
        $actions = $this->request->get('actions') ?: [];

        foreach(config('cosmo.actions') as $id => $action) {
            if (!isset($actions[$id])) continue;

            // Remove from array when it's not checked
            if (!$this->request->get("action-$id-check", false)) {
                unset($actions[$id]);
                continue;
            }

            $validator = Validator::make($actions[$id], $action['fields']);
            $validator->validate();
        }

        $this->merge(['actions' => $actions]);

        return parent::getValidatorInstance();
    }
}
