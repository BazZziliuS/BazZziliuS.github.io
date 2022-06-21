@push('scripts')
    <script src="https://js.stripe.com/v3/"></script>
    <script>
        const stripe = Stripe('{{ config('cosmo.configs.stripe_public_key') }}');

        stripe.redirectToCheckout({ sessionId: '{{ $session }}' })
            .then(function(result) {
                if (typeof result.error !== 'undefined') {
                    toastr.error('An error occurred while trying to redirect to Stripe checkout.');
                }
            });
    </script>
@endpush