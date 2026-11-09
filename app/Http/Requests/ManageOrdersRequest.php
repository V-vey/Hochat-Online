<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ManageOrdersRequest extends FormRequest
{
    /**
     * The role middleware on the route already limits this to Staff and Administrator.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Optional filters: a status, and a date range (e.g. coming from the Order Status Report).
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => ['nullable', Rule::in(['Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'])],
            'from' => ['nullable', 'date'],
            'to' => ['nullable', 'date', 'after_or_equal:from'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'to.after_or_equal' => 'The end date must be on or after the start date.',
        ];
    }
}
