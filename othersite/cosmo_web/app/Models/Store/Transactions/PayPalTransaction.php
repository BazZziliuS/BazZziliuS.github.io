<?php

namespace App\Models\Store\Transactions;

use App\Models\Store\Order;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @mixin IdeHelperPayPalTransaction
 */
class PayPalTransaction extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'paypal_transactions';

    protected $fillable = [
        'order_id', 'transaction_id', 'buyer_name', 'buyer_email'
    ];

    public function order(): MorphOne
    {
        return $this->morphOne(Order::class, 'transaction');
    }
}
