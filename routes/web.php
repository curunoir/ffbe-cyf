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

Route::get('/', 'HomeController@index')->name('home');

Auth::routes();

Route::get('home', 'HomeController@index')->name('home');
Route::get('profile','ProfileController@index')->name('profile');
Route::put('profile','ProfileController@update')->name('profile.update');

Route::put('account/new','ProfileController@newAccount')->name('account.new');

Route::resource('friends', 'FriendsController');