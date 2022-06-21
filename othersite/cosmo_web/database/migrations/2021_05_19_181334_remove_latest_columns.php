<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveLatestColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('boards', function(Blueprint $table) {
            $table->dropConstrainedForeignId('latest_thread_id');
        });

        Schema::table('threads', function(Blueprint $table) {
            $table->dropConstrainedForeignId('latest_post_id');
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
            $table->unsignedBigInteger('latest_thread_id')->nullable()->after('parent_id');
            $table->foreign('latest_thread_id')->references('id')->on('threads')->nullOnDelete();
        });

        Schema::table('threads', function(Blueprint $table) {
            $table->unsignedBigInteger('latest_post_id')->nullable()->after('user_id');
            $table->foreign('latest_post_id')->references('id')->on('posts')->nullOnDelete();
        });
    }
}
