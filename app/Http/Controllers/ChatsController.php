<?php

namespace App\Http\Controllers;

use App\Message;
use App\Conversation;
use App\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Vinkla\Pusher\Facades\Pusher;
use Carbon\Carbon;

class ChatsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show chats
     *
     * @return \Illuminate\Http\Response
     */
    public function talk($id)
    {

        $friend = User::find(_d($id));
        if(!$friend){
            return redirect(action('HomeController@index'))->with('error', _t("Vous n'êtes pas autorisés à accéder à cette page : code C01"));
        }
        $user = Auth::getUser();
        if(!$user->isFriendWith($friend)) {
            return redirect(action('HomeController@index'))->with('error', _t("Vous n'êtes pas autorisés à accéder à cette page : code C02"));
        }

        $conversation = Conversation::findOrStart($user, $friend);
        $messages = $conversation->messages;
        if($user->id == $conversation->user_one->id) {
            $partner = $conversation->user_two;
        }
        else {
            $partner = $conversation->user_one;
        }
        return view('chat.talk', compact('messages', 'user', 'partner', 'conversation'));
    }

    /**
     * Fetch all messages
     *
     * @return Message
     */
    public function fetchMessages()
    {
        $conversation = Conversation::find(1);
        $messages = $conversation->messages;
        $user = Auth::user();
        return view('chat.index');
    }

    /**
     * Get last message
     *
     * @return Message
     */
    public function lastMessage()
    {
        return Message::with('user')->get()->last();
    }

    /**
     * Persist message to database
     *
     * @param  Request $request
     * @return Response
     */
    public function sendMessage(Request $request)
    {
        $user = Auth::user();
        $conversation = Conversation::find(_d($request->input('conversation')));
        if(!$conversation)
            return ['status' => 'error : no conversation found'];
        $message = new Message();
        $message->message = trim($request->input('message'));
        $message->user_id = $user->id;
        $message->is_seen = true;
        $message->conversation_id = $conversation->id;
        if($message->save()) {
            $res = Pusher::trigger($conversation->getPusherChannel(), 'NewMessage', [
                'message' => $message->message,
                'time' => Carbon::now()->toDateTimeString(),
                'username' => $user->name,
                'userid' => _c($user->id)
            ]);
            //broadcast(new MessageSent($user, $message))->toOthers();
            return ['status' => 'OK'];
        }
    }
}
