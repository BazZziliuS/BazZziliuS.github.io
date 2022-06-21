<?php

namespace App\Models\Forums;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperBoard
 */
class Board extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name', 'description', 'icon', 'color', 'category_id', 'roles', 'parent_id', 'latest_thread_id'
    ];

    protected $casts = [
        'roles' => 'array'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function threads()
    {
        return $this->hasMany(Thread::class);
    }

    public function subBoards()
    {
        return $this->hasMany(Board::class, 'parent_id');
    }

    public function parentBoard()
    {
        return $this->belongsTo(Board::class, 'parent_id', 'id');
    }

    public function latestThread()
    {
        return $this->hasOne(Thread::class)->ofMany();
    }

    public function roleHasAccess($role)
    {
        return empty($this->roles) || in_array($role, $this->roles);
    }

    /**
     * Get an array of parent boards for breadcrumb use
     *
     * @return array
     */
    public function getBreadcrumbsAttribute()
    {
        $breadcrumbs = [];

        /** @var Board|null $parentBoard */
        $parentBoard = $this->parentBoard()->select(['id', 'name'])->first();

        while ($parentBoard) {
            $breadcrumbs[] = $parentBoard;

            // Go to the next one
            $parentBoard = $parentBoard->parentBoard()->select(['id', 'name'])->first();
        }

        $breadcrumbs[] = $this;

        return $breadcrumbs;
    }
}
