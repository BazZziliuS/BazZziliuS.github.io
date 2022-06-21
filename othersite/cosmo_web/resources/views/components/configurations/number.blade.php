@props(['configuration'])

<div class="form-group mb-0">
    <input type="number" class="form-control" id="{{ $configuration->key }}" value="{{ $configuration->value }}"
           placeholder="{{ $configuration->display_name }}" name="{{ $configuration->key }}">
</div>