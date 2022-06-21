<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Error 500</title>

    <link rel="stylesheet" href="{{asset('css/errors.css')}}">
    <link rel="stylesheet" href="{{asset('css/bootstrap.min.css')}}">
</head>
<body>
    <div class="align-middle content text-center">
        <div class="container align-middle">
            <div class="title">
                <img src="{{asset('img/errors/50x.svg')}}" alt="" class="error-img">
                <h2>Oops!</h2>
                <h4>You're seeing this error because something went wrong in the backend of cosmo.</h4>

                @if(app()->bound('sentry') && !empty(Sentry::getLastEventID()))
                    <p class="msg">If you are the owner of Cosmo, please <a href="https://discord.com/invite/anSyACqMbm" target="_blank">join the TBD Scripts Discord</a> with the code: <code>{{ Sentry::getLastEventID() }}</code></p>
                @endif

                <p>Also, while you wait for a response, please ensure all the requirements are met!</p>
            </div>
        </div>
    </div>
</body>
</html>