<?php

namespace App\Models\Store;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @mixin IdeHelperOrder
 */
class Order extends Model
{
    use SoftDeletes;

    public const STATUS_WAITING_FOR_PAYMENT = 'waiting_for_payment';
    public const STATUS_PENDING = 'pending';
    public const STATUS_WAITING_FOR_PACKAGE = 'waiting_for_package';
    public const STATUS_DELIVERED = 'delivered';
    public const STATUS_FAILED = 'failed';

    protected $fillable = [
        'buyer_id', 'receiver', 'package_id', 'status', 'ip_address', 'price', 'assigned'
    ];

    public function scopeCompleted(Builder $query): Builder
    {
        return $query->where('assigned', false)
            ->whereIn('status', [Order::STATUS_DELIVERED, Order::STATUS_WAITING_FOR_PACKAGE]);
    }

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function package(): BelongsTo
    {
        return $this->belongsTo(Package::class);
    }

    public function actions(): HasMany
    {
        return $this->hasMany(Action::class);
    }

    public function transaction(): MorphTo
    {
        return $this->morphTo();
    }

    // When an order is completed, it has to fill the actions table
    // so the corresponding server can handle the actions accordingly
    public function createActions()
    {
        $actions = $this->package->actions;
        $records = [];

        foreach ($actions as $name => $data) {
            $records[] = [
                'name' => $name,
                'data' => $data,
                'receiver' => $this->receiver,
                'expires_at' => $this->package->permanent
                    ? null : now()->addDays($this->package->expires_after)
            ];
        }

        $this->actions()->createMany($records);
    }
}
