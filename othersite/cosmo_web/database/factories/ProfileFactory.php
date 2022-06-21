<?php

namespace Database\Factories;

use App\Models\Profile;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProfileFactory extends Factory {
    protected $model = Profile::class;

    public function definition()
    {
        $img = 'https://cdn.discordapp.com/attachments/618781456876961803/720712104566456350/header_bg.png';

        return [
            'bio' => '<p>' . $this->faker->sentence(21) . '</p>',
            'signature' => '<p>' . $this->faker->sentence(12) . '</p>',
            'background_img' => $img,
            'user_id' => Profile::factory()->makeOne()->id
        ];
    }
}