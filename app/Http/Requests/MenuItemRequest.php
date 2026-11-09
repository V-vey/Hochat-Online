<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MenuItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // the role middleware already blocks customers
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_available' => $this->boolean('is_available'),
        ]);
    }

    public function rules(): array
    {
        return [
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:100'],
            'price' => ['required', 'numeric', 'min:1', 'max:999999.99'],
            'is_available' => ['boolean'],
            'photo' => ['nullable', 'image', 'max:2048'],
        ];
    }
}
