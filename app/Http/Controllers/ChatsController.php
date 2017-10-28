<?php

namespace App\Http\Controllers;

use App\Message;
use App\Events\MessageSent;

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
        $messages = Message::with('user')->get();

        return view('chat.index', compact('messages'));
    }

    /**
     * Fetch all messages
     *
     * @return Message
     */
    public function fetchMessages()
    {
        $messages = Message::with('user')->get();
         return view('chat.index');
    }

    /**
     * Fetch all messages
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
