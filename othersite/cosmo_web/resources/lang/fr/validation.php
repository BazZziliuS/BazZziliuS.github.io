<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => 'Le :attribute doit être accepté.',
    'active_url' => 'Le :attribute n\'est pas une URL valide.',
    'after' => 'Le :attribute doit être une date postérieure à :date.',
    'after_or_equal' => 'Le :attribute doit être une date postérieure ou égale à :date.',
    'alpha' => 'Le :attribute ne peut contenir que des lettres.',
    'alpha_dash' => 'Le :attribute ne peut contenir que des lettres, nombres, tirets et underscores.',
    'alpha_num' => 'Le :attribute ne peut contenir que des lettres et des chiffres.',
    'array' => 'Le :attribute doit être un tableau.',
    'before' => 'Le :attribute doit être une date antérieure à :date.',
    'before_or_equal' => 'Le :attribute doit être une date antérieure ou égale à :date.',
    'between' => [
        'numeric' => 'Le :attribute doit être comprise entre :min et :max.',
        'file' => 'Le :attribute doit être comprise entre :min et :max kilo-octets.',
        'string' => 'Le :attribute doit être comprise entre :min et :max caractères.',
        'array' => 'Le :attribute doit avoir entre :min et :max articles.',
    ],
    'boolean' => 'Le :attribute le champ doit être vrai ou faux.',
    'confirmed' => 'Le :attribute la confirmation ne correspond pas.',
    'date' => 'Le :attribute n\'est pas une date valide.',
    'date_equals' => 'Le :attribute doit être une date égale à :date.',
    'date_format' => 'Le :attribute ne correspond pas au format :format.',
    'different' => 'Le :attribute et :other doit être différent.',
    'digits' => 'Le :attribute doit être :digits chiffres.',
    'digits_between' => 'Le :attribute doit être entre :min et :max chiffres.',
    'dimensions' => 'Le :attribute a des dimensions invalides.',
    'distinct' => 'Le :attribute le champ a une valeur en double.',
    'email' => 'Le :attribute doit être une adresse électronique valide.',
    'ends_with' => 'Le :attribute doit se terminer par l\'un des éléments suivants: :values.',
    'exists' => 'L\':attribute sélectionné n\'est pas valide.',
    'file' => 'Le :attribute doit être un fichier.',
    'filled' => 'Le :attribute champ doit avoir une valeur.',
    'gt' => [
        'numeric' => 'Le :attribute doit être plus que :value.',
        'file' => 'Le :attribute doit être plus que :value kilo-octets.',
        'string' => 'Le :attribute doit être plus que :value caractères.',
        'array' => 'Le :attribute doit avoir plus que :value articles.',
    ],
    'gte' => [
        'numeric' => 'Le :attribute doit être plus que ou égal :value.',
        'file' => 'Le :attribute doit être plus que ou égal :value kilo-octets.',
        'string' => 'Le :attribute doit être plus que ou égal :value caractères.',
        'array' => 'Le :attribute doit avoir :value articles ou plus.',
    ],
    'image' => 'Le :attribute doit être une image.',
    'in' => 'Le selected :attribute n\'est pas valide.',
    'in_array' => 'Le :attribute n\'existe pas dans :other.',
    'integer' => 'Le :attribute doit être un nombre entier.',
    'ip' => 'Le :attribute doit être une adresse IP valide.',
    'ipv4' => 'Le :attribute doit être une adresse IPv4 valide.',
    'ipv6' => 'Le :attribute doit être une adresse IPv6 valide.',
    'json' => 'Le :attribute doit être une chaîne JSON valide.',
    'lt' => [
        'numeric' => 'Le :attribute doit être moins de :value.',
        'file' => 'Le :attribute doit être moins de :value kilo-octets.',
        'string' => 'Le :attribute doit être moins de :value caractères.',
        'array' => 'Le :attribute doit avoir moins de :value articles.',
    ],
    'lte' => [
        'numeric' => 'Le :attribute doit être moins de ou égal :value.',
        'file' => 'Le :attribute doit être moins de ou égal :value kilo-octets.',
        'string' => 'Le :attribute doit être moins de ou égal :value caractères.',
        'array' => 'Le :attribute ne doit pas avoir plus de :value articles.',
    ],
    'max' => [
        'numeric' => 'Le :attribute ne peut pas être plus que :max.',
        'file' => 'Le :attribute ne peut pas être plus que :max kilo-octets.',
        'string' => 'Le :attribute ne peut pas être plus que :max caractères.',
        'array' => 'Le :attribute ne peut pas avoir plus de :max articles.',
    ],
    'mimes' => 'Le :attribute doit être un fichier de type: :values.',
    'mimetypes' => 'Le :attribute doit être un fichier de type: :values.',
    'min' => [
        'numeric' => 'Le :attribute doit être au moins :min.',
        'file' => 'Le :attribute doit être au moins :min kilo-octets.',
        'string' => 'Le :attribute doit être au moins :min caractères.',
        'array' => 'Le :attribute doit avoir au moins :min articles.',
    ],
    'not_in' => 'L\' :attribute sélectionné n\'est pas valide.',
    'not_regex' => 'Le :attribute format n\'est pas valide.',
    'numeric' => 'Le :attribute doit être un nombre.',
    'password' => 'Le password est incorrect.',
    'present' => 'Le :attribute champ doit être présent.',
    'regex' => 'Le :attribute format n\'est pas valide.',
    'required' => 'Le :attribute champ est nécessaire.',
    'required_if' => 'Le :attribute champ est nécessaire quand :other est :value.',
    'required_unless' => 'Le :attribute champ est nécessaire sauf si :other est en :values.',
    'required_with' => 'Le :attribute champ est nécessaire quand :values est présent.',
    'required_with_all' => 'Le :attribute champ est nécessaire quand :values sont présent.',
    'required_without' => 'Le :attribute champ est nécessaire quand :values n\'est pas présent.',
    'required_without_all' => 'Le :attribute champ est nécessaire quand aucun de :values sont présent.',
    'same' => 'Le :attribute et :other doit correspondre.',
    'size' => [
        'numeric' => 'Le :attribute doit être :size.',
        'file' => 'Le :attribute doit être :size kilo-octets.',
        'string' => 'Le :attribute doit être :size caractères.',
        'array' => 'Le :attribute doit contenir :size articles.',
    ],
    'starts_with' => 'Le :attribute doit commencer par l\'un des éléments suivants: :values.',
    'string' => 'Le :attribute doit être une chaîne.',
    'timezone' => 'Le :attribute doit être une zone valide.',
    'unique' => 'Le :attribute a déjà été prise.',
    'uploaded' => 'Le :attribute a échoué à télécharger.',
    'url' => 'Le :attribute le format n\'est pas valide.',
    'uuid' => 'Le :attribute doit être un UUID valide.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],

];