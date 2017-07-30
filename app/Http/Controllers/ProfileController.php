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
        return view('profile');
    }

    public function update(Request $request)
    {
        $user = Auth::getUser();
        $user->update($request->all());
        return redirect(route('profile'));
    }

    public function newAccount(Request $request){

        $user = Auth::getUser();

        $account =  $user->accounts()->create($request->all());

        //$user->save();
        return view('profile');
    }

}
