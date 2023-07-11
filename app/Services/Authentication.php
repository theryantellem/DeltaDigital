<?php


namespace App\Services;


class Authentication extends Service
{

    protected $headers = [];

    public function __construct()
    {
        parent::__construct();

        $this->headers = [
            "apikey" => config('constants.authentication.api_key')
        ];
    }

    public function baseUri()
    {
        return config('constants.authentication.url');
    }

    function login(string $username, string $password)
    {
        $options = [
            'multipart' => [
                [
                    'name' => 'username',
                    'contents' => $username
                ],
                [
                    'name' => 'password',
                    'contents' => $password
                ]
            ]
        ];

        $response = $this->post('/afl/api/v1/user/delta-login-details', $options);

        return $response;
    }

    function getUser(string $username)
    {
        $options = [
            'multipart' => [
                [
                    'name' => 'username',
                    'contents' => $username
                ],
            ]
        ];

        $response = $this->post('/afl/api/v1/user/delta-user-details', $options);

        return $response;
    }
}
