@props(['action' => []])

<div>
    <small>Available string replacements are: <code>:sid64</code> (SteamID64 of receiver), <code>:sid</code> (SteamID of receiver), <code>:nick</code> (name of receiver)</small>

    <div class="form-group mt-3">
        <div>
            <label for="concommand_cmd">Command</label>
            <input type="text" class="form-control" name="actions[console_command][cmd]"
                   placeholder="ulx adduser :nick superadmin" id="concommand_cmd"
                   value="{{isset($action['cmd']) ? $action['cmd'] : ''}}">
        </div>

        <div class="mt-3">
            <label for="concommand_expire_command">Expire Command</label>

            <input type="text" class="form-control" name="actions[console_command][expire_cmd]"
                   placeholder="ulx adduser :nick user" id="concommand_expire_command"
                   value="{{isset($action['expire_cmd']) ? $action['expire_cmd'] : ''}}">
        </div>
    </div>
</div>