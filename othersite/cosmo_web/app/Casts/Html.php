<?php

namespace App\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Support\HtmlString;
use Mews\Purifier\Facades\Purifier;
use DOMDocument;

class Html implements CastsAttributes
{
    private const PROXY_REGEX = '/^https:\/\/proxy\.duckduckgo\.com\/iu\/\?u=(.*?)$/m';

    /**
     * Cast the given value.
     *
     * @param        $model
     * @param string $key
     * @param mixed $value
     * @param array $attributes
     * @return HtmlString
     */
    public function get($model, string $key, $value, array $attributes)
    {
        return new HtmlString($value ?: '');
    }

    /**
     * Prepare the given value for storage.
     *
     * @param        $model
     * @param string $key
     * @param mixed $value
     * @param array $attributes
     * @return mixed
     */
    public function set($model, string $key, $value, array $attributes)
    {
        $value = (string)$value;

        if (!empty($value)) {
            $doc = new DOMDocument();

            // This is necessary to treat the HTML as UTF-8
            $doc->loadHTML("
                <html>
                <head>
                    <meta charset=\"UTF-8\">
                    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">
                </head>
                <body>" . $value . "</body>
                </html>
            ");

            /** @var \DOMElement $element */
            foreach ($doc->getElementsByTagName('img') as $element) {
                if ($element->hasAttribute('src')) {
                    $url = $element->getAttribute('src');

                    if (!preg_match(self::PROXY_REGEX, $url)) {
                        $element->setAttribute('src', proxy_image($url));
                    }
                }
            }

            $value = $doc->saveHTML();
        }

        return Purifier::clean($value);
    }
}
