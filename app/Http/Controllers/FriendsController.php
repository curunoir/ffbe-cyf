<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Yajra\DataTables\Facades\DataTables;
use App\Account;
use App\Request as FRequest;
use App\User;
use App\Friend;

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
        $accounts = Account::get();
        getDatatables(true);
        getValidate();
        return view('friends.index', compact('user', 'accounts'));
    }

    /**
     * Search friends for requests for current user
     * @return mixed
     */
    public function searchfriends()
    {
        $user = Auth::getUser();
        $model = Account::select('accounts.*',
            'units.name as units.name',
            'units.icon_file as icon',
            'users.name as user_name'
            )
            ->leftJoin('units', 'units.id', '=', 'accounts.current_unit_id' )
            ->leftJoin('users', 'users.id', '=', 'accounts.user_id' )
            ->where('users.id', '!=', $user->id);

        $data = Datatables::of($model)
            ->editColumn('btn_request', function ($value) {
                $text =  '<button data-name="'.$value->user_name .'" data-id="'._c($value->id) .'" class="request_friend btn btn-mint btn-icon"><i class="fa fa-pencil icon-lg"></i></button>';
                return $text;
            })
            ->editColumn('icon', function ($value) {
                $text =  '<img src="'. asset( 'storage/'.$value->current_unit->icon_file).'">';
                return $text;
            })
            ->setRowId(function ($value) {
                return $value->reference_id;
            })
//            ->filter(function ($query) {
//                if (request()->has('fnofriends')) {
//                    $query->doesntHave('friend_accounts');
//                }
//            }, true)
            ->rawColumns(['btn_request', 'icon']);
        return $data->make(true);
    }

    public function request(Request $request)
    {
        if(!$request->has('id'))
            return response()->json(['status' => 'error']);
        $requestedAccount = Account::find(_d($request->get('id')));
        if(!$requestedAccount)
            return response()->json(['status' => 'error']);

        $user = Auth::getUser();
        $frequest = new FRequest();
        $frequest->message = $request->get('message');
        $frequest->requester_id = $user->id;
        $frequest->requester_account_id = $requestedAccount->id;
        $frequest->requested_id = $requestedAccount->user->id;
        if($frequest->save())
            return response()->json(['status' => 'OK']);
        return response()->json(['status' => 'error']);
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
