<?php

namespace App\Http\Controllers;

use App\Message;
use App\Conversation;

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
    public function index()
    {
        getChat();
        $conversation = Conversation::find(1);
        $messages = $conversation->messages;
        $user = Auth::user();
        if($user->id == $conversation->user_one->id) {
            $partner    = $conversation->user_two;
        }
        else {
            $partner    = $conversation->user_one;
        }
        return view('chat.index', compact('messages', 'user', 'partner'));
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

        $message = $user->messages()->create([
            'message' => $request->input('message')
        ]);

        //broadcast(new MessageSent($user, $message))->toOthers();
        $res = Pusher::trigger('private-chat', 'NewMessage', [
            'message' => $message->message,
            'time' => Carbon::now()->toDateTimeString(),
            'username' => $user->name,
            'userid' => _c($user->id)
        ]);

        return ['status' => 'OK'];
    }
}
