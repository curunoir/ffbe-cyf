<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    /**
     * Fields that are mass assignable
     *
     * @var array
     */
    protected $fillable = [
        'user_one_id',
        'user_two_id',
        'status'
    ];

    /**
     * A message belongs to a user
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function messages()
    {
        return $this->hasMany(Message::class, 'conversation_id')->with('user');
    }

    /**
     * A message belongs to a conversation
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user_one()
    {
        return $this->belongsTo(User::class, 'user_one_id');
    }

    /**
     * A message belongs to a conversation
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user_two()
    {
        return $this->belongsTo(User::class, 'user_two_id');
    }

    /**
     * @return string
     */
    public function getPusherChannel()
    {
        return 'private-'. _hashes([$this->user_one->id, $this->user_two->id]);
    }

    /**
     * Find a conversation between two users or creates it
     * @param $user
     * @param $friend
     * @return Conversation|null
     */
    public static function findOrStart($user, $user2)
    {
        $conversation = Conversation::where('user_one_id', $user->id)
            ->where('user_two_id', $user2->id);
        if ($conversation->exists()) {
            return $conversation->first();
        }
        else {
            $conversation = Conversation::where('user_one_id', $user2->id)
                ->where('user_two_id', $user->id);
            if ($conversation->exists()) {
                return $conversation->first();
            }
            else {
                $conversation = new Conversation();
                $conversation->user_one_id = $user->id;
                $conversation->user_two_id = $user2->id;
                $conversation->status = true;
                if($conversation->save())
                    return $conversation;
                else
                    return null;
            }
        }
    }
}
