<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Yajra\DataTables\Facades\DataTables;
use App\Account;
use App\Request as FRequest;
use App\User;
use App\Friend;
use Carbon\Carbon;

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
//        getDatatables(true);
        getLastDatatables();
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
            ->leftJoin('requests', 'requests.requested_id', '=', 'users.id' )
            ->leftJoin('friends', 'friends.user_id', '=', 'users.id' )
            ->where('users.id', '!=', $user->id)
            ->whereNotIn('users.id', function($query) use ($user) {
                $query->select('friend_id')
                    ->from(with(new Friend)->getTable())
                    ->where('user_id', '=', $user->id);
            })
            ->whereNotIn('users.id', function($query) use ($user) {
                $query->select('requested_id')
                    ->from(with(new FRequest)->getTable())
                    ->where('requester_id', '=', $user->id);
            });

        $data = Datatables::of($model)
            ->editColumn('btn_request', function ($value) {
                $text =  '<button data-name="'.$value->user_name .'" data-id="'._c($value->id) .'" class="request_friend btn btn-primary btn-icon"> '._t('Demander').' <i class="fa fa-handshake-o icon-lg"></i></button>';
                return $text;
            })
            ->editColumn('icon', function ($value) {
                $text =  '<img src="'. asset( 'storage/'.$value->current_unit->icon_file).'">';
                return $text;
            })
            ->setRowId(function ($value) {
                return $value->reference_id;
            })
            ->filter(function ($query) {
                if (request()->has('fserver')) {
                    $fserver = request()->get('fserver');
                    $query->where("accounts.server", '=', $fserver);
                }
            }, true)
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
        $model = FRequest::select('requests.*', 'requests.id as request_id',
            'units.name as units.name',
            'units.icon_file as icon',
            'requester_account.current_unit_description as requester_account.current_unit_description',
            'users.name as user_name',
            'requester_account.rank as requester_account.rank',
            'requester_account.server as requester_account.server'
        )
        ->leftJoin('accounts as requester_account', 'requests.requester_account_id', '=', 'requester_account.id')
        ->leftJoin('accounts as requested_account', 'requests.requested_account_id', '=', 'requested_account.id')
        ->leftJoin('units as units', 'units.id', '=', 'requester_account.current_unit_id' )
        ->leftJoin('users', 'users.id', '=', 'requests.requester_id' )
        ->where('requests.requested_id', '=', $user->id);

        $data = Datatables::of($model)
            ->editColumn('btn_request', function ($value) {
                $text =  '<button data-id="'._c($value->request_id) .'" class="accept_friend btn btn-primary btn-icon">  <i class="fa fa-handshake-o icon-lg"></i></button>';
                $text .= '<button data-id="'._c($value->request_id) .'" class="btn btn-danger btn-icon delete_request"> <i class="fa fa-trash icon-lg"></i> </button>';
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

    public function acceptfriend(Request $request)
    {
        if(!$request->has('id'))
            return response()->json(['status' => 'error']);
        $acceptedRequest = FRequest::find(_d($request->get('id')));
        if(!$acceptedRequest)
            return response()->json(['status' => 'error']);
        $user = Auth::getUser();
        if($user->id != $acceptedRequest->requested_id)
            return response()->json(['status' => 'error wrong request ids']);

        $friend = new Friend();
        $friend->user_id             = $user->id;
        $friend->friend_id           = $acceptedRequest->requester_id;
        $friend->accept_date         = Carbon::now();
        $friend->user_account_id     = $acceptedRequest->requested_account_id;
        $friend->friend_account_id   = $acceptedRequest->requester_account_id;
        if(!$friend->save())
            return response()->json(['status' => 'error']);
        $friend = new Friend();
        $friend->user_id            = $acceptedRequest->requester_id;
        $friend->friend_id          = $user->id;
        $friend->accept_date        = Carbon::now();
        $friend->friend_account_id  = $acceptedRequest->requested_account_id;
        $friend->user_account_id    = $acceptedRequest->requester_account_id;
        if($friend->save()) {
            if($acceptedRequest->delete())
                return response()->json(['status' => 'OK']);
        }
        return response()->json(['status' => 'error']);
    }

    public function deleteRequest(Request $request)
    {
        if(!$request->has('id'))
            return response()->json(['status' => 'error']);
        $acceptedRequest = FRequest::find(_d($request->get('id')));
        if(!$acceptedRequest)
            return response()->json(['status' => 'error']);
        $user = Auth::getUser();
        if($user->id != $acceptedRequest->requested_id)
            return response()->json(['status' => 'error wrong request ids']);
        if($acceptedRequest->delete())
            return response()->json(['status' => 'OK']);
        return response()->json(['status' => 'error']);
    }


}
