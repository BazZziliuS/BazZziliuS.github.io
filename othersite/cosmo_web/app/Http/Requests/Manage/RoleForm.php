<?php

namespace App\Http\Requests\Manage;

use App\Models\Permission;
use App\Rules\HexColor;
use App\Traits\NotifiesOnValidationFail;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Class RoleForm
 * @package App\Http\Requests\Manage
 */
class RoleForm extends FormRequest
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
            'name' => 'required',
            'display_name' => 'required',
            'color' => [new HexColor, 'required'],
            'permissions' => 'sometimes|array',
            'permissions.*' => [Rule::in(Permission::permissionStrings())],
        ];
    }

    /**
     * @return Validator
     */
    protected function getValidatorInstance()
    {
        return parent::getValidatorInstance();
    }
}
