<?php

namespace App\PaymentGateways\PayPal\Webhook;

use App\Models\Store\Order;
use App\PaymentGateways\PayPal\Dispute\SendEvidence;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use PayPal\Exception\PayPalConfigurationException;

class DisputeEvent
{
    private $body;
    private $transaction;

    /**
     * DisputeEvent constructor.
     *
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->body = json_decode($request->getContent());
        $this->transaction = $this->getTransaction();
    }

    /**
     * Gets the store transaction linked with the dispute
     *
     * @return Order|Builder|Model
     */
    private function getTransaction()
    {
        if ($this->transaction) return $this->transaction;

        $id = $this->body->resource->disputed_transactions[0]->seller_transaction_id;
        return Order::where('transaction_id', $id)->firstOrFail();
    }

    /**
     * Checks the event type and responds accordingly
     *
     * @throws PayPalConfigurationException
     * @throws GuzzleException
     */
    public function execute()
    {
        $event = $this->body->event_type;
        if ($event === 'CUSTOMER.DISPUTE.CREATED') {
            $this->onDisputeCreated();
        } else if ($event === 'CUSTOMER.DISPUTE.UPDATED') {
            $this->onDisputeUpdated();
        }
    }

    /**
     * Handles when a dispute was created
     */
    private function onDisputeCreated()
    {
        $this->transaction->buyer->ban('PayPal Chargeback');
    }

    /**
     * Handles when a dispute was updated
     *
     * @throws PayPalConfigurationException
     * @throws GuzzleException
     */
    private function onDisputeUpdated()
    {
        if ($this->body->resource->status !== "WAITING_FOR_SELLER_RESPONSE") return;

        $lifeCycle = $this->body->resource->dispute_life_cycle_stage;
        $disputeId = $this->body->resource->dispute_id;
        $model = null;

        if ($lifeCycle === "INQUIRY") {
            //$model = new SendMessage($disputeId, "");
        } elseif ($lifeCycle === "CHARGEBACK") {
            $model = new SendEvidence($disputeId, $this->transaction);
        } else return;

        $model->execute();
    }
}
