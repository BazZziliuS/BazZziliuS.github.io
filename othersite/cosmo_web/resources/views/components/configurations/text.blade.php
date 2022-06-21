@props(['configuration'])

<div class="form-group mb-0">
    <input type="text" class="form-control" id="{{ $configuration->key }}" value="{{ $configuration->value }}"
           placeholder="{{ $configuration->display_name }}" name="{{ $configuration->key }}">
</div>