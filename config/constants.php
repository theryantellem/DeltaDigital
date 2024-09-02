<?php


return [
    'authentication' => [
        'api_key' => env('AUTH_API_KEY'),
        'url' => env('AUTH_URL')
    ],
    'mailgun' => [
        'url'         => env('MAILGUN_BASEURL'),
        'private_key' => env('MAILGUN_PRIVATE_API_KEY')
    ],
    'coinpayment' => [
        'public_key' => env('COINPAYMENT_PUBLIC_KEY'),
        'private_key' => env('COINPAYMENT_PRIVATE_KEY'),
        'url' => env('COINPAYMENT_BASEURL'),
        'ipn_url' => env('COINPAYMENT_IPN_URL')
    ],
    'auth' => [
        'base_url' => env('AUTH_BASE_URL', 'https://deltadigital.pro/api/digitalservices')
    ]
];
