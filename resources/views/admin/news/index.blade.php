@extends('layouts.admin.app')

@section('title', 'News')

@section('content')
    <div id="news">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="heading mb-0">News Management</h2>
            <div class="d-flex align-items-center">
                <a href="{{ route('admin.news.create') }}" class="btn btn-primary btn-sm ms-2">Create News</a>
            </div>
        </div>
        <div class="card dz-card">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-responsive-md">
                        <thead>
                            <tr>
                                <th><strong>Title</strong></th>
                                <th><strong>Caption</strong></th>
                                <th><strong>Status</strong></th>
                                <th><strong>Created At</strong></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse ($news as $item)
                                <tr>
                                    <td>{{ $item->title }}</td>
                                    <td>{{ createCaption($item->content) }}</td>
                                    <td>
                                        @if ($item->status == 'published')
                                            <div class="d-flex align-items-center"><i
                                                    class="fa fa-circle text-success me-1"></i> Published</div>
                                        @else
                                            <div class="d-flex align-items-center"><i
                                                    class="fa fa-circle text-warning me-1"></i> Drafted</div>
                                        @endif
                                    </td>
                                    <td>{{ $item->created_at->format('F j, Y') }}</td>
                                    <td>
                                        <div class="d-flex">
                                            <a href="{{ route('admin.news.edit', $item->uuid) }}"
                                                class="btn btn-primary shadow btn-xs sharp me-1"><i
                                                    class="fa fa-pencil"></i></a>
                                            <a href="{{ route('admin.news.destroy', $item->uuid) }}"
                                                class="btn btn-danger shadow btn-xs sharp delete"><i
                                                    class="fa fa-trash"></i></a>
                                        </div>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="4" class="text-center">no news available</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')
    <script>
        $('.delete').click(function(e) {
            e.preventDefault();
            var url = $(this).attr('href');
            Notiflix.Confirm.Show(
                'Are you sure?',
                'you want delete news.',
                'Delete',
                'Cancle',
                function okCb() {
                    $.ajax({
                        url: url,
                        type: 'DELETE',
                        dataType: 'json',
                        data: {
                            _token: "{{ csrf_token() }}"
                        },
                        success: function(response) {
                            Notiflix.Notify.Success(response.message);
                            window.location.reload();
                        },
                        error: function(response) {
                            Notiflix.Notify.Failure(
                                "An error occurred while processing the request, please try again later."
                            );
                        }
                    })
                }
            );
        })
    </script>
@endpush
