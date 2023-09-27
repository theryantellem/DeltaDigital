<?php

namespace App\Http\Resources\Cyborg;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExchangeBindResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'api_key' => $this->api_key,
            'api_secret' => $this->api_secret,
            'api_passphrase' => $this->api_passphrase,
            'balance' => $this->balance,
            'is_binded' => $this->is_binded ? true : false,
        ];
    }
}
