@extends('layouts.admin.app')

@section('title', 'Roles Management')

@section('content')
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="heading mb-0">Roles Management</h2>
        <div class="d-flex align-items-center">
            <a href="{{ route('admin.roles.create') }}" class="btn btn-primary btn-sm ms-2">Create Role</a>
        </div>
    </div>

    <div class="card dz-card">
        <div class="card-body">
            <div class="table-responsive">
                <table class="table header-border table-responsive-sm">
                    <thead>
                        <tr>
                            <th>Role Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($roles as $item)
                            <tr>
                                <td>
                                    {{ $item->name }}
                                </td>
                                <td class="edit-action">
                                    @if (!in_array($item->name, ['super_admin', 'default']))
                                        <a href="{{ route('admin.roles.edit', $item->uuid) }}"
                                            class="icon-box icon-box-xs bg-primary me-1">
                                            <i class="fa-solid fa-pencil text-white"></i>
                                        </a>
                                    @endif
                                    @if (!in_array($item->name, ['super_admin', 'default', 'educator']))
                                        <a href="#" class="icon-box icon-box-xs bg-danger delete-role  ms-1"
                                            data-url="{{ route('admin.roles.destroy', $item->uuid) }}">
                                            <i class="fa-solid fa-trash text-white"></i>
                                        </a>
                                    @endif

                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="2">
                                    <span class="text-center text-warning">no roles created</span>
                                </td>
                            </tr>
                        @endforelse

                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection
@push('scripts')
    <script>
        $('.delete-role').click(function(e) {
            e.preventDefault();
            var url = $(this).data('url')
            Swal.fire({
                title: "Please confirm your intention to delete the role.",
                showCancelButton: true,
                confirmButtonText: 'Confirmed',
                denyButtonText: `No`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    $.post(url, {
                        _token: "{{ csrf_token() }}",
                        _method: "DELETE"
                    }).then(function(result) {
                        if (result.success) {
                            displayMessage(
                                result.message,
                                "success"
                            );
                            setTimeout(() => {
                                location.reload()
                            }, 1000);
                        } else {
                            displayMessage(
                                result.message,
                                "error"
                            );
                        }
                    }).catch(function(error) {
                        console.log(error)
                        displayMessage(
                            "Error occured while trying delete role",
                            "error"
                        );
                    })
                }
            })

        })
    </script>
@endpush
