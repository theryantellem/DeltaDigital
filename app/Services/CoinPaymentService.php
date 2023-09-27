<?php

namespace App\Services;

use GuzzleHttp\Client;

class CoinPaymentService
{

    public function makeDeposit(array $data)
    {
        $req['cmd'] = "get_callback_address";
        $req['currency'] = $data['currency'];

        return self::handle($req);
    }

    protected function handle($req)
    {
        try {
            // Set the API command and required fields
            $req['version'] = 1;
            $req['key'] = config('constants.coinpayment.public_key');
            $req['format'] = 'json'; //supported values are json and xml
            $req['ipn_url'] = config('constants.coinpayment.ipn_url');

            // Generate the query string
            $post_data = http_build_query($req, '', '&');

            // Calculate the HMAC signature on the POST data
            $hmac = hash_hmac('sha512', $post_data, config('constants.coinpayment.private_key'));

            // Initialize Guzzle client
            $client = new Client([
                'base_uri' => config('constants.coinpayment.url'),
            ]);

            $response = $client->post('api.php', [
                'headers' => [
                    'HMAC' => $hmac,
                ],
                'form_params' => $req,
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            logger(['coinpayment_Error' => $e->getMessage()]);
        }
    }
}
