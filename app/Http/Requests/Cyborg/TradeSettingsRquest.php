<?php

namespace App\Http\Requests\Cyborg;

use Illuminate\Http\Response;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class TradeSettingsRquest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'strategy' => ['required', 'exists:stretegies,uuid'],
            'market' => ['required'],
            'strategy' => ['required'],
            'first_buy' => ['required', 'numeric'],
            'double_position' => ['required'],
            'margin_limit' => ['required', 'gt:0'],
            'profit_ratio' => ['required', 'numeric'],
            'whole_ratio' => ['required', 'numeric'],
            'whole_stop' => ['required', 'numeric'],
            'profit_callback' => ['required', 'numeric'],
            'm_ratio.*' => ['required', 'numeric'],
            'price_drop.*' => ['required', 'numeric'],
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @throws \Illuminate\Validation\ValidationException
     *
     * @return void
     */
    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'message'   => 'Validation error',
            'errors'    => $validator->errors(),
        ], Response::HTTP_UNPROCESSABLE_ENTITY));
    }
}
