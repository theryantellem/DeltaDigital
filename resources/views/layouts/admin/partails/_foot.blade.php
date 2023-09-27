<!-- Required vendors -->
<script src="{{ asset('assets/vendor/global/global.min.js') }}"></script>

<script src="{{ asset('assets/vendor/bootstrap-select/dist/js/bootstrap-select.min.js') }}"></script>


<script src="{{ asset('assets/js/custom.js') }}"></script>
<script src="{{ asset('assets/js/deznav-init.js') }}"></script>
<script src="{{ asset('assets/js/styleSwitcher.js') }}"></script>
<script src="{{ asset('assets/js/demo.js') }}"></script>
<script src="{{ asset('assets/global/js/axios.min.js') }}"></script>
<script src="{{ asset('assets/global/js/notiflix-aio-2.7.0.min.js') }}"></script>
<script src="{{ asset('assets/global/js/vue.min.js') }}"></script>
<script src="{{ asset('assets/vendor/sweetalert2/dist/sweetalert2.min.js') }}"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/js/lightbox.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

<script>
    function displayMessage(message, type = null) {
        if (type === "error") {
            Notiflix.Notify.Failure(message);
        } else if (type === "success") {
            Notiflix.Notify.Success(message);
        } else {
            Notiflix.Notify.info(message);
        }
    }
</script>

@if (Session::has('success'))
    <script>
        Notiflix.Notify.Success("{{ Session::get('success') }}");
    </script>
@endif

@if (Session::has('error'))
    <script>
        Notiflix.Notify.Failure("{{ Session::get('error') }}");
    </script>
@endif

@stack('scripts')
</body>

</html>
