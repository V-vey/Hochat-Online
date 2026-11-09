<?php

namespace App\Http\Requests\Api;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class SaveMenuItemRequest extends FormRequest
{
    /**
     * The role middleware on the route already limits this to Staff and Administrator.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Rules for creating (POST) or replacing (PUT) a menu item through the API.
     * "is_available" may be left out; new items are then available by default.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:100'],
            'price' => ['required', 'numeric', 'min:1', 'max:999999.99'],
            'is_available' => ['sometimes', 'boolean'],
            'photo_url' => ['nullable', 'string', 'max:255'],
        ];
    }
}
