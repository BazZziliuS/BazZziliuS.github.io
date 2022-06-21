<?php

namespace App\Models\Profile;

use App\Casts\Html;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperComment
 */
class Comment extends Model
{
    protected $fillable = ['content', 'user_id'];

    protected $casts = [
        'user_id' => 'int',
        'content' => Html::class
    ];

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
