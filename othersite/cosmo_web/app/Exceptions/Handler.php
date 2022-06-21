<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use SocialiteProviders\Steam\OpenIDValidationException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        OpenIDValidationException::class,
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password', 'password_confirmation',
    ];

    public function register()
    {
        $this->reportable(function(Throwable $e) {
            if (!app()->bound('sentry') || $this->shouldntReport($e) || !$this->inProduction()) return;
            
            app('sentry')->captureException($e);
        });
    }

    protected function inProduction(): bool
    {
        return app()->environment(['production', 'prod']);
    }
}
