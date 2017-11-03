<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConversationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('conversations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_one_id');
            $table->integer('user_two_id');
            $table->boolean('status');
            $table->timestamps();
        });

        Schema::table('messages', function (Blueprint $table) {
            $table->boolean('is_seen')->default(0);
            $table->boolean('deleted_from_sender')->default(0);
            $table->boolean('deleted_from_receiver')->default(0);
            $table->integer('conversation_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('messages', function (Blueprint $table) {
            $table->dropColumn('is_seen');
            $table->dropColumn('deleted_from_sender');
            $table->dropColumn('deleted_from_receiver');
            $table->dropColumn('conversation_id');
        });
        Schema::dropIfExists('conversations');
    }
}
