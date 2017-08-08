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
        'ffbe_id', 'server', 'ffbe_id_visibility'
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
     * Add a friend account to the account.
     */
    public function add_friend($friend_id)
    {
        $this->friend_accounts()->attach($friend_id);   // add friend
        $friend = Account::find($friend_id);            // find your friend, and...
        $friend->friend_accounts()->attach($this->id);  // add myself
    }

    /**
     * Remove a friend account from the account.
     */
    public function remove_friend($friend_id)
    {
        $this->friend_accounts()->detach($friend_id);   // remove friend
        $friend = User::find($friend_id);               // find your friend, and...
        $friend->friend_accounts()->detach($this->id);  // remove myself, too
    }

	/**
	 * Get the current unit associated to the account.
	 */
	public function current_unit()
	{
		return $this->HasOne('App\Unit', 'current_unit_id');
	}

	/**
	 * Get the desired unit associated to the account.
	 */
	public function desired_unit()
	{
		return $this->HasOne('App\Unit', 'desired_unit_id');
	}
}
