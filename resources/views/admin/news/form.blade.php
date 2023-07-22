<div class="mb-3">
    <label for="">Title</label>
    <input type="text" class="form-control" name="title" value="{{ old('title', isset($news) ? $news->title : '') }}">
    @error('title')
        <div class="text-danger">{{ $message }}</div>
    @enderror
</div>
<div class="mb-3">
    <label for="">Content</label>
    <textarea id="ckeditor" name="content" cols="30" rows="10">
        {!! old('content', isset($news) ? $news->content : '') !!}
    </textarea>
    @error('content')
        <div class="text-danger">{{ $message }}</div>
    @enderror
</div>

@if (isset($news))
    <div class="row">
        <div
            class="col-lg-3 col-md-6 mb-4">
            <img src="{{ $news->image }}" alt="" style="width:100%;">
        </div>
    </div>
@endif
<div class="mb-3">
    <label for="formFile" class="form-label">Photo</label>
    <input class="form-control" type="file" name="photo" id="formFile">
    @error('photo')
        <div class="text-danger">{{ $message }}</div>
    @enderror
</div>
