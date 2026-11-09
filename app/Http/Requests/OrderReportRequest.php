<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;

class OrderReportRequest extends FormRequest
{
    /**
     * The role middleware on the route already limits this to Staff and Administrator.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
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

    /**
     * Start of the report period (defaults to today).
     */
    public function from(): Carbon
    {
        return Carbon::parse($this->validated('from') ?? today())->startOfDay();
    }

    /**
     * End of the report period (defaults to today).
     */
    public function to(): Carbon
    {
        return Carbon::parse($this->validated('to') ?? today())->endOfDay();
    }
}
