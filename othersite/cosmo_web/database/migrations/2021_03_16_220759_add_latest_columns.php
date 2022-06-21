<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLatestColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('boards', function(Blueprint $table) {
            $table->unsignedBigInteger('latest_thread_id')->nullable()->after('parent_id');
            $table->foreign('latest_thread_id')->references('id')->on('threads')->nullOnDelete();
        });

        Schema::table('threads', function(Blueprint $table) {
            $table->unsignedBigInteger('latest_post_id')->nullable()->after('user_id');
            $table->foreign('latest_post_id')->references('id')->on('posts')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('boards', function(Blueprint $table) {
            $table->dropForeign('boards_latest_thread_id_foreign');
            $table->dropColumn('latest_thread_id');
        });

        Schema::table('threads', function(Blueprint $table) {
            $table->dropForeign('threads_latest_post_id_foreign');
            $table->dropColumn('latest_post_id');
        });
    }
}
