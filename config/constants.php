<?php


return [
    'authentication' => [
        'api_key' => env('AUTH_API_KEY'),
        'url' => env('AUTH_URL')
    ],
    'coinpayment' => [
        'public_key' => env('COINPAYMENT_PUBLIC_KEY'),
        'private_key' => env('COINPAYMENT_PRIVATE_KEY'),
        'url' => env('COINPAYMENT_BASEURL'),
        'ipn_url' => env('COINPAYMENT_IPN_URL')
    ]
];
