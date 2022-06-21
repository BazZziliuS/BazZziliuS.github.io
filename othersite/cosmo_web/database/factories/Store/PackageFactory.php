<?php

namespace Database\Factories\Store;

use App\Models\Store\Package;
use Illuminate\Database\Eloquent\Factories\Factory;

class PackageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Package::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'image' => 'https://i.gyazo.com/853c0c5869e2cf7bec49274e3905a895.png', // "tasid#6282" / "Stubbo#1337" is the creator
            'actions' => []
        ];
    }
}
