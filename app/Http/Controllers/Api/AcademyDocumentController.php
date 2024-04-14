<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Http\Resources\AcademyDocumentResource;
use App\Models\AcademyDocument;
use App\Models\AcademyModule;
use Illuminate\Http\Request;

class AcademyDocumentController extends ApiController
{
    function index(AcademyModule $module)
    {
        $documents = AcademyDocumentResource::collection(AcademyDocument::where('academy_module_id', $module->id)->get());

        return $this->sendResponse($documents, "Academy Documents");
    }
}
