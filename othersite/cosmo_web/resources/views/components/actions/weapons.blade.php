@props(['action' => []])

<div>
    <div class="mb-3">
        <label for="weapons_classes">Weapon Classes</label><br/>
        <select multiple data-role="tagsinput" id="weapons_classes" name="actions[weapons][classes][]">
            @if (isset($action['classes']))
                @foreach($action['classes'] as $class)
                    <option value="{{ $class }}">{{ $class }}</option>
                @endforeach
            @endif
        </select>
    </div>

    <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="weapons_perm" name="actions[weapons][perm]"
            value="1" {{ isset($action['perm']) && $action['perm'] ? 'checked=""' : '' }}>
        <label class="custom-control-label" for="weapons_perm">Give on every spawn</label>
    </div>
</div>