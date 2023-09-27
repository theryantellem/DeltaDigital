@include('layouts.admin.partails._head')

<body class="vh-100" style="background-image:url('images/bg.png'); background-position:center;">
    <div class="container h-100">
        <div class="row justify-content-center h-100 align-items-center">
            <div class="col-md-6">
                <div class="authincation-content">
                    <div class="row no-gutters">
                        <div class="col-xl-12">
                            <div class="auth-form">
                                <div class="text-center mb-3">
                                    <a href="#"><img src="images/logo/logo-full.png" alt=""></a>
                                </div>
                                <h4 class="text-center mb-4">Backoffice</h4>
                                @yield('content')
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('layouts.admin.partails._foot')
