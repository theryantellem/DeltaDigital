<x-mail::message>
# Welcome to DeltaDigital!

Dear {{ $data['name'] }},

We are excited to welcome you as an instructor for DeltaDigital! Your account has been successfully created, and you can now access our platform to start sharing your knowledge and expertise with our community.

Here are your login credentials:
- **Email:** {{ $data['email'] }}
- **Password:** {{ $data['password'] }}

Please use these credentials to log in to our platform and set up your profile. If you have any questions or need assistance, feel free to reach out to our support team .

We look forward to having you on board and contributing to DeltaDigital!

<x-mail::button url="{{ url('/') . '/admin' }}">
Get Started
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
