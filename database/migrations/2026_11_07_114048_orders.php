<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->enum('order_type', ['Dine-In', 'Delivery']);
            $table->enum('status', ['Pending', 'Preparing', 'Ready','Completed', 'Cancelled']);
            $table->decimal('total_ammount', 8, 2);
            $table->dateTime('order_date')->default(now());
            $table->dateTime('scheduled_time')->nullable();
            $table->boolean('is_available')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
