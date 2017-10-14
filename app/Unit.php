<?php

namespace App;

use BlueMountainTeam\Translation\Traits\TranslatableModel;
use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'japan_name', 'description', 'slug', 'base_stars', 'max_stars',
        'icon_file', 'icon_one', 'icon_two', 'icon_three', 'icon_four', 'icon_five', 'icon_six'
    ];

}
