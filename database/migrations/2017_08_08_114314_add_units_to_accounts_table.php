<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUnitsToAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('accounts', function (Blueprint $table) {
			$table->string('rank')->nullable();
			$table->unsignedInteger('current_unit_id')->nullable();
			$table->string('current_unit_description')->nullable();
			$table->unsignedInteger('desired_unit_id')->nullable();
			$table->string('desired_unit_comments')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('accounts', function (Blueprint $table) {
			$table->dropColumn('rank');
			$table->dropColumn('current_unit_id');
			$table->dropColumn('current_unit_description');
			$table->dropColumn('desired_unit_id');
			$table->dropColumn('desired_unit_comments');
        });
    }
}
