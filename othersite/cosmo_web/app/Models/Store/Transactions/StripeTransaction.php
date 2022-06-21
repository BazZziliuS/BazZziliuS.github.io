<?php

namespace App\Models\Store\Transactions;

use App\Models\Store\Order;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @mixin IdeHelperStripeTransaction
 */
class StripeTransaction extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'session_id', 'payment_intent_id', 'buyer_email'
    ];

    public function order(): MorphOne
    {
        return $this->morphOne(Order::class, 'transaction');
    }
}
