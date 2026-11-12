<?php

namespace App\Http\Middleware;

use App\Enums\Role;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use ValueError;

class EnsureUserHasRole
{
    /**
     * Only let the request through when the user has one of the given roles.
     * A role name that no longer exists is skipped instead of crashing the page.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $allowedRoles = [];

        foreach ($roles as $role) {
            try {
                $allowedRoles[] = Role::from($role);
            } catch (ValueError) {
                Log::warning("Route {$request->path()} allows the unknown role [{$role}], so it was ignored.");
            }
        }

        $userRole = $request->user()?->role;

        if ($userRole === null || ! in_array($userRole, $allowedRoles, true)) {
            abort(403);
        }

        return $next($request);
    }
}
