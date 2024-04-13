<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AcademyDocumentResource;
use App\Models\AcademyDocument;
use App\Models\AcademyModule;
use Illuminate\Http\Request;

class AcademyDocumentController extends Controller
{
    function index(AcademyModule $module)
    {
        $resource = AcademyDocumentResource::collection(AcademyDocument::where('academy_module_id', $module->id)->get());

        return response()->json(['success' => true, 'documents' => $resource]);
    }

    function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string'],
            'module_uuid' => ['required', 'exists:academy_modules,uuid'],
            'doc_file' => ['required', 'mimes:pdf,doc,docx', 'max:112000'],
        ]);

        $module = AcademyModule::where('uuid', $request->module_uuid)->first();

        $document = uploadFile($request->file('doc_file'), "academy/documents", "do_spaces");

        $uploaded = $module->documents()->create([
            'name' => $request->name,
            'file_url' => $document,
        ]);

        $document = new AcademyDocumentResource($uploaded);

        return response()->json(['success' => true, 'message' => 'New document created successfully.', 'file' => $document]);
    }

    function destroy(AcademyDocument $document)
    {
        $document->delete();

        return response()->json(['success' => true, 'message' => 'Document deleted successfully.']);
    }
}
