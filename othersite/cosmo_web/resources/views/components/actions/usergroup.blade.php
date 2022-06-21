@props(['action' => []])

<div>
    <div class="form-group">
        <label for="usergroup_">Group</label>
        <input type="text" class="form-control" name="actions[usergroup][group]" placeholder="vip"
               value="{{isset($action['group']) ? $action['group'] : 'vip'}}">
    </div>

    <div class="form-group">
        <label for="expire_group">Expiration Group (group that will be set if the package expires)</label>
        <input type="text" class="form-control" name="actions[usergroup][expire_group]" placeholder="user"
               value="{{isset($action['expire_group']) ? $action['expire_group'] : 'user'}}">
    </div>
</div>