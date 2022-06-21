The following is an automated response from {{ config('app.name') }} Store,

Upon the purchase of "{{ $order->package->name }}" via our automated store ({{ route('store.index') }}),
You agreed to our <a href="{{ route('store.tos') }}">Terms Of Service</a>,whereby you agreed that you acknowledge we do not offer refunds.

Digital Receipt:
- Purchased Package: {{ $order->package->name }}
- Purchased PackageID: {{ $order->package->id }}
- Time of Transaction: {{ $order->created_at }},
- Internal Transaction ID: {{ $order->id }}

Waiting Period:
The waiting period will be described as the amount of time the customer has to wait
until the order is completely processed and their package has been delivered.

Full terms of service:
{!! config('cosmo.configs.terms_of_service') !!}
