<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AccountsRequestsColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('account_friends', function (Blueprint $table) {
            $table->boolean('accepted')->default(false);
            $table->date('request_date')->nullable();
            $table->date('accept_date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('account_friends', function (Blueprint $table) {
            $table->dropColumn('accepted');
            $table->dropColumn('request_date');
            $table->dropColumn('accept_date');
        });
    }
}
