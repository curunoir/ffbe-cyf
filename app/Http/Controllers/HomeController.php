<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Vinkla\Pusher\Facades\Pusher;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::getUser();
        $friends = $user->friends;
        return view('home', compact('user', 'friends'));
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function testPusher()
    {
        return view('testpusher');
    }

    public function ajaxtestpusher()
    {
        $res = Pusher::trigger('my-channel', 'my-event', ['message' => "test pusher CURU"]);
    }
}
