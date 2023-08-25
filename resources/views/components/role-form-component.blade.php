<div>
    <div class="mb-3">
        <label for="">Role Name</label>
        <input type="text" class="form-control input-default"
            value="{{ old('role_name') ? old('role_name') : (isset($role['name']) ? $role['name'] : '') }}"
            name="role_name" placeholder="Role name">
        @error('role_name')
            <div class="text-danger">{{ $message }}</div>
        @enderror
    </div>
    <div class="mb-3">
        <div class="col-lg-12">
            <div class="d-flex justify-content-between align-items-center flex-wrap">
                <h4>Permissions</h4>
                <div>
                    <button id="select-all" class="btn btn-sm btn-light ft-sm border mr-2">Select all</button>
                    <button id="unselect-all" class="btn btn-sm btn-light ft-sm border">Unselect all</button>
                </div>
            </div>
            <hr />
        </div>

        <div class="row">
            @error('permissions')
                <div class="text-danger">{{ $message }}</div>
            @enderror
            @forelse ($permissions as $permission)
                <div class="col-lg-3">
                    <div class="form-check form-switch">
                        <input class="form-check-input checkbox-item" name="permissions[]"
                            {{ old('permissions[]') == $permission->id ? 'checked' : '' }} value="{{ $permission->id }}"
                            type="checkbox" role="switch" id="{{ Str::slug($permission->id) }}"
                            {{ isset($role_permissions) && in_array($permission->id, $role_permissions) ? 'checked' : '' }}>
                        <label class="form-check-label" for="{{ Str::slug($permission->id) }}">
                            <strong> {{ $permission->name }}</strong>
                        </label>
                    </div>
                </div>
            @empty
                <div class="text-muted">No Data Available</div>
            @endforelse
        </div>
    </div>
    <div>
        <button type="submit" class="btn btn-primary rounded-pill ">Submit</a>
    </div>
</div>
@push('scripts')
    <script>
        // Get the select all checkbox and all other checkboxes
        const selectAllCheckbox = document.querySelector('#select-all');
        const selectUnselect = document.querySelector('#unselect-all');
        const checkboxes = document.querySelectorAll('.checkbox-item');

        // Add event listener to select all checkbox
        selectAllCheckbox.addEventListener('click', function(e) {
            e.preventDefault();
            checkboxes.forEach(checkbox => {
                checkbox.checked = true;
            });
        });

        selectUnselect.addEventListener('click', function(e) {
            e.preventDefault();

            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });

        })

        // Add event listener to all other checkboxes
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                // If any checkbox is unchecked, uncheck the select all checkbox
                if (!this.checked) {
                    selectAllCheckbox.checked = false;
                } else {
                    // If all other checkboxes are checked, check the select all checkbox
                    const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
                    selectAllCheckbox.checked = allChecked;
                }
            });
        });

        $(document).ready(function() {
            // Event handler for group-select checkbox
            $('.group-select').change(function() {
                // Get the parent group element
                var $group = $(this).closest('h6');

                // Find all checkbox items within the group
                var $checkboxes = $group.next('.info-details-div-4').find('.checkbox-item');

                // Check or uncheck the checkbox items based on the group-select checkbox state
                $checkboxes.prop('checked', $(this).is(':checked'));
            });
        });
    </script>
@endpush
