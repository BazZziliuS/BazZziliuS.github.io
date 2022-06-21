<?php

namespace App\Models\Forums;

use App\Casts\Html;
use App\Models\User;
use App\Traits\Reactable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @mixin IdeHelperThread
 */
class Thread extends Model
{
    use Reactable, SoftDeletes, HasFactory;

    protected $fillable = [
        'title', 'content', 'user_id', 'stickied', 'locked', 'board_id'
    ];

    protected $casts = [
        'user_id' => 'int',
        'content' => Html::class,
        'locked' => 'bool'
    ];

    public function board()
    {
        return $this->belongsTo(Board::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function latestPost()
    {
        return $this->hasOne(Post::class)->ofMany();
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function(Thread $thread) {
            $thread->posts()->delete();
        });
    }
}
