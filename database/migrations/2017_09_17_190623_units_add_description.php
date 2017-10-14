<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UnitsAddDescription extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('units', function (Blueprint $table) {
            $table->string('description')->nullable();
            $table->string('slug')->nullable();
            $table->integer('base_stars')->nullable();
            $table->integer('max_stars')->nullable();
            $table->string('icon_file')->nullable();
            $table->string('icon_one')->nullable();
            $table->string('icon_two')->nullable();
            $table->string('icon_three')->nullable();
            $table->string('icon_four')->nullable();
            $table->string('icon_five')->nullable();
            $table->string('icon_six')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('units', function (Blueprint $table) {
            $table->dropColumn('description');
            $table->dropColumn('slug')->nullable();
            $table->dropColumn('base_stars');
            $table->dropColumn('max_stars');
            $table->dropColumn('icon_name');
            $table->dropColumn('icon_one');
            $table->dropColumn('icon_two');
            $table->dropColumn('icon_three');
            $table->dropColumn('icon_four');
            $table->dropColumn('icon_five');
            $table->dropColumn('icon_six');
        });
    }
}
