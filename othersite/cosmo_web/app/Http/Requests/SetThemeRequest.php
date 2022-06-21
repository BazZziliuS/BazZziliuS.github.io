<?php

namespace App\Http\Requests;

use App\Traits\NotifiesOnValidationFail;
use Igaster\LaravelTheme\Facades\Theme;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SetThemeRequest extends FormRequest
{
    use NotifiesOnValidationFail;

    public function authorize()
    {
        return config('cosmo.configs.allow_user_themes', false);
    }

    public function rules()
    {
        return [
            'theme' => ['required', Rule::in(
                array_map(function ($theme) {
                    return $theme->name;
                }, Theme::all())
            )]
        ];
    }
}