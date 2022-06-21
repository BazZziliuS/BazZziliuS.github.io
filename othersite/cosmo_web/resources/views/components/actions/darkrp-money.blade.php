@props(['action' => []])

<div>
    <div class="form-group">
        <label for="exampleInputEmail1">Amount</label>
        <input type="number" class="form-control" name="actions[darkrp_money][amount]" placeholder="500"
               value="{{isset($action['amount']) ? $action['amount'] : 0}}">
    </div>
</div>