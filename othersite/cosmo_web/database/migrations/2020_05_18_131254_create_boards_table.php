<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBoardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('boards', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('icon');
            $table->string('color');
            $table->json('roles');

            $table->foreign('category_id')->references('id')->on('categories')
                ->onDelete('cascade');

            $table->foreign('parent_id')->references('id')->on('boards')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('boards');
    }
}
