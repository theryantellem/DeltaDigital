<x-mail::message>
# Hello {{ $data['name'] }},

You recently requested to reset your PIN.
To proceed with the PIN reset, please use the following Token:

PIN Reset Token: {{ $data['token'] }}

This Token is valid for a limited time, so we recommend using it promptly.
If you did not initiate this request, please contact our support team immediately to ensure the security of your account.

Thanks you for using
{{ config('app.name') }}
If you have any questions or need further assistance, feel free to reach out to us.
</x-mail::message>
