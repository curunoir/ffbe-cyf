<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Account;

class FriendsController extends Controller
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
        $accounts = Account::get()->take(10);
        getDatatables(true);
        getValidate():
        return view('friends.index', compact('user', 'accounts'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $manufacturer = new Account();
        getValidate();
        return view('manufacturers.create', compact('manufacturer'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $req = $request->all();
        $manufacturer = new Manufacturer();
        $req['modified_at'] = Carbon::now();
        $req['name'] = $req['name'];
        $manufacturer->fill($req);
        $manufacturer->save();

        return redirect(action('ManufacturersController@index'))->with('success', "Constructeur créé avec succès");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $manufacturer = Manufacturer::find(_d($id));
        getValidate();
        return view('manufacturers.edit', compact('manufacturer'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $req = $request->all();

        $manufacturer = Manufacturer::find(_d($id));
        $req['modified_at'] = Carbon::now();

        $manufacturer->update($req);

        return redirect(action('ManufacturersController@index'))->with('success', 'Constructeur mis à jour avec succès');

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
