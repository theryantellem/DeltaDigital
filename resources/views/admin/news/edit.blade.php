@extends('layouts.admin.app')

@section('title', 'Update News')

@section('content')
    <div id="strategy">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="heading mb-0">Update News</h2>
        </div>
        <div class="card dz-card">
            <div class="card-body">
                <form action="{{ route('admin.news.update', $news->uuid) }}" method="POST" enctype="multipart/form-data">
                    @if (isset($news))
                        <div class="d-flex justify-content-end mb-3">
                            <div class="">
                                <label for="">News Status</label>
                                <select class="me-sm-2 default-select form-control" name="status"
                                    id="inlineFormCustomSelect" tabindex="null">
                                    <option selected="">Choose...</option>
                                    <option value="draft" {{ $news->status == 'draft' ? 'Selected' : '' }}>Draft</option>
                                    <option value="published" {{ $news->status == 'published' ? 'Selected' : '' }}>Published
                                    </option>
                                </select>
                            </div>
                        </div>
                    @endif
                    @csrf
                    @method('PUT')
                    @include('admin.news.form')
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
@push('scripts')
    <script src="{{ asset('assets/vendor/ckeditor/ckeditor.js') }}"></script>
@endpush
