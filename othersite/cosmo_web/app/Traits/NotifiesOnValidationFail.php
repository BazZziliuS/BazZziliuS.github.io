<?php

namespace App\Traits;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

trait NotifiesOnValidationFail
{
    protected function failedValidation(Validator $validator)
    {
        $messages = $validator->messages()->all();

        foreach($messages as $message) {
            toastr()->error($message);
        }

        throw new ValidationException($validator);
    }
}