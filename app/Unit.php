<?php

namespace App;

use BlueMountainTeam\Translation\Traits\TranslatableModel;
use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    use TranslatableModel;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'japan_name'
    ];

    protected $fillTrad = [
        'description'
    ];
}
