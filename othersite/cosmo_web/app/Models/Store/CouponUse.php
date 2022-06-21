<?php

namespace App\Models\Store;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperCouponUse
 */
class CouponUse extends Model
{
    protected $fillable = [
        'user_id', 'coupon_id', 'transaction_id'
    ];

    public function coupon()
    {
        return $this->belongsTo(Coupon::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transaction()
    {
        return $this->belongsTo(Order::class);
    }
}
