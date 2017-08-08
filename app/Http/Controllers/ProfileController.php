<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Account;

class ProfileController extends Controller
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


    public function index()
    {
        $user = Auth::getUser();
        return view('profile', compact('user'));
    }

    public function update(Request $request)
    {
        $user = Auth::getUser();
        $user->update($request->all());
        return redirect(route('profile'));
    }

    public function newAccount(Request $request){

        $this->validate($request, [
            'ffbe_id' => [
				'required',
				'unique:accounts',
				'max:11',
				'max:50',
				'friendcode'
			]
        ]);

        $user = Auth::getUser();
        $account =  $user->accounts()->create($request->all());
        return redirect(route('profile'));
    }

}
