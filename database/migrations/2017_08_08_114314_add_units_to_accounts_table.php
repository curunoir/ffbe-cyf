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
			$table->string('rank');
			$table->unsignedInteger('current_unit_id')->default(null);
			$table->string('current_unit_description');
			$table->unsignedInteger('desired_unit_id')->default(null);
			$table->string('desired_unit_comments');
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
