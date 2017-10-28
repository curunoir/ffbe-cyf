<?php

namespace App\Http\Controllers\Broadcast;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Vinkla\Pusher\Facades\Pusher;

class ChatBroadcastController extends Controller
{
    /**
     * Authenticate the request for channel access.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticate(Request $request)
    {

        if(Auth::check()) {
            $auth_string = Pusher::socket_auth($request->get('channel_name'), $request->get('socket_id'));
//            dd($auth_string);
            return $auth_string;
        }
        else {
            return response('Forbidden', 403);
        }
    }
}
