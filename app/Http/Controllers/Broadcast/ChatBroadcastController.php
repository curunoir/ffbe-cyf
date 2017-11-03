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
            $user = Auth::getUser();
            // on extrait les id des users du channel et on verifie qu'ils sont bien amis et que l'un des deux est l'utilisateur courant
            $hashedIds = str_replace('private-', '', $request->get('channel_name'));
            $ids = _dehashes($hashedIds);

            if($ids == null || count($ids) != 2)
                return response('Forbidden verification failed code 11', 403);
            if($ids[0] == $user->id)
                $partnerId = $ids[1];
            else if($ids[1] == $user->id)
                $partnerId = $ids[0];
            else
                return response('Forbidden verification failed code 12', 403);
            if(!$user->friends->contains($partnerId)) // not a friend ?
                return response('Forbidden verification failed code 13', 403);

            // All is right lets send push messages
            $auth_string = Pusher::socket_auth($request->get('channel_name'), $request->get('socket_id'));
            return $auth_string;
        }
        else
            return response('Forbidden', 403);
    }
}
