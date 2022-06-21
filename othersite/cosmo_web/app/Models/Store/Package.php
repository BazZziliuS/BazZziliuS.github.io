<?php

namespace App\Models\Store;

use App\Casts\Html;
use App\Models\Index\Server;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @mixin IdeHelperPackage
 */
class Package extends Model
{
    use SoftDeletes, HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name', 'description', 'image', 'price', 'permanent',
        'expires_after', 'rebuyable', 'actions', 'category', 'custom_price'
    ];

    protected $casts = [
        'description' => Html::class,
        'actions' => 'array',
    ];

    public function servers()
    {
        return $this->morphedByMany(Server::class, 'packageable');
    }

    public function coupons()
    {
        return $this->morphedByMany(Coupon::class, 'packageable');
    }

    public function sales()
    {
        return $this->morphedByMany(Sale::class, 'packageable');
    }

    private $finalPriceCache;

    public function getFinalPriceAttribute()
    {
        if (isset($this->finalPriceCache)) {
            return $this->finalPriceCache;
        }

        $price = $this->price;

        $sale = $this->sales()->where([
            ['starts_at', '<', now()],
            ['ends_at', '>', now()]
        ])->orderByDesc('percentage')->first();

        if ($sale) {
            $price -= $price * ($sale->percentage / 100);
        }

        return $this->finalPriceCache = round($price, 2);
    }
}
