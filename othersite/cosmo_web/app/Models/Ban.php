<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperBan
 */
class Ban extends Model
{
    use HasFactory;

    protected $fillable = [
        'reason', 'platforms'
    ];

    protected $casts = [
        'platforms' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
