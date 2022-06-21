<?php

namespace Database\Factories\Forums;

use App\Models\Forums\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory {
    protected $model = Category::class;

    public function definition()
    {
        return [
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->sentence(10),
        ];
    }
}