<?php

use App\Models\Role;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->integer('permission');
            $table->foreignIdFor(Role::class)
                ->references('id')->on('roles')
                ->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::table('roles', function (Blueprint $table) {
            $table->dropColumn('permissions');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('permissions');

        Schema::table('roles', function (Blueprint $table) {
            $table->json('permissions')->after('color');
        });
    }
}
