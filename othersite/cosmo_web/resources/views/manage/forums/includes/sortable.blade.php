<div class="list-group nested-sortable-1">
    @foreach($boardsCol->where('category_id', $cat->id) as $board)
        @if(isset($boards[$board->id]))
            <div class="list-group-item" data-id="{{$board->id}}" data-category-id="{{$board->category_id}}">
                @include('manage.forums.includes.modals')

                @include('manage.forums.includes.sortable', ['boardsCol' => $boards[$board->id]])
            </div>
        @else
            <div class="list-group-item" data-id="{{$board->id}}" data-category-id="{{$board->category_id}}">
                @include('manage.forums.includes.modals')

                <div class="list-group nested-sortable-1"></div>
            </div>
        @endif
    @endforeach
</div>
