<label for="{{ $configuration->key }}"></label>
<textarea name="{{ $configuration->key }}" id="{{ $configuration->key }}">
    {!! $configuration->value !!}
</textarea>