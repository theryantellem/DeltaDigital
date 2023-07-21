<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Resources\TicketResource;
use App\Models\TicketMessage;
use App\Models\Tickets;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class TicketsController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tickets = TicketResource::collection(Tickets::where('user_id',Auth::user()->id));

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
                $image = $request->file('photo');
                $image_name = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images/strategy'), $image_name);

                $imageUrl = url('/images/tickets/' . $image_name);
            }

            $ticket = Tickets::create([
                'user_id'=>$request->user()->id,
                'subject'=>$request->subject
            ]);

            $ticket->messages([
                'user_id'=>$request->user()->id,
                'message'=>$request->message,
                'file'=>$imageUrl
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
    public function show(Tickets $tickets)
    {
        $tickets = new TicketResource($tickets);

        return $this->sendResponse(['ticket'=>$tickets],"Ticket details",Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tickets $tickets)
    {
            try{
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
                    'message'=>$request->message,
                    'file'=>$imageUrl
                ]);

                $message = new TicketResource($message);

                return $this->sendResponse(['message'=>$message],"Sent Successfully.",Response::HTTP_CREATED);

        } catch (\Throwable $th) {
            logger(['add_tickets' => $th->getMessage()]);

            return $this->sendError("Ops Something went wrong. try again later.",[],Response::HTTP_SERVICE_UNAVAILABLE);
            }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tickets $tickets)
    {
        $tickets->update([
            'deleted_at'=>now()
        ]);

        return $this->sendResponse([],"Ticket deleted successfully.");
    }
}
