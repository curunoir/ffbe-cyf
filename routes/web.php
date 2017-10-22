<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Auth::routes();
Route::group(['prefix' => TranslationStatic::getRoutePrefix(), 'middleware' => ['auth']], function () {

    Route::get('/', function () {
        return redirect(action('HomeController@index'));
    });

    Route::get('home', 'HomeController@index')->name('home');

    Route::put('account/new','ProfileController@newAccount')->name('account.new');

    Route::resource('friends', 'FriendsController');
    Route::resource('accounts', 'AccountsController');
    Route::resource('units', 'UnitsController');

    Route::post('ajax/searchfriends', 'FriendsController@searchfriends');

    Route::get('ajax/testpusher', 'HomeController@ajaxtestpusher');

    Route::get('units/create/6', 'UnitsController@create6');
    Route::get('units/create/5', 'UnitsController@create5');
    Route::get('unitsmultipleedit', 'UnitsController@multiple');

    Route::post('ajax/unit/update', 'UnitsController@updateajax');

    Auth::routes();
});

Route::group(['prefix' => TranslationStatic::getRoutePrefix()], function () {
    Auth::routes();

});

Auth::routes();