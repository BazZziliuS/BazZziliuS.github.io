<?php

namespace App\View\Components;

use Illuminate\Support\Str;
use Illuminate\View\Component;
use App\Models\Configuration as ConfigurationModel;

class Configuration extends Component
{
    /**
     * @var ConfigurationModel $configuration
     */
    public $configuration;

    public function __construct(ConfigurationModel $configuration)
    {
        $this->configuration = $configuration;
    }

    public function render()
    {
        $component = 'components.configurations.' . Str::slug($this->configuration->type);

        return view($component, [
            'configuration' => $this->configuration
        ]);
    }
}
