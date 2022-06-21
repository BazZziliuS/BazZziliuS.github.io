window.giveLike = function(steamId) {
    Axios.post('/users/' + steamId + '/like')
        .then(function(res) {
            const likeAmount = document.getElementById('likes-amount');

            let likes = parseInt(likeAmount.innerText) ?? 0;
            if (res.status === 201) {
               likes++;
            } else {
                likes--;
            }

            likeAmount.innerText = likes;
        })
        .catch(function() {
            toastr.error('An error occurred while trying to like the user.');
        });
}