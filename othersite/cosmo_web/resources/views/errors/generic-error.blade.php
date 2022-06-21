<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Error 404</title>

    <link rel="stylesheet" href="{{asset('css/errors.css')}}">
    <link rel="stylesheet" href="{{asset('css/bootstrap.min.css')}}">
</head>
<body>
<div class="align-middle content text-center">
    <div class="container align-middle">
        <div class="title">
            <img src="{{asset('img/errors/404.svg')}}" alt="" class="error-img">
            <h2>{{ $title ?? 'Something went wrong!' }}</h2>
            <h4>{{ $description }}</h4>
            <a href="{{ route('home') }}">Back to home!</a>
        </div>
    </div>
</div>
</body>
</html>