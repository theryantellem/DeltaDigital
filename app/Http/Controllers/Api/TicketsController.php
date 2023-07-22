<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Resources\TiceketMessageResource;
use App\Http\Resources\TicketResource;
use App\Models\Ticket;
use App\Models\TicketMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class TicketsController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tickets = TicketResource::collection(Ticket::where('user_id', Auth::user()->id)->get());

        return $this->sendResponse($tickets,"Lists of tickets.");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{

            $validator = Validator::make($request->all(), [
                'subject' => 'required|string',
                'message' => 'required|string',
                'file' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,pdf|max:2048',
            ]);

            // Handle validation errors
            if ($validator->fails()) {
                return $this->sendError("Validation error.", ['errors' => $validator->errors()],Response::HTTP_UNPROCESSABLE_ENTITY );
            }

            $imageUrl = null;

            if($request->hasFile('file'))
            {
                $image = $request->file('file');
                $image_name = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images/strategy'), $image_name);

                $imageUrl = url('/images/tickets/' . $image_name);
            }

            $ticket = Ticket::create([
                'user_id' => $request->user()->id,
                'subject' => $request->subject,
                'status'=>"open"
            ]);

            $ticket->messages()->create([
                'message' => $request->message,
                'file' => $imageUrl
            ]);

            $ticket = new TicketResource($ticket);

            return $this->sendResponse(['ticket' => $ticket],"Ticket created successfully.",Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            logger(['add_tickets' => $th->getMessage()]);

            return $this->sendError("Ops Something went wrong. try again later.",[],Response::HTTP_SERVICE_UNAVAILABLE);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket)
    {
        $ticket = new TicketResource($ticket);

        return $this->sendResponse(['ticket' => $ticket], "Ticket details", Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ticket $ticket)
    {
        try {
            $validator = Validator::make($request->all(), [
                'message' => 'required|string',
                'file' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,pdf|max:2048',
            ]);

            // Handle validation errors
            if ($validator->fails()) {
                    return $this->sendError("Validation error.", ['errors' => $validator->errors()],Response::HTTP_UNPROCESSABLE_ENTITY );
                }

                $imageUrl = null;

                if($request->hasFile('file'))
                {
                    $image = $request->file('photo');
                    $image_name = time() . '.' . $image->getClientOriginalExtension();
                    $image->move(public_path('images/strategy'), $image_name);

                    $imageUrl = url('/images/tickets/' . $image_name);
                }

                $message = TicketMessage::create([
                    'ticket_id' => $ticket->id,
                    'message' => $request->message,
                    'file' => $imageUrl
                ]);

            $message = new TiceketMessageResource($message);

                return $this->sendResponse(['message'=>$message],"Sent Successfully.",Response::HTTP_CREATED);

        } catch (\Throwable $th) {
            logger(['add_tickets' => $th->getMessage()]);

            return $this->sendError("Ops Something went wrong. try again later.", [], Response::HTTP_SERVICE_UNAVAILABLE);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        $ticket->update([
            'deleted_at'=>now()
        ]);

        return $this->sendResponse([],"Ticket deleted successfully.");
    }
}
