<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'admin'
    ];

    /**
     * Get the accounts associated to the user.
     */
    public function accounts()
    {
        return $this->hasMany('App\Account');
    }

    /**
     * Get the friends
     */
    public function friends()
    {
        return $this->hasMany('App\Friend');
    }

    /**
     * Get the friends
     */
    public function sent_requests()
    {
        return $this->hasMany('App\Request', 'requester_id');
    }

    /**
     * Get the friends
     */
    public function received_requests()
    {
        return $this->hasMany('App\Request', 'requested_id');
    }

    /**
     * A user can have many messages
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

}
