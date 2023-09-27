@extends('layouts.admin.app')

@section('title', 'Support Tickets.')

@section('content')
    <div id="strategy">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="heading mb-0">Support Tickets</h2>
        </div>
        <div class="card dz-card">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-responsive-md">
                        <thead>
                            <tr>
                                <th><strong>User</strong></th>
                                <th><strong>Subject</strong></th>
                                <th><strong>Created At</strong></th>
                                <th><strong>Status</strong></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse ($tickets as $item)
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <img src="" class="avatar rounded-circle" alt="">
                                            <p class="mb-0 ms-2"></p>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <div class="d-flex">
                                            <a href="#" class="btn btn-primary shadow btn-xs sharp me-1"><i
                                                    class="fa fa-pencil"></i>
                                            </a>

                                        </div>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="5" class="text-center">no tickets available</td>
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

@endpush
