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
            'users.name as user_name',
            'accounts.name as account_name'
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
            ->rawColumns(['btn_request', 'icon']);
        return $data->make(true);
    }

    /**
     * Search friends for requests for current user
     * @return mixed
     */
    public function receivedRequestsIndex()
    {
        $user = Auth::getUser();
        getDatatables(true);
        getValidate();
        return view('friends.receivedRequestsIndex', compact('user'));
    }

    /**
     * Search friends for requests for current user
     * @return mixed
     */
    public function receivedRequests()
    {
        $user = Auth::getUser();
        $model = FRequest::select('requests.*',
            'units.name as units.name',
            'units.icon_file as icon',
            'users.name as user_name'
        )
        ->leftJoin('accounts as requester_account', 'requests.requester_account_id', '=', 'requester_account.id')
        ->leftJoin('accounts as requested_account', 'requests.requested_account_id', '=', 'requested_account.id')
        ->leftJoin('units', 'units.id', '=', 'accounts.current_unit_id' )
        ->leftJoin('users', 'users.id', '=', 'requests.requester_id' )
        ->where('requests.requested_id', '=', $user->id);

        $data = Datatables::of($model)
            ->editColumn('btn_request', function ($value) {
                $text =  '<button data-name="'.$value->user_name .'" data-id="'._c($value->id) .'" class="request_friend btn btn-mint btn-icon"><i class="fa fa-pencil icon-lg"></i></button>';
                return $text;
            })
            ->editColumn('icon', function ($value) {
                $text =  '<img src="'. asset( 'storage/'.$value->icon).'">';
                return $text;
            })
            ->editColumn('rank', function ($value) {
                $text =  $value->rank;
                return $text;
            })
            ->editColumn('description', function ($value) {
                $text =  $value->current_unit->description;
                return $text;
            })
            ->editColumn('server', function ($value) {
                $text =  $value->requester_account->server;
                return $text;
            })
            ->rawColumns(['btn_request', 'icon']);
        return $data->make(true);
    }

    public function requestModal(Request $request)
    {
        $user = Auth::getUser();
        $requestedId = $request->get('id');
        $requestedName = $request->get('name');
        return view('friends.requestModal', compact('user', 'requestedId', 'requestedName'));
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
        $frequest->message              = $request->get('message');
        $frequest->requester_id         = $user->id;
        $frequest->requested_account_id = $requestedAccount->id;
        $frequest->requester_account_id = _d($request->get('requester_account_id'));
        $frequest->requested_id         = $requestedAccount->user->id;
        if($frequest->save())
            return response()->json(['status' => 'OK']);
        return response()->json(['status' => 'error']);
    }

}
