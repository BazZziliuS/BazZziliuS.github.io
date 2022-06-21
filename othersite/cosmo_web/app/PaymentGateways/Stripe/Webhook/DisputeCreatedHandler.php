<?php

namespace App\PaymentGateways\Stripe\Webhook;

use App\Models\Store\Transactions\StripeTransaction;
use Barryvdh\DomPDF\Facade as PDF;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Stripe\Dispute;
use Stripe\Event;
use Stripe\Exception\ApiErrorException;
use Stripe\File;

class DisputeCreatedHandler
{
    /** @var \Stripe\Event */
    protected $event;

    /** @var \Stripe\Dispute */
    protected $dispute;

    public function __construct(Event $event)
    {
        $this->event = $event;
        $this->dispute = Dispute::constructFrom($event->data['object']);
    }

    public function __invoke()
    {
       if (!$this->dispute->payment_intent) return;

       /** @var StripeTransaction $transaction */
       $transaction = StripeTransaction::wherePaymentIntentId($this->dispute->payment_intent)->first();
       if (!$transaction) return;

       $transaction->order->buyer->ban('Stripe Dispute');

       try {
           $this->uploadEvidence($transaction);
       } catch (ApiErrorException $ex) {
           Log::error('Could not upload the evidence file to Stripe.');
       }
    }

    /**
     * Creates a PDF file of the evidence views
     * and uploads it to stripe and updates the dispute with the File id
     *
     * @throws \Stripe\Exception\ApiErrorException
     */
    protected function uploadEvidence(StripeTransaction $transaction)
    {
        /** @var \Barryvdh\DomPDF\PDF $pdf */
        $pdf = PDF::loadView('pdf.evidence', [
            'order' => $transaction->order
        ]);

        $pdfFile = Storage::put('temp.pdf', $pdf->output());
        if (!$pdfFile) return;

        $file = File::create([
            'file' => Storage::readStream('temp.pdf'),
            'purpose' => 'dispute_evidence'
        ]);

        Dispute::update($this->dispute->id, [
            'evidence' => [
                'customer_email_address' => $transaction->buyer_email,
                'customer_purchase_ip' => $transaction->order->ip_address,
                'refund_policy' => $file->id
            ],
        ]);

        Storage::delete('temp.pdf');
    }
}