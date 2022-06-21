<?php

use App\Models\Store\Order;
use App\Models\Store\Transactions\PayPalTransaction;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RefactorOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // It makes more sense with the table being called orders now
        Schema::rename('transactions', 'orders');

        // Cache order data before it gets deleted
        $orders = Order::all();

        // If the transaction_id has data, and we try to convert a string column to a bigint column.
        // It will error, so we need to reset the transactions, don't worry they are still cached in memory above.
        Order::query()
            ->update([
                'transaction_id' => null
            ]);

        // Now all the data is safe in the other table, we can modify the orders table
        Schema::table('orders', function(Blueprint $table) {
            $table->dropColumn('order_id', 'transaction_id');
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->string('transaction_type')->nullable()->after('buyer_id');
            $table->unsignedBigInteger('transaction_id')->nullable();

            $table->unique(['transaction_type', 'transaction_id']);
        });

        // Turn all existing orders into paypal transactions
        $orders->each(function (Order $order) {
            PayPalTransaction::create([
                'order_id' => $order->order_id,
                'transaction_id' => $order->transaction_id
            ])->order()->save($order);
        });

        // Well, we're renaming the model, so we shall rename relations aswell
        Schema::table('actions', function (Blueprint $table) {
            $table->renameColumn('transaction_id', 'order_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     * @throws Exception
     */
    public function down()
    {
        // Rename the relations back
        Schema::table('actions', function(Blueprint $table) {
            $table->renameColumn('order_id', 'transaction_id');
        });

        // Revert the orders table back to the old structure
        Schema::table('orders', function(Blueprint $table) {
            $table->dropUnique(['transaction_type', 'transaction_id']);
            $table->dropColumn('transaction_type', 'transaction_id');
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->string('order_id')->nullable();
            $table->string('transaction_id')->nullable();
        });

        // Transform the current paypal transaction back to orders
        PayPalTransaction::all()
            ->each(function (PayPalTransaction $transaction) {
                Order::where('transaction_id', $transaction->id)->update([
                    'order_id' => $transaction->order_id,
                    'transaction_id' => $transaction->transaction_id
                ]);

                $transaction->delete();
            });

        // And last but not least, revert the orders table name back
        Schema::rename('orders', 'transactions');
    }
}
