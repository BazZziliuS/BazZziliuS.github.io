<?php

namespace App\Console\Commands;

use App\Models\Store\Order;
use Illuminate\Console\Command;

class PrunePendingOrders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'prune:pending-orders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Prunes pending orders with the "waiting_for_payment" status';

    /**
     * Execute the console command.
     *
     * @return int
     * @throws \Exception
     */
    public function handle(): int
    {
        $deleted = Order::where([
            ['status', Order::STATUS_WAITING_FOR_PAYMENT],
            ['created_at', '<', now()->subHour()]
        ])->delete();

        $this->info("Pruned $deleted orders.");

        return 0;
    }
}
