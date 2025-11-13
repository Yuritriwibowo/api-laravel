<?php

use App\Http\Controllers\Api\TodoController;

Route::apiResource('todos', TodoController::class);
