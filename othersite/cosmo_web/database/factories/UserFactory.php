<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory {
    protected $model = User::class;

    public function definition()
    {
        return [
            'username' => $this->faker->userName,
            'steamid' => $this->faker->creditCardNumber,
            'avatar' => asset('img/logo.png'),
            'role_id' => $this->faker->numberBetween(1, 2)
        ];
    }
}