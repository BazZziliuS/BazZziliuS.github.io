@props(['configuration'])

<div>
    <select class="selectpicker stripe-payments-select" multiple data-live-search="true">
        @foreach(config('cosmo.stripe_payment_methods') as $method)
            <option {{ str_contains($configuration->value ?? '', $method) ? 'selected' : '' }}>
                {{ $method }}
            </option>
        @endforeach
    </select>

    <input type="hidden" name="{{ $configuration->key }}" id="{{ $configuration->key }}"
           value="{{ $configuration->value }}">
</div>

@once
    @push('scripts')
        <script>
            document.querySelector('.stripe-payments-select').addEventListener('change', function(e) {
                let val = $(e.target).val() ?? [];

                e.target.parentElement.parentElement.querySelector('input[type="hidden"]').value = JSON.stringify(val);
            });
        </script>
    @endpush
@endonce

@once
    @push('meta')
        <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css"/>
    @endpush

    @push('scripts')
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
    @endpush
@endonce