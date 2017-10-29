<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'requester_id',
        'requested_id',
        'requester_account_id',
        'requested_account_id',
        'message',
        'status'
    ];

    /**
     * Get the user associated to the account.
     */
    public function requester()
    {
        return $this->belongsTo('App\User', 'requester_id');
    }

    /**
     * Get the user associated to the account.
     */
    public function requested()
    {
        return $this->belongsTo('App\User', 'requested_id');
    }

    /**
     * Get the user associated to the account.
     */
    public function requester_account()
    {
        return $this->belongsTo('App\Account', 'requester_account_id');
    }

    /**
     * Get the user associated to the account.
     */
    public function requested_account()
    {
        return $this->belongsTo('App\Account', 'requested_account_id');
    }

}