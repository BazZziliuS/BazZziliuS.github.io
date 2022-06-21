<?php

namespace App\Models;

use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

/**
 * @mixin IdeHelperConfiguration
 */
class Configuration extends Model
{
    private static array $encryptedKeys = [
        'discord_bot_token',
        'discord_client_secret',
        'discord_webhook_url',
        'paypal_client_id',
        'paypal_client_secret',
        'paypal_webhook_id',
        'coinbase_api_key',
        'coinbase_webhook_secret',
        'stripe_secret_key',
        'stripe_webhook_secret'
    ];

    private static array $environmentalKeys = [
        'gms_api_key' => 'GMS_API',
    ];

    protected $fillable = [
        'value'
    ];

    public function getEncryptedAttribute(): bool
    {
        return in_array($this->key, static::$encryptedKeys);
    }

    public function getEnvironmentalAttribute(): bool
    {
        return array_key_exists($this->key, static::$environmentalKeys);
    }

    public function getValueAttribute($attr)
    {
        if ($this->encrypted && !empty($attr)) {
            try {
                return Crypt::decrypt($attr);
            } catch (DecryptException $ex) {
                $this->update([
                    'value' => $attr
                ]);

                return null;
            }
        }

        return $attr;
    }

    public function setValueAttribute($attr)
    {
        if ($this->environmental) {
            $envKey = static::$environmentalKeys[$this->key];

            write_to_env([
                $envKey => $attr,
            ]);
        }

        if ($this->encrypted && !empty($attr)) {
            $attr = Crypt::encrypt($attr);
        }

        $this->attributes['value'] = $attr;
    }
}
