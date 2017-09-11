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
        return view('profile.index',  ['accounts' => $user->accounts, 'user' => $user]);
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
				'max:11',
				'max:50',
				'friendcode'
			]
        ]);

        $user = Auth::getUser();
        $account =  $user->accounts()->create($request->all());
        return redirect(route('profile'))->with('success', "Compte ajouté avec succès");
;
    }

}
