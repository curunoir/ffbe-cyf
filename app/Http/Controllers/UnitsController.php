<?php

namespace App\Http\Controllers;

use App\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Facades\UnitsTool;

class UnitsController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('admin');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(UnitsTool $unitsTool)
    {
        $units = Unit::get();

        return view('units.index', compact('units'));
    }


    public function create6(UnitsTool $unitsTool)
    {
        $unit = new Unit();
        $maxstars = 6;
        $icon = $unitsTool::getFirstUnknownForMaxStars($maxstars);
        if($icon)
            return view('units.create', compact('unit', 'icon', 'maxstars'));
        else
            return redirect()->back()->with('error', "Plus d'icones d'unités 6 étoiles a ajouter");
    }

    public function create5(UnitsTool $unitsTool)
    {
        $unit = new Unit();
        $maxstars = 5;
        $icon = $unitsTool::getFirstUnknownForMaxStars($maxstars);
        if($icon)
            return view('units.create', compact('unit', 'icon', 'maxstars'));
        else
            return redirect()->back()->with('error', "Plus d'icones d'unités 5 étoiles a ajouter");
    }


    public function multiple(UnitsTool $unitsTool)
    {
        getDatatables(true);
        $units = Unit::orderBy('icon_file')->get();
        return view('units.multiple', compact('units'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => [
                'required'
            ]
        ]);
        $req = $request->all();
        if($req['max_stars'] == 6)
            $req['icon_six'] =  $req['icon_file'];
        $unit =  Unit::create($req);

        return redirect(action('UnitsController@create'.$req['max_stars']))->with('success', _t("Unité ajoutée avec succès"));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $account = Account::findOrFail(_d($id));

        return view('accounts.edit', compact('account'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function updateajax(Request $request)
    {
        if($request->has('id') && $request->has('name') ) {
            $unit = Unit::find($request->get('id'));
            $unit->name = $request->get('name');
            $unit->validation = true;
            if($unit->save())
                return 'OK';
            else
                return 'NOK';
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
