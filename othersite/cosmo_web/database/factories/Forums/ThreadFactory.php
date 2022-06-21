<?php

namespace Database\Factories\Forums;

use App\Models\Forums\Thread;
use Illuminate\Database\Eloquent\Factories\Factory;

class ThreadFactory extends Factory {
    protected $model = Thread::class;

    public function definition()
    {
        $post = "<h1>{$this->faker->sentence(12)}</h1><br/>";
        foreach ($this->faker->paragraphs(5) as $paragraph) {
            $post .= "<p>{$paragraph}</p>";
        }

        return [
            'title' => $this->faker->sentence(6),
            'content' => $post,
            'user_id' => 1,
            'stickied' => false,
            'locked' => false,
        ];
    }
}
