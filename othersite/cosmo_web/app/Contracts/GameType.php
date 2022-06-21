<?php

namespace App\Contracts;

use App\Models\Index\Server;
use App\Support\ServerInfo;

interface GameType
{
    public function getServerInfo(Server $server): ServerInfo;
}