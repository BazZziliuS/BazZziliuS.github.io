<?php

namespace App\Models\Forums;

use App\Casts\Html;
use App\Models\User;
use App\Traits\Reactable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @mixin IdeHelperPost
 */
class Post extends Model
{
    use Reactable, SoftDeletes;

    protected $fillable = [
        'content', 'user_id'
    ];

    protected $casts = [
        'user_id' => 'int',
        'content' => Html::class
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function thread()
    {
        return $this->belongsTo(Thread::class);
    }
}
