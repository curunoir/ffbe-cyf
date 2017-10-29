<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Friend extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'friend_id',
        'accept_date',
        'user_account_id',
        'friend_account_id',
        'show_other_accounts'
    ];

    /**
     * Get the user associated to the account.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Get the user associated to the account.
     */
    public function user_friend()
    {
        return $this->belongsTo('App\User', 'friend_id');
    }

    /**
     * Get the user associated to the account.
     */
    public function account()
    {
        return $this->belongsTo('App\Account', 'user_account_id');
    }

    /**
     * Get the user associated to the account.
     */
    public function friend_account()
    {
        return $this->belongsTo('App\Account', 'friend_account_id');
    }

}
