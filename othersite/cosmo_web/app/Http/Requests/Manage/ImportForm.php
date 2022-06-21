<?php

namespace App\Http\Requests\Manage;

use App\Http\Controllers\Manage\General\ImportController;
use App\Traits\NotifiesOnValidationFail;
use Illuminate\Foundation\Http\FormRequest;

class ImportForm extends FormRequest
{
    use NotifiesOnValidationFail;

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'importer' => ['required', function($attr, $value, $fail) {
                if (!in_array($value, array_keys(ImportController::$importers))) {
                    $fail('Invalid importer selected.');
                }
            }],

            'host' => ['required'],
            'port' => ['required', 'integer'],
            'database' => ['required'],
            'username' => ['required'],
            'password' => ['nullable']
        ];
    }
}