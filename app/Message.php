<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    /**
     * Fields that are mass assignable
     *
     * @var array
     */
    protected $fillable = [
        'message',
        'user_id',
        'conversation_id',
        'is_seen',
        'deleted_from_sender',
        'deleted_from_receiver'
    ];

    /**
     * A message belongs to a user
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * A message belongs to a conversation
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

        /*
    * its an alias of user relation
    *
    * @return collection
    * */
    public function sender()
    {
        return $this->user();
    }
}
