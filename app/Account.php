<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'ffbe_id',
        'name',
        'server',
        'ffbe_id_visibility',
        'rank',
        'current_unit_id',
        'current_unit_description',
        'desired_unit_id',
        'desired_unit_comments'
    ];

    /**
     * Get the user associated to the account.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Get the friend accounts associated to the account.
     */
    public function friend_accounts(){
        return $this->belongsToMany('App\Account', 'account_friends', 'account_id', 'friend_id');
    }

	/**
	 * Get the current unit associated to the account.
	 */
	public function current_unit()
	{
		return $this->HasOne('App\Unit', 'id', 'current_unit_id');
	}

	/**
	 * Get the desired unit associated to the account.
	 */
	public function desired_unit()
	{
		return $this->HasOne('App\Unit', 'id', 'desired_unit_id');
	}
}
