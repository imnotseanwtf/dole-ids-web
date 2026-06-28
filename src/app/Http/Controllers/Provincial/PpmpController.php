<?php

namespace App\Http\Controllers\Provincial;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class PpmpController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('provincial/ppmp');
    }
}
