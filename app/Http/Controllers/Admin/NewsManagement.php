<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;

class NewsManagement extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['news'] = News::get();

        return view('admin.news.index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.news.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'string'],
            'content' => ['required', 'string'],
            'photo' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ]);

        $imageUrl = null;

        if ($request->hasFile('photo')) {
            // $imageUrl = $this->uploadFile($request->file('photo'), "strategy");
            $image = $request->file('photo');
            $image_name = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/news'), $image_name);

            $imageUrl = url('/images/news/' . $image_name);
        }

        News::create([
            'title' => $request->title,
            'content' => $request->content,
            'image' => $imageUrl,
            'status' => "draft",
        ]);

        return redirect()->route('admin.news.index')->with('success', 'News created successfully.');
    }


    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news)
    {
        $data['news'] = $news;

        return view('admin.news.edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, News $news)
    {
        $request->validate([
            'title' => ['required', 'string'],
            'content' => ['required', 'string'],
            'photo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ]);

        $imageUrl = $news->image;

        if ($request->hasFile('photo')) {
            // $imageUrl = $this->uploadFile($request->file('photo'), "strategy");
            $image = $request->file('photo');
            $image_name = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/news'), $image_name);

            $imageUrl = url('/images/news/' . $image_name);
        }

        $news->update([
            'title' => $request->title,
            'content' => $request->content,
            'image' => $imageUrl,
            'status' => $request->status
        ]);

        return redirect()->route('admin.news.index')->with('success', 'News updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        $news->delete();

        return response()->json(['success' => true, 'message' => 'News deleted successfully.']);
    }
}
