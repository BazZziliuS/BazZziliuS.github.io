@props(['action' => []])

<div>
    <div class="alert alert-warning" role="alert">
        We don't recommend using this action type, always try to use a console command or an other applicable type.
    </div>

    <small>Available string replacements are: <code>:sid64</code> (SteamID64 of receiver), <code>:sid</code> (SteamID of receiver), <code>:nick</code> (name of receiver)</small>

    <div class="form-group mt-3">
        <div>
            <label for="custom_lua_on_bought">On Package Bought</label>
            <br>

            <textarea class="form-control" name="actions[custom_lua][on_bought]"
                      id="custom_lua_on_bought" no-tinymce>
            {{isset($action['on_bought']) ? $action['on_bought'] : ''}}
        </textarea>
        </div>

        <div class="mt-3">
            <label for="custom_lua_on_expired">On Package Expired</label>
            <br>

            <textarea class="form-control" name="actions[custom_lua][on_expired]"
                      id="custom_lua_on_expired" no-tinymce>
            {{isset($action['on_expired']) ? $action['on_expired'] : ''}}
        </textarea>
        </div>
    </div>
</div>