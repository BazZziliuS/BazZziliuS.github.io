<?php

namespace App\Support;

use Illuminate\Http\JsonResponse;

class ServerInfo
{
    private bool $failed;
    private ?string $failMessage;

    private string $map;

    private int $players;
    private int $maxPlayers;

    public function __construct(bool $failed = false, string $failMessage = null)
    {
        $this->failed = $failed;
        $this->failMessage = $failMessage;
    }

    public function setMap(string $map): self
    {
        $this->map = $map;

        return $this;
    }

    public function setPlayers(int $value): self
    {
        $this->players = $value;

        return $this;
    }

    public function setMaxPlayers(int $value): self
    {
        $this->maxPlayers = $value;

        return $this;
    }

    public function toResponse(): JsonResponse
    {
        if ($this->failed) {
            return response()->json([
                'message' => $this->failMessage,
            ], 204);
        }

        return response()->json([
            'map' => $this->map,
            'players' => $this->players,
            'max_players' => $this->maxPlayers,
        ]);
    }

    public static function make(): self
    {
        return new self();
    }

    public static function failed(string $failMessage): self
    {
        return new self(true, $failMessage);
    }
}