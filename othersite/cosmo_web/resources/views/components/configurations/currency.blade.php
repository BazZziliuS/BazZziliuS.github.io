<select class="custom-select" name="{{ $configuration->key }}">
    @foreach(config('cosmo.currencies') as $cur => $sym)
        <option value="{{ $cur }}" {{ $cur === $configuration->value ? 'selected=""' : '' }}>
                {{ $cur }} - {{ $sym }}
        </option>
    @endforeach
</select>