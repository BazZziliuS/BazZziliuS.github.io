<?php

use Illuminate\Support\Str;

if (!function_exists('clamp')) {
    /**
     * Clamps a numeric value between a minimal and maximal value
     *
     * @param numeric $input
     * @param numeric $min
     * @param numeric $max
     * @return numeric
     */
    function clamp($input, $min, $max)
    {
        return max($min, min($input, $max));
    }
}

if (!function_exists('truncate')) {
    /**
     * Helper for string limit function
     *
     * @return string
     */
    function truncate()
    {
        return Str::limit(...func_get_args());
    }
}

if (!function_exists('proxy_image')) {
    /**
     * Generates a route through the image proxy
     *
     * @param string $url
     * @return string
     */
    function proxy_image(string $url): string
    {
        return 'https://proxy.duckduckgo.com/iu/?' . http_build_query([
            'u' => $url
        ]);
    }
}

if (!function_exists('write_to_env')) {
    function write_to_env(array $arr)
    {
        $path = base_path('.env');
        if (!file_exists($path)) {
            file_put_contents($path, '');
        }

        $envContent = file_get_contents($path);

        foreach ($arr as $key => $value) {
            $key = strtoupper($key);
            $value = $value ?: '';

            // Check if the value contains spaces and isn't already surrounded by quotes, if so add quotes
            if (str_contains($value, ' ') || !preg_match('/\"(.*)\"/', $value)) {
                $value = "\"$value\"";
            }

            $save = "$key=$value";
            $pattern = "/^$key=(.*)$/m";

            if (preg_match_all($pattern, $envContent) == 0) {
                $envContent = $envContent . PHP_EOL . $save;
            } else {
                $envContent = preg_replace($pattern, $save, $envContent);
            }
        }

        file_put_contents($path, $envContent);
    }
}