@props(['configuration'])

<div class="custom-control custom-switch">
    <input type="checkbox" class="custom-control-input" id="{{ $configuration->key }}"
        name="{{ $configuration->key }}" value="1" {{ (bool) $configuration->value ? 'checked=""' : '' }}>
    <label class="custom-control-label" for="{{ $configuration->key }}"></label>
</div>