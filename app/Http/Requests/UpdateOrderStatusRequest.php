<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateOrderStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // the role middleware already blocks non-staff
    }

    public function rules(): array
    {
        return [
            'status' => ['required', Rule::in(['Preparing', 'Ready', 'Completed'])],
        ];
    }
}
