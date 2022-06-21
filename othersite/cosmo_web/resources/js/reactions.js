if (typeof $ !== 'undefined') {
    $('[reaction-post]').each(function() {
        let obj = $(this);
        let postId = obj.data('post-id'),
            reactionId = obj.data('reaction-id');

        obj.click(function() {
            if(obj.closest('.add-reaction').hasClass(`has-reacted-${postId}`)) {
                toastr.warning('You have already reacted to this post!');
                return;
            }

            Axios.post('/forums/posts/' + postId + '/react', {
                reaction: reactionId
            }).then(function() {
                location.reload();
            }).catch(function() {
                toastr.error('An error occurred while trying to react to the post.');
            });
        });
    });

    $('[reaction-thread]').each(function() {
        let obj = $(this);
        let threadId = obj.data('thread-id'),
            reactionId = obj.data('reaction-id');

        obj.click(function() {
            if(obj.closest('.add-reaction').hasClass(`has-reacted-${threadId}`)) {
                toastr.warning('You have already reacted to this thread!');
                return;
            }

            Axios.post('/forums/threads/' + threadId + '/react', {
                reaction: reactionId
            }).then(function() {
                location.reload();
            }).catch(function() {
                toastr.error('An error occurred while trying to react to the thread.');
            });
        });
    });
}