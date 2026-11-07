<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'price',
        'photo_url',
        'is_available',
    ];
}
