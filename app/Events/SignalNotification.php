<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SignalNotification implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $educator;
    public $signal;
     public $event;

    /**
     * Create a new event instance.
     */
    public function __construct($educator,$signal, $event)
    {
        $this->educator = $educator;
        $this->signal = $signal;
        $this->event = $event;

    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel("signals.{$this->educator}"),
        ];
    }

    public function broadcastAs()
    {
        return "signal-{$this->event}";
    }

    public function broadcastWith()
    {
        return [
            'message' => "Signal {$this->event}",
            'data' => $this->signal
        ];
    }
}
