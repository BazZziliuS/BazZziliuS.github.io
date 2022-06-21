<?php

namespace App\Models\Store\Transactions;

use App\Models\Store\Order;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @mixin IdeHelperCoinbaseTransaction
 */
class CoinbaseTransaction extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'charge_id', 'charge_code'
    ];

    public function order(): MorphOne
    {
        return $this->morphOne(Order::class, 'transaction');
    }
}
