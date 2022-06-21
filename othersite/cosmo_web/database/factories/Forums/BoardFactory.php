<?php

namespace Database\Factories\Forums;

use App\Models\Forums\Board;
use Illuminate\Database\Eloquent\Factories\Factory;

class BoardFactory extends Factory {
    protected $model = Board::class;

    public function definition()
    {
        return [
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->sentence(10),
            'icon' => 'fad fa-clipboard',
            'color' => $this->faker->hexColor,
            'roles' => ['user', 'admin']
        ];
    }
}
