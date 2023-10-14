<?php

namespace App\Http\Controllers\Admin\Academy;

use App\Http\Controllers\Controller;
use App\Http\Resources\Academy\CategorizedModule;
use App\Http\Resources\Academy\ModulesResource;
use App\Http\Resources\Academy\ModuleWithVideosResource;
use App\Models\Academy;
use App\Models\AcademyModule;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class AcademyModuleController extends Controller
{
    public function index()
    {
        $admin_id = Auth::guard('admin')->user()->id;
        $data = AcademyModule::where('admin_id', $admin_id)->orderBy('id', 'desc')->get();
        $resource = ModulesResource::collection($data);

        return response()->json(['success' => true, 'data' => $resource]);
    }

    public function categoryModule($category)
    {
        $admin_id = Auth::guard('admin')->user()->id;

        $data = Academy::where('uuid', $category)
            ->with(['academyModules' => function ($query) use ($admin_id) {
                $query->where('admin_id', $admin_id);
            }])->whereHas('academyModules', function ($query) use ($admin_id) {
                $query->where('admin_id', $admin_id);
            })->get();

        $resource = CategorizedModule::collection($data);

        return response()->json(['success' => true, 'data' => $resource]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:200'],
            'academy_uuid' => ['required', 'exists:academies,uuid'],
            'description' => ['nullable', 'max:10000'],
        ]);

        $academy = Academy::where('uuid', $request->academy_uuid)->first();

        $admin_id = Auth::guard('admin')->user()->id;

        $module = AcademyModule::create([
            'admin_id' =>  $admin_id,
            'name' => $request->name,
            'academy_id' => $academy->id,
            'description' => $request->description,
        ]);

        $module = new ModulesResource($module);

        return response()->json(['success' => true, 'message' => 'New Module created successfully.', 'module' => $module]);
    }

    public function show(AcademyModule $module)
    {
        $resource = new ModuleWithVideosResource($module);

        return response()->json(['success' => true, 'data' => $resource]);
    }

    public function update(Request $request, AcademyModule $module)
    {
        $request->validate([
            'name' => ['nullable', 'string', 'max:200'],
            'description' => ['nullable', 'string', 'max:10000'],
        ]);

        $module->update([
            'name' => $request->name ?? $module->name,
            'description' => $request->description ?? $module->description,
        ]);

        return response()->json(['success' => true, 'message' => 'Module updated successfully.']);
    }

    public function delete(AcademyModule $module)
    {
        $module->delete();

        return response()->json(['success' => true, 'message' => 'Module deleted successfully.']);
    }
}
