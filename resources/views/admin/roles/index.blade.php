@extends('layouts.admin.app')

@section('title', 'Roles Management')

@section('content')
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="heading mb-0">Roles Management</h2>
        <div class="d-flex align-items-center">
            <a href="#" class="btn btn-primary btn-sm ms-2">Create Role</a>
        </div>
    </div>

    <div class="card dz-card">
        <div class="card-body">
            <div class="table-responsive">
                <table class="table header-border table-responsive-sm">
                    <thead>
                        <tr>
                            <th>Invoice</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><a href="javascript:void();">Order #26589</a>
                            </td>
                            <td>Herman Beck</td>
                            <td><span class="text-muted">Oct 16, 2017</span>
                            </td>
                            <td>$45.00</td>
                            <td><span class="badge badge-success">Paid</span>
                            </td>
                            <td>EN</td>
                        </tr>
                        <tr>
                            <td><a href="javascript:void();">Order #58746</a>
                            </td>
                            <td>Mary Adams</td>
                            <td><span class="text-muted">Oct 12, 2017</span>
                            </td>
                            <td>$245.30</td>
                            <td><span class="badge badge-info light">Shipped</span>
                            </td>
                            <td>CN</td>
                        </tr>
                        <tr>
                            <td><a href="javascript:void();">Order #98458</a>
                            </td>
                            <td>Caleb Richards</td>
                            <td><span class="text-muted">May 18, 2017</span>
                            </td>
                            <td>$38.00</td>
                            <td><span class="badge badge-danger">Shipped</span>
                            </td>
                            <td>AU</td>
                        </tr>
                        <tr>
                            <td><a href="javascript:void();">Order #32658</a>
                            </td>
                            <td>June Lane</td>
                            <td><span class="text-muted">Apr 28, 2017</span>
                            </td>
                            <td>$77.99</td>
                            <td><span class="badge badge-success">Paid</span>
                            </td>
                            <td>FR</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection
