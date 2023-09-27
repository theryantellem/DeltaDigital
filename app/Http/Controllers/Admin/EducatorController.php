<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\EducatorResource;
use App\Models\Admin;
use App\Models\Category;
use App\Models\ChatGroup;
use App\Models\EducatorCategory;
use App\Models\Signal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;

class EducatorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('admin.educator.index');
    }

    function allEducators()
    {
        $role = Role::where('name', 'educator')->first();

        $educators = EducatorResource::collection($role->users);
        $categories = CategoryResource::collection(Category::where('status',1)->get());

        return response()->json(['success' => true, 'educators' => $educators, 'categories' => $categories], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:admins,email',
            'phone_number' => 'nullable|numeric',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'password' => 'required'
        ]);

        // Handle validation errors
        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $commaSeparatedArray = explode(',', $request->categories);

        try {

            DB::beginTransaction();

            $imageUrl = null;

            if ($request->hasFile('photo')) {
                // $imageUrl = $this->uploadFile($request->file('photo'), "strategy");
                $image = $request->file('photo');
                $image_name = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images/educator'), $image_name);

                $imageUrl = url('/images/educator/' . $image_name);
            }

            $password = rand(000000, 999999);

            $educator = Admin::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'photo' => $imageUrl,
            ]);

            ChatGroup::create([
                'admin_id' => $educator->id
            ]);

            $educator->assignRole('educator');

            // assign categories to educator
            foreach ($commaSeparatedArray as $category) {
                EducatorCategory::create([
                    'admin_id' => $educator->id,
                    'category_id' => $category
                ]);
            }

            $educator = new EducatorResource($educator);

            $data = [
                'email' => $educator->email,
                'password' => $password,
                'name' => ucfirst($educator->first_name)
            ];

            // dispatch(new \App\Jobs\Mail\AdminUnboardingMailJob($data));

            DB::commit();

            return response()->json(['success' => true, 'educator' => $educator, 'message' => 'Educator created successfully.'], 201);
        } catch (\Exception $e) {
            sendToLog($e);
            DB::rollBack();

            return response()->json(['success' => false, 'error' => 'Service currently unavailable'], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $educator = Admin::where('uuid', $id)->first();

        if (!$educator) {
            return response()->json(['success' => false, 'message' => 'Educator not found.'], 404);
        }

        $educator = new EducatorResource($educator);

        return response()->json(['success' => true, 'educator' => $educator], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $educator = Admin::where('uuid', $id)->first();

        if (!$educator) {
            return response()->json(['success' => false, 'message' => 'Educator not found.']);
        }


        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email',
            'phone_number' => 'nullable|numeric',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        // Handle validation errors
        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $imageUrl = $educator->photo;

        if ($request->hasFile('photo')) {
            // $imageUrl = $this->uploadFile($request->file('photo'), "strategy");
            $image = $request->file('photo');
            $image_name = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/educator'), $image_name);

            $imageUrl = url('/images/educator/' . $image_name);
        }

        $educator->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'photo' => $imageUrl
        ]);

        EducatorCategory::where('admin_id', $educator->id)->delete();

        // assign categories to educator
        foreach ($request->categories as $category) {
            EducatorCategory::create([
                'admin_id' => $educator->id,
                'category_id' => $category
            ]);
        }

        $educator = new EducatorResource($educator);

        return response()->json(['success' => true, 'educator' => $educator, 'message' => 'Educator updated  successfully.'], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $educator = Admin::where('uuid', $id)->first();

        if (!$educator) {
            return response()->json(['success' => false, 'message' => 'Educator not found.'], 404);
        }

        EducatorCategory::where('admin_id', $educator->id)->delete();

        \App\Models\UserFollower::where('admin_id', $educator->id)->delete();

        Signal::where('admin_id', $educator->id)->delete();

        $educator->delete();

        return response()->json(['success' => true, 'message' => ' Educator was successfully deleted.'], 201);
    }
}
