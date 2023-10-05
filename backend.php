<?php

namespace Api\Controller;

use Think\SuperEmail;

class MobileController extends CommonController
{

    protected function _initialize()
    {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: token,Origin, X-Requested-With, Content-Type, Accept,ID,TOKEN");
        header('Access-Control-Allow-Methods: POST,GET');
    }

    public function index()
    {
        echo "Connected";
        exit;
    }

    function checkStuff()
    {
        echo "hello";
    }

    //algo start here
    public function getpostsettings()
    {

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user_set  write, extrade_user_coin write');
        $userData = M('user_set')->where(array('start_bot' => 1, 'run_status' => 0))->select();


        $entry = $entry;
        foreach ($userData as $key => $val) {

            $userid = $val['userid'];
            $setid = $val['id'];
            $first_buy = $val['first_buy'];
            $first_price = $val['first_price'];
            $gas = M('UserCoin')->where(array('userid' => $val['userid']))->getField('usdtd');
            $telegram = M('User')->where(array('id' => $val['userid']))->getField('telegram');
            $expire = M('User')->where(array('id' => $val['userid']))->getField('expiretime');
            $expire = $expire + 172800;

            $in_position = $val['in_position'];

            if ($expire < time() and $in_position == 'False') {
                $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $val['userid']))->setField('start_bot', 0);
                M('User')->where(array('id' => $val['userid']))->setField('paid', 0);
                continue;
            }

            $api_key =  $val['api_key'];
            $api_secret =  $val['api_secret'];
            $api_passphrase =  $val['api_passphrase'];
            $platform = $val['exchange'];
            $api_key = str_replace('#', '%23', $api_key);
            $api_key = str_replace('@', '%40', $api_key);
            $api_key = str_replace(' ', '%2B', $api_key);
            $api_secret = str_replace('#', '%23', $api_secret);
            $api_secret = str_replace('@', '%40', $api_secret);
            $api_secret = str_replace(' ', '%2B', $api_secret);
            $api_passphrase = str_replace('.#.', '%2E%23%2E', $api_passphrase);
            $api_passphrase = str_replace('#', '%23', $api_passphrase);
            $api_passphrase = str_replace('@', '%40', $api_passphrase);
            $buy_position = $val['buy_position'];
            $sell_position = $val['sell_position'];
            $coin = $val['coin'];
            $trade_price = $val['trade_price'];
            $firstbuy_amount = $val['firstbuy_amount'];
            $qty = $val['qty'];
            $double_position = $val['double_position'];
            $margin_limit = $val['margin_limit'];
            $profit_ratio = $val['profit_ratio'];
            $whole_ratio = $val['whole_ratio'];
            $price_drop = str_replace(',', '|', $val['price_drop']);
            $m_ratio = str_replace(',', '|', $val['m_ratio']);
            $profit_callback = $val['profit_callback'];
            $buycallback = $val['buy_callback'];
            $position_amount = $val['position_amount'];
            $trade_type = $val['trade_type'];
            $direction = $val['direction'];
            $stop_loss = $val['stop_loss'];
            $re_capital = $val['re_capital'];

            if ($trade_type == 0) {
                if ($val['server'] == 0) {
                    $activee[$key]['joined'] = 1;

                    #} else if ($val['server'] == 1 and $val['trade_type'] == 0){ 
                } else if ($val['server'] == 1) {
                    $nodes = "http://206.189.23.93:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 2) {
                    $nodes = "http://138.68.138.94:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 3) {
                    $nodes = "http://46.101.21.246:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 4) {
                    $nodes = "http://46.101.86.28:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 5) {
                    $nodes = "http://138.68.138.26:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 6) {
                    $nodes = "http://46.101.93.251:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 7) {
                    $nodes = "http://46.101.23.91:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 8) {
                    $nodes = "http://46.101.87.120:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 9) {
                    $nodes = "http://167.172.175.128:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 10) {
                    $nodes = "http://46.101.23.85:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 11) {
                    $nodes = "http://164.90.179.120:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 12) {
                    $nodes = "http://46.101.103.234:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 13) {
                    $nodes = "http://165.232.126.255:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 14) {
                    $nodes = "http://142.93.108.99:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 15) {
                    $nodes = "http://104.248.27.160:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 16) {
                    $nodes = "http://159.89.110.240:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 17) {
                    $nodes = "http://161.35.75.195:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 18) {
                    $nodes = "http://161.35.79.136:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 19) {
                    $nodes = "http://209.38.192.13:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 20) {
                    $nodes = "http://142.93.160.31:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 21) {
                    $nodes = "http://46.101.233.159:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 22) {
                    $nodes = "http://64.227.121.152:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 23) {
                    $nodes = "http://64.226.77.30:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else if ($val['server'] == 24) {
                    $nodes = "http://64.226.77.42:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss";
                } else {
                    $nodes = "no server";
                }
            } else {
                if ($val['server'] == 0) {
                    $activee[$key]['joined'] = 1;
                } else if ($val['server'] == 1) {
                    $nodes = "http://157.230.19.79:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss&re_capital=$re_capital";
                } else if ($val['server'] == 2) {
                    $nodes = "http://157.230.19.102:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss&re_capital=$re_capital";
                } else if ($val['server'] == 3) {
                    $nodes = "http://64.226.70.71:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss&re_capital=$re_capital";
                } else if ($val['server'] == 4) {
                    $nodes = "http://157.230.27.55:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss&re_capital=$re_capital";
                } else if ($val['server'] == 5) {
                    $nodes = "http://157.230.27.146:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss&re_capital=$re_capital";
                } else if ($val['server'] == 6) {
                    $nodes = "http://167.172.181.223:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss&re_capital=$re_capital";
                } else if ($val['server'] == 7) {
                    $nodes = "http://167.172.110.47:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss&re_capital=$re_capital";
                } else if ($val['server'] == 8) {
                    $nodes = "http://167.172.181.218:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss&re_capital=$re_capital";
                } else if ($val['server'] == 9) {
                    $nodes = "http://167.172.105.45:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss&re_capital=$re_capital";
                } else {
                    $nodes = "http://167.172.181.230:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&position_amount=$position_amount&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$profit_ratio&price_drop=$price_drop&m_ratio=$m_ratio&profit_callback=$profit_callback&buycallback=$buycallback&trade_type=$trade_type&direction=$direction&stop_loss=$stop_loss&re_capital=$re_capital";
                }
            }


            // $nodes = urlendcode($nodes);
            $mo = M();
            $mo->execute('set autocommit=0');
            $mo->execute('nolock tables extrade_user_set  write, extrade_user_coin write');
            $rs = array();
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $val['id']))->setField('run_status', 1);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $val['id']))->setField('link', $nodes);
        }
        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            return $this->Postsettings();
        } else {
            $mo->execute('rollback');
            //return $this->Postsettings();
        }
    }

    public function convertstart3()
    {
        $signatures = json_decode($_POST["signatures"]);
        echo $ID;
    }

    public function convertstart($id, $startbot, $userId = null)
    {

        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        //$userid = M('user_set')->where(array('id' => $id))->getField('userid');
        $userid = M('User')->where(array('id' => $uid))->getField('paid');
        if ($userid == 0) {
            $this->error('Please subscribe');
        }
        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user_set write');
        $user = M('user_set')->where(array('id' => $id))->find();
        $userid = $user['userid'];
        $setid = $user['id'];
        $coin = $user['coin'];
        $balance = $user['balance'];
        $platform = $user['exchange'];
        $api_key = $user['api_key'];
        $api_secret = $user['api_secret'];
        $api_passphrase = $user['api_passphrase'];
        $rs = array();
        if ($startbot == 1) {
            $nodes = "http://86.107.99.243:5238/convertapi?user_id=$userid&setid=$setid&balance=$balance&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&coin=$coin";
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('convert_status', $startbot);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('balance_link', $nodes);
        }
        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success('success!');
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('failed!');
        }
    }

    public function settelegram($type, $telegramuser, $userId = null)
    {


        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        //$userid = M('user_set')->where(array('id' => $id))->getField('userid');
        $userid = M('User')->where(array('id' => $uid))->getField('paid');
        if ($userid == 0) {
            $this->error('Please subscribe');
        }
        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user write');
        $rs = array();
        if ($type == 1) {
            #$t = file_get_contents("https://api.telegram.org/bot5502981105:AAEpVPWrS2G4zkKPIaiIh483U9Ht1VaPc4Q/getUpdates");
            # $t_request = json_decode($t, true);
            #$status = $t_request['result']['my_chat_member'];
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('telegram', $telegramuser);
        }
        if ($type == 2) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('telegram', 0);
        }
        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success('success!');
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('failed!');
        }
    }

    function exchanges($userId)
    {

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_config  write, extrade_user write');
        $active = M('User')->where(array('id' => $userId))->select();

        $activee = [];

        foreach ($active as $key => $val) {
            $activee['binancebind'] = $val['bbind'];
            $activee['kucoinbind'] = $val['kbind'];
            $activee['coinbaseprobind'] = $val['cbind'];
            $activee['krakenbind'] = $val['krbind'];
            $activee['binanceapi'] = $val['bapi_key'];
            $activee['kucoinapi'] = $val['kapi_key'];
            $activee['coinbaseproapi'] = $val['capi_key'];
            $activee['krakenapi'] = $val['krapi_key'];
            $activee['binancescret'] = "**********";
            $activee['kucoinsecret'] =  "**********";
            $activee['coinbaseprosecret'] = "**********";
            $activee['krakensecret'] = "**********";
        }

        if (count($activee) > 0) {
            $userDetails = [
                [
                    'id' => '1',
                    'logo' => 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
                    'status' => $activee['coinbaseprobind'],
                    'apiSecrete' => $activee['coinbaseprosecret'],
                    'apiKey' => $activee['coinbaseproapi'],
                    'rank' => "3",
                    'exchange' => '3',
                    'exchangeName' => 'Coinbase',
                    'spot' => 1,
                    'futures' => 0
                ],
                [
                    'id' => '2',
                    'logo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/1200px-Binance_Logo.svg.png',
                    'status' => $activee['binancebind'],
                    'apiSecrete' => $activee['binancescret'],
                    'apiKey' => $activee['binanceapi'],
                    'rank' => "1",
                    'exchange' => '1',
                    'exchangeName' => 'Binance',
                    'spot' => 1,
                    'futures' => 1
                ],
                [
                    'id' => '3',
                    'logo' => 'https://static-00.iconduck.com/assets.00/kraken-icon-512x512-icmwhmh8.png',
                    'status' => $activee['krakenbind'],
                    'apiSecrete' => $activee['krakensecret'],
                    'apiKey' => $activee['krakenapi'],
                    'rank' => "1",
                    'exchange' => '4',
                    'exchangeName' => 'Kraken',
                    'spot' => 1,
                    'futures' => 0
                ],
                [
                    'id' => '4',
                    'logo' => 'https://assets.staticimg.com/cms/media/3gfl2DgVUqjJ8FnkC7QxhvPmXmPgpt42FrAqklVMr.png',
                    'status' => $activee['kucoinbind'],
                    'apiSecrete' => $activee['kucoinsecret'],
                    'apiKey' => $activee['krakenapi'],
                    'rank' => "1",
                    'exchange' => '2',
                    'exchangeName' => 'Kucoin',
                    'spot' => 1,
                    'futures' => 1
                ]
            ];


            return   $this->ajaxShow($userDetails);
        }

        return $this->error(L('user not found!'));
    }

    public function Postsettings()
    {

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user_set  write');
        $userData = M('user_set')->where(array('start_bot' => 1, 'run_status' => 1))->select();

        $links = array();
        foreach ($userData as $key => $val) {
            array_push($links, $val['link']);
            //echo $val['link'];
            $mo = M();
            $mo->execute('set autocommit=0');
            $mo->execute('nolock tables extrade_user_set  write');
            $rs = array();
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $val['id']))->setField('run_status', 2);
        }
        $nodes = $links;


        $node_count = count($nodes);

        $curl_arr = array();
        $master = curl_multi_init();

        for ($i = 0; $i < $node_count; $i++) {
            $url = $nodes[$i];
            $curl_arr[$i] = curl_init($url);
            curl_setopt($curl_arr[$i], CURLOPT_RETURNTRANSFER, true);
            curl_multi_add_handle($master, $curl_arr[$i]);
        }

        do {
            curl_multi_exec($master, $running);
        } while ($running > 0);

        echo "results: ";
        for ($i = 0; $i < $node_count; $i++) {
            $results = curl_multi_getcontent($curl_arr[$i]);
            echo ($i . "\n" . $results . "\n");
        }
        //echo $nodes ;

    }



    public function convertPostsettings()
    {

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user_set  write');
        $userData = M('user_set')->where(array('start_bot' => 0, 'convert_status' => 1))->limit(45)->select();

        $links = array();
        foreach ($userData as $key => $val) {
            array_push($links, $val['balance_link']);
        }
        $nodes = $links;

        #$string = file_get_contents("https://tafabot.trade/a.json");
        #echo $string;
        #$nodes = $string ;

        $node_count = count($nodes);

        $curl_arr = array();
        $master = curl_multi_init();

        for ($i = 0; $i < $node_count; $i++) {
            $url = $nodes[$i];
            $curl_arr[$i] = curl_init($url);
            curl_setopt($curl_arr[$i], CURLOPT_RETURNTRANSFER, true);
            curl_multi_add_handle($master, $curl_arr[$i]);
        }

        do {
            curl_multi_exec($master, $running);
        } while ($running > 0);

        echo "results: ";
        for ($i = 0; $i < $node_count; $i++) {
            $results = curl_multi_getcontent($curl_arr[$i]);
            echo ($i . "\n" . $results . "\n");
        }
        //echo $nodes ;

    }

    public function return($setid, $user_id)
    {

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user_set  write');
        $rs = array();
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid))->setField('run_status', 0);
        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->error(L('success!'));
        } else {
            $mo->execute('rollback');
            $this->error(L('failed!'));
        }
    }

    public function bgetpostsettings()
    {

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user  write');
        $userData = M('User')->where(array('paid' => 1, 'bbind' => 1))->select();


        $entry = $entry;
        foreach ($userData as $key => $val) {

            $userid = $val['id'];
            $exchange = 1;
            $api_key =  $val['bapi_key'];
            $api_secret =  $val['bapi_secret'];
            $api_passphrase =  $val['kapi_passphrase'];
            #$nodes = "http://199.188.204.181:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$whole_ratio&first_call=$first_call&first_ratio=$first_ratio&second_call=$second_call&second_ratio=$second_ratio&third_call=$third_call&third_ratio=$third_ratio&forth_call=$forth_call&forth_ratio=$forth_ratio&fifth_call=$fifth_call&fifth_ratio=$fifth_ratio&profit_callback=$profit_callback&buycallback=$buycallback";
            $nodes = "http://199.188.204.181:5232/botapi?user_id=$userid&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&platform=$exchange";
            $mo = M();
            $mo->execute('set autocommit=0');
            $mo->execute('nolock tables extrade_user  write');
            $rs = array();
            $rs[] = $mo->table('extrade_user')->where(array('id' => $val['id']))->setField('blink', $nodes);
        }
        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            return $this->bPostsettings();
        } else {
            $mo->execute('rollback');
            $this->error(L('failed!'));
        }
    }

    public function bPostsettings()
    {

        $userData = M('User')->where(array('paid' => 1, 'bbind' => 1))->select();

        $links = array();
        foreach ($userData as $key => $val) {
            array_push($links, $val['blink']);
        }
        $nodes = $links;

        #$string = file_get_contents("https://tafabot.trade/a.json");
        #echo $string;
        #$nodes = $string ;

        $node_count = count($nodes);

        $curl_arr = array();
        $master = curl_multi_init();

        for ($i = 0; $i < $node_count; $i++) {
            $url = $nodes[$i];
            $curl_arr[$i] = curl_init($url);
            curl_setopt($curl_arr[$i], CURLOPT_RETURNTRANSFER, true);
            curl_multi_add_handle($master, $curl_arr[$i]);
        }

        do {
            curl_multi_exec($master, $running);
        } while ($running > 0);

        echo "results: ";
        for ($i = 0; $i < $node_count; $i++) {
            $results = curl_multi_getcontent($curl_arr[$i]);
            echo ($i . "\n" . $results . "\n");
        }
        echo "done";
    }

    public function kgetpostsettings()
    {

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user  write');
        $userData = M('User')->where(array('paid' => 1, 'kbind' => 1))->select();


        $entry = $entry;
        foreach ($userData as $key => $val) {

            $userid = $val['id'];
            $exchange = 2;
            $api_key =  $val['kapi_key'];
            $api_secret =  $val['kapi_secret'];
            $api_passphrase =  $val['kapi_passphrase'];
            #$nodes = "http://199.188.204.181:5231/botapi?user_id=$userid&setid=$setid&gas=$gas&first_price=$first_price&first_buy=$first_buy&platform=$platform&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&in_position=$in_position&buy_position=$buy_position&sell_position=$sell_position&coin=$coin&trade_price=$trade_price&firstbuy_amount=$firstbuy_amount&qty=$qty&double_position=$double_position&margin_limit=$margin_limit&profit_ratio=$profit_ratio&whole_ratio=$whole_ratio&first_call=$first_call&first_ratio=$first_ratio&second_call=$second_call&second_ratio=$second_ratio&third_call=$third_call&third_ratio=$third_ratio&forth_call=$forth_call&forth_ratio=$forth_ratio&fifth_call=$fifth_call&fifth_ratio=$fifth_ratio&profit_callback=$profit_callback&buycallback=$buycallback";
            $nodes = "http://199.188.204.181:5232/botapi?user_id=$userid&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&platform=$exchange";
            $mo = M();
            $mo->execute('set autocommit=0');
            $mo->execute('nolock tables extrade_user  write');
            $rs = array();
            $rs[] = $mo->table('extrade_user')->where(array('id' => $val['id']))->setField('klink', $nodes);
        }

        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            return $this->kPostsettings();
        } else {
            $mo->execute('rollback');
            $this->error(L('failed!'));
        }
    }

    public function kPostsettings()
    {

        $userData = M('User')->where(array('paid' => 1, 'kbind' => 1))->select();

        $links = array();
        foreach ($userData as $key => $val) {
            array_push($links, $val['klink']);
        }
        $nodes = $links;

        #$string = file_get_contents("https://tafabot.trade/a.json");
        #echo $string;
        #$nodes = $string ;

        $node_count = count($nodes);

        $curl_arr = array();
        $master = curl_multi_init();

        for ($i = 0; $i < $node_count; $i++) {
            $url = $nodes[$i];
            $curl_arr[$i] = curl_init($url);
            curl_setopt($curl_arr[$i], CURLOPT_RETURNTRANSFER, true);
            curl_multi_add_handle($master, $curl_arr[$i]);
        }

        do {
            curl_multi_exec($master, $running);
        } while ($running > 0);

        echo "results: ";
        for ($i = 0; $i < $node_count; $i++) {
            $results = curl_multi_getcontent($curl_arr[$i]);
            echo ($i . "\n" . $results . "\n");
        }
        echo "done";
    }

    private function verification_code($email, $code, $action = 'verify')
    {
        //$action=verify or add	
        $mo = M();
        if ($action == 'add') {
            $verify = array('email' => $email, 'code' => $code);
            $rs[] = $mo->table('extrade_verify')->add($verify);
            if (check_arr($rs)) {
                return '{"status":"1","data":"Code has been sent to your email"}';
            } else {
                $this->error('Code could not be added,Please try again in sometime!');
            }
        } else {
            $last_entry = $mo->table('extrade_verify')->where(array('email' => $email))->order('id desc')->find();
            if ($last_entry['attempts'] >= 3) {
                $this->error('Too many attempts!');
            }
            $mo->table('extrade_verify')->where(array('id' => $last_entry['id']))->setInc('attempts', 1);
            if ($last_entry) {
                if ($last_entry['code'] == $code) {
                    return '{"status":"1","data":"Code has been verfied please login"}';;
                } else {
                    $this->error('Incorrect Code!');
                }
            } else {
                $this->error('Incorrect Code!');
            }
        }
    }

    public function CheckUserPlan($userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $user = M('User')->where(array('id' => $uid))->find();

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://www.deltadigital.pro/afl/api/v1/user/delta-user-details',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => array('username' => $user['username']),
            CURLOPT_HTTPHEADER => array(
                'apikey: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXAiOiJ3ZWJzaXRlIiwiYXVkIjoiZGVsdGEtZGlnaXRhbC1hcHAiLCJpYXQiOjE2NzA0MDg1NTQsImlzcyI6ImRlbHRhZGlnaXRhbC5wcm8ifQ.yuHq7ZVyToBD2Ohr82NnQgPPz5KTSS9IxZSRj0uHwDM',
                'Cookie: defult_store_slug=admin_store; sessionid=px18dnkzrf2gxoq6ddlj3ca8pr57linf; store_user=admin_store'
            ),
        ));

        $response = curl_exec($curl);
        $response = json_decode($response, true);

        curl_close($curl);

        $status = $response['user exist'];
        $uid = $response['uid'];

        if ($uid > 0) {
            $iseligible = $response['iseligible'];
            $package = $response['package']['membership'];
            $expire = $response['package']['date'];
            // update user iseligible status from api

            M('User')->where(array('id' => $user['id']))->setField('paid', $iseligible);
            M('User')->where(array('id' => $user['id']))->setField('expiretime', $expire);
            M('User')->where(array('id' => $user['id']))->setField('plan', $package);

            $this->success("Plan updated successfully.");
        }
    }

    public function login($username, $password, $gacode = 0)
    {


        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://www.deltadigital.pro/afl/api/v1/user/delta-login-details',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => array('username' => $username, 'password' => $password),
            CURLOPT_HTTPHEADER => array(
                'apikey: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXAiOiJ3ZWJzaXRlIiwiYXVkIjoiZGVsdGEtZGlnaXRhbC1hcHAiLCJpYXQiOjE2NzA0MDg1NTQsImlzcyI6ImRlbHRhZGlnaXRhbC5wcm8ifQ.yuHq7ZVyToBD2Ohr82NnQgPPz5KTSS9IxZSRj0uHwDM',
                'Cookie: store_user=admin_store; defult_store_slug=admin_store; sessionid=6ny12lp5hx89myk4v4020zdog83p7q1s'
            ),
        ));

        $response = curl_exec($curl);
        curl_close($curl);
        $response = json_decode($response, true);

        #var_dump(json_decode($response, true));
        $status = $response['user exist'];
        $uid = $response['uid'];
        if ($status == 'false') {
            $r = $response['user'];
            $this->error($r);
        }
        if (!$status and !$uid) {
            $r = $response['user'];
            $this->error($r);
        }
        if ($uid > 0) {
            $uid = $response['uid'];
            $name = $response['name'];
            $email = $response['email'];
            $iseligible = $response['iseligible'];
            $phone = $response['phone number'];
            $role = $response['role'];
            if ($role == 'Customer') {
                $referallinks1 = $response['referallinks'];
            } else {
                $referallinks1 = $response['referallinks']['left_link'];
                $referallinks2 = $response['referallinks']['right_link'];
                M('User')->where(array('id' => $uid))->setField('leftref', $referallinks1);
                M('User')->where(array('id' => $uid))->setField('rightref', $referallinks2);
            }

            $country = $response['country'];
            $ref = $response['sponsorname'];
            $profilepic = $response['profilepic'];
            $package = $response['package']['membership'];
            $expire = $response['package']['date'];

            $level1 = $response['sponsor_levels']['level_1'];
            $level2 = $response['sponsor_levels']['level_2'];
            $level3 = $response['sponsor_levels']['level_3'];
        }

        $allowedPlans = ["Delta Digital Plus", "Delta Digital Plus Renewal", "Delta Digital Plus Upgrade", "Delta Digital Pro Renewal", "Delta Digital Pro Upgrade", "Delta Digital Pro"];


        if (!in_array($package, $allowedPlans)) {
            $this->error('You need either Delta Digital Plus,Delta Digital Plus Renewal,Delta Digital Plus Upgrade,Delta Digital Pro Renewal,Delta Digital Pro Upgrade or Delta Digital Pro package to access Cyborg');
        }

        if (M('User')->where(array('id' => $uid))->find()) {

            $user = M('User')->where(array('id' => $uid))->find();

            // update user iseligible status from api
            M('User')->where(array('id' => $user['id']))->setField('paid', $iseligible);
            M('User')->where(array('id' => $user['id']))->setField('expiretime', $expire);
            M('User')->where(array('id' => $user['id']))->setField('plan', $package);
            M('User')->where(array('id' => $user['id']))->setField('idcard', $profilepic);

            $remark = 'API User Login:' . date('Y-m-d H:i:s');
        } else {

            $mo = M();
            $mo->execute('set autocommit=0');
            $mo->execute('nolock tables extrade_user write , extrade_user_log write,extrade_user_coin write , extrade_user_set write ');
            $rs = array();
            if ($role == 'Customer') {
                $rs[] = $mo->table('extrade_user')->add(array('id' => $uid, 'email' => $email, 'username' => $username, 'addtime' => time(), 'password' => md5($password), 'paid' => $iseligible, 'cellphone' => $phone, 'usertype' => $role, 'expiretime' => $expire, 'plan' => $package, 'idcard' => $profilepic, 'country' => $country, 'tpwdsetting' => 1, 'invit_1' => $ref, 'invit_2' => $level2, 'invit_3' => $level3, 'leftref' => $referallinks1, 'rightref' => $referallinks2, 'addip' => get_client_ip(), 'addr' => get_city_ip(), 'addtime' => time(), 'status' => 1));
            } else {
                $rs[] = $mo->table('extrade_user')->add(array('id' => $uid, 'email' => $email, 'username' => $username, 'addtime' => time(), 'password' => md5($password), 'paid' => $iseligible, 'cellphone' => $phone, 'usertype' => $role, 'expiretime' => $expire, 'plan' => $package, 'idcard' => $profilepic, 'country' => $country, 'tpwdsetting' => 1, 'invit_1' => $ref, 'invit_2' => $level2, 'invit_3' => $level3, 'leftref' => $referallinks1, 'addip' => get_client_ip(), 'addr' => get_city_ip(), 'addtime' => time(), 'status' => 1));
            }

            $rs[] = $mo->table('extrade_user_coin')->add(array('userid' => $uid));

            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "BTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "BTC", 'coin_image' => "BTC.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "ETH/USDT", 'strategy_ratio' => 2.1, 'coin' => "ETH", 'coin_image' => "ETH.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "BNB/USDT", 'strategy_ratio' => 2.1, 'coin' => "BNB", 'coin_image' => "BNB.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "HBAR/USDT", 'strategy_ratio' => 2.4, 'coin' => "HBAR", 'coin_image' => "HBAR.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "HOT/USDT", 'strategy_ratio' => 2.3, 'coin' => "HOT", 'coin_image' => "HOT.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "QTUM/USDT", 'strategy_ratio' => 1.1, 'coin' => "QTUM", 'coin_image' => "QTUM.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "VET/USDT", 'strategy_ratio' => 3, 'coin' => "VET", 'coin_image' => "VET.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "XLM/USDT", 'strategy_ratio' => 2, 5, 'coin' => "XLM", 'coin_image' => "XLM.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "1INCH/USDT", 'strategy_ratio' => 2.1, 'coin' => "1INCH", 'coin_image' => "1INCH.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "AAVE/USDT", 'strategy_ratio' => 2.1, 'coin' => "AAVE", 'coin_image' => "AAVE.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "ADA/USDT", 'strategy_ratio' => 6.1, 'coin' => "ADA", 'coin_image' => "ADA.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "CAKE/USDT", 'strategy_ratio' => 2.1, 'coin' => "CAKE", 'coin_image' => "CAKE.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "DASH/USDT", 'strategy_ratio' => 2.1, 'coin' => "DASH", 'coin_image' => "DASH.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "DOGE/USDT", 'strategy_ratio' => 5.1, 'coin' => "DOGE", 'coin_image' => "DOGE.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "DOT/USDT", 'strategy_ratio' => 2.1, 'coin' => "DOT", 'coin_image' => "DOT.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "EOS/USDT", 'strategy_ratio' => 2.1, 'coin' => "EOS", 'coin_image' => "EOS.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "ETC/USDT", 'strategy_ratio' => 4.1, 'coin' => "ETC", 'coin_image' => "ETC.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "FIL/USDT", 'strategy_ratio' => 2.1, 'coin' => "FIL", 'coin_image' => "FIL.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "FTT/USDT", 'strategy_ratio' => 2.2, 'coin' => "FTT", 'coin_image' => "FTT.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "GRT/USDT", 'strategy_ratio' => 2.1, 'coin' => "GRT", 'coin_image' => "GRT.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "LINK/USDT", 'strategy_ratio' => 2.1, 'coin' => "LINK", 'coin_image' => "LINK.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "LTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "LTC", 'coin_image' => "LTC.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "THETA/USDT", 'strategy_ratio' => 2.1, 'coin' => "THETA", 'coin_image' => "THETA.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "UNI/USDT", 'strategy_ratio' => 2.1, 'coin' => "UNI", 'coin_image' => "UNI.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "XMR/USDT", 'strategy_ratio' => 3.1, 'coin' => "XMR", 'coin_image' => "XMR.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "XRP/USDT", 'strategy_ratio' => 2.1, 'coin' => "XRP", 'coin_image' => "XRP.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "XTZ/USDT", 'strategy_ratio' => 2.1, 'coin' => "XTZ", 'coin_image' => "XTZ.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "ALICE/USDT", 'strategy_ratio' => 4.1, 'coin' => "ALICE", 'coin_image' => "ALICE.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "SOL/USDT", 'strategy_ratio' => 4.1, 'coin' => "SOL", 'coin_image' => "SOL.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "LUNA/USDT", 'strategy_ratio' => 4.1, 'coin' => "LUNA", 'coin_image' => "LUNA.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "FTM/USDT", 'strategy_ratio' => 4.1, 'coin' => "FTM", 'coin_image' => "FTM.png"));

            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "BTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "BTC", 'coin_image' => "BTC.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "ETH/USDT", 'strategy_ratio' => 2.1, 'coin' => "ETH", 'coin_image' => "ETH.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "BNB/USDT", 'strategy_ratio' => 2.1, 'coin' => "BNB", 'coin_image' => "BNB.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "HBAR/USDT", 'strategy_ratio' => 2.4, 'coin' => "HBAR", 'coin_image' => "HBAR.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "HOT/USDT", 'strategy_ratio' => 2.3, 'coin' => "HOT", 'coin_image' => "HOT.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "QTUM/USDT", 'strategy_ratio' => 1.1, 'coin' => "QTUM", 'coin_image' => "QTUM.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "VET/USDT", 'strategy_ratio' => 3, 'coin' => "VET", 'coin_image' => "VET.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "XLM/USDT", 'strategy_ratio' => 2, 5, 'coin' => "XLM", 'coin_image' => "XLM.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "1INCH/USDT", 'strategy_ratio' => 2.1, 'coin' => "1INCH", 'coin_image' => "1INCH.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "AAVE/USDT", 'strategy_ratio' => 2.1, 'coin' => "AAVE", 'coin_image' => "AAVE.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "ADA/USDT", 'strategy_ratio' => 6.1, 'coin' => "ADA", 'coin_image' => "ADA.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "CAKE/USDT", 'strategy_ratio' => 2.1, 'coin' => "CAKE", 'coin_image' => "CAKE.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "DASH/USDT", 'strategy_ratio' => 2.1, 'coin' => "DASH", 'coin_image' => "DASH.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "DOGE/USDT", 'strategy_ratio' => 5.1, 'coin' => "DOGE", 'coin_image' => "DOGE.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "DOT/USDT", 'strategy_ratio' => 2.1, 'coin' => "DOT", 'coin_image' => "DOT.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "EOS/USDT", 'strategy_ratio' => 2.1, 'coin' => "EOS", 'coin_image' => "EOS.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "ETC/USDT", 'strategy_ratio' => 4.1, 'coin' => "ETC", 'coin_image' => "ETC.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "FIL/USDT", 'strategy_ratio' => 2.1, 'coin' => "FIL", 'coin_image' => "FIL.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "FTT/USDT", 'strategy_ratio' => 2.2, 'coin' => "FTT", 'coin_image' => "FTT.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "GRT/USDT", 'strategy_ratio' => 2.1, 'coin' => "GRT", 'coin_image' => "GRT.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "LINK/USDT", 'strategy_ratio' => 2.1, 'coin' => "LINK", 'coin_image' => "LINK.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "LTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "LTC", 'coin_image' => "LTC.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "THETA/USDT", 'strategy_ratio' => 2.1, 'coin' => "THETA", 'coin_image' => "THETA.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "UNI/USDT", 'strategy_ratio' => 2.1, 'coin' => "UNI", 'coin_image' => "UNI.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "XMR/USDT", 'strategy_ratio' => 3.1, 'coin' => "XMR", 'coin_image' => "XMR.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "XRP/USDT", 'strategy_ratio' => 2.1, 'coin' => "XRP", 'coin_image' => "XRP.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "XTZ/USDT", 'strategy_ratio' => 2.1, 'coin' => "XTZ", 'coin_image' => "XTZ.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "ALICE/USDT", 'strategy_ratio' => 4.1, 'coin' => "ALICE", 'coin_image' => "ALICE.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "SOL/USDT", 'strategy_ratio' => 4.1, 'coin' => "SOL", 'coin_image' => "SOL.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "LUNA/USDT", 'strategy_ratio' => 4.1, 'coin' => "LUNA", 'coin_image' => "LUNA.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "FTM/USDT", 'strategy_ratio' => 4.1, 'coin' => "FTM", 'coin_image' => "FTM.png"));

            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "BTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "BTC", 'coin_image' => "BTC.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "ETH/USDT", 'strategy_ratio' => 2.1, 'coin' => "ETH", 'coin_image' => "ETH.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "BNB/USDT", 'strategy_ratio' => 2.1, 'coin' => "BNB", 'coin_image' => "BNB.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "HBAR/USDT", 'strategy_ratio' => 2.4, 'coin' => "HBAR", 'coin_image' => "HBAR.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "HOT/USDT", 'strategy_ratio' => 2.3, 'coin' => "HOT", 'coin_image' => "HOT.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "QTUM/USDT", 'strategy_ratio' => 1.1, 'coin' => "QTUM", 'coin_image' => "QTUM.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "VET/USDT", 'strategy_ratio' => 3, 'coin' => "VET", 'coin_image' => "VET.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "XLM/USDT", 'strategy_ratio' => 2, 5, 'coin' => "XLM", 'coin_image' => "XLM.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "1INCH/USDT", 'strategy_ratio' => 2.1, 'coin' => "1INCH", 'coin_image' => "1INCH.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "AAVE/USDT", 'strategy_ratio' => 2.1, 'coin' => "AAVE", 'coin_image' => "AAVE.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "ADA/USDT", 'strategy_ratio' => 6.1, 'coin' => "ADA", 'coin_image' => "ADA.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "CAKE/USDT", 'strategy_ratio' => 2.1, 'coin' => "CAKE", 'coin_image' => "CAKE.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "DASH/USDT", 'strategy_ratio' => 2.1, 'coin' => "DASH", 'coin_image' => "DASH.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "DOGE/USDT", 'strategy_ratio' => 5.1, 'coin' => "DOGE", 'coin_image' => "DOGE.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "DOT/USDT", 'strategy_ratio' => 2.1, 'coin' => "DOT", 'coin_image' => "DOT.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "EOS/USDT", 'strategy_ratio' => 2.1, 'coin' => "EOS", 'coin_image' => "EOS.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "ETC/USDT", 'strategy_ratio' => 4.1, 'coin' => "ETC", 'coin_image' => "ETC.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "FIL/USDT", 'strategy_ratio' => 2.1, 'coin' => "FIL", 'coin_image' => "FIL.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "FTT/USDT", 'strategy_ratio' => 2.2, 'coin' => "FTT", 'coin_image' => "FTT.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "GRT/USDT", 'strategy_ratio' => 2.1, 'coin' => "GRT", 'coin_image' => "GRT.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "LINK/USDT", 'strategy_ratio' => 2.1, 'coin' => "LINK", 'coin_image' => "LINK.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "LTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "LTC", 'coin_image' => "LTC.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "THETA/USDT", 'strategy_ratio' => 2.1, 'coin' => "THETA", 'coin_image' => "THETA.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "UNI/USDT", 'strategy_ratio' => 2.1, 'coin' => "UNI", 'coin_image' => "UNI.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "XMR/USDT", 'strategy_ratio' => 3.1, 'coin' => "XMR", 'coin_image' => "XMR.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "XRP/USDT", 'strategy_ratio' => 2.1, 'coin' => "XRP", 'coin_image' => "XRP.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "XTZ/USDT", 'strategy_ratio' => 2.1, 'coin' => "XTZ", 'coin_image' => "XTZ.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "ALICE/USDT", 'strategy_ratio' => 4.1, 'coin' => "ALICE", 'coin_image' => "ALICE.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "SOL/USDT", 'strategy_ratio' => 4.1, 'coin' => "SOL", 'coin_image' => "SOL.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "LUNA/USDT", 'strategy_ratio' => 4.1, 'coin' => "LUNA", 'coin_image' => "LUNA.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "FTM/USDT", 'strategy_ratio' => 4.1, 'coin' => "FTM", 'coin_image' => "FTM.png"));

            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "BTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "BTC", 'coin_image' => "BTC.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "ETH/USDT", 'strategy_ratio' => 2.1, 'coin' => "ETH", 'coin_image' => "ETH.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "BNB/USDT", 'strategy_ratio' => 2.1, 'coin' => "BNB", 'coin_image' => "BNB.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "HBAR/USDT", 'strategy_ratio' => 2.4, 'coin' => "HBAR", 'coin_image' => "HBAR.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "HOT/USDT", 'strategy_ratio' => 2.3, 'coin' => "HOT", 'coin_image' => "HOT.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "QTUM/USDT", 'strategy_ratio' => 1.1, 'coin' => "QTUM", 'coin_image' => "QTUM.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "VET/USDT", 'strategy_ratio' => 3, 'coin' => "VET", 'coin_image' => "VET.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "XLM/USDT", 'strategy_ratio' => 2, 5, 'coin' => "XLM", 'coin_image' => "XLM.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "1INCH/USDT", 'strategy_ratio' => 2.1, 'coin' => "1INCH", 'coin_image' => "1INCH.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "AAVE/USDT", 'strategy_ratio' => 2.1, 'coin' => "AAVE", 'coin_image' => "AAVE.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "ADA/USDT", 'strategy_ratio' => 6.1, 'coin' => "ADA", 'coin_image' => "ADA.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "CAKE/USDT", 'strategy_ratio' => 2.1, 'coin' => "CAKE", 'coin_image' => "CAKE.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "DASH/USDT", 'strategy_ratio' => 2.1, 'coin' => "DASH", 'coin_image' => "DASH.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "DOGE/USDT", 'strategy_ratio' => 5.1, 'coin' => "DOGE", 'coin_image' => "DOGE.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "DOT/USDT", 'strategy_ratio' => 2.1, 'coin' => "DOT", 'coin_image' => "DOT.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "EOS/USDT", 'strategy_ratio' => 2.1, 'coin' => "EOS", 'coin_image' => "EOS.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "ETC/USDT", 'strategy_ratio' => 4.1, 'coin' => "ETC", 'coin_image' => "ETC.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "FIL/USDT", 'strategy_ratio' => 2.1, 'coin' => "FIL", 'coin_image' => "FIL.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "FTT/USDT", 'strategy_ratio' => 2.2, 'coin' => "FTT", 'coin_image' => "FTT.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "GRT/USDT", 'strategy_ratio' => 2.1, 'coin' => "GRT", 'coin_image' => "GRT.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "LINK/USDT", 'strategy_ratio' => 2.1, 'coin' => "LINK", 'coin_image' => "LINK.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "LTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "LTC", 'coin_image' => "LTC.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "THETA/USDT", 'strategy_ratio' => 2.1, 'coin' => "THETA", 'coin_image' => "THETA.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "UNI/USDT", 'strategy_ratio' => 2.1, 'coin' => "UNI", 'coin_image' => "UNI.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "XMR/USDT", 'strategy_ratio' => 3.1, 'coin' => "XMR", 'coin_image' => "XMR.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "XRP/USDT", 'strategy_ratio' => 2.1, 'coin' => "XRP", 'coin_image' => "XRP.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "XTZ/USDT", 'strategy_ratio' => 2.1, 'coin' => "XTZ", 'coin_image' => "XTZ.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "ALICE/USDT", 'strategy_ratio' => 4.1, 'coin' => "ALICE", 'coin_image' => "ALICE.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "SOL/USDT", 'strategy_ratio' => 4.1, 'coin' => "SOL", 'coin_image' => "SOL.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "LUNA/USDT", 'strategy_ratio' => 4.1, 'coin' => "LUNA", 'coin_image' => "LUNA.png"));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "FTM/USDT", 'strategy_ratio' => 4.1, 'coin' => "FTM", 'coin_image' => "FTM.png"));


            // feature market
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "BTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "BTC", 'coin_image' => "BTC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "ETH/USDT", 'strategy_ratio' => 2.1, 'coin' => "ETH", 'coin_image' => "ETH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "BNB/USDT", 'strategy_ratio' => 2.1, 'coin' => "BNB", 'coin_image' => "BNB.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "HBAR/USDT", 'strategy_ratio' => 2.4, 'coin' => "HBAR", 'coin_image' => "HBAR.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "HOT/USDT", 'strategy_ratio' => 2.3, 'coin' => "HOT", 'coin_image' => "HOT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "QTUM/USDT", 'strategy_ratio' => 1.1, 'coin' => "QTUM", 'coin_image' => "QTUM.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "VET/USDT", 'strategy_ratio' => 3, 'coin' => "VET", 'coin_image' => "VET.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "XLM/USDT", 'strategy_ratio' => 2, 5, 'coin' => "XLM", 'coin_image' => "XLM.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "1INCH/USDT", 'strategy_ratio' => 2.1, 'coin' => "1INCH", 'coin_image' => "1INCH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "AAVE/USDT", 'strategy_ratio' => 2.1, 'coin' => "AAVE", 'coin_image' => "AAVE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "ADA/USDT", 'strategy_ratio' => 6.1, 'coin' => "ADA", 'coin_image' => "ADA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "CAKE/USDT", 'strategy_ratio' => 2.1, 'coin' => "CAKE", 'coin_image' => "CAKE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "DASH/USDT", 'strategy_ratio' => 2.1, 'coin' => "DASH", 'coin_image' => "DASH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "DOGE/USDT", 'strategy_ratio' => 5.1, 'coin' => "DOGE", 'coin_image' => "DOGE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "DOT/USDT", 'strategy_ratio' => 2.1, 'coin' => "DOT", 'coin_image' => "DOT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "EOS/USDT", 'strategy_ratio' => 2.1, 'coin' => "EOS", 'coin_image' => "EOS.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "ETC/USDT", 'strategy_ratio' => 4.1, 'coin' => "ETC", 'coin_image' => "ETC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "FIL/USDT", 'strategy_ratio' => 2.1, 'coin' => "FIL", 'coin_image' => "FIL.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "FTT/USDT", 'strategy_ratio' => 2.2, 'coin' => "FTT", 'coin_image' => "FTT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "GRT/USDT", 'strategy_ratio' => 2.1, 'coin' => "GRT", 'coin_image' => "GRT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "LINK/USDT", 'strategy_ratio' => 2.1, 'coin' => "LINK", 'coin_image' => "LINK.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "LTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "LTC", 'coin_image' => "LTC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "THETA/USDT", 'strategy_ratio' => 2.1, 'coin' => "THETA", 'coin_image' => "THETA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "UNI/USDT", 'strategy_ratio' => 2.1, 'coin' => "UNI", 'coin_image' => "UNI.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "XMR/USDT", 'strategy_ratio' => 3.1, 'coin' => "XMR", 'coin_image' => "XMR.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "XRP/USDT", 'strategy_ratio' => 2.1, 'coin' => "XRP", 'coin_image' => "XRP.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "XTZ/USDT", 'strategy_ratio' => 2.1, 'coin' => "XTZ", 'coin_image' => "XTZ.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "ALICE/USDT", 'strategy_ratio' => 4.1, 'coin' => "ALICE", 'coin_image' => "ALICE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "SOL/USDT", 'strategy_ratio' => 4.1, 'coin' => "SOL", 'coin_image' => "SOL.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "LUNA/USDT", 'strategy_ratio' => 4.1, 'coin' => "LUNA", 'coin_image' => "LUNA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "FTM/USDT", 'strategy_ratio' => 4.1, 'coin' => "FTM", 'coin_image' => "FTM.png", 'trade_type' => 1));

            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "BTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "BTC", 'coin_image' => "BTC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "ETH/USDT", 'strategy_ratio' => 2.1, 'coin' => "ETH", 'coin_image' => "ETH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "BNB/USDT", 'strategy_ratio' => 2.1, 'coin' => "BNB", 'coin_image' => "BNB.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "HBAR/USDT", 'strategy_ratio' => 2.4, 'coin' => "HBAR", 'coin_image' => "HBAR.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "HOT/USDT", 'strategy_ratio' => 2.3, 'coin' => "HOT", 'coin_image' => "HOT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "QTUM/USDT", 'strategy_ratio' => 1.1, 'coin' => "QTUM", 'coin_image' => "QTUM.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "VET/USDT", 'strategy_ratio' => 3, 'coin' => "VET", 'coin_image' => "VET.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "XLM/USDT", 'strategy_ratio' => 2, 5, 'coin' => "XLM", 'coin_image' => "XLM.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "1INCH/USDT", 'strategy_ratio' => 2.1, 'coin' => "1INCH", 'coin_image' => "1INCH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "AAVE/USDT", 'strategy_ratio' => 2.1, 'coin' => "AAVE", 'coin_image' => "AAVE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "ADA/USDT", 'strategy_ratio' => 6.1, 'coin' => "ADA", 'coin_image' => "ADA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "CAKE/USDT", 'strategy_ratio' => 2.1, 'coin' => "CAKE", 'coin_image' => "CAKE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "DASH/USDT", 'strategy_ratio' => 2.1, 'coin' => "DASH", 'coin_image' => "DASH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "DOGE/USDT", 'strategy_ratio' => 5.1, 'coin' => "DOGE", 'coin_image' => "DOGE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "DOT/USDT", 'strategy_ratio' => 2.1, 'coin' => "DOT", 'coin_image' => "DOT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "EOS/USDT", 'strategy_ratio' => 2.1, 'coin' => "EOS", 'coin_image' => "EOS.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "ETC/USDT", 'strategy_ratio' => 4.1, 'coin' => "ETC", 'coin_image' => "ETC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "FIL/USDT", 'strategy_ratio' => 2.1, 'coin' => "FIL", 'coin_image' => "FIL.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "FTT/USDT", 'strategy_ratio' => 2.2, 'coin' => "FTT", 'coin_image' => "FTT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "GRT/USDT", 'strategy_ratio' => 2.1, 'coin' => "GRT", 'coin_image' => "GRT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "LINK/USDT", 'strategy_ratio' => 2.1, 'coin' => "LINK", 'coin_image' => "LINK.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "LTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "LTC", 'coin_image' => "LTC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "THETA/USDT", 'strategy_ratio' => 2.1, 'coin' => "THETA", 'coin_image' => "THETA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "UNI/USDT", 'strategy_ratio' => 2.1, 'coin' => "UNI", 'coin_image' => "UNI.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "XMR/USDT", 'strategy_ratio' => 3.1, 'coin' => "XMR", 'coin_image' => "XMR.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "XRP/USDT", 'strategy_ratio' => 2.1, 'coin' => "XRP", 'coin_image' => "XRP.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "XTZ/USDT", 'strategy_ratio' => 2.1, 'coin' => "XTZ", 'coin_image' => "XTZ.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "ALICE/USDT", 'strategy_ratio' => 4.1, 'coin' => "ALICE", 'coin_image' => "ALICE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "SOL/USDT", 'strategy_ratio' => 4.1, 'coin' => "SOL", 'coin_image' => "SOL.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "LUNA/USDT", 'strategy_ratio' => 4.1, 'coin' => "LUNA", 'coin_image' => "LUNA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "FTM/USDT", 'strategy_ratio' => 4.1, 'coin' => "FTM", 'coin_image' => "FTM.png", 'trade_type' => 1));

            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "BTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "BTC", 'coin_image' => "BTC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "ETH/USDT", 'strategy_ratio' => 2.1, 'coin' => "ETH", 'coin_image' => "ETH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "BNB/USDT", 'strategy_ratio' => 2.1, 'coin' => "BNB", 'coin_image' => "BNB.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "HBAR/USDT", 'strategy_ratio' => 2.4, 'coin' => "HBAR", 'coin_image' => "HBAR.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "HOT/USDT", 'strategy_ratio' => 2.3, 'coin' => "HOT", 'coin_image' => "HOT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "QTUM/USDT", 'strategy_ratio' => 1.1, 'coin' => "QTUM", 'coin_image' => "QTUM.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "VET/USDT", 'strategy_ratio' => 3, 'coin' => "VET", 'coin_image' => "VET.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "XLM/USDT", 'strategy_ratio' => 2, 5, 'coin' => "XLM", 'coin_image' => "XLM.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "1INCH/USDT", 'strategy_ratio' => 2.1, 'coin' => "1INCH", 'coin_image' => "1INCH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "AAVE/USDT", 'strategy_ratio' => 2.1, 'coin' => "AAVE", 'coin_image' => "AAVE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "ADA/USDT", 'strategy_ratio' => 6.1, 'coin' => "ADA", 'coin_image' => "ADA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "CAKE/USDT", 'strategy_ratio' => 2.1, 'coin' => "CAKE", 'coin_image' => "CAKE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "DASH/USDT", 'strategy_ratio' => 2.1, 'coin' => "DASH", 'coin_image' => "DASH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "DOGE/USDT", 'strategy_ratio' => 5.1, 'coin' => "DOGE", 'coin_image' => "DOGE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "DOT/USDT", 'strategy_ratio' => 2.1, 'coin' => "DOT", 'coin_image' => "DOT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "EOS/USDT", 'strategy_ratio' => 2.1, 'coin' => "EOS", 'coin_image' => "EOS.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "ETC/USDT", 'strategy_ratio' => 4.1, 'coin' => "ETC", 'coin_image' => "ETC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "FIL/USDT", 'strategy_ratio' => 2.1, 'coin' => "FIL", 'coin_image' => "FIL.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "FTT/USDT", 'strategy_ratio' => 2.2, 'coin' => "FTT", 'coin_image' => "FTT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "GRT/USDT", 'strategy_ratio' => 2.1, 'coin' => "GRT", 'coin_image' => "GRT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "LINK/USDT", 'strategy_ratio' => 2.1, 'coin' => "LINK", 'coin_image' => "LINK.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "LTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "LTC", 'coin_image' => "LTC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "THETA/USDT", 'strategy_ratio' => 2.1, 'coin' => "THETA", 'coin_image' => "THETA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "UNI/USDT", 'strategy_ratio' => 2.1, 'coin' => "UNI", 'coin_image' => "UNI.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "XMR/USDT", 'strategy_ratio' => 3.1, 'coin' => "XMR", 'coin_image' => "XMR.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "XRP/USDT", 'strategy_ratio' => 2.1, 'coin' => "XRP", 'coin_image' => "XRP.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "XTZ/USDT", 'strategy_ratio' => 2.1, 'coin' => "XTZ", 'coin_image' => "XTZ.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "ALICE/USDT", 'strategy_ratio' => 4.1, 'coin' => "ALICE", 'coin_image' => "ALICE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "SOL/USDT", 'strategy_ratio' => 4.1, 'coin' => "SOL", 'coin_image' => "SOL.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "LUNA/USDT", 'strategy_ratio' => 4.1, 'coin' => "LUNA", 'coin_image' => "LUNA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "FTM/USDT", 'strategy_ratio' => 4.1, 'coin' => "FTM", 'coin_image' => "FTM.png", 'trade_type' => 1));

            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "BTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "BTC", 'coin_image' => "BTC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "ETH/USDT", 'strategy_ratio' => 2.1, 'coin' => "ETH", 'coin_image' => "ETH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "BNB/USDT", 'strategy_ratio' => 2.1, 'coin' => "BNB", 'coin_image' => "BNB.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "HBAR/USDT", 'strategy_ratio' => 2.4, 'coin' => "HBAR", 'coin_image' => "HBAR.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "HOT/USDT", 'strategy_ratio' => 2.3, 'coin' => "HOT", 'coin_image' => "HOT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "QTUM/USDT", 'strategy_ratio' => 1.1, 'coin' => "QTUM", 'coin_image' => "QTUM.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "VET/USDT", 'strategy_ratio' => 3, 'coin' => "VET", 'coin_image' => "VET.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "XLM/USDT", 'strategy_ratio' => 2, 5, 'coin' => "XLM", 'coin_image' => "XLM.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "1INCH/USDT", 'strategy_ratio' => 2.1, 'coin' => "1INCH", 'coin_image' => "1INCH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "AAVE/USDT", 'strategy_ratio' => 2.1, 'coin' => "AAVE", 'coin_image' => "AAVE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "ADA/USDT", 'strategy_ratio' => 6.1, 'coin' => "ADA", 'coin_image' => "ADA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "CAKE/USDT", 'strategy_ratio' => 2.1, 'coin' => "CAKE", 'coin_image' => "CAKE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "DASH/USDT", 'strategy_ratio' => 2.1, 'coin' => "DASH", 'coin_image' => "DASH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "DOGE/USDT", 'strategy_ratio' => 5.1, 'coin' => "DOGE", 'coin_image' => "DOGE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "DOT/USDT", 'strategy_ratio' => 2.1, 'coin' => "DOT", 'coin_image' => "DOT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "EOS/USDT", 'strategy_ratio' => 2.1, 'coin' => "EOS", 'coin_image' => "EOS.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "ETC/USDT", 'strategy_ratio' => 4.1, 'coin' => "ETC", 'coin_image' => "ETC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "FIL/USDT", 'strategy_ratio' => 2.1, 'coin' => "FIL", 'coin_image' => "FIL.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "FTT/USDT", 'strategy_ratio' => 2.2, 'coin' => "FTT", 'coin_image' => "FTT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "GRT/USDT", 'strategy_ratio' => 2.1, 'coin' => "GRT", 'coin_image' => "GRT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "LINK/USDT", 'strategy_ratio' => 2.1, 'coin' => "LINK", 'coin_image' => "LINK.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "LTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "LTC", 'coin_image' => "LTC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "THETA/USDT", 'strategy_ratio' => 2.1, 'coin' => "THETA", 'coin_image' => "THETA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "UNI/USDT", 'strategy_ratio' => 2.1, 'coin' => "UNI", 'coin_image' => "UNI.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "XMR/USDT", 'strategy_ratio' => 3.1, 'coin' => "XMR", 'coin_image' => "XMR.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "XRP/USDT", 'strategy_ratio' => 2.1, 'coin' => "XRP", 'coin_image' => "XRP.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "XTZ/USDT", 'strategy_ratio' => 2.1, 'coin' => "XTZ", 'coin_image' => "XTZ.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "ALICE/USDT", 'strategy_ratio' => 4.1, 'coin' => "ALICE", 'coin_image' => "ALICE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "SOL/USDT", 'strategy_ratio' => 4.1, 'coin' => "SOL", 'coin_image' => "SOL.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "LUNA/USDT", 'strategy_ratio' => 4.1, 'coin' => "LUNA", 'coin_image' => "LUNA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "FTM/USDT", 'strategy_ratio' => 4.1, 'coin' => "FTM", 'coin_image' => "FTM.png", 'trade_type' => 1));
        }


        if (M('User')->where(array('id' => $uid))->find()) {

            $user = M('User')->where(array('id' => $uid))->find();
            $remark = 'API User Login:' . date('Y-m-d H:i:s');
        }
        //Here we check if 2fa is enabled if Yes Then 
        $ga_status = $user['ga'] ? 1 : 0;
        //Google2FA IS ENABLED  For login
        if ($ga_status == 1) {
            $arr = explode('|', $user['ga']);
            $is_ga = $arr[1];
        } else {
            $is_ga = 0;
        }
        if ($is_ga == 1) {

            if ($gacode == 0) {
                $mo->execute('rollback');
                $mo->execute('unlock tables');
                $this->error(L("Enter your Google auth code"));
            }
            $secret = $arr[0];
            $ga = new \Common\Ext\GoogleAuthenticator();
            $ga_verification = $ga->verifyCode($secret, $gacode, 1);
            if (!$ga_verification) {
                $mo->execute('rollback');
                $mo->execute('unlock tables');
                $this->error(L('Verification failed'));
            }
        }
        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user write , extrade_user_log write,extrade_user_coin write , extrade_user_set write ');
        $rs = array();
        $rs[] = $mo->table('extrade_user')->where(array('id' => $user['id']))->setInc('logins', 1);
        $rs[] = $mo->table('extrade_user_log')->add(array('userid' => $user['id'], 'type' => 'APP log in', 'remark' => $remark, 'addtime' => time(), 'addip' => get_client_ip(), 'addr' => get_city_ip(), 'status' => 1));

        if (check_arr($rs)) {
            if (!$token = $user['token']) {
                $token = md5(md5(rand(0, 10000) . md5(time()), md5(uniqid())));
                M('User')->where(array('id' => $user['id']))->setField('token', $token);
            }

            S('APP_AUTH_ID_' . $user['id'], $token);
            $mo->execute('commit');
            $mo->execute('unlock tables');

            if (!$user['invit']) {
                for (; true;) {
                    $tradeno = tradenoa();

                    if (!M('User')->where(array('invit' => $tradeno))->find()) {
                        break;
                    }
                }

                M('User')->where(array('id' => $user['id']))->setField('invit', $tradeno);
            }
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success(array('ID' => $user['id'], 'TOKEN' => $token, 'msg' => 'login successful!'));
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error(L('LOGIN_FAILED'));
        }
    }

    public function loginout()
    {
        $uid = $this->userid();
        M('User')->where(array('id' => $uid))->setField('token', '');
        S('APP_AUTH_ID_' . $uid, null);
        $this->ajaxShow('Logout successfully');
    }

    public function addFutureMarket()
    {
        $userData = M('User')->select();

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user write , extrade_user_coin write , extrade_user_set write ');
        $rs = array();

        $data = [
            [
                'market' => "BTC/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "BTC",
                'coin_image' => "BTC.png"
            ],
            [
                'market' => "ETH/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "ETH",
                'coin_image' => "ETH.png"
            ],
            [
                'market' => "BNB/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "BNB",
                'coin_image' => "BNB.png"
            ],
            [
                'market' => "HBAR/USDT",
                'strategy_ratio' => 2.4,
                'coin' => "HBAR",
                'coin_image' => "HBAR.png"
            ],
            [
                'market' => "HOT/USDT",
                'strategy_ratio' => 2.3,
                'coin' => "HOT",
                'coin_image' => "HOT.png"
            ],
            [
                'market' => "QTUM/USDT",
                'strategy_ratio' => 1.1,
                'coin' => "QTUM",
                'coin_image' => "QTUM.png"
            ],
            [
                'market' => "VET/USDT",
                'strategy_ratio' => 3,
                'coin' => "VET",
                'coin_image' => "VET.png"
            ],
            [
                'market' => "XLM/USDT",
                'strategy_ratio' => 2.5,
                'coin' => "XLM",
                'coin_image' => "XLM.png"
            ],
            [
                'market' => "1INCH/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "1INCH",
                'coin_image' => "1INCH.png"
            ],
            [
                'market' => "AAVE/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "AAVE",
                'coin_image' => "AAVE.png"
            ],
            [
                'market' => "ADA/USDT",
                'strategy_ratio' => 6.1,
                'coin' => "ADA",
                'coin_image' => "ADA.png"
            ],
            [
                'market' => "CAKE/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "CAKE",
                'coin_image' => "CAKE.png"
            ],
            [
                'market' => "DASH/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "DASH",
                'coin_image' => "DASH.png"
            ],
            [
                'market' => "DOGE/USDT",
                'strategy_ratio' => 5.1,
                'coin' => "DOGE",
                'coin_image' => "DOGE.png"
            ],
            [
                'market' => "DOT/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "DOT",
                'coin_image' => "DOT.png"
            ],
            [
                'market' => "EOS/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "EOS",
                'coin_image' => "EOS.png"
            ],
            [
                'market' => "ETC/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "ETC",
                'coin_image' => "ETC.png"
            ],
            [
                'market' => "FIL/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "FIL",
                'coin_image' => "FIL.png"
            ],
            [
                'market' => "FTT/USDT",
                'strategy_ratio' => 2.2,
                'coin' => "FTT",
                'coin_image' => "FTT.png"
            ],
            [
                'market' => "GRT/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "GRT",
                'coin_image' => "GRT.png"
            ],
            [
                'market' => "LINK/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "LINK",
                'coin_image' => "LINK.png"
            ],
            [
                'market' => "LTC/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "LTC",
                'coin_image' => "LTC.png"
            ],
            [
                'market' => "THETA/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "THETA",
                'coin_image' => "THETA.png"
            ],
            [
                'market' => "UNI/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "UNI",
                'coin_image' => "UNI.png"
            ],
            [
                'market' => "XMR/USDT",
                'strategy_ratio' => 3.1,
                'coin' => "XMR",
                'coin_image' => "XMR.png"
            ],
            [
                'market' => "XRP/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "XRP",
                'coin_image' => "XRP.png"
            ],
            [
                'market' => "XTZ/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "XTZ",
                'coin_image' => "XTZ.png"
            ],
            [
                'market' => "ALICE/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "ALICE",
                'coin_image' => "ALICE.png"
            ],
            [
                'market' => "SOL/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "SOL",
                'coin_image' => "SOL.png"
            ],
            [
                'market' => "LUNA/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "LUNA",
                'coin_image' => "LUNA.png"
            ],
            [
                'market' => "FTM/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "FTM",
                'coin_image' => "FTM.png"
            ]
        ];

        $exchanges = [1, 2, 3, 4];

        foreach ($userData as $key => $val) {
            $uid = $val['id'];
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "BTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "BTC", 'coin_image' => "BTC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "ETH/USDT", 'strategy_ratio' => 2.1, 'coin' => "ETH", 'coin_image' => "ETH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "BNB/USDT", 'strategy_ratio' => 2.1, 'coin' => "BNB", 'coin_image' => "BNB.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "HBAR/USDT", 'strategy_ratio' => 2.4, 'coin' => "HBAR", 'coin_image' => "HBAR.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "HOT/USDT", 'strategy_ratio' => 2.3, 'coin' => "HOT", 'coin_image' => "HOT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "QTUM/USDT", 'strategy_ratio' => 1.1, 'coin' => "QTUM", 'coin_image' => "QTUM.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "VET/USDT", 'strategy_ratio' => 3, 'coin' => "VET", 'coin_image' => "VET.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "XLM/USDT", 'strategy_ratio' => 2, 5, 'coin' => "XLM", 'coin_image' => "XLM.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "1INCH/USDT", 'strategy_ratio' => 2.1, 'coin' => "1INCH", 'coin_image' => "1INCH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "AAVE/USDT", 'strategy_ratio' => 2.1, 'coin' => "AAVE", 'coin_image' => "AAVE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "ADA/USDT", 'strategy_ratio' => 6.1, 'coin' => "ADA", 'coin_image' => "ADA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "CAKE/USDT", 'strategy_ratio' => 2.1, 'coin' => "CAKE", 'coin_image' => "CAKE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "DASH/USDT", 'strategy_ratio' => 2.1, 'coin' => "DASH", 'coin_image' => "DASH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "DOGE/USDT", 'strategy_ratio' => 5.1, 'coin' => "DOGE", 'coin_image' => "DOGE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "DOT/USDT", 'strategy_ratio' => 2.1, 'coin' => "DOT", 'coin_image' => "DOT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "EOS/USDT", 'strategy_ratio' => 2.1, 'coin' => "EOS", 'coin_image' => "EOS.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "ETC/USDT", 'strategy_ratio' => 4.1, 'coin' => "ETC", 'coin_image' => "ETC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "FIL/USDT", 'strategy_ratio' => 2.1, 'coin' => "FIL", 'coin_image' => "FIL.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "FTT/USDT", 'strategy_ratio' => 2.2, 'coin' => "FTT", 'coin_image' => "FTT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "GRT/USDT", 'strategy_ratio' => 2.1, 'coin' => "GRT", 'coin_image' => "GRT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "LINK/USDT", 'strategy_ratio' => 2.1, 'coin' => "LINK", 'coin_image' => "LINK.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "LTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "LTC", 'coin_image' => "LTC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "THETA/USDT", 'strategy_ratio' => 2.1, 'coin' => "THETA", 'coin_image' => "THETA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "UNI/USDT", 'strategy_ratio' => 2.1, 'coin' => "UNI", 'coin_image' => "UNI.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "XMR/USDT", 'strategy_ratio' => 3.1, 'coin' => "XMR", 'coin_image' => "XMR.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "XRP/USDT", 'strategy_ratio' => 2.1, 'coin' => "XRP", 'coin_image' => "XRP.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "XTZ/USDT", 'strategy_ratio' => 2.1, 'coin' => "XTZ", 'coin_image' => "XTZ.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "ALICE/USDT", 'strategy_ratio' => 4.1, 'coin' => "ALICE", 'coin_image' => "ALICE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "SOL/USDT", 'strategy_ratio' => 4.1, 'coin' => "SOL", 'coin_image' => "SOL.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "LUNA/USDT", 'strategy_ratio' => 4.1, 'coin' => "LUNA", 'coin_image' => "LUNA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 1, 'market' => "FTM/USDT", 'strategy_ratio' => 4.1, 'coin' => "FTM", 'coin_image' => "FTM.png", 'trade_type' => 1));

            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "BTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "BTC", 'coin_image' => "BTC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "ETH/USDT", 'strategy_ratio' => 2.1, 'coin' => "ETH", 'coin_image' => "ETH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "BNB/USDT", 'strategy_ratio' => 2.1, 'coin' => "BNB", 'coin_image' => "BNB.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "HBAR/USDT", 'strategy_ratio' => 2.4, 'coin' => "HBAR", 'coin_image' => "HBAR.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "HOT/USDT", 'strategy_ratio' => 2.3, 'coin' => "HOT", 'coin_image' => "HOT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "QTUM/USDT", 'strategy_ratio' => 1.1, 'coin' => "QTUM", 'coin_image' => "QTUM.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "VET/USDT", 'strategy_ratio' => 3, 'coin' => "VET", 'coin_image' => "VET.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "XLM/USDT", 'strategy_ratio' => 2, 5, 'coin' => "XLM", 'coin_image' => "XLM.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "1INCH/USDT", 'strategy_ratio' => 2.1, 'coin' => "1INCH", 'coin_image' => "1INCH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "AAVE/USDT", 'strategy_ratio' => 2.1, 'coin' => "AAVE", 'coin_image' => "AAVE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "ADA/USDT", 'strategy_ratio' => 6.1, 'coin' => "ADA", 'coin_image' => "ADA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "CAKE/USDT", 'strategy_ratio' => 2.1, 'coin' => "CAKE", 'coin_image' => "CAKE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "DASH/USDT", 'strategy_ratio' => 2.1, 'coin' => "DASH", 'coin_image' => "DASH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "DOGE/USDT", 'strategy_ratio' => 5.1, 'coin' => "DOGE", 'coin_image' => "DOGE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "DOT/USDT", 'strategy_ratio' => 2.1, 'coin' => "DOT", 'coin_image' => "DOT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "EOS/USDT", 'strategy_ratio' => 2.1, 'coin' => "EOS", 'coin_image' => "EOS.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "ETC/USDT", 'strategy_ratio' => 4.1, 'coin' => "ETC", 'coin_image' => "ETC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "FIL/USDT", 'strategy_ratio' => 2.1, 'coin' => "FIL", 'coin_image' => "FIL.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "FTT/USDT", 'strategy_ratio' => 2.2, 'coin' => "FTT", 'coin_image' => "FTT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "GRT/USDT", 'strategy_ratio' => 2.1, 'coin' => "GRT", 'coin_image' => "GRT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "LINK/USDT", 'strategy_ratio' => 2.1, 'coin' => "LINK", 'coin_image' => "LINK.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "LTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "LTC", 'coin_image' => "LTC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "THETA/USDT", 'strategy_ratio' => 2.1, 'coin' => "THETA", 'coin_image' => "THETA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "UNI/USDT", 'strategy_ratio' => 2.1, 'coin' => "UNI", 'coin_image' => "UNI.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "XMR/USDT", 'strategy_ratio' => 3.1, 'coin' => "XMR", 'coin_image' => "XMR.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "XRP/USDT", 'strategy_ratio' => 2.1, 'coin' => "XRP", 'coin_image' => "XRP.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "XTZ/USDT", 'strategy_ratio' => 2.1, 'coin' => "XTZ", 'coin_image' => "XTZ.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "ALICE/USDT", 'strategy_ratio' => 4.1, 'coin' => "ALICE", 'coin_image' => "ALICE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "SOL/USDT", 'strategy_ratio' => 4.1, 'coin' => "SOL", 'coin_image' => "SOL.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "LUNA/USDT", 'strategy_ratio' => 4.1, 'coin' => "LUNA", 'coin_image' => "LUNA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 2, 'market' => "FTM/USDT", 'strategy_ratio' => 4.1, 'coin' => "FTM", 'coin_image' => "FTM.png", 'trade_type' => 1));

            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "BTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "BTC", 'coin_image' => "BTC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "ETH/USDT", 'strategy_ratio' => 2.1, 'coin' => "ETH", 'coin_image' => "ETH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "BNB/USDT", 'strategy_ratio' => 2.1, 'coin' => "BNB", 'coin_image' => "BNB.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "HBAR/USDT", 'strategy_ratio' => 2.4, 'coin' => "HBAR", 'coin_image' => "HBAR.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "HOT/USDT", 'strategy_ratio' => 2.3, 'coin' => "HOT", 'coin_image' => "HOT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "QTUM/USDT", 'strategy_ratio' => 1.1, 'coin' => "QTUM", 'coin_image' => "QTUM.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "VET/USDT", 'strategy_ratio' => 3, 'coin' => "VET", 'coin_image' => "VET.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "XLM/USDT", 'strategy_ratio' => 2, 5, 'coin' => "XLM", 'coin_image' => "XLM.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "1INCH/USDT", 'strategy_ratio' => 2.1, 'coin' => "1INCH", 'coin_image' => "1INCH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "AAVE/USDT", 'strategy_ratio' => 2.1, 'coin' => "AAVE", 'coin_image' => "AAVE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "ADA/USDT", 'strategy_ratio' => 6.1, 'coin' => "ADA", 'coin_image' => "ADA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "CAKE/USDT", 'strategy_ratio' => 2.1, 'coin' => "CAKE", 'coin_image' => "CAKE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "DASH/USDT", 'strategy_ratio' => 2.1, 'coin' => "DASH", 'coin_image' => "DASH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "DOGE/USDT", 'strategy_ratio' => 5.1, 'coin' => "DOGE", 'coin_image' => "DOGE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "DOT/USDT", 'strategy_ratio' => 2.1, 'coin' => "DOT", 'coin_image' => "DOT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "EOS/USDT", 'strategy_ratio' => 2.1, 'coin' => "EOS", 'coin_image' => "EOS.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "ETC/USDT", 'strategy_ratio' => 4.1, 'coin' => "ETC", 'coin_image' => "ETC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "FIL/USDT", 'strategy_ratio' => 2.1, 'coin' => "FIL", 'coin_image' => "FIL.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "FTT/USDT", 'strategy_ratio' => 2.2, 'coin' => "FTT", 'coin_image' => "FTT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "GRT/USDT", 'strategy_ratio' => 2.1, 'coin' => "GRT", 'coin_image' => "GRT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "LINK/USDT", 'strategy_ratio' => 2.1, 'coin' => "LINK", 'coin_image' => "LINK.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "LTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "LTC", 'coin_image' => "LTC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "THETA/USDT", 'strategy_ratio' => 2.1, 'coin' => "THETA", 'coin_image' => "THETA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "UNI/USDT", 'strategy_ratio' => 2.1, 'coin' => "UNI", 'coin_image' => "UNI.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "XMR/USDT", 'strategy_ratio' => 3.1, 'coin' => "XMR", 'coin_image' => "XMR.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "XRP/USDT", 'strategy_ratio' => 2.1, 'coin' => "XRP", 'coin_image' => "XRP.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "XTZ/USDT", 'strategy_ratio' => 2.1, 'coin' => "XTZ", 'coin_image' => "XTZ.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "ALICE/USDT", 'strategy_ratio' => 4.1, 'coin' => "ALICE", 'coin_image' => "ALICE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "SOL/USDT", 'strategy_ratio' => 4.1, 'coin' => "SOL", 'coin_image' => "SOL.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "LUNA/USDT", 'strategy_ratio' => 4.1, 'coin' => "LUNA", 'coin_image' => "LUNA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 3, 'market' => "FTM/USDT", 'strategy_ratio' => 4.1, 'coin' => "FTM", 'coin_image' => "FTM.png", 'trade_type' => 1));

            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "BTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "BTC", 'coin_image' => "BTC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "ETH/USDT", 'strategy_ratio' => 2.1, 'coin' => "ETH", 'coin_image' => "ETH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "BNB/USDT", 'strategy_ratio' => 2.1, 'coin' => "BNB", 'coin_image' => "BNB.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "HBAR/USDT", 'strategy_ratio' => 2.4, 'coin' => "HBAR", 'coin_image' => "HBAR.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "HOT/USDT", 'strategy_ratio' => 2.3, 'coin' => "HOT", 'coin_image' => "HOT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "QTUM/USDT", 'strategy_ratio' => 1.1, 'coin' => "QTUM", 'coin_image' => "QTUM.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "VET/USDT", 'strategy_ratio' => 3, 'coin' => "VET", 'coin_image' => "VET.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "XLM/USDT", 'strategy_ratio' => 2, 5, 'coin' => "XLM", 'coin_image' => "XLM.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "1INCH/USDT", 'strategy_ratio' => 2.1, 'coin' => "1INCH", 'coin_image' => "1INCH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "AAVE/USDT", 'strategy_ratio' => 2.1, 'coin' => "AAVE", 'coin_image' => "AAVE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "ADA/USDT", 'strategy_ratio' => 6.1, 'coin' => "ADA", 'coin_image' => "ADA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "CAKE/USDT", 'strategy_ratio' => 2.1, 'coin' => "CAKE", 'coin_image' => "CAKE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "DASH/USDT", 'strategy_ratio' => 2.1, 'coin' => "DASH", 'coin_image' => "DASH.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "DOGE/USDT", 'strategy_ratio' => 5.1, 'coin' => "DOGE", 'coin_image' => "DOGE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "DOT/USDT", 'strategy_ratio' => 2.1, 'coin' => "DOT", 'coin_image' => "DOT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "EOS/USDT", 'strategy_ratio' => 2.1, 'coin' => "EOS", 'coin_image' => "EOS.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "ETC/USDT", 'strategy_ratio' => 4.1, 'coin' => "ETC", 'coin_image' => "ETC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "FIL/USDT", 'strategy_ratio' => 2.1, 'coin' => "FIL", 'coin_image' => "FIL.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "FTT/USDT", 'strategy_ratio' => 2.2, 'coin' => "FTT", 'coin_image' => "FTT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "GRT/USDT", 'strategy_ratio' => 2.1, 'coin' => "GRT", 'coin_image' => "GRT.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "LINK/USDT", 'strategy_ratio' => 2.1, 'coin' => "LINK", 'coin_image' => "LINK.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "LTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "LTC", 'coin_image' => "LTC.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "THETA/USDT", 'strategy_ratio' => 2.1, 'coin' => "THETA", 'coin_image' => "THETA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "UNI/USDT", 'strategy_ratio' => 2.1, 'coin' => "UNI", 'coin_image' => "UNI.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "XMR/USDT", 'strategy_ratio' => 3.1, 'coin' => "XMR", 'coin_image' => "XMR.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "XRP/USDT", 'strategy_ratio' => 2.1, 'coin' => "XRP", 'coin_image' => "XRP.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "XTZ/USDT", 'strategy_ratio' => 2.1, 'coin' => "XTZ", 'coin_image' => "XTZ.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "ALICE/USDT", 'strategy_ratio' => 4.1, 'coin' => "ALICE", 'coin_image' => "ALICE.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "SOL/USDT", 'strategy_ratio' => 4.1, 'coin' => "SOL", 'coin_image' => "SOL.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "LUNA/USDT", 'strategy_ratio' => 4.1, 'coin' => "LUNA", 'coin_image' => "LUNA.png", 'trade_type' => 1));
            $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $uid, 'start_bot' => 0, 'exchange' => 4, 'market' => "FTM/USDT", 'strategy_ratio' => 4.1, 'coin' => "FTM", 'coin_image' => "FTM.png", 'trade_type' => 1));
        }

        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
        } else {
            $mo->execute('rollback');
            $this->error(L('failed!'));
        }

        // $existingUserSets = M('user_set')->where(['market' => 'HOT/ETH'])->getField('userid', true);

        // $rs = [];

        // foreach ($userData as $val) {
        //     $userId = $val['id'];

        //     if (in_array($userId, $existingUserSets)) {
        //         $yes = "found";
        //     } else {
        //         $userSets = [];
        //         foreach ($data as $item) {
        //             foreach ($exchanges as $exchange) {
        //                 $userSets[] = [
        //                     'userid' => $userId,
        //                     'start_bot' => 0,
        //                     'exchange' => $exchange,
        //                     'market' => $item['market'],
        //                     'trade_type' => 1,
        //                     'strategy_ratio' => $item['strategy_ratio'],
        //                     'coin' => $item['coin'],
        //                     'coin_image' => $item['coin_image']
        //                 ];
        //             }
        //         }
        //         $rs = array_merge($rs, $userSets);
        //     }
        // }


        // if (check_arr($rs)) {
        //     M('extrade_user_set')->addAll($rs);
        //     $mo->execute('commit');
        // } else {
        //     $mo->execute('rollback');
        //     $this->error(L('failed!'));
        // }
        // $mo->execute('unlock tables');


    }

    public function addnewmarket()
    {

        $userData = M('User')->select();

        $entry = $entry;
        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user write , extrade_user_coin write , extrade_user_set write ');
        $rs = array();

        $data = [
            [
                'market' => "BTC/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "BTC",
                'coin_image' => "BTC.png"
            ],
            [
                'market' => "ETH/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "ETH",
                'coin_image' => "ETH.png"
            ],
            [
                'market' => "BNB/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "BNB",
                'coin_image' => "BNB.png"
            ],
            [
                'market' => "HBAR/USDT",
                'strategy_ratio' => 2.4,
                'coin' => "HBAR",
                'coin_image' => "HBAR.png"
            ],
            [
                'market' => "HOT/USDT",
                'strategy_ratio' => 2.3,
                'coin' => "HOT",
                'coin_image' => "HOT.png"
            ],
            [
                'market' => "QTUM/USDT",
                'strategy_ratio' => 1.1,
                'coin' => "QTUM",
                'coin_image' => "QTUM.png"
            ],
            [
                'market' => "VET/USDT",
                'strategy_ratio' => 3,
                'coin' => "VET",
                'coin_image' => "VET.png"
            ],
            [
                'market' => "XLM/USDT",
                'strategy_ratio' => 2.5,
                'coin' => "XLM",
                'coin_image' => "XLM.png"
            ],
            [
                'market' => "1INCH/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "1INCH",
                'coin_image' => "1INCH.png"
            ],
            [
                'market' => "AAVE/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "AAVE",
                'coin_image' => "AAVE.png"
            ],
            [
                'market' => "ADA/USDT",
                'strategy_ratio' => 6.1,
                'coin' => "ADA",
                'coin_image' => "ADA.png"
            ],
            [
                'market' => "CAKE/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "CAKE",
                'coin_image' => "CAKE.png"
            ],
            [
                'market' => "DASH/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "DASH",
                'coin_image' => "DASH.png"
            ],
            [
                'market' => "DOGE/USDT",
                'strategy_ratio' => 5.1,
                'coin' => "DOGE",
                'coin_image' => "DOGE.png"
            ],
            [
                'market' => "DOT/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "DOT",
                'coin_image' => "DOT.png"
            ],
            [
                'market' => "EOS/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "EOS",
                'coin_image' => "EOS.png"
            ],
            [
                'market' => "ETC/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "ETC",
                'coin_image' => "ETC.png"
            ],
            [
                'market' => "FIL/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "FIL",
                'coin_image' => "FIL.png"
            ],
            [
                'market' => "FTT/USDT",
                'strategy_ratio' => 2.2,
                'coin' => "FTT",
                'coin_image' => "FTT.png"
            ],
            [
                'market' => "GRT/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "GRT",
                'coin_image' => "GRT.png"
            ],
            [
                'market' => "LINK/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "LINK",
                'coin_image' => "LINK.png"
            ],
            [
                'market' => "LTC/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "LTC",
                'coin_image' => "LTC.png"
            ],
            [
                'market' => "THETA/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "THETA",
                'coin_image' => "THETA.png"
            ],
            [
                'market' => "UNI/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "UNI",
                'coin_image' => "UNI.png"
            ],
            [
                'market' => "XMR/USDT",
                'strategy_ratio' => 3.1,
                'coin' => "XMR",
                'coin_image' => "XMR.png"
            ],
            [
                'market' => "XRP/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "XRP",
                'coin_image' => "XRP.png"
            ],
            [
                'market' => "XTZ/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "XTZ",
                'coin_image' => "XTZ.png"
            ],
            [
                'market' => "ALICE/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "ALICE",
                'coin_image' => "ALICE.png"
            ],
            [
                'market' => "SOL/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "SOL",
                'coin_image' => "SOL.png"
            ],
            [
                'market' => "LUNA/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "LUNA",
                'coin_image' => "LUNA.png"
            ],
            [
                'market' => "FTM/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "FTM",
                'coin_image' => "FTM.png"
            ]
        ];

        $exchanges = [1, 2, 3, 4];

        foreach ($userData as $key => $val) {
            $userid = $val['id'];
            if (M('user_set')->where(array('userid' => $userid, 'market' => 'HOT/ETH'))->find()) {
                $yes = "found";
            } else {
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "BTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "BTC", 'coin_image' => "BTC.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "ETH/USDT", 'strategy_ratio' => 2.1, 'coin' => "ETH", 'coin_image' => "ETH.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "BNB/USDT", 'strategy_ratio' => 2.1, 'coin' => "BNB", 'coin_image' => "BNB.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "HBAR/USDT", 'strategy_ratio' => 2.4, 'coin' => "HBAR", 'coin_image' => "HBAR.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "HOT/USDT", 'strategy_ratio' => 2.3, 'coin' => "HOT", 'coin_image' => "HOT.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "QTUM/USDT", 'strategy_ratio' => 1.1, 'coin' => "QTUM", 'coin_image' => "QTUM.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "VET/USDT", 'strategy_ratio' => 3, 'coin' => "VET", 'coin_image' => "VET.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "XLM/USDT", 'strategy_ratio' => 2, 5, 'coin' => "XLM", 'coin_image' => "XLM.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "1INCH/USDT", 'strategy_ratio' => 2.1, 'coin' => "1INCH", 'coin_image' => "1INCH.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "AAVE/USDT", 'strategy_ratio' => 2.1, 'coin' => "AAVE", 'coin_image' => "AAVE.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "ADA/USDT", 'strategy_ratio' => 6.1, 'coin' => "ADA", 'coin_image' => "ADA.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "CAKE/USDT", 'strategy_ratio' => 2.1, 'coin' => "CAKE", 'coin_image' => "CAKE.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "DASH/USDT", 'strategy_ratio' => 2.1, 'coin' => "DASH", 'coin_image' => "DASH.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "DOGE/USDT", 'strategy_ratio' => 5.1, 'coin' => "DOGE", 'coin_image' => "DOGE.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "DOT/USDT", 'strategy_ratio' => 2.1, 'coin' => "DOT", 'coin_image' => "DOT.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "EOS/USDT", 'strategy_ratio' => 2.1, 'coin' => "EOS", 'coin_image' => "EOS.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "ETC/USDT", 'strategy_ratio' => 4.1, 'coin' => "ETC", 'coin_image' => "ETC.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "FIL/USDT", 'strategy_ratio' => 2.1, 'coin' => "FIL", 'coin_image' => "FIL.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "FTT/USDT", 'strategy_ratio' => 2.2, 'coin' => "FTT", 'coin_image' => "FTT.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "GRT/USDT", 'strategy_ratio' => 2.1, 'coin' => "GRT", 'coin_image' => "GRT.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "LINK/USDT", 'strategy_ratio' => 2.1, 'coin' => "LINK", 'coin_image' => "LINK.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "LTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "LTC", 'coin_image' => "LTC.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "THETA/USDT", 'strategy_ratio' => 2.1, 'coin' => "THETA", 'coin_image' => "THETA.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "UNI/USDT", 'strategy_ratio' => 2.1, 'coin' => "UNI", 'coin_image' => "UNI.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "XMR/USDT", 'strategy_ratio' => 3.1, 'coin' => "XMR", 'coin_image' => "XMR.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "XRP/USDT", 'strategy_ratio' => 2.1, 'coin' => "XRP", 'coin_image' => "XRP.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "XTZ/USDT", 'strategy_ratio' => 2.1, 'coin' => "XTZ", 'coin_image' => "XTZ.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "ALICE/USDT", 'strategy_ratio' => 4.1, 'coin' => "ALICE", 'coin_image' => "ALICE.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "SOL/USDT", 'strategy_ratio' => 4.1, 'coin' => "SOL", 'coin_image' => "SOL.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "LUNA/USDT", 'strategy_ratio' => 4.1, 'coin' => "LUNA", 'coin_image' => "LUNA.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 3, 'market' => "FTM/USDT", 'strategy_ratio' => 4.1, 'coin' => "FTM", 'coin_image' => "FTM.png"));


                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "BTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "BTC", 'coin_image' => "BTC.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "ETH/USDT", 'strategy_ratio' => 2.1, 'coin' => "ETH", 'coin_image' => "ETH.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "BNB/USDT", 'strategy_ratio' => 2.1, 'coin' => "BNB", 'coin_image' => "BNB.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "HBAR/USDT", 'strategy_ratio' => 2.4, 'coin' => "HBAR", 'coin_image' => "HBAR.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "HOT/USDT", 'strategy_ratio' => 2.3, 'coin' => "HOT", 'coin_image' => "HOT.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "QTUM/USDT", 'strategy_ratio' => 1.1, 'coin' => "QTUM", 'coin_image' => "QTUM.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "VET/USDT", 'strategy_ratio' => 3, 'coin' => "VET", 'coin_image' => "VET.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "XLM/USDT", 'strategy_ratio' => 2, 5, 'coin' => "XLM", 'coin_image' => "XLM.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "1INCH/USDT", 'strategy_ratio' => 2.1, 'coin' => "1INCH", 'coin_image' => "1INCH.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "AAVE/USDT", 'strategy_ratio' => 2.1, 'coin' => "AAVE", 'coin_image' => "AAVE.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "ADA/USDT", 'strategy_ratio' => 6.1, 'coin' => "ADA", 'coin_image' => "ADA.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "CAKE/USDT", 'strategy_ratio' => 2.1, 'coin' => "CAKE", 'coin_image' => "CAKE.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "DASH/USDT", 'strategy_ratio' => 2.1, 'coin' => "DASH", 'coin_image' => "DASH.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "DOGE/USDT", 'strategy_ratio' => 5.1, 'coin' => "DOGE", 'coin_image' => "DOGE.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "DOT/USDT", 'strategy_ratio' => 2.1, 'coin' => "DOT", 'coin_image' => "DOT.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "EOS/USDT", 'strategy_ratio' => 2.1, 'coin' => "EOS", 'coin_image' => "EOS.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "ETC/USDT", 'strategy_ratio' => 4.1, 'coin' => "ETC", 'coin_image' => "ETC.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "FIL/USDT", 'strategy_ratio' => 2.1, 'coin' => "FIL", 'coin_image' => "FIL.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "FTT/USDT", 'strategy_ratio' => 2.2, 'coin' => "FTT", 'coin_image' => "FTT.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "GRT/USDT", 'strategy_ratio' => 2.1, 'coin' => "GRT", 'coin_image' => "GRT.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "LINK/USDT", 'strategy_ratio' => 2.1, 'coin' => "LINK", 'coin_image' => "LINK.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "LTC/USDT", 'strategy_ratio' => 2.1, 'coin' => "LTC", 'coin_image' => "LTC.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "THETA/USDT", 'strategy_ratio' => 2.1, 'coin' => "THETA", 'coin_image' => "THETA.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "UNI/USDT", 'strategy_ratio' => 2.1, 'coin' => "UNI", 'coin_image' => "UNI.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "XMR/USDT", 'strategy_ratio' => 3.1, 'coin' => "XMR", 'coin_image' => "XMR.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "XRP/USDT", 'strategy_ratio' => 2.1, 'coin' => "XRP", 'coin_image' => "XRP.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "XTZ/USDT", 'strategy_ratio' => 2.1, 'coin' => "XTZ", 'coin_image' => "XTZ.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "ALICE/USDT", 'strategy_ratio' => 4.1, 'coin' => "ALICE", 'coin_image' => "ALICE.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "SOL/USDT", 'strategy_ratio' => 4.1, 'coin' => "SOL", 'coin_image' => "SOL.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "LUNA/USDT", 'strategy_ratio' => 4.1, 'coin' => "LUNA", 'coin_image' => "LUNA.png"));
                $rs[] = $mo->table('extrade_user_set')->add(array('userid' => $userid, 'start_bot' => 0, 'exchange' => 4, 'market' => "FTM/USDT", 'strategy_ratio' => 4.1, 'coin' => "FTM", 'coin_image' => "FTM.png"));
            }
        }

        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
        } else {
            $mo->execute('rollback');
            $this->error(L('failed!'));
        }
    }

    public function chkUser($username)
    {
        if (!check($username, 'username')) {
            $this->error(L('INVALID_USERNAME'));
        }

        if (M('User')->where(array('username' => $username))->find()) {
            $this->error('Username already exists');
        }

        $this->success('ok');
    }

    public function Banner()
    {
        $arr = M('adver')->where(array('status' => '1'))->order('id desc')->limit(10)->select();

        if ($arr['img'] != null) {
            $image_path = SITE_URL . 'Upload/article/' . $arr['img'];
        } else {
            $image_path = null;
        }
        $info = array();
        foreach ($arr as $val) {

            $info['Banners'][] = array('id' => $val['id'], 'name' => $val['name'], 'type' => $val['type'], 'link' => $val['url'], 'image' => SITE_URL . 'Upload/ad/' . $val['img']);
        }
        $this->ajaxShow($info);
    }

    public function News()
    {
        //if (!($uid = $this->userid())) {
        //    $this->error(L('PLEASE_LOGIN'));
        //}
        $arr = M('article')->where(array('status' => '1'))->order('id desc')->limit(10)->select();

        if ($arr['img'] != null) {
            $image_path = SITE_URL . 'Upload/article/' . $arr['img'];
        } else {
            $image_path = null;
        }
        $info = array();
        foreach ($arr as $val) {

            $info['News'][] = array('id' => $val['id'], 'title' => $val['title'], 'details' => $val['content'], 'image' => SITE_URL . 'Upload/article/' . $val['img']);
        }
        $this->ajaxShow($info);
    }

    public function Apibind($exchange, $api_key, $api_secret, $bind, $api_passphrase = 0, $userId = null)
    {

        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user write, lock tables extrade_user_set write ');
        $rs = array();
        $api_key = str_replace('#', '%23', $api_key);
        $api_key = str_replace('@', '%40', $api_key);
        $api_key = str_replace(' ', '%2B', $api_key);
        $api_secret = str_replace('#', '%23', $api_secret);
        $api_secret = str_replace('@', '%40', $api_secret);
        $api_secret = str_replace(' ', '%2B', $api_secret);
        $api_passphrase = str_replace('.#.', '%2E%23%2E', $api_passphrase);
        $api_passphrase = str_replace('#', '%23', $api_passphrase);
        $api_passphrase = str_replace('@', '%40', $api_passphrase);
        #$link =  "http://199.188.204.181:5232/botapi?user_id=$uid&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&platform=$exchange"; 

        if ($exchange == 1 and $bind == 1) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('bapi_key', $api_key);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('bapi_secret', $api_secret);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('bbind', $bind);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('exchange' => 1))->setField('api_key', $api_key);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('exchange' => 1))->setField('api_secret', $api_secret);
        } else if ($exchange == 2  and $bind == 1) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('kapi_key', $api_key);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('kapi_secret', $api_secret);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('kapi_passphrase', $api_passphrase);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('kbind', $bind);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('exchange' => 2))->setField('api_key', $api_key);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('exchange' => 2))->setField('api_secret', $api_secret);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('exchange' => 2))->setField('api_passphrase', $api_passphrase);
        } else if ($exchange == 3  and $bind == 1) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('capi_key', $api_key);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('capi_secret', $api_secret);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('capi_passphrase', $api_passphrase);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('cbind', $bind);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('exchange' => 3))->setField('api_key', $api_key);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('exchange' => 3))->setField('api_secret', $api_secret);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('exchange' => 3))->setField('api_passphrase', $api_passphrase);
        } else if ($exchange == 4 and $bind == 1) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('krapi_key', $api_key);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('krapi_secret', $api_secret);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('krbind', $bind);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('exchange' => 4))->setField('api_key', $api_key);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('exchange' => 4))->setField('api_secret', $api_secret);
        } else if ($exchange == 1 and $bind == 0) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('bapi_key', 0);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('bapi_secret', 0);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('bbind', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('exchange' => 1))->setField('api_key', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('exchange' => 1))->setField('api_secret', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->setField('start_bot', 0);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('bbalance', 0);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField("features_bbalance", 0);
        } else if ($exchange == 2  and $bind == 0) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('kapi_key', 0);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('kapi_secret', 0);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('kapi_passphrase', 0);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('kbind', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('exchange' => 2))->setField('api_key', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('exchange' => 2))->setField('api_secret', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('exchange' => 2))->setField('api_passphrase', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->setField('start_bot', 0);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('kbalance', 0);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField("features_kbalance", 0);
        } else if ($exchange == 3  and $bind == 0) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('capi_key', 0);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('capi_secret', 0);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('capi_passphrase', 0);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('cbind', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('exchange' => 3))->setField('api_key', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('exchange' => 3))->setField('api_secret', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('exchange' => 3))->setField('api_passphrase', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->setField('start_bot', 0);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('cbalance', 0);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField("features_cbalance", 0);
        } else if ($exchange == 4 and $bind == 0) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('krapi_key', 0);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('krapi_secret', 0);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('krbind', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('exchange' => 4))->setField('api_key', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('exchange' => 4))->setField('api_secret', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->setField('start_bot', 0);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('krbalance', 0);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField("features_krbalance", 0);
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('error');
        }

        if (count($rs) > 0) {
            $mo->execute('commit');
            $mo->execute('unlock tables');

            if ($bind == 1) {
                return $this->Postbalancerefresh($uid, $api_key, $api_secret, $api_passphrase, $exchange);
            } else {
                $mo->execute('commit');
                $mo->execute('unlock tables');
                $this->success('unbind success!');
            }
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('failed!');
        }
    }

    public function Postbalancerefresh($uid, $api_key, $api_secret, $api_passphrase, $exchange)
    {

        $api_key = str_replace('#', '%23', $api_key);
        $api_key = str_replace('@', '%40', $api_key);
        $api_key = str_replace(' ', '%2B', $api_key);
        $api_secret = str_replace('#', '%23', $api_secret);
        $api_secret = str_replace('@', '%40', $api_secret);
        $api_secret = str_replace(' ', '%2B', $api_secret);
        $api_passphrase = str_replace('.#.', '%2E%23%2E', $api_passphrase);
        $api_passphrase = str_replace('#', '%23', $api_passphrase);
        $api_passphrase = str_replace('@', '%40', $api_passphrase);

        $url = "http://46.101.23.85:5231/botapi?user_id=$uid&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase&platform=$exchange";

        // Initialize a CURL session.
        $ch = curl_init();

        // Return Page contents.
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        //grab URL and pass it to the variable.
        curl_setopt($ch, CURLOPT_URL, $url);

        $result = curl_exec($ch);
        #echo $link;
        $this->success('Bind success!');
    }

    //after 30 minutes
    public function balancerefresh()
    {
        $userData = M('User')->where(array('paid' => 1))->select();


        $entry = $entry;
        foreach ($userData as $key => $val) {


            $userid = $val['userid'];
            $api_key =  $val['api_key'];
            $api_secret =  $val['api_secret'];
            $api_passphrase =  $val['api_passphrase'];
            $api_key = str_replace('#', '%23', $api_key);
            $api_key = str_replace('@', '%40', $api_key);
            $api_key = str_replace(' ', '%2B', $api_key);
            $api_secret = str_replace('#', '%23', $api_secret);
            $api_secret = str_replace('@', '%40', $api_secret);
            $api_secret = str_replace(' ', '%2B', $api_secret);
            $api_passphrase = str_replace('.#.', '%2E%23%2E', $api_passphrase);
            $api_passphrase = str_replace('#', '%23', $api_passphrase);
            $api_passphrase = str_replace('@', '%40', $api_passphrase);
            $nodes = "http://46.101.23.85:5231/botapi?user_id=$userid&api_key=$api_key&api_secret=$api_secret&api_passphrase=$api_passphrase";
            $mo = M();
            $mo->execute('set autocommit=0');
            $mo->execute('nolock tables extrade_user  write ');
            $rs = array();
            $rs[] = $mo->table('extrade_user')->where(array('id' => $val['userid']))->setField('run_status', 1);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $val['userid']))->setField('link', $nodes);
        }
        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            // return $this->Postbalancerefresh();
        } else {
            $mo->execute('rollback');
            $this->error(L('failed!'));
        }
    }

    public function Revenue($userId = null)
    {

        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $d_profit = M('User')->where(array('id' => $uid))->field('today_profit')->find();
        $t_profit = M('User')->where(array('id' => $uid))->field('total_profit')->find();
        $ret['today_profit'] = $d_profit['today_profit'];
        $ret['total_profit'] = $t_profit['total_profit'];
        $marketlist = M('user_set')->where(array('userid' => $uid, 'start_bot' => 1))->order('id desc')->select();


        foreach ($marketlist as $key => $val) {
            $marketprofit[$key]['Market'] = $val['market'];
            $marketprofit[$key]['profit'] = $val['total_profit'];
        }
        $profitlist = M('trade')->where(array('userid' => $uid, 'type' => 2))->order('id desc')->select();


        foreach ($profitlist as $key => $val) {
            $dailyprofit[$key]['Date'] = $val['addtime'];
            $dailyprofit[$key]['market'] = $val['market'];
            $dailyprofit[$key]['profit'] = $val['mum'];
            $dailyprofit[$key]['buysell'] = $val['type'];
            $dailyprofit[$key]['price'] = $val['price'];
        }

        $ret['Income distribution'] = $marketprofit;
        $ret['History Records'] = $dailyprofit;
        $this->ajaxShow($ret);
    }

    public function tradesetting($id, $firstbuy_amount, $double_position, $margin_limit, $profit_ratio, $whole_ratio, $first_call, $first_ratio, $profit_callback, $cycle, $one_short, $whole_stop, $trade_type = 0, $direction = 'Long', $userId = null, $capital = 0)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $userid = M('User')->where(array('id' => $uid))->getField('paid');

        if ($userid == 0) {
            $this->error('Please subscribe');
        }

        $circle = M('circle')->where(array('userid' => $uid, 'enable_sync' => 1))->getField('id');

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user_set write ');

        $rs = array();


        // $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('trade_type', $trade_type);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('firstbuy_amount', $firstbuy_amount);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('double_position', $double_position);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('margin_limit', $margin_limit);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('profit_ratio', $profit_ratio);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('whole_ratio', $whole_ratio);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('stop_price', $whole_stop);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('price_drop', $first_call);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('m_ratio',  $first_ratio);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('cycle', $cycle);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('profit_callback', $profit_callback);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('one_shot', $one_short);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('direction', $direction);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('stop_loss', $whole_stop);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('re_capital', $capital);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('log', "");


        if ($circle > 1) {
            $sync = M('user_set')->where(array('circle_sync' => $circle))->where(array('sync' => 1))->select();
            $market = M('user_set')->where(array('id' => $id))->getField('market');
            $exchange = M('user_set')->where(array('id' => $id))->getField('exchange');

            foreach ($sync as $key => $val) {
                $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $val['userid'], 'market' => $market, 'exchange' => $exchange))->setField('direction', $direction);
                // $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $val['userid'], 'market' => $market, 'exchange' => $exchange))->setField('trade_type', $trade_type);
                $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $val['userid'], 'market' => $market, 'exchange' => $exchange))->setField('double_position', $double_position);
                $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $val['userid'], 'market' => $market, 'exchange' => $exchange))->setField('margin_limit', $margin_limit);
                $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $val['userid'], 'market' => $market, 'exchange' => $exchange))->setField('profit_ratio', $profit_ratio);
                $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $val['userid'], 'market' => $market, 'exchange' => $exchange))->setField('whole_ratio', $whole_ratio);
                $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $val['userid'], 'market' => $market, 'exchange' => $exchange))->setField('stop_price', $whole_stop);
                $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $val['userid'], 'market' => $market, 'exchange' => $exchange))->setField('price_drop', $first_call);
                $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $val['userid'], 'market' => $market, 'exchange' => $exchange))->setField('m_ratio',  $first_ratio);

                $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $val['userid'], 'market' => $market, 'exchange' => $exchange))->setField('cycle', $cycle);
                $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $val['userid'], 'market' => $market, 'exchange' => $exchange))->setField('profit_callback', $profit_callback);
                $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $val['userid'], 'market' => $market, 'exchange' => $exchange))->setField('one_shot', $one_short);
                $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $val['userid'], 'market' => $market, 'exchange' => $exchange))->setField('re_capital', $capital);
                $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $val['userid'], 'market' => $market, 'exchange' => $exchange))->setField('stop_loss', $whole_stop);
                $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $val['userid'], 'market' => $market, 'exchange' => $exchange))->setField('log', "");
            }
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            //$this->error('error');
        }


        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');

            $ret['status'] = "success !";
            $ret['exchange'] = M('user_set')->where(array('id' => $id))->getField("exchange");
            $ret['market'] = M('user_set')->where(array('id' => $id))->getField("market");
            $ret['id'] = $id;
            $rest['trade_type'] = M('user_set')->where(array('id' => $id))->getField("trade_type");

            $this->ajaxShow($ret);
            // $this->success('success!');

        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('failed!');
        }
    }

    public function Copytrade($id, $market, $exchange, $capital, $userId = null)
    {

        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $userid = M('User')->where(array('id' => $uid))->getField('paid');

        if ($userid == 0) {
            $this->error('Please subscribe');
        }

        $copy = M('user_set')->where(array('id' => $id))->find();


        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user_set write ');
        $rs = array();

        $server1 = M('extrade_user_set')->where(array('server' => '1', 'start_bot' => '1'))->count();
        $server2 = M('extrade_user_set')->where(array('server' => '2', 'start_bot' => '1'))->count();
        $server3 = M('extrade_user_set')->where(array('server' => '3', 'start_bot' => '1'))->count();
        $server4 = M('extrade_user_set')->where(array('server' => '4', 'start_bot' => '1'))->count();
        $server5 = M('extrade_user_set')->where(array('server' => '5', 'start_bot' => '1'))->count();
        $server6 = M('extrade_user_set')->where(array('server' => '6', 'start_bot' => '1'))->count();
        $server7 = M('extrade_user_set')->where(array('server' => '7', 'start_bot' => '1'))->count();
        $server8 = M('extrade_user_set')->where(array('server' => '8', 'start_bot' => '1'))->count();
        $server9 = M('extrade_user_set')->where(array('server' => '9', 'start_bot' => '1'))->count();
        $server10 = M('extrade_user_set')->where(array('server' => '10', 'start_bot' => '1'))->count();
        $server11 = M('extrade_user_set')->where(array('server' => '11', 'start_bot' => '1'))->count();
        $server12 = M('extrade_user_set')->where(array('server' => '12', 'start_bot' => '1'))->count();
        $server13 = M('extrade_user_set')->where(array('server' => '13', 'start_bot' => '1'))->count();
        $server14 = M('extrade_user_set')->where(array('server' => '14', 'start_bot' => '1'))->count();
        $server15 = M('extrade_user_set')->where(array('server' => '15', 'start_bot' => '1'))->count();
        $server16 = M('extrade_user_set')->where(array('server' => '16', 'start_bot' => '1'))->count();
        $server17 = M('extrade_user_set')->where(array('server' => '17', 'start_bot' => '1'))->count();
        $server18 = M('extrade_user_set')->where(array('server' => '18', 'start_bot' => '1'))->count();
        $server19 = M('extrade_user_set')->where(array('server' => '19', 'start_bot' => '1'))->count();
        $server20 = M('extrade_user_set')->where(array('server' => '20', 'start_bot' => '1'))->count();
        $server21 = M('extrade_user_set')->where(array('server' => '21', 'start_bot' => '1'))->count();
        $server22 = M('extrade_user_set')->where(array('server' => '22', 'start_bot' => '1'))->count();
        $server23 = M('extrade_user_set')->where(array('server' => '23', 'start_bot' => '1'))->count();
        $server24 = M('extrade_user_set')->where(array('server' => '24', 'start_bot' => '1'))->count();
        $server25 = M('extrade_user_set')->where(array('server' => '25', 'start_bot' => '1'))->count();
        $server26 = M('extrade_user_set')->where(array('server' => '26', 'start_bot' => '1'))->count();
        $server27 = M('extrade_user_set')->where(array('server' => '27', 'start_bot' => '1'))->count();
        $server28 = M('extrade_user_set')->where(array('server' => '28', 'start_bot' => '1'))->count();
        $server29 = M('extrade_user_set')->where(array('server' => '29', 'start_bot' => '1'))->count();
        $server30 = M('extrade_user_set')->where(array('server' => '30', 'start_bot' => '1'))->count();

        if ($server1 < 45) {
            $server = 1;
        } else if ($server2 < 45) {
            $server = 2;
        } else if ($server3 < 45) {
            $server = 3;
        } else if ($server4 < 45) {
            $server = 4;
        } else if ($server5 < 45) {
            $server = 5;
        } else if ($server6 < 45) {
            $server = 6;
        } else if ($server7 < 45) {
            $server = 7;
        } else if ($server8 < 45) {
            $server = 8;
        } else if ($server9 < 45) {
            $server = 9;
        } else if ($server10 < 45) {
            $server = 10;
        } else if ($server11 < 45) {
            $server = 11;
        } else if ($server12 < 45) {
            $server = 12;
        } else if ($server13 < 45) {
            $server = 13;
        } else if ($server14 < 45) {
            $server = 14;
        } else if ($server15 < 45) {
            $server = 15;
        } else if ($server16 < 45) {
            $server = 16;
        } else if ($server17 < 45) {
            $server = 17;
        } else if ($server18 < 45) {
            $server = 18;
        } else if ($server19 < 45) {
            $server = 19;
        } else if ($server20 < 45) {
            $server = 20;
        } else if ($server21 < 45) {
            $server = 21;
        } else if ($server22 < 45) {
            $server = 22;
        } else if ($server23 < 45) {
            $server = 23;
        } else if ($server24 < 45) {
            $server = 24;
        } else if ($server25 < 45) {
            $server = 25;
        } else if ($server26 < 45) {
            $server = 26;
        } else if ($server27 < 45) {
            $server = 27;
        } else if ($server28 < 45) {
            $server = 28;
        } else if ($server29 < 45) {
            $server = 29;
        } else if ($server30 < 45) {
            $server = 30;
        } else {
            $server = 31;
        }


        if ($$capital >= 500) {
            $numbers = explode("|", $copy['m_ratio']);

            $entries = array_sum($numbers);

            $firstbuy_amount = $capital / ($entries + 1);
        } else {
            // $firstbuy_amount = $capital * 15 / 100;
            $firstbuy_amount = 15;
        }



        $rs[] = $mo->table('extrade_user_set')->where(array('market' => $market, 'userid' => $uid, 'trade_type' => $copy['trade_type'], 'exchange' => $exchange))->setField('firstbuy_amount', $firstbuy_amount);
        $rs[] = $mo->table('extrade_user_set')->where(array('market' => $market, 'userid' => $uid, 'trade_type' => $copy['trade_type'], 'exchange' => $exchange))->setField('double_position', $copy['double_position']);
        $rs[] = $mo->table('extrade_user_set')->where(array('market' => $market, 'userid' => $uid, 'trade_type' => $copy['trade_type'], 'exchange' => $exchange))->setField('margin_limit',  $copy['margin_limit']);
        $rs[] = $mo->table('extrade_user_set')->where(array('market' => $market, 'userid' => $uid, 'trade_type' => $copy['trade_type'], 'exchange' => $exchange))->setField('profit_ratio',  $copy['profit_ratio']);
        $rs[] = $mo->table('extrade_user_set')->where(array('market' => $market, 'userid' => $uid, 'trade_type' => $copy['trade_type'], 'exchange' => $exchange))->setField('whole_ratio',  $copy['whole_ratio']);
        $rs[] = $mo->table('extrade_user_set')->where(array('market' => $market, 'userid' => $uid, 'trade_type' => $copy['trade_type'], 'exchange' => $exchange))->setField('stop_price',  $copy['stop_price']);
        $rs[] = $mo->table('extrade_user_set')->where(array('market' => $market, 'userid' => $uid, 'trade_type' => $copy['trade_type'], 'exchange' => $exchange))->setField('price_drop',  $copy['price_drop']);
        $rs[] = $mo->table('extrade_user_set')->where(array('market' => $market, 'userid' => $uid, 'trade_type' => $copy['trade_type'], 'exchange' => $exchange))->setField('m_ratio',   $copy['m_ratio']);
        $rs[] = $mo->table('extrade_user_set')->where(array('market' => $market, 'userid' => $uid, 'trade_type' => $copy['trade_type'], 'exchange' => $exchange))->setField('cycle',  $copy['cycle']);
        $rs[] = $mo->table('extrade_user_set')->where(array('market' => $market, 'userid' => $uid, 'trade_type' => $copy['trade_type'], 'exchange' => $exchange))->setField('profit_callback',  $copy['profit_callback']);
        $rs[] = $mo->table('extrade_user_set')->where(array('market' => $market, 'userid' => $uid, 'trade_type' => $copy['trade_type'], 'exchange' => $exchange))->setField('one_shot',  $copy['one_shot']);
        $rs[] = $mo->table('extrade_user_set')->where(array('market' => $market, 'userid' => $uid, 'trade_type' => $copy['trade_type'], 'exchange' => $exchange))->setField('direction', $copy['direction']);

        $rs[] = $mo->table('extrade_user_set')->where(array('market' => $market, 'userid' => $uid, 'trade_type' => $copy['trade_type'], 'exchange' => $exchange))->setField('stop_loss', $copy['stop_loss']);
        $rs[] = $mo->table('extrade_user_set')->where(array('market' => $market, 'userid' => $uid, 'trade_type' => $copy['trade_type'], 'exchange' => $exchange))->setField('price_above', $copy['price_above']);
        $rs[] = $mo->table('extrade_user_set')->where(array('market' => $market, 'userid' => $uid, 'trade_type' => $copy['trade_type'], 'exchange' => $exchange))->setField('price_below', $copy['price_below']);
        $rs[] = $mo->table('extrade_user_set')->where(array('market' => $market, 'userid' => $uid, 'trade_type' => $copy['trade_type'], 'exchange' => $exchange))->setField('re_capital', $copy['re_capital']);
        $rs[] = $mo->table('extrade_user_set')->where(array('market' => $market, 'userid' => $uid, 'trade_type' => $copy['trade_type'], 'exchange' => $exchange))->setField('closing_price', $copy['closing_price']);
        $rs[] = $mo->table('extrade_user_set')->where(array('market' => $market, 'userid' => $uid, 'trade_type' => $copy['trade_type'], 'exchange' => $exchange))->setField('entry_call', $copy['entry_call']);
        $rs[] = $mo->table('extrade_user_set')->where(array('market' => $market, 'userid' => $uid, 'trade_type' => $copy['trade_type'], 'exchange' => $exchange))->setField('re_capital', $capital);

        $rs[] = $mo->table('extrade_user_set')->where(array('market' => $market, 'userid' => $uid, 'trade_type' => $copy['trade_type'], 'exchange' => $exchange))->setField('server', $server);
        $rs[] = $mo->table('extrade_user_set')->where(array('market' => $market, 'userid' => $uid, 'trade_type' => $copy['trade_type'], 'exchange' => $exchange))->setField('start_bot', 1);
        $rs[] = $mo->table('extrade_user_set')->where(array('market' => $market, 'userid' => $uid, 'trade_type' => $copy['trade_type'], 'exchange' => $exchange))->setField('run_status', 0);


        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success('success!');
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('failed!');
        }
    }

    public function settleconvert($setid, $total, $log)
    {

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user_set write ');
        $rs = array();
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid))->setField('balance', 0);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid))->setInc('total_convert', $total);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid))->setField('log', $log);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid))->setField('convert_status', 0);

        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success('success!');
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('failed!');
        }
    }

    public function settletrade($setid, $user_id, $exchange, $balance,  $qty, $in_position, $coin, $buy_position = 0, $sell_position = 0, $trade_price = 0, $tgmessage = "", $first_buy = 0, $position_amount = 0, $profit = 0, $trade_type = 0)
    {
        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user_set write , extrade_config write , extrade_trade write, extrade_invit write, extrade_user write, extrade_circle write, extrade_user_coin write, extrade_user write');
        $rs = array();

        if ($trade_type === 0) {
            if ($exchange == 1) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('bbalance', $balance);
            }
            if ($exchange == 2) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('kbalance', $balance);
            }

            if ($exchange == 3) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('cbalance', $balance);
            }

            if ($exchange == 4) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('krbalance', $balance);
            }
        } else {
            if ($exchange == 1) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('features_bbalance', $balance);
            }
            if ($exchange == 2) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('features_kbalance', $balance);
            }

            if ($exchange == 3) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('features_cbalance', $balance);
            }

            if ($exchange == 4) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('features_krbalance', $balance);
            }
        }


        //close strategy
        $sync = $mo->table('extrade_user_set')->where(array('id' => $setid))->getField('sync');
        $circleratio = $mo->table('extrade_user_set')->where(array('id' => $setid))->getField('whole_ratio');
        $circle = $mo->table('extrade_user_set')->where(array('id' => $setid))->getField('circle_sync');
        $oneshot = $mo->table('extrade_user_set')->where(array('id' => $setid))->getField('one_shot');
        $onecircle = $mo->table('extrade_user_set')->where(array('id' => $setid))->getField('cycle');
        #echo $onecircle;
        $Userref = $mo->table('extrade_user')->where(array('id' => $user_id))->getField('invit_1');
        $Userref = $mo->table('extrade_user')->where(array('username' => $Userref))->getField('id');

        if ($oneshot == 1) {
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('qty', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('in_position', $in_position);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('buy_position', $buy_position);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('sell_position', $sell_position);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('trade_price', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('log', $tgmessage);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('first_buy',  $first_buy);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('position_amount', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('first_price', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('start_bot', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid))->setField('run_status', 0);
        }

        if ($onecircle == 1) {
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('qty', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('in_position', $in_position);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('buy_position', $buy_position);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('sell_position', $sell_position);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('trade_price', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('log', $tgmessage);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('first_buy',  $first_buy);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('position_amount', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('first_price', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid))->setField('run_status', 0);
        }

        if ($profit < 0.00001) {
            $this->error('failed!');
        }
        //add history
        if ($profit > 0.00001) {
            $rs[] = $mo->table('extrade_trade')->add(array('userid' => $user_id, 'mum' => $profit, 'num' => $qty, 'type' => 2, 'market' => "$coin/USDT", 'exchange' => $exchange, 'price' => $trade_price, 'addtime' => time(), 'status' => 1));
        }

        //record his profit

        //remove trading fee
        if ($profit  > 0.00001) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setInc('today_profit', $profit);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setInc('total_profit', $profit);
            $tradefee =  20;
            $fee = $profit * $tradefee / 100;
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $user_id))->setDec('usdtd', $fee);
        }

        if ($sync == 1 and $profit  > 0.00001) {
            $circleowner = $mo->table('extrade_circle')->where(array('id' => $circle))->getField("userid");
            $circleshare = $mo->table('extrade_circle')->where(array('id' => $circle))->getField("profit_sharing");
            $circlefee = $profit * $circleshare / 100;
            //add circle profit
            #echo $circleowner;
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $circleowner, 'exchange' => $exchange, 'coin' => $coin))->setInc('circle_profit', $circlefee);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $circle, 'userid' => $circleowner))->setInc('profit', $circleratio);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $circle, 'userid' => $circleowner))->setInc('profitusd', $circlefee);
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $user_id))->setDec('usdtd', $circlefee);

            $rs[] = $mo->table('extrade_user')->where(array('id' => $circleowner))->setInc('reward_total', $circlefee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $circleowner))->setInc('reward_today', $circlefee);
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $circleowner))->setInc('usdt', $circlefee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $circleowner, 'invit' => $user_id, 'name' => 'CIRCLE FEE EARN', 'type' => 'direct', 'num' => $circlefee, 'mum' => $circlefee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }

        #share profit
        $ref1 = $mo->table('extrade_user')->where(array('id' => $Userref))->getField('id');
        $ref2 = $mo->table('extrade_user')->where(array('id' => $user_id))->getField('invit_2');
        $ref2 = $mo->table('extrade_user')->where(array('username' => $ref2))->getField('id');
        $ref3 = $mo->table('extrade_user')->where(array('id' => $user_id))->getField('invit_3');
        $ref3 = $mo->table('extrade_user')->where(array('username' => $ref3))->getField('id');
        $refpaid1 = $mo->table('extrade_user')->where(array('id' => $ref1))->getField('paid');
        $refpaid2 = $mo->table('extrade_user')->where(array('id' => $ref2))->getField('paid');
        $refpaid3 = $mo->table('extrade_user')->where(array('id' => $ref3))->getField('paid');

        if ($refpaid1 == 1 and $profit  > 0.00001) {
            $teamfee = $profit * 5 / 100;
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref1))->setInc('usdt', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref1, 'invit' => $user_id, 'name' => 'TRADING FEE EARN', 'type' => 'direct', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }

        if ($refpaid2 == 1 and $profit  > 0.00001) {
            $teamfee = $profit * 3 / 100;
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref2))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref2))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref2))->setInc('usdt', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref2, 'invit' => $user_id, 'name' => 'TRADING FEE EARN', 'type' => 'direct', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }

        if ($refpaid3 == 1 and $profit  > 0.00001) {
            $teamfee = $profit * 2 / 100;
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref3))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref3))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref3))->setInc('usdt', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref3, 'invit' => $user_id, 'name' => 'TRADING FEE EARN', 'type' => 'direct', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }

        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success('success!');
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('failed!');
        }
    }

    public function posttrade($setid, $user_id, $qty, $in_position, $buy_position = 0, $sell_position = 0, $trade_price = 0, $tgmessage = "", $first_buy = 0, $position_amount = 0, $first_price = 0, $balance = 0, $platform = 0, $trade_type = 0)
    {
        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user_set write, extrade_user write , extrade_trade write');
        $rs = array();

        $exchange = $platform;

        if ($trade_type == 0) {
            if ($exchange == 1) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('bbalance', $balance);
            }
            if ($exchange == 2) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('kbalance', $balance);
            }

            if ($exchange == 3) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('cbalance', $balance);
            }

            if ($exchange == 4) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('krbalance', $balance);
            }
        } else {
            if ($exchange == 1) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('features_bbalance', $balance);
            }
            if ($exchange == 2) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('features_kbalance', $balance);
            }

            if ($exchange == 3) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('features_cbalance', $balance);
            }

            if ($exchange == 4) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('features_krbalance', $balance);
            }
        }

        $exchange = M('user_set')->where(array('id' => $setid))->getField('exchange');
        $coin = M('user_set')->where(array('id' => $setid))->getField('coin');

        //add history
        $rs[] = $mo->table('extrade_trade')->add(array('userid' => $user_id, 'num' => $qty, 'type' => 1, 'market' => "$coin/USDT", 'exchange' => $exchange, 'price' => $trade_price, 'addtime' => time(), 'status' => 1));
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setInc('qty', $qty);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('in_position', $in_position);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('buy_position', $buy_position);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('sell_position', $sell_position);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('trade_price', $trade_price);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('log', $tgmessage);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('first_buy',  $first_buy);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setInc('position_amount', $position_amount);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('first_price', $first_price);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid))->setField('run_status', 0);

        if (count($rs) > 0) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success('success!');
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('failed!');
        }
    }

    public function posttradelog($setid, $user_id, $tgmessage, $balance, $platform, $trade_type = 0)
    {
        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user_set write, extrade_user write ');
        $rs = array();


        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('log', $tgmessage);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $setid, 'userid' => $user_id))->setField('run_status', 0);


        if ($trade_type == 0) {
            if ($platform == 1) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('bbalance', $balance);
            }
            if ($platform == 2) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('kbalance', $balance);
            }

            if ($platform == 3) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('cbalance', $balance);
            }

            if ($platform == 4) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('krbalance', $balance);
            }
        } else {
            if ($platform == 1) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('features_bbalance', $balance);
            }
            if ($platform == 2) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('features_kbalance', $balance);
            }

            if ($platform == 3) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('features_cbalance', $balance);
            }

            if ($platform == 4) {
                $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('features_krbalance', $balance);
            }
        }

        if (count($rs) > 0) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success('success!');
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('failed!');
        }
    }

    public function postbalance($user_id, $balance, $platform, $futures_balance = 0)
    {

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user write ');
        $rs = array();


        if ($platform == 1) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('bbalance', $balance);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('features_bbalance', $futures_balance);
        }
        if ($platform == 2) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('kbalance', $balance);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('features_kbalance', $futures_balance);
        }

        if ($platform == 3) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('cbalance', $balance);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('features_cbalance', $futures_balance);
        }

        if ($platform == 4) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('krbalance', $balance);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $user_id))->setField('features_krbalance', $futures_balance);
        }


        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success('success!');
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('failed!');
        }
    }

    public function postconvertbalance($user_id, $platform, $btc, $eth, $bnb, $hbar, $hot, $qtum, $vet, $xlm, $inch, $aave, $ada, $cake, $dash, $doge, $dot, $eos, $etc, $fil, $ftt, $grt, $link, $ltc, $theta, $uni, $xmr, $xrp, $xtz, $alice, $sol, $luna, $ftm)
    {
        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user_set write ');
        $rs = array();
        if ($platform == 1) {
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'BTC', 'balance'  => ['notlike', $btc]))->setField('balance', $btc);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'ETH', 'balance'  => ['notlike', $eth]))->setField('balance', $eth);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'BNB', 'balance'  => ['notlike', $bnb]))->setField('balance', $bnb);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'HBAR', 'balance'  => ['notlike', $hbar]))->setField('balance', $hbar);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'HOT', 'balance'  => ['notlike', $hot]))->setField('balance', $hot);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'QTUM', 'balance'  => ['notlike', $qtum]))->setField('balance', $qtum);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'VET', 'balance'  => ['notlike', $vet]))->setField('balance', $vet);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'XLM', 'balance'  => ['notlike', $xlm]))->setField('balance', $xlm);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => '1INCH', 'balance'  => ['notlike', $inch]))->setField('balance', $inch);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'AAVE', 'balance'  => ['notlike', $aave]))->setField('balance', $aave);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'ADA', 'balance'  => ['notlike', $ada]))->setField('balance', $ada);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'CAKE', 'balance'  => ['notlike', $cake]))->setField('balance', $cake);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'DASH', 'balance'  => ['notlike', $dash]))->setField('balance', $dash);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'DOGE', 'balance'  => ['notlike', $doge]))->setField('balance', $doge);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'DOT', 'balance'  => ['notlike', $dot]))->setField('balance', $dot);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'EOS', 'balance'  => ['notlike', $eos]))->setField('balance', $eos);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'ETC', 'balance'  => ['notlike', $etc]))->setField('balance', $etc);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'FIL', 'balance'  => ['notlike', $fil]))->setField('balance', $fil);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'FTT', 'balance'  => ['notlike', $ftt]))->setField('balance', $ftt);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'GRT', 'balance'  => ['notlike', $grt]))->setField('balance', $grt);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'LINK', 'balance'  => ['notlike', $link]))->setField('balance', $link);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'LTC', 'balance' => ['notlike', $ltc]))->setField('balance', $ltc);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'THETA', 'balance'  => ['notlike', $theta]))->setField('balance', $theta);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'UNI', 'balance'  => ['notlike', $uni]))->setField('balance', $uni);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'XMR', 'balance'  => ['notlike', $xmr]))->setField('balance', $xmr);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'XRP', 'balance'  => ['notlike', $xrp]))->setField('balance', $xrp);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'XTZ', 'balance'  => ['notlike', $xtz]))->setField('balance', $xtz);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'ALICE', 'balance'  => ['notlike', $alice]))->setField('balance', $alice);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'SOL', 'balance'  => ['notlike', $sol]))->setField('balance', $sol);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'LUNA', 'balance'  => ['notlike', $luna]))->setField('balance', $luna);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'FTM', 'balance'  => ['notlike', $ftm]))->setField('balance', $ftm);
        }
        if ($platform == 2) {
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'BTC', 'balance'  => ['notlike', $btc]))->setField('balance', $btc);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'ETH', 'balance'  => ['notlike', $eth]))->setField('balance', $eth);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'BNB', 'balance'  => ['notlike', $bnb]))->setField('balance', $bnb);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'HBAR', 'balance'  => ['notlike', $hbar]))->setField('balance', $hbar);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'HOT', 'balance'  => ['notlike', $hot]))->setField('balance', $hot);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'QTUM', 'balance'  => ['notlike', $qtum]))->setField('balance', $qtum);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'VET', 'balance'  => ['notlike', $vet]))->setField('balance', $vet);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'XLM', 'balance'  => ['notlike', $xlm]))->setField('balance', $xlm);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => '1INCH', 'balance'  => ['notlike', $inch]))->setField('balance', $inch);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'AAVE', 'balance'  => ['notlike', $aave]))->setField('balance', $aave);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'ADA', 'balance'  => ['notlike', $ada]))->setField('balance', $ada);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'CAKE', 'balance'  => ['notlike', $cake]))->setField('balance', $cake);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'DASH', 'balance'  => ['notlike', $dash]))->setField('balance', $dash);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'DOGE', 'balance'  => ['notlike', $doge]))->setField('balance', $doge);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'DOT', 'balance'  => ['notlike', $dot]))->setField('balance', $dot);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'EOS', 'balance'  => ['notlike', $eos]))->setField('balance', $eos);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'ETC', 'balance'  => ['notlike', $etc]))->setField('balance', $etc);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'FIL', 'balance'  => ['notlike', $fil]))->setField('balance', $fil);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'FTT', 'balance'  => ['notlike', $ftt]))->setField('balance', $ftt);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'GRT', 'balance'  => ['notlike', $grt]))->setField('balance', $grt);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'LINK', 'balance'  => ['notlike', $link]))->setField('balance', $link);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'LTC', 'balance'  => ['notlike', $ltc]))->setField('balance', $ltc);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'THETA', 'balance'  => ['notlike', $theta]))->setField('balance', $theta);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'UNI', 'balance'  => ['notlike', $uni]))->setField('balance', $uni);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'XMR', 'balance'  => ['notlike', $xmr]))->setField('balance', $xmr);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'XRP', 'balance'  => ['notlike', $xrp]))->setField('balance', $xrp);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'XTZ', 'balance'  => ['notlike', $xtz]))->setField('balance', $xtz);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'ALICE', 'balance'  => ['notlike', $alice]))->setField('balance', $alice);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'SOL', 'balance'  => ['notlike', $sol]))->setField('balance', $sol);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'LUNA', 'balance'  => ['notlike', $luna]))->setField('balance', $luna);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'FTM', 'balance'  => ['notlike', $ftm]))->setField('balance', $ftm);
        }

        if ($platform == 3) {
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'BTC', 'balance'  => ['notlike', $btc]))->setField('balance', $btc);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'ETH', 'balance'  => ['notlike', $eth]))->setField('balance', $eth);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'BNB', 'balance'  => ['notlike', $bnb]))->setField('balance', $bnb);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'HBAR', 'balance'  => ['notlike', $hbar]))->setField('balance', $hbar);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'HOT', 'balance'  => ['notlike', $hot]))->setField('balance', $hot);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'QTUM', 'balance'  => ['notlike', $qtum]))->setField('balance', $qtum);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'VET', 'balance'  => ['notlike', $vet]))->setField('balance', $vet);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'XLM', 'balance'  => ['notlike', $xlm]))->setField('balance', $xlm);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => '1INCH', 'balance'  => ['notlike', $inch]))->setField('balance', $inch);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'AAVE', 'balance'  => ['notlike', $aave]))->setField('balance', $aave);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'ADA', 'balance'  => ['notlike', $ada]))->setField('balance', $ada);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'CAKE', 'balance'  => ['notlike', $cake]))->setField('balance', $cake);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'DASH', 'balance'  => ['notlike', $dash]))->setField('balance', $dash);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'DOGE', 'balance'  => ['notlike', $doge]))->setField('balance', $doge);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'DOT', 'balance'  => ['notlike', $dot]))->setField('balance', $dot);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'EOS', 'balance'  => ['notlike', $eos]))->setField('balance', $eos);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'ETC', 'balance'  => ['notlike', $etc]))->setField('balance', $etc);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'FIL', 'balance'  => ['notlike', $fil]))->setField('balance', $fil);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'FTT', 'balance'  => ['notlike', $ftt]))->setField('balance', $ftt);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'GRT', 'balance'  => ['notlike', $grt]))->setField('balance', $grt);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'LINK', 'balance'  => ['notlike', $link]))->setField('balance', $link);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'LTC', 'balance'  => ['notlike', $ltc]))->setField('balance', $ltc);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'THETA', 'balance'  => ['notlike', $theta]))->setField('balance', $theta);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'UNI', 'balance'  => ['notlike', $uni]))->setField('balance', $uni);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'XMR', 'balance'  => ['notlike', $xmr]))->setField('balance', $xmr);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'XRP', 'balance'  => ['notlike', $xrp]))->setField('balance', $xrp);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'XTZ', 'balance'  => ['notlike', $xtz]))->setField('balance', $xtz);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'ALICE', 'balance'  => ['notlike', $alice]))->setField('balance', $alice);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'SOL', 'balance'  => ['notlike', $sol]))->setField('balance', $sol);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'LUNA', 'balance'  => ['notlike', $luna]))->setField('balance', $luna);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'FTM', 'balance'  => ['notlike', $ftm]))->setField('balance', $ftm);
        }

        if ($platform == 4) {
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'BTC', 'balance'  => ['notlike', $btc]))->setField('balance', $btc);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'ETH', 'balance'  => ['notlike', $eth]))->setField('balance', $eth);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'BNB', 'balance'  => ['notlike', $bnb]))->setField('balance', $bnb);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'HBAR', 'balance'  => ['notlike', $hbar]))->setField('balance', $hbar);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'HOT', 'balance'  => ['notlike', $hot]))->setField('balance', $hot);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'QTUM', 'balance'  => ['notlike', $qtum]))->setField('balance', $qtum);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'VET', 'balance'  => ['notlike', $vet]))->setField('balance', $vet);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'XLM', 'balance'  => ['notlike', $xlm]))->setField('balance', $xlm);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => '1INCH', 'balance'  => ['notlike', $inch]))->setField('balance', $inch);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'AAVE', 'balance'  => ['notlike', $aave]))->setField('balance', $aave);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'ADA', 'balance'  => ['notlike', $ada]))->setField('balance', $ada);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'CAKE', 'balance'  => ['notlike', $cake]))->setField('balance', $cake);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'DASH', 'balance'  => ['notlike', $dash]))->setField('balance', $dash);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'DOGE', 'balance'  => ['notlike', $doge]))->setField('balance', $doge);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'DOT', 'balance'  => ['notlike', $dot]))->setField('balance', $dot);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'EOS', 'balance'  => ['notlike', $eos]))->setField('balance', $eos);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'ETC', 'balance'  => ['notlike', $etc]))->setField('balance', $etc);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'FIL', 'balance'  => ['notlike', $fil]))->setField('balance', $fil);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'FTT', 'balance'  => ['notlike', $ftt]))->setField('balance', $ftt);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'GRT', 'balance'  => ['notlike', $grt]))->setField('balance', $grt);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'LINK', 'balance'  => ['notlike', $link]))->setField('balance', $link);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'LTC', 'balance'  => ['notlike', $ltc]))->setField('balance', $ltc);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'THETA', 'balance'  => ['notlike', $theta]))->setField('balance', $theta);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'UNI', 'balance'  => ['notlike', $uni]))->setField('balance', $uni);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'XMR', 'balance'  => ['notlike', $xmr]))->setField('balance', $xmr);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'XRP', 'balance'  => ['notlike', $xrp]))->setField('balance', $xrp);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'XTZ', 'balance'  => ['notlike', $xtz]))->setField('balance', $xtz);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'ALICE', 'balance'  => ['notlike', $alice]))->setField('balance', $alice);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'SOL', 'balance'  => ['notlike', $sol]))->setField('balance', $sol);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'LUNA', 'balance'  => ['notlike', $luna]))->setField('balance', $luna);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $user_id, 'exchange' => $platform,  'coin' => 'FTM', 'balance'  => ['notlike', $ftm]))->setField('balance', $ftm);
        }


        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success('success!');
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('failed!');
        }
    }

    public function start($id, $startbot, $userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        //$userid = M('user_set')->where(array('id' => $id))->getField('userid');
        $userid = M('User')->where(array('id' => $uid))->getField('paid');
        if ($userid == 0) {
            $this->error('Please subscribe');
        }
        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user_set write');
        $rs = array();
        $server1 = M('extrade_user_set')->where(array('server' => '1', 'start_bot' => '1'))->count();
        $server2 = M('extrade_user_set')->where(array('server' => '2', 'start_bot' => '1'))->count();
        $server3 = M('extrade_user_set')->where(array('server' => '3', 'start_bot' => '1'))->count();
        $server4 = M('extrade_user_set')->where(array('server' => '4', 'start_bot' => '1'))->count();
        $server5 = M('extrade_user_set')->where(array('server' => '5', 'start_bot' => '1'))->count();
        $server6 = M('extrade_user_set')->where(array('server' => '6', 'start_bot' => '1'))->count();
        $server7 = M('extrade_user_set')->where(array('server' => '7', 'start_bot' => '1'))->count();
        $server8 = M('extrade_user_set')->where(array('server' => '8', 'start_bot' => '1'))->count();
        $server9 = M('extrade_user_set')->where(array('server' => '9', 'start_bot' => '1'))->count();
        $server10 = M('extrade_user_set')->where(array('server' => '10', 'start_bot' => '1'))->count();
        $server11 = M('extrade_user_set')->where(array('server' => '11', 'start_bot' => '1'))->count();
        $server12 = M('extrade_user_set')->where(array('server' => '12', 'start_bot' => '1'))->count();
        $server13 = M('extrade_user_set')->where(array('server' => '13', 'start_bot' => '1'))->count();
        $server14 = M('extrade_user_set')->where(array('server' => '14', 'start_bot' => '1'))->count();
        $server15 = M('extrade_user_set')->where(array('server' => '15', 'start_bot' => '1'))->count();
        $server16 = M('extrade_user_set')->where(array('server' => '16', 'start_bot' => '1'))->count();
        $server17 = M('extrade_user_set')->where(array('server' => '17', 'start_bot' => '1'))->count();
        $server18 = M('extrade_user_set')->where(array('server' => '18', 'start_bot' => '1'))->count();
        $server19 = M('extrade_user_set')->where(array('server' => '19', 'start_bot' => '1'))->count();
        $server20 = M('extrade_user_set')->where(array('server' => '20', 'start_bot' => '1'))->count();
        $server21 = M('extrade_user_set')->where(array('server' => '21', 'start_bot' => '1'))->count();
        $server22 = M('extrade_user_set')->where(array('server' => '22', 'start_bot' => '1'))->count();
        $server23 = M('extrade_user_set')->where(array('server' => '23', 'start_bot' => '1'))->count();
        $server24 = M('extrade_user_set')->where(array('server' => '24', 'start_bot' => '1'))->count();
        $server25 = M('extrade_user_set')->where(array('server' => '25', 'start_bot' => '1'))->count();
        $server26 = M('extrade_user_set')->where(array('server' => '26', 'start_bot' => '1'))->count();
        $server27 = M('extrade_user_set')->where(array('server' => '27', 'start_bot' => '1'))->count();
        $server28 = M('extrade_user_set')->where(array('server' => '28', 'start_bot' => '1'))->count();
        $server29 = M('extrade_user_set')->where(array('server' => '29', 'start_bot' => '1'))->count();
        $server30 = M('extrade_user_set')->where(array('server' => '30', 'start_bot' => '1'))->count();
        if ($server1 < 45) {
            $server = 1;
        } else if ($server2 < 45) {
            $server = 2;
        } else if ($server3 < 45) {
            $server = 3;
        } else if ($server4 < 45) {
            $server = 4;
        } else if ($server5 < 45) {
            $server = 5;
        } else if ($server6 < 45) {
            $server = 6;
        } else if ($server7 < 45) {
            $server = 7;
        } else if ($server8 < 45) {
            $server = 8;
        } else if ($server9 < 45) {
            $server = 9;
        } else if ($server10 < 45) {
            $server = 10;
        } else if ($server11 < 45) {
            $server = 11;
        } else if ($server12 < 45) {
            $server = 12;
        } else if ($server13 < 45) {
            $server = 13;
        } else if ($server14 < 45) {
            $server = 14;
        } else if ($server15 < 45) {
            $server = 15;
        } else if ($server16 < 45) {
            $server = 16;
        } else if ($server17 < 45) {
            $server = 17;
        } else if ($server18 < 45) {
            $server = 18;
        } else if ($server19 < 45) {
            $server = 19;
        } else if ($server20 < 45) {
            $server = 20;
        } else if ($server21 < 45) {
            $server = 21;
        } else if ($server22 < 45) {
            $server = 22;
        } else if ($server23 < 45) {
            $server = 23;
        } else if ($server24 < 45) {
            $server = 24;
        } else if ($server25 < 45) {
            $server = 25;
        } else if ($server26 < 45) {
            $server = 26;
        } else if ($server27 < 45) {
            $server = 27;
        } else if ($server28 < 45) {
            $server = 28;
        } else if ($server29 < 45) {
            $server = 29;
        } else if ($server30 < 45) {
            $server = 30;
        } else {
            $server = 31;
        }

        if ($startbot == 1) {
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('server', $server);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('start_bot', $startbot);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('run_status', 0);
        }

        if ($startbot == 0) {
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('start_bot', $startbot);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('qty', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('in_position', 'False');
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('buy_position', 'False');
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('sell_position', 'False');
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('trade_price', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('first_buy',  0);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('run_status', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('position_amount', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('first_price', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('start_bot', 0);
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('log', "");
            $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('server', 0);
        }

        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success('success!');
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('failed!');
        }
    }

    public function ostrategy($userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }


        $marketlist = M('user_set')->where(array('userid' => $uid))->order('id asc')->select();
        $ret['kucoin_balance'] = M('User')->where(array('id' => $uid))->getField("kbalance");
        $ret['binance_balance'] = M('User')->where(array('id' => $uid))->getField("bbalance");
        $ret['coinbasepro_balance'] = M('User')->where(array('id' => $uid))->getField("cbalance");
        $ret['kraken_balance'] = M('User')->where(array('id' => $uid))->getField("krbalance");

        $ret['futures_kucoin_balance'] = M('User')->where(array('id' => $uid))->getField("features_kbalance");
        $ret['futures_binance_balance'] = M('User')->where(array('id' => $uid))->getField("features_bbalance");
        $ret['futures_coinbasepro_balance'] = M('User')->where(array('id' => $uid))->getField("features_cbalance");
        $ret['futures_kraken_balance'] = M('User')->where(array('id' => $uid))->getField("features_krbalance");

        foreach ($marketlist as $key => $val) {
            $marketprofit[$key]['id'] = $val['id'];
            $marketprofit[$key]['exchange'] = $val['exchange'];
            $marketprofit[$key]['Market'] = $val['market'];
            $marketprofit[$key]['Strategy ratio'] = $val['strategy_ratio'];
            $marketprofit[$key]['Quantity'] = $val['qty'];
            $marketprofit[$key]['FloatingLoss'] = $val['floating_loss'];
            $marketprofit[$key]['Avg_Price'] = $val['trade_price'];
            $marketprofit[$key]['One-shot'] = $val['one_shot'];
            $marketprofit[$key]['cycle'] = $val['cycle'];
            $marketprofit[$key]['balance'] = $val['balance'];
            $marketprofit[$key]['feature_balance'] = $val['feature_balance'];
            $marketprofit[$key]['stopprice'] = $val['stop_price'];
            $marketprofit[$key]['auto compounding'] = $val['auto_comp'];
            $marketprofit[$key]['start_bot'] = $val['start_bot'];
            $marketprofit[$key]['coin image'] = $val['coin'] . '.png';
            $marketprofit[$key]['Positionamount'] = $val['position_amount'];
            $marketprofit[$key]['Numbercallmargin'] = $val['margin_limit'];
            $arr = explode('|', $val['price_drop']);
            $arr2 = explode('|', $val['m_ratio']);
            $marketprofit[$key]['Price drop'] = $arr;
            $marketprofit[$key]['Martingale ratio'] = $arr2;
            $marketprofit[$key]['firstbuy'] = $val['first_buy'];
            $marketprofit[$key]['take_profit_ratio'] = $val['profit_ratio'];
            $marketprofit[$key]['margin_call_limit'] = $val['margin_limit'];
            $marketprofit[$key]['buyin_callback'] = $val['profit_callback'];
            $marketprofit[$key]['current_price'] = $val['current_price'];
            $marketprofit[$key]['firstbuyinamount'] = $val['firstbuy_amount'];
            $marketprofit[$key]['trade_type'] = $val['trade_type'];
            $marketprofit[$key]['direction'] = $val['direction'];
            $marketprofit[$key]['stop_loss'] = $val['stop_loss'];
            $marketprofit[$key]['re_capital'] = $val['re_capital'];
            $marketprofit[$key]['price_above'] = 0;
            $marketprofit[$key]['price_below'] = 0;
            $marketprofit[$key]['closing_price'] = 0;
            $marketprofit[$key]['entry_call'] = 0;
            $marketprofit[$key]['Strategy mode'] = $val['Strategy_mode'];
            $marketprofit[$key]['Log'] = $val['log'];
            $marketprofit[$key]['whole position take profit'] = $val['whole_ratio'];
            $marketprofit[$key]['sync'] = $val['sync'];
            $marketprofit[$key]['coin'] = $val['coin'];
        }


        $ret['Operation Strategy'] = $marketprofit;
        $this->ajaxShow($ret);
    }

    public function strategy($userId = null)
    {

        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }


        $marketlist = M('user_set')->where(array('userid' => $uid, 'start_bot' => 1))->order('id asc')->select();
        $ret['kucoin_balance'] = M('User')->where(array('id' => $uid))->getField("kbalance");
        $ret['binance_balance'] = M('User')->where(array('id' => $uid))->getField("bbalance");
        $ret['coinbasepro_balance'] = M('User')->where(array('id' => $uid))->getField("cbalance");
        $ret['kraken_balance'] = M('User')->where(array('id' => $uid))->getField("krbalance");


        foreach ($marketlist as $key => $val) {
            $marketprofit[$key]['id'] = $val['id'];
            $marketprofit[$key]['exchange'] = $val['exchange'];
            $marketprofit[$key]['Market'] = $val['market'];
            $marketprofit[$key]['Strategy ratio'] = $val['strategy_ratio'];
            $marketprofit[$key]['Quantity'] = $val['qty'];
            $marketprofit[$key]['FloatingLoss'] = $val['floating_loss'];
            $marketprofit[$key]['Avg_Price'] = $val['trade_price'];
            $marketprofit[$key]['One-shot'] = $val['one_shot'];
            $marketprofit[$key]['cycle'] = $val['cycle'];
            $marketprofit[$key]['balance'] = $val['balance'];
            $marketprofit[$key]['start_bot'] = $val['start_bot'];
            $marketprofit[$key]['stopprice'] = $val['stop_price'];
            $marketprofit[$key]['coin image'] = $val['coin'] . '.png';
            $marketprofit[$key]['auto compounding'] = $val['auto_comp'];
            $marketprofit[$key]['Positionamount'] = $val['position_amount'];
            $marketprofit[$key]['Numbercallmargin'] = $val['margin_limit'];
            $arr = explode('|', $val['price_drop']);
            $arr2 = explode('|', $val['m_ratio']);
            $marketprofit[$key]['Price drop'] = $arr;
            $marketprofit[$key]['Martingale ratio'] = $arr2;
            $marketprofit[$key]['firstbuy'] = $val['first_buy'];
            $marketprofit[$key]['take_profit_ratio'] = $val['profit_ratio'];
            $marketprofit[$key]['margin_call_limit'] = $val['margin_limit'];
            $marketprofit[$key]['buyin_callback'] = $val['profit_callback'];
            $marketprofit[$key]['current_price'] = $val['current_price'];
            $marketprofit[$key]['firstbuyinamount'] = $val['firstbuy_amount'];
            $marketprofit[$key]['trade_type'] = $val['trade_type'];
            $marketprofit[$key]['direction'] = $val['direction'];
            $marketprofit[$key]['stop_loss'] = $val['stop_loss'];
            $marketprofit[$key]['re_capital'] = $val['re_capital'];
            $marketprofit[$key]['price_above'] = 0;
            $marketprofit[$key]['price_below'] = 0;
            $marketprofit[$key]['closing_price'] = 0;
            $marketprofit[$key]['entry_call'] = 0;
            $marketprofit[$key]['Strategy mode'] = $val['Strategy_mode'];
            $marketprofit[$key]['Log'] = $val['log'];
            $marketprofit[$key]['whole position take profit'] = $val['whole_ratio'];
            $marketprofit[$key]['sync'] = $val['sync'];
        }


        $ret['Operation Strategy'] = $marketprofit;
        $this->ajaxShow($ret);
    }

    public function getcopyList()
    {
        // if (!($uid = $this->userid())) {
        //     $this->error(L('PLEASE_LOGIN'));
        // }

        $marketlist = M('user_set')->where(array('userid' => 17409, 'active_copy' => 1))->select();

        foreach ($marketlist as $key => $val) {
            $marketprofit[$key]['id'] = $val['id'];
            $marketprofit[$key]['trade_type'] = $val['trade_type'];
            $marketprofit[$key]['Market'] = $val['market'];
            $marketprofit[$key]['icon'] = $val['coin'] . '.png';
        }

        $ret['copy system'] = $marketprofit;
        $this->ajaxShow($ret);
    }

    function activateCopy($id, $status)
    {
        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user_set write ');
        $rs = array();
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $id))->setField('active_copy', $status);

        if ($status == 1) {
            $msg = 'Activate trade for copy was successfull!';
        } else {
            $msg = 'Trade deactivated for copy.';
        }

        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success($msg);
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('failed!');
        }
    }

    public function getstrategy($userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $marketlist = M('strategy_set')->where(array('userid' => $uid))->select();

        foreach ($marketlist as $key => $val) {
            $marketprofit[$key]['id'] = $val['id'];
            $marketprofit[$key]['Risk type'] = $val['risk_type'];
            $marketprofit[$key]['Remark'] = $val['remark'];
            $marketprofit[$key]['balance'] = $val['balance'];
            $marketprofit[$key]['start_bot'] = $val['start_bot'];
            $marketprofit[$key]['First buy in amount'] = $val['firstbuy_amount'];
            $marketprofit[$key]['Double position'] = $val['double_position'];
            $marketprofit[$key]['Margin call limit'] = $val['margin_limit'];
            $marketprofit[$key]['whole position take profit ratio'] = $val['profit_ratio'];
            $marketprofit[$key]['whole position take profit callback'] = $val['profit_callback'];
            $arr = explode('|', $val['price_drop']);
            $arr2 = explode('|', $val['m_ratio']);
            $marketprofit[$key]['Price drop'] = $arr;
            $marketprofit[$key]['Martingale ratio'] = $arr2;
            $marketprofit[$key]['Buy in callback'] = $val['buy_callback'];
            $marketprofit[$key]['one_short'] = $val['one_shot'];
            $marketprofit[$key]['Cycle'] = $val['cycle'];
            $marketprofit[$key]['Highest first price'] = $val['first_price'];
            $marketprofit[$key]['First position drop'] = $val['first_drop'];
        }

        $ret['My Strategy setting'] = $marketprofit;
        $this->ajaxShow($ret);
    }

    public function addgetstrategy($id, $type, $risk_type, $remark, $firstbuy_amount, $double_position, $margin_limit, $profit_ratio, $profit_callback, $first_call, $first_ratio, $second_call, $second_ratio, $third_call, $third_ratio, $forth_call, $forth_ratio, $fifth_call, $fifth_ratio, $buy_callback, $cycle, $one_short, $first_price, $first_drop, $userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_strategy_set write');
        $rs = array();

        if ($type == 1 and $id == 0) {
            $rs[] = $mo->table('extrade_strategy_set')->add(array('userid' => $uid, 'risk_type' => $risk_type, 'remark' => $remark, 'firstbuy_amount' => $firstbuy_amount, 'double_position' => $double_position, 'margin_limit' => $margin_limit, 'profit_ratio' => $profit_ratio, 'profit_callback' => $profit_callback, 'first_call' => $first_call, 'first_ratio' => $first_ratio, 'second_call' => $second_call, 'second_ratio' => $second_ratio, 'third_call' => $third_call, 'third_ratio' => $third_ratio, 'forth_call' => $forth_call, 'forth_ratio' => $forth_ratio, 'fifth_call' => $fifth_call, 'fifth_ratio' => $fifth_ratio));
        } else if ($type == 2  and $id > 1) {
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->setField('risk_type', $risk_type);
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->setField('remark', $remark);
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->setField('firstbuy_amount', $firstbuy_amount);
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->setField('double_position', $double_position);
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->setField('margin_limit', $margin_limit);
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->setField('profit_ratio', $profit_ratio);
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->setField('profit_callback', $profit_callback);
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->setField('first_call', $first_call);
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->setField('first_ratio',  $first_ratio);
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->setField('second_call', $second_call);
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->setField('second_ratio', $second_ratio);
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->setField('third_call', $third_call);
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->setField('third_ratio', $third_ratio);
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->setField('forth_call', $forth_call);
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->setField('forth_ratio', $forth_ratio);
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->setField('fifth_call', $fifth_call);
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->setField('fifth_ratio', $fifth_ratio);
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->setField('cycle', $cycle);
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->setField('buy_callback', $buy_callback);
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->setField('one_short', $one_shot);
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->setField('first_price', $first_price);
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->setField('first_drop', $first_drop);
        } else if ($type == 3 and $id > 0) {
            $rs[] = $mo->table('extrade_strategy_set')->where(array('id' => $id))->delete();
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('error');
        }



        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success('success!');
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('failed!');
        }
    }


    public function cronauto()
    {
        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user write');
        $rs = array();
        $time = time() - 172800;

        $rs[] = $mo->table('extrade_user')->where(array($time > 'expiretime', 'lifetime' => 0))->setField('paid', 0);
        $rs[] = $mo->table('extrade_user')->where('today_profit > 0')->setField('today_profit', 0);
        $rs[] = $mo->table('extrade_user')->where('reward_today > 0')->setField('reward_today', 0);
        $rs[] = $mo->table('extrade_user')->where('activate_today > 0')->setField('activate_today', 0);
        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success('success!');
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('failed!');
        }
    }


    public function cronauto2()
    {
        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user_set write');
        $rs = array();
        $time = time();

        $rs[] = $mo->table('extrade_user_set')->where(array('start_bot' => 1, 'run_status'  => 2))->setField('run_status', 0);
        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success('success!');
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('failed!');
        }
    }

    public function newstrategyget($id, $market, $exchange, $userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user_coin write, extrade_user_set write, extrade_trade write');
        $marketlist = M('user_set')->where(array('userid' => $uid, 'id' => $id, 'market' => $market, 'exchange' => $exchange))->select();

        foreach ($marketlist as $key => $val) {
            $marketprofit[$key]['id'] = $val['id'];
            $marketprofit[$key]['exchange'] = $val['exchange'];
            $marketprofit[$key]['Market'] = $val['market'];
            $marketprofit[$key]['rp'] = M('UserCoin')->where(array('userid' => $uid))->getField("usdtd");
            $marketprofit[$key]['Strategy ratio'] = $val['strategy_ratio'];
            $marketprofit[$key]['Quantity'] = $val['qty'];
            $marketprofit[$key]['coin image'] = $val['coin_image'];
            $marketprofit[$key]['FloatingLoss'] = $val['floating_loss'];
            $marketprofit[$key]['Avg_Price'] = $val['trade_price'];
            $marketprofit[$key]['One-shot'] = $val['one_shot'];
            $marketprofit[$key]['cycle'] = $val['cycle'];
            $marketprofit[$key]['Positionamount'] = $val['position_amount'];
            $marketprofit[$key]['firstbuy'] = $val['first_buy'];
            $marketprofit[$key]['take_profit_ratio'] = $val['profit_ratio'];
            $marketprofit[$key]['margin_call_limit'] = $val['margin_limit'];
            $marketprofit[$key]['buyin_callback'] = $val['profit_callback'];
            $marketprofit[$key]['current_price'] = $val['current_price'];
            $marketprofit[$key]['firstbuyinamount'] = $val['firstbuy_amount'];
            $marketprofit[$key]['Strategy mode'] = $val['Strategy_mode'];
            $marketprofit[$key]['Log'] = $val['log'];
            $marketprofit[$key]['auto compounding'] = $val['auto_comp'];
            $marketprofit[$key]['bot_on'] = $val['start_bot'];
            $marketprofit[$key]['stopprice'] = $val['stop_price'];
            $marketprofit[$key]['open double'] = $val['double_position'];
            $marketprofit[$key]['Numbercallmargin'] = $val['margin_limit'];
            $arr = explode('|', $val['price_drop']);
            $arr2 = explode('|', $val['m_ratio']);
            $marketprofit[$key]['Price drop'] = $arr;
            $marketprofit[$key]['Martingale ratio'] = $arr2;
            $marketprofit[$key]['whole position take profit'] = $val['whole_ratio'];
            $marketprofit[$key]['sync'] = $val['sync'];
            $marketprofit[$key]['trade_type'] = $val['trade_type'];
            $marketprofit[$key]['direction'] = $val['direction'];
            $marketprofit[$key]['stop_loss'] = $val['stop_loss'];
            $marketprofit[$key]['re_capital'] = $val['re_capital'];
            $marketprofit[$key]['price_above'] = 0;
            $marketprofit[$key]['price_below'] = 0;
            $marketprofit[$key]['closing_price'] = 0;
            $marketprofit[$key]['entry_call'] = 0;
            $marketprofit[$key]['active_copy'] =  $val['active_copy'];
        }

        $tradeh = M('trade')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->order('id desc')->select();

        foreach ($tradeh as $key => $val) {
            $buyh[$key]['Date'] = $val['addtime'];
            $buyh[$key]['Type'] = $val['type'];
            $buyh[$key]['market'] = $val['market'];
            $buyh[$key]['Avg entryprice'] = $val['price'];
            $buyh[$key]['Profit'] = $val['mum'];
        }

        $ret['Operation Strategy'] = $marketprofit;
        $ret['Transaction records'] = $buyh;
        $mo->execute('unlock tables');
        $this->ajaxShow($ret);
    }

    public function Rewarddetails($userId)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $d_profit = M('User')->where(array('id' => $uid))->getField('reward_total');
        $t_profit = M('User')->where(array('id' => $uid))->getField('reward_today');
        $ret['today_profit'] = $t_profit;
        $ret['comulative_profit'] = $d_profit;
        $active = M('invit')->where(array('userid' => $uid, 'type' => "activation"))->order('id desc')->select();


        foreach ($active as $key => $val) {
            $activee[$key]['Date'] = $val['addtime'];
            $activee[$key]['Details'] = $val['name'];
            $activee[$key]['Reward'] = $val['mum'];
        }
        $direct = M('invit')->where(array('userid' => $uid, 'type' => "direct"))->order('id desc')->select();


        foreach ($direct as $key => $val) {
            $directt[$key]['Date'] = $val['addtime'];
            $directt[$key]['Details'] = $val['name'];
            $directt[$key]['Reward'] = $val['mum'];
        }
        $team = M('invit')->where(array('userid' => $uid, 'type' => "team"))->order('id desc')->select();


        foreach ($team as $key => $val) {
            $teamm[$key]['Date'] = $val['addtime'];
            $teamm[$key]['Details'] = $val['name'];
            $teamm[$key]['Reward'] = $val['mum'];
        }
        $All = M('invit')->where(array('userid' => $uid))->order('id desc')->select();


        foreach ($All as $key => $val) {
            $Alll[$key]['Date'] = $val['addtime'];
            $Alll[$key]['Details'] = $val['name'];
            $Alll[$key]['Reward'] = $val['mum'];
        }
        $ret['All'] = $Alll;
        $ret['Activation Gain'] = $activee;
        $ret['Direct quantification'] = $directt;
        $ret['Team quantification'] = $teamm;
        $this->ajaxShow($ret);
    }

    public function Asset($userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $balance = M('UserCoin')->where(array('userid' => $uid))->field('usdt')->find();
        $balancerp = M('UserCoin')->where(array('userid' => $uid))->field('usdtd')->find();
        $ret['total_assets'] = $balance['usdt'];
        $ret['rp_assets'] = $balancerp['usdtd'];
        $dhistory = M('myzr')->where(array('userid' => $uid))->order('id desc')->select();


        foreach ($dhistory as $key => $val) {
            $deposit[$key]['Date'] = $val['addtime'];
            $deposit[$key]['address'] = $val['username'];
            $deposit[$key]['Asset'] = $val['coinname'];
            $deposit[$key]['TX'] = $val['txid'];
            $deposit[$key]['amount'] = $val['mum'];
        }
        $whistory = M('myzc')->where(array('userid' => $uid))->order('id desc')->select();


        foreach ($whistory as $key => $val) {
            $withdrawal[$key]['Date'] = $val['addtime'];
            $withdrawal[$key]['address'] = $val['username'];
            $withdrawal[$key]['Asset'] = $val['coinname'];
            $withdrawal[$key]['TX'] = $val['txid'];
            $withdrawal[$key]['amount'] = $val['mum'];
        }

        $ret['Deposit Records'] = $deposit;
        $ret['Withdraw Records'] = $withdrawal;
        $this->ajaxShow($ret);
    }

    public function depositaddress($coin = "usdt", $userId = null)
    {
        $uid = $this->userid();

        $show_qr = 1;
        $coin = 'usdt';
        $this->assign('prompt_text', D('Text')->get_content('finance_myzr'));

        if (C('coin')['usdt']) {
            $coin = trim('usdt');
        } else {
            $coin = C('xnb_mr');
        }


        $this->assign('xnb', 'usdt');
        $Coin = M('Coin')->where(array(
            'status' => 1,
            'name' => array('neq', 'usdt')
        ))->select();

        foreach ($Coin as $k => $v) {
            $coin_list[$v['name']] = $v;
        }

        $this->assign('coin_list', $coin_list);
        $user_coin = M('UserCoin')->where(array('userid' => $uid))->find();
        $user_coin['usdt'] = round($user_coin['usdt'], 6);
        $this->assign('user_coin', $user_coin);
        $Coin = M('Coin')->where(array('name' => "usdt"))->find();
        $this->assign('zr_jz', $Coin['zr_jz']);


        $extrade_getCoreConfig = extrade_getCoreConfig();
        if (!$extrade_getCoreConfig) {
            $this->error(L('Incorrect Core Config'));
        }

        $this->assign("extrade_opencoin", $extrade_getCoreConfig['extrade_opencoin']);

        if ($extrade_getCoreConfig['extrade_opencoin'] == 1 && $Coin['type'] != 'offline') {
            if (!$Coin['zr_jz']) {
                $wallet = L('Deposit on maintenance!');
            } else {
                $qbdz = 'usdtb';

                if (!$user_coin[$qbdz]) {

                    if ($Coin['type'] == 'rgb') {
                        $wallet = md5(username() . $coin);
                        $rs = M('UserCoin')->where(array('userid' => $uid))->save(array($qbdz => $wallet));
                        $user_exists = M('User')->where(array('id' => $uid))->getField('id');

                        if (!$rs && !$user_exists) {
                            $this->error(L('Generate wallet address wrong!'));
                        }
                        if (!$rs && $user_exists) {

                            $ucoin[$qbdz] = $wallet;
                            $ucoin['userid'] = $user_exists;
                            $new_rs = M('UserCoin')->add($ucoin);
                            exit;
                        }
                    }
                    if ($Coin['type'] == 'eth') {
                        $heyue = $Coin['dj_yh']; //Contract Address
                        $dj_password = $Coin['dj_mm'];
                        $dj_address = $Coin['dj_zj'];
                        $dj_port = $Coin['dj_dk'];
                        $EthCommon = new \Org\Util\EthCommon($dj_address, $dj_port, "2.0");
                        $EthPayLocal = new \Org\Util\EthPayLocal($dj_address, $dj_port, "2.0", $heyue);
                        if (!$heyue) {
                            //eth
                            //Call the interface to generate a new wallet address
                            $wall_pass = ETH_USER_PASS; //cryptString($user_coin[$coin.'_pass'],'d');
                            $wallet = $EthPayLocal->personal_newAccount($wall_pass);
                            if ($wallet) {
                                $saveme[$qbdz] = $wallet;
                                $saveme[$coin . '_pass'] = cryptString(ETH_USER_PASS);
                                $rs = M('UserCoin')->where(array('userid' => $uid))->save($saveme);
                            } else {
                                $wallet = L('Wallet System is currently offline 2! ' . $coin);
                                $show_qr = 0;
                            }
                        } else {
                            //Eth contract
                            $rs1 = M('UserCoin')->where(array('userid' => $uid))->find();
                            if ($rs1['ethb']) {
                                $wallet = $rs1['ethb'];
                                $saveme[$qbdz] = $wallet;
                                $saveme[$coin . '_pass'] = cryptString(ETH_USER_PASS);
                                $rs = M('UserCoin')->where(array('userid' => $uid))->save($saveme);
                            } else {
                                //Call the interface to generate a new wallet address
                                $wall_pass = ETH_USER_PASS;
                                $wallet = $EthPayLocal->personal_newAccount($wall_pass);
                                if ($wallet) {
                                    $saveme[$qbdz] = $wallet;
                                    $saveme[$coin . '_pass'] = cryptString(ETH_USER_PASS);
                                    $saveme["ethb"] = $wallet;
                                    $rs = M('UserCoin')->where(array('userid' => $uid))->save($saveme);
                                } else {
                                    //            $this->error('Error generating wallet address 2!');
                                    $wallet = L('Wallet System is currently offline 1! ' . $coin);
                                    $show_qr = 0;
                                }
                            }
                        }
                    }
                    //eth  Ends

                    //CoinPayments starts	
                    if ($Coin['type'] == 'coinpay') {

                        $dj_username = $Coin['dj_yh'];
                        $dj_password = $Coin['dj_mm'];
                        $dj_address = $Coin['dj_zj'];
                        $dj_port = $Coin['dj_dk'];

                        $cps_api = CoinPay($dj_username, $dj_password, $dj_address, $dj_port, 5, array(), 1);
                        $information = $cps_api->GetBasicInfo();
                        $coinpay_coin = strtoupper('usdt.trc20');


                        if ($information['error'] != 'ok' || !isset($information['result']['username'])) {
                            $wallet = L('Wallet System is currently offline 1!');
                            $show_qr = 0;
                        } else {
                            $show_qr = 1;

                            $ipn_url = SITE_URL . 'IPN/confirm';
                            $transaction_response = $cps_api->GetCallbackAddressWithIpn($coinpay_coin, $ipn_url);
                            $wallet_addr = $transaction_response['result']['address'];

                            if (!is_array($wallet_addr)) {
                                $wallet_ad = $wallet_addr;
                                if (!$wallet_ad) {
                                    $wallet = $wallet_addr;
                                } else {
                                    $wallet = $wallet_ad;
                                }
                            } else {
                                $wallet = $wallet_addr[0];
                            }

                            if (!$wallet) {
                                $this->error('Generate Wallet error');
                            }

                            //$this->error($wallet);
                            $rs = M('UserCoin')->where(array('userid' => $uid))->save(array('usdtb' => $wallet));

                            if (!$rs) {
                                $this->error('Add error address wallet3!');
                            }
                        }
                    }
                    //CoinPayments  Ends
                    //WavesPlatform Starts

                    if ($Coin['type'] == 'waves') {

                        $qbdz = 'wavesb';
                        $dj_username = $Coin['dj_yh'];
                        $dj_password = $Coin['dj_mm'];
                        $dj_address = $Coin['dj_zj'];
                        $dj_port = $Coin['dj_dk'];
                        $dj_decimal = $Coin['cs_qk'];
                        $waves = WavesClient($dj_username, $dj_password, $dj_address, $dj_port, $dj_decimal, 5, array(), 1);
                        $waves_coin = strtoupper($coin);
                        $information = json_decode($waves->status(), true);

                        if ($information['blockchainHeight'] && $information['blockchainHeight'] <= 0) {
                            $wallet = L('Wallet System is currently offline 1!');
                            $show_qr = 0;
                        } else {
                            $show_qr = 1;
                            $rs1 = M('UserCoin')->where(array('userid' => $uid))->find();
                            if ($rs1['wavesb']) {
                                $waves_good = 0;
                                $wallet_addr = $rs1['wavesb'];
                            } else {
                                $waves_good = 1;
                                $transaction_response = $address = json_decode($waves->CreateAddress(), true);
                                $wallet_addr = $transaction_response['address'];
                            }

                            if (!is_array($wallet_addr)) {
                                $wallet_ad = $wallet_addr;
                                if (!$wallet_ad) {
                                    $wallet = $wallet_addr;
                                } else {
                                    $wallet = $wallet_ad;
                                }
                            } else {
                                $wallet = $wallet_addr[0];
                            }

                            if (!$wallet) {
                                $show_qr = 0;
                                $wallet = L('Wallet System is currently offline 2!');
                            }
                            if ($show_qr == 1) {
                                $rs = M('UserCoin')->where(array('userid' => $uid))->save(array($qbdz => $wallet));
                                if (!$rs && $waves_good == 1) {
                                    $wallet = L('Wallet System is currently offline 3!');
                                }
                            }
                        }
                    }
                    //WavesPlatform Ends
                    //blockio starts	
                    if ($Coin['type'] == 'blockio') {

                        $dj_username = $Coin['dj_yh'];
                        $dj_password = $Coin['dj_mm'];
                        $dj_address = $Coin['dj_zj'];
                        $dj_port = $Coin['dj_dk'];

                        $block_io = BlockIO($dj_username, $dj_password, $dj_address, $dj_port, 5, array(), 1);
                        $json = $block_io->get_balance();

                        if (!isset($json->status) || $json->status != 'success') {
                            //$this->error(L('Wallet link failure! 1'));
                            $wallet = L('Wallet System is currently offline 2!');
                            $show_qr = 0;
                        } else {
                            $show_qr = 1;
                            $wallet_addr = $block_io->get_address_by_label(array('label' => username()))->data->address;

                            if (!is_array($wallet_addr)) {
                                $getNewAddressInfo = $block_io->get_new_address(array('label' => username()));
                                $wallet_ad = $getNewAddressInfo->data->address;


                                if (!$wallet_ad) {
                                    //$this->error('Generate Wallet address error1!');
                                    //$this->error($wallet_addr.'ok');
                                    $wallet = $wallet_addr;
                                } else {
                                    $wallet = $wallet_ad;
                                }
                            } else {
                                $wallet = $wallet_addr[0];
                            }

                            if (!$wallet) {
                                $this->error('Generate Wallet address error2!');
                            }

                            $rs = M('UserCoin')->where(array('userid' => $uid))->save(array($qbdz => $wallet));

                            if (!$rs) {
                                $this->error('Add error address wallet3!');
                            }
                        }
                    }
                    //blockio  Ends

                    //cryptonote starts	
                    if ($Coin['type'] == 'cryptonote') {
                        $dj_username = $Coin['dj_yh'];
                        $dj_password = $Coin['dj_mm'];
                        $dj_address = $Coin['dj_zj'];
                        $dj_port = $Coin['dj_dk'];
                        $cryptonote = CryptoNote($dj_address, $dj_port);
                        $open_wallet = $cryptonote->open_wallet($dj_username, $dj_password);
                        $json = json_decode($cryptonote->get_height());
                        if (!isset($json->height) || $json->error != 0) {
                            $wallet = L('Wallet System is currently offline 2!');
                            $show_qr = 0;
                        } else {
                            $show_qr = 1;
                            $cryptofields = $coin . 'b';
                            $cryptonote_rs1 = M('UserCoin')->where(array('userid' => 39))->field($cryptofields)->find();
                            $wallet_addr = $cryptonote_rs1[$cryptofields];
                            if (!is_array($wallet_addr)) {
                                $getNewAddressInfo = json_decode($cryptonote->create_address(0, username()));
                                $wallet_ad = $getNewAddressInfo->address;


                                if (!$wallet_ad) {
                                    $wallet = $wallet_addr;
                                } else {
                                    $wallet = $wallet_ad;
                                }
                            } else {
                                $wallet = $wallet_addr[0];
                            }

                            if (!$wallet) {
                                $this->error('Generate Wallet address error2!');
                                //$wallet=L('Can not generate '.$coin.' wallet at the moment');
                            }
                            $rs = M('UserCoin')->where(array('userid' => $uid))->save(array($cryptofields => $wallet));

                            if (!$rs) {
                                $this->error('Add error address wallet3!');
                            }
                        }
                    }
                    //CryptoNote Ended
                    //Bitcoin starts
                    if ($Coin['type'] == 'qbb') {
                        $dj_username = $Coin['dj_yh'];
                        $dj_password = $Coin['dj_mm'];
                        $dj_address = $Coin['dj_zj'];
                        $dj_port = $Coin['dj_dk'];
                        $CoinClient = CoinClient($dj_username, $dj_password, $dj_address, $dj_port, 5, array(), 1);
                        $json = $CoinClient->getinfo();

                        if (!isset($json['version']) || !$json['version']) {
                            //$this->error(L('Wallet link failure! 1'));
                            $wallet = L('Wallet System is currently offline !');
                            $show_qr = 0;
                        } else {
                            $show_qr = 1;
                            $wallet_addr = $CoinClient->getaddressesbyaccount(username());

                            if (!is_array($wallet_addr)) {
                                $wallet_ad = $CoinClient->getnewaddress(bot);

                                if (!$wallet_ad) {
                                    $this->error('Generate Wallet address error1!');
                                } else {
                                    $wallet = $wallet_ad;
                                }
                            } else {
                                $wallet = $wallet_addr[0];
                            }

                            if (!$wallet) {
                                $this->error('Generate Wallet address error2!');
                            }

                            $rs = M('UserCoin')->where(array('userid' => $uid))->save(array($qbdz => $wallet));

                            if (!$rs) {
                                $this->error('Add error address wallet3!');
                            }
                        }
                    }
                } else {

                    $wallet = $user_coin[$coin . 'b'];
                }
            }
        } else {

            if (!$Coin['zr_jz']) {
                $wallet = L('The current ban into the currency!');
            } else {

                $wallet = $Coin['extrade_coinaddress'];

                $cellphone = M('User')->where(array('id' => $uid))->getField('cellphone');
                $email = M('User')->where(array('id' => $uid))->getField('email');

                if ($cellphone || $email) {
                    $cellphone = substr_replace($cellphone, '****', 3, 4);
                    $email = substr_replace($email, '****', 3, 4);
                } else {
                    if (M_ONLY == 1) {
                        redirect(U('Home/User/cellphone'), $time = 5, $msg = L('Please Verify your Phone!'));
                    }
                }

                $this->assign('cellphone', $cellphone);
                $this->assign('email', $email);
            }
        }

        if ($wallet) {
            $send_data['status'] = 1;
            $send_data['wallet'] = $wallet;
            $send_data['showqr'] = $show_qr;
        } else {
            $send_data['status'] = 1;
            $add = M('UserCoin')->where(array('userid' => $uid))->getField('usdtb');
            $send_data['wallet'] = $add;
            $send_data['showqr'] = $show_qr;
        }

        header('Content-type: application/json');
        echo (json_encode($send_data));
        exit;
    }

    public function doWithdraw($num, $addr, $userId = null)
    {
        #	$input =  $_POST = json_decode(file_get_contents('php://input'), true);
        #	$coin=$input['coin'];
        #	$num=$input['num'];
        #	$addr=$input['addr'];
        #	$paypassword=$input['paypassword'];
        $uid = $this->userid();
        $num = abs($num);
        $coin = 'usdt';
        if (!check($num, 'currency')) {
            $this->error(L('Number format error!'));
        }

        if (!check($addr, 'dw')) {
            $this->error(L('Wallet address format error!'));
            //    }
            // $user = M('User')->where(array('id' => $uid))->find();
            //if ($user['idcardauth'] == 0 && KYC_OPTIONAL == 1) {
            //  $this->error(L('KYC is required for withdrawal! Login via website to verify.'));
        }

        if (!check($coin, 'n')) {
            $this->error(L('Currency format error!') . $coin);
        }


        $CoinInfo = M('Coin')->where(array('name' => "usdt"))->find();

        if (!$CoinInfo) {
            $this->error(L('Currency wrong 2 !'));
        }

        $myzc_min = ($CoinInfo['zc_min'] ? abs($CoinInfo['zc_min']) : 0.0001);
        $myzc_max = ($CoinInfo['zc_max'] ? abs($CoinInfo['zc_max']) : 10000000);

        if ($num < $myzc_min) {
            $this->error(L('Amount is less than Minimum Withdrawal Amount!'));
        }

        if ($myzc_max < $num) {
            $this->error(L('Amount Exceeds Maximum Withdrawal Limit!'));
        }

        $user_coin = M('UserCoin')->where(array('userid' => $uid))->find();

        if ($user_coin[$coin] < $num) {
            $this->error(L('Insufficient funds available'));
        }

        $qbdz = $coin . 'b';
        $fee_user = M('UserCoin')->where(array($qbdz => $CoinInfo['zc_user']))->find();

        if ($fee_user) {
            debug('Fee Address: ' . $CoinInfo['zc_user'] . ' exist, There are fees');
            $fee = round(($num / 100) * $CoinInfo['zc_fee'], 8);
            $mum = round($num - $fee, 8);

            if ($mum < 0) {
                $this->error(L('Incorrect withdrawal amount!'));
            }

            if ($fee < 0) {
                $this->error(L('Incorrect withdrawal fee!'));
            }
        } else {
            debug('Fee Address: ' . $CoinInfo['zc_user'] . ' does not exist,No fees');
            //$fee = 0;
            //$mum = $num;
            $fee = round(($num / 100) * $CoinInfo['zc_fee'], 8);
            $mum = round($num - $fee, 8);
        }
        //eth Starts
        if ($CoinInfo['type'] == 'eth') {
            $heyue = $CoinInfo['dj_yh']; //Contract Address
            $mo = M();
            //            $peer = M('UserCoin')->where(array($qbdz => $addr))->find();
            $peer = $mo->table('extrade_user_coin')->where(array($qbdz => $addr))->find();

            if ($peer) {

                $mo = M();
                $rs = array();
                $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $uid))->setDec($coin, $num);
                $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $peer['userid']))->setInc($coin, $mum);

                $rs[] = $mo->table('extrade_myzc')->add(array('userid' => $uid, 'username' => $addr, 'coinname' => $coin, 'txid' => md5($addr . $user_coin[$coin . 'b'] . time()), 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'addtime' => time(), 'status' => 1));
                $rs[] = $mo->table('extrade_myzr')->add(array('userid' => $peer['userid'], 'username' => $user_coin[$coin . 'b'], 'coinname' => $coin, 'txid' => md5($user_coin[$coin . 'b'] . $addr . time()), 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'addtime' => time(), 'status' => 1));
                $this->success('You have successfully withdrawn the coins and will automatically transfer them out after the admin review!');
            } else {
                //eth Wallet Withdrawal
                $heyue = $CoinInfo['dj_yh']; //Contract Address
                $dj_password = cryptString($CoinInfo['dj_mm'], 'd');
                $dj_address = $CoinInfo['dj_zj'];
                $dj_port = $CoinInfo['dj_dk'];
                $auto_status = ($CoinInfo['zc_zd'] && ($num < $CoinInfo['zc_zd']) ? 1 : 0);
                $mo = M();
                $rs = array();
                $rs[] = $r = $mo->table('extrade_user_coin')->where(array('userid' => $uid))->setDec($coin, $num);
                $rs[] = $aid = $mo->table('extrade_myzc')->add(array('userid' => $uid, 'username' => $addr, 'coinname' => $coin, 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'addtime' => time(), 'status' => $auto_status));

                if ($auto_status) {
                    $EthCommon = new \Org\Util\EthCommon($dj_address, $dj_port, "2.0");
                    $EthPayLocal = new \Org\Util\EthPayLocal($dj_address, $dj_port, "2.0", $heyue, $dj_password);
                    $ContractAddress = $heyue;
                    $master = EthMaster($dj_address, $dj_port, $CoinInfo['extrade_coinaddress'], $dj_password, $ContractAddress);

                    if ($heyue) {
                        //Contract Address transfer out
                        $zhuan['fromaddress'] = $CoinInfo['extrade_coinaddress'];
                        $zhuan['toaddress'] = $addr;
                        $zhuan['token'] = $heyue;
                        $zhuan['type'] = $coin;
                        $zhuan['amount'] = floatval($mum);
                        $zhuan['password'] = $CoinInfo['password'];
                        $sendrs = $EthPayLocal->eth_ercsendTransaction($zhuan);
                    } else {
                        //eth


                        $zhuan['fromaddress'] = $CoinInfo['extrade_coinaddress'];
                        $zhuan['toaddress'] = $addr;
                        $zhuan['amount'] = floatval($mum);
                        $zhuan['password'] = $CoinInfo['password'];
                        $sendrs = $master->transferFromCoinbase($addr, floatval($mum));

                        //$sendrs = $EthPayLocal->eth_sendTransaction($zhuan);
                    }

                    if ($sendrs && $aid) {
                        $arr = json_decode($sendrs, true);
                        $hash = $arr['result'] ? $arr['result'] : $arr['error']['message'];
                        M('Myzc')->where(array('id' => $aid))->save(array('txid' => $sendrs));
                        if ($hash) M()->execute("UPDATE `extrade_myzc` SET  `hash` =  '$hash' WHERE id = '$aid' ");
                    }
                    $this->success('Withdrawal Successful!' . $mum);
                }
                $this->success('You have successfully withdrawn the coins and will automatically transfer them out after the background review!');
            }
        }
        //eth Ends

        if ($CoinInfo['type'] == 'rgb') {
            debug($Coin, L('Start the transfer of coins'));
            $peer = M('UserCoin')->where(array($qbdz => $addr))->find();
            if (!$peer) {
                $this->error(L('Withdrawal Address of ICO does not exist!'));
            }

            $mo = M();
            $mo->execute('set autocommit=0');
            $mo->execute('nolock tables  extrade_user_coin write  , extrade_myzc write  , extrade_myzr write , extrade_myzc_fee write');
            $rs = array();
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $uid))->setDec($coin, $num);
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $peer['userid']))->setInc($coin, $mum);

            if ($fee) {
                if ($mo->table('extrade_user_coin')->where(array($qbdz => $CoinInfo['zc_user']))->find()) {
                    $rs[] = $mo->table('extrade_user_coin')->where(array($qbdz => $CoinInfo['zc_user']))->setInc($coin, $fee);
                    debug(array('msg' => L('Withdraw to charge a fee') . $fee), 'fee');
                } else {
                    $rs[] = $mo->table('extrade_user_coin')->add(array($qbdz => $CoinInfo['zc_user'], $coin => $fee));
                    debug(array('msg' => L('Withdraw to charge a fee') . $fee), 'fee');
                }
            }

            $rs[] = $mo->table('extrade_myzc')->add(array('userid' => $uid, 'username' => $addr, 'coinname' => $coin, 'txid' => md5($addr . $user_coin[$coin . 'b'] . time()), 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'addtime' => time(), 'status' => 1));
            $rs[] = $mo->table('extrade_myzr')->add(array('userid' => $peer['userid'], 'username' => $user_coin[$coin . 'b'], 'coinname' => $coin, 'txid' => md5($user_coin[$coin . 'b'] . $addr . time()), 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'addtime' => time(), 'status' => 1));

            if ($fee_user) {
                $rs[] = $mo->table('extrade_myzc_fee')->add(array('userid' => $fee_user['userid'], 'username' => $CoinInfo['zc_user'], 'coinname' => $coin, 'txid' => md5($user_coin[$coin . 'b'] . $CoinInfo['zc_user'] . time()), 'num' => $num, 'fee' => $fee, 'type' => 1, 'mum' => $mum, 'addtime' => time(), 'status' => 1));
            }

            if (check_arr($rs)) {
                $mo->execute('commit');
                $mo->execute('unlock tables');
                session('myzc_verify', null);
                $this->success(L('Transfer success!'));
            } else {
                $mo->execute('rollback');
                $this->error('Transfer Failed!');
            }
        }
        //Coinpayments starts
        if ($CoinInfo['type'] == 'coinpay') {
            $mo = M();
            $coinpay_condition[$qbdz] =    $addr;
            if ($dest_tag != NULL && $dest_tag != 0) {
                $coinpay_condition[$coin . '_tag'] =    $dest_tag;
            }
            if ($mo->table('extrade_user_coin')->where($coinpay_condition)->find()) {
                $peer = M('UserCoin')->where($coinpay_condition)->find();

                if (!$peer) {
                    $this->error(L('Withdraw address does not exist!'));
                }

                $mo = M();
                $mo->execute('set autocommit=0');
                $mo->execute('nolock tables  extrade_user_coin write  , extrade_myzc write  , extrade_myzr write , extrade_myzc_fee write');
                $rs = array();
                $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $uid))->setDec($coin, $num);
                $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $peer['userid']))->setInc($coin, $mum);



                $rs[] = $mo->table('extrade_myzc')->add(array('userid' => $uid, 'username' => $addr, 'dest_tag' => $dest_tag, 'coinname' => $coin, 'txid' => md5($addr . $user_coin[$coin . 'b'] . time()), 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'addtime' => time(), 'status' => 1));
                $rs[] = $mo->table('extrade_myzr')->add(array('userid' => $peer['userid'], 'username' => $user_coin[$coin . 'b'], 'coinname' => $coin, 'txid' => md5($user_coin[$coin . 'b'] . $addr . time()), 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'addtime' => time(), 'status' => 1));

                if (check_arr($rs)) {
                    $mo->execute('commit');
                    $mo->execute('unlock tables');
                    session('myzc_verify', null);
                    $this->success(L('Transfer success!'));
                } else {
                    $mo->execute('rollback');
                    $this->error('Transfer Failed!');
                }
            } else {

                $dj_username = $CoinInfo['dj_yh'];
                $dj_password = $CoinInfo['dj_mm'];
                $dj_address = $CoinInfo['dj_zj'];
                $dj_port = $CoinInfo['dj_dk'];


                $auto_status = ($CoinInfo['zc_zd'] && ($num < $CoinInfo['zc_zd']) ? 1 : 0);
                $cps_api = CoinPay($dj_username, $dj_password, $dj_address, $dj_port, 5, array(), 1);
                $information = $cps_api->GetBasicInfo();
                $coinpay_coin = strtoupper('usdt.trc20');

                $can_withdraw = 1;

                if ($information['error'] != 'ok' || !isset($information['result']['username'])) {
                    //         $this->error(L('Wallet link failure! Coinpayments'));
                    debug($coin . ' can not be connetcted at time:' . time() . '<br/>');
                    $can_withdraw = 0;
                }

                //TODO :Find a valid way to validate coin address
                if (strlen($addr) > 8) {
                    $valid_res = 1;
                } else {
                    $valid_res = 0;
                }

                if (!$valid_res) {
                    $this->error($addr . L(' It is not a valid address wallet!'));
                }

                $balances = $cps_api->GetAllCoinBalances();


                if ($balances['result'][$coinpay_coin]['balancef'] < $num) {
                    //$this->error(L('Can not be withdrawn due to system'));
                    debug($coin . ' Balance is lower than  ' . $num . ' at time:' . time() . '<br/>');
                    $can_withdraw = 0;
                }

                $mo = M();
                $mo->execute('set autocommit=0');
                $mo->execute('nolock tables  extrade_user_coin write  , extrade_myzc write ,extrade_myzr write, extrade_myzc_fee write');
                $rs = array();
                //Reduce Withdrawers balance
                $rs[] = $r = $mo->table('extrade_user_coin')->where(array('userid' => $uid))->setDec($coin, $num);
                //Add entry of withdraw [zc] in database 
                $rs[] = $aid = $mo->table('extrade_myzc')->add(array('userid' => $uid, 'username' => $addr, 'dest_tag' => $dest_tag, 'coinname' => $coin, 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'addtime' => time(), 'status' => $auto_status));

                if ($fee && $auto_status) {

                    $rs[] = $mo->table('extrade_myzc_fee')->add(array('userid' => $fee_user['userid'], 'username' => $CoinInfo['zc_user'], 'coinname' => $coin, 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'type' => 2, 'addtime' => time(), 'status' => 1));

                    if ($mo->table('extrade_user_coin')->where(array($qbdz => $CoinInfo['zc_user']))->find()) {
                        $rs[] = $r = $mo->table('extrade_user_coin')->where(array($qbdz => $CoinInfo['zc_user']))->setInc($coin, $fee);
                        debug(array('res' => $r, 'lastsql' => $mo->table('extrade_user_coin')->getLastSql()), L('Additional costs'));
                    } else {
                        $rs[] = $r = $mo->table('extrade_user_coin')->add(array($qbdz => $CoinInfo['zc_user'], $coin => $fee));
                    }
                }

                if (check_arr($rs)) {
                    if ($auto_status && $can_withdraw == 1) {
                        $mo->execute('commit');
                        $mo->execute('unlock tables');
                        $buyer_email = M('User')->where(array('id' => $uid))->getField('email');
                        $withdrawals = [
                            'amount' => $mum,
                            'add_tx_fee' => 0,
                            'auto_confirm' => 1, //Auto confirm 1 or 0
                            'currency' => $coinpay_coin,
                            'address' => $addr,
                            //'dest_tag'=>$dest_tag,
                            'ipn_url' => SITE_URL . '/IPN/confirm',
                            'note' => $buyer_email
                        ];
                        if ($dest_tag != 0 && $dest_tag != NULL) {
                            $withdrawals['dest_tag'] = $dest_tag;
                        }

                        $the_withdrawal = $cps_api->CreateWithdrawal($withdrawals);


                        if ($the_withdrawal["error"] != "ok") {
                            $the_status = false;
                            $this->error('Ooops!,' . $the_withdrawal["error"]);
                        } else {
                            $the_status = true;
                            $cp_withdrawal_id = $the_withdrawal["result"]["id"];
                            M('Myzc')->where(array('id' => $aid))->save(array('hash' => $cp_withdrawal_id));
                            //$this->success('Successful Withdrawal!');
                        }
                    }

                    if ($auto_status && $the_status && $can_withdraw == 1) {
                        $mo->execute('commit');
                        $mo->execute('unlock tables');
                        session('myzc_verify', null);
                        $this->success('Successful Withdrawal!');
                    } else {
                        $mo->execute('commit');
                        $mo->execute('unlock tables');
                        session('myzc_verify', null);
                        $this->success('Successful Withdrawal!');
                    }
                } else {
                    $mo->execute('rollback');
                    $this->error('Withdrawal failure!');
                }
            }
        }
        //Coinpayments ends
        //WavesPlatform Starts
        if ($CoinInfo['type'] == 'waves') {

            $mo = M();

            if ($mo->table('extrade_user_coin')->where(array($qbdz => $addr))->find()) {
                $peer = M('UserCoin')->where(array($qbdz => $addr))->find();

                if (!$peer) {
                    $this->error(L('Withdraw address does not exist!'));
                }

                $mo = M();
                $mo->execute('set autocommit=0');
                $mo->execute('nolock tables  extrade_user_coin write  , extrade_myzc write  , extrade_myzr write , extrade_myzc_fee write');
                $rs = array();
                $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $uid))->setDec($coin, $num);
                $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $peer['userid']))->setInc($coin, $mum);

                if ($fee) {
                    if ($mo->table('extrade_user_coin')->where(array($qbdz => $CoinInfo['zc_user']))->find()) {
                        $rs[] = $mo->table('extrade_user_coin')->where(array($qbdz => $CoinInfo['zc_user']))->setInc($coin, $fee);
                    } else {
                        $rs[] = $mo->table('extrade_user_coin')->add(array($qbdz => $CoinInfo['zc_user'], $coin => $fee));
                    }
                }

                $rs[] = $mo->table('extrade_myzc')->add(array('userid' => $uid, 'username' => $addr, 'coinname' => $coin, 'txid' => md5($addr . $user_coin[$coin . 'b'] . time()), 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'addtime' => time(), 'status' => 1));
                $rs[] = $mo->table('extrade_myzr')->add(array('userid' => $peer['userid'], 'username' => $user_coin[$coin . 'b'], 'coinname' => $coin, 'txid' => md5($user_coin[$coin . 'b'] . $addr . time()), 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'addtime' => time(), 'status' => 1));

                if ($fee_user) {
                    $rs[] = $mo->table('extrade_myzc_fee')->add(array('userid' => $fee_user['userid'], 'username' => $CoinInfo['zc_user'], 'coinname' => $coin, 'txid' => md5($user_coin[$coin . 'b'] . $CoinInfo['zc_user'] . time()), 'num' => $num, 'fee' => $fee, 'type' => 1, 'mum' => $mum, 'addtime' => time(), 'status' => 1));
                }

                if (check_arr($rs)) {
                    $mo->execute('commit');
                    $mo->execute('unlock tables');
                    session('myzc_verify', null);
                    $this->success(L('Transfer success!'));
                } else {
                    $mo->execute('rollback');
                    $this->error('Transfer Failed!');
                }
            } else {

                $dj_username = $CoinInfo['dj_yh'];
                $dj_password = $CoinInfo['dj_mm'];
                $dj_address = $CoinInfo['dj_zj'];
                $dj_port = $CoinInfo['dj_dk'];
                $dj_decimal = $CoinInfo['cs_qk'];
                $main_address = $CoinInfo['extrade_coinaddress'];
                $auto_status = ($CoinInfo['zc_zd'] && ($num < $CoinInfo['zc_zd']) ? 1 : 0);
                $can_withdraw = 1;
                $waves = WavesClient($dj_username, $dj_password, $dj_address, $dj_port, $dj_decimal, 5, array(), 1);
                $waves_coin = strtoupper($coin);
                $information = json_decode($waves->status(), true);
                if ($information['blockchainHeight'] && $information['blockchainHeight'] <= 0) {
                    clog('waves_error', $coin . ' can not be connectted at time:' . time() . '<br/>');
                    $can_withdraw = 0;
                }

                //TODO :Find a valid way to validate coin address
                if (strlen($addr) > 30) {
                    $valid_res = 1;
                } else {
                    $valid_res = 0;
                }

                if (!$valid_res) {
                    $this->error($addr . L(' It is not a valid address wallet!'));
                }

                $balances = json_decode($waves->Balance($main_address, $dj_username), true);
                $dj_decimal = $dj_decimal ? $dj_decimal : 8;
                $wave_main_balance = $waves->deAmount($balances['balance'], $dj_decimal);
                if ($wave_main_balance < $num) {

                    clog('waves_error', $coin . ' main_address ' . $main_address . ' Balance is ' . $wave_main_balance . ' is' . $dj_decimal . ' lower than  ' . $num . ' at time:' . time() . ' ' . $dj_username . '<br/>');
                    $can_withdraw = 0;
                }

                $mo = M();
                $mo->execute('set autocommit=0');
                $mo->execute('nolock tables  extrade_user_coin write  , extrade_myzc write ,extrade_myzr write, extrade_myzc_fee write');
                $rs = array();
                //Reduce Withdrawers balance
                $rs[] = $r = $mo->table('extrade_user_coin')->where(array('userid' => $uid))->setDec($coin, $num);
                //Add entry of withdraw [zc] in database 
                $rs[] = $aid = $mo->table('extrade_myzc')->add(array('userid' => $uid, 'username' => $addr, 'coinname' => $coin, 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'addtime' => time(), 'status' => $auto_status));

                if ($fee && $auto_status) {

                    $rs[] = $mo->table('extrade_myzc_fee')->add(array('userid' => $fee_user['userid'], 'username' => $CoinInfo['zc_user'], 'coinname' => $coin, 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'type' => 2, 'addtime' => time(), 'status' => 1));

                    if ($mo->table('extrade_user_coin')->where(array($qbdz => $CoinInfo['zc_user']))->find()) {
                        $rs[] = $r = $mo->table('extrade_user_coin')->where(array($qbdz => $CoinInfo['zc_user']))->setInc($coin, $fee);
                        // debug(array('res' => $r, 'lastsql' => $mo->table('extrade_user_coin')->getLastSql()), L('Additional costs'));

                    } else {
                        $rs[] = $r = $mo->table('extrade_user_coin')->add(array($qbdz => $CoinInfo['zc_user'], $coin => $fee));
                    }
                }

                if (check_arr($rs)) {
                    if ($auto_status && $can_withdraw == 1) {
                        $mo->execute('commit');
                        $mo->execute('unlock tables');
                        $buyer_email = M('User')->where(array('id' => $uid))->getField('email');

                        $wavesend_response = $waves->Send($main_address, $addr, $mum, $dj_username);
                        $the_withdrawal = json_decode($wavesend_response, true);
                        if ($the_withdrawal["error"]) {
                            $the_status = false;
                            clog('waves_error', json_encode($the_withdrawal));
                            $this->error('Ooops!,' . $the_withdrawal["message"]);
                        } else {
                            $the_status = true;
                            M('Myzc')->where(array('id' => $aid))->save(array('txid' => $the_withdrawal['id'], 'hash' => $the_withdrawal['signature']));
                            //$this->success('Successful Withdrawal!');
                        }
                    }

                    if ($auto_status && $the_status && $can_withdraw == 1) {
                        $mo->execute('commit');
                        $mo->execute('unlock tables');
                        session('myzc_verify', null);
                        $this->success('Successful Withdrawal!');
                    } else {
                        $mo->execute('commit');
                        $mo->execute('unlock tables');
                        session('myzc_verify', null);
                        $this->success('Successful Withdrawal!' . $the_withdrawal["error"]);
                    }
                } else {
                    $mo->execute('rollback');
                    $this->error('Withdrawal failure!');
                }
            }
        }
        //WavesPlatform Ends

        //BLOCKIO starts
        if ($CoinInfo['type'] == 'blockio') {
            $mo = M();

            if ($mo->table('extrade_user_coin')->where(array($qbdz => $addr))->find()) {
                $peer = M('UserCoin')->where(array($qbdz => $addr))->find();

                if (!$peer) {
                    $this->error(L('Withdraw address does not exist!'));
                }

                $mo = M();
                $mo->execute('set autocommit=0');
                $mo->execute('nolock tables  extrade_user_coin write  , extrade_myzc write  , extrade_myzr write , extrade_myzc_fee write');
                $rs = array();
                $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $uid))->setDec($coin, $num);
                $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $peer['userid']))->setInc($coin, $mum);

                if ($fee) {
                    if ($mo->table('extrade_user_coin')->where(array($qbdz => $CoinInfo['zc_user']))->find()) {
                        $rs[] = $mo->table('extrade_user_coin')->where(array($qbdz => $CoinInfo['zc_user']))->setInc($coin, $fee);
                    } else {
                        $rs[] = $mo->table('extrade_user_coin')->add(array($qbdz => $CoinInfo['zc_user'], $coin => $fee));
                    }
                }

                $rs[] = $mo->table('extrade_myzc')->add(array('userid' => $uid, 'username' => $addr, 'coinname' => $coin, 'txid' => md5($addr . $user_coin[$coin . 'b'] . time()), 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'addtime' => time(), 'status' => 1));
                $rs[] = $mo->table('extrade_myzr')->add(array('userid' => $peer['userid'], 'username' => $user_coin[$coin . 'b'], 'coinname' => $coin, 'txid' => md5($user_coin[$coin . 'b'] . $addr . time()), 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'addtime' => time(), 'status' => 1));

                if ($fee_user) {
                    $rs[] = $mo->table('extrade_myzc_fee')->add(array('userid' => $fee_user['userid'], 'username' => $CoinInfo['zc_user'], 'coinname' => $coin, 'txid' => md5($user_coin[$coin . 'b'] . $CoinInfo['zc_user'] . time()), 'num' => $num, 'fee' => $fee, 'type' => 1, 'mum' => $mum, 'addtime' => time(), 'status' => 1));
                }

                if (check_arr($rs)) {
                    $mo->execute('commit');
                    $mo->execute('unlock tables');
                    session('myzc_verify', null);
                    $this->success(L('Transfer success!'));
                } else {
                    $mo->execute('rollback');
                    $this->error('Transfer Failed!');
                }
            } else {

                $dj_username = $CoinInfo['dj_yh'];
                $dj_password = $CoinInfo['dj_mm'];
                $dj_address = $CoinInfo['dj_zj'];
                $dj_port = $CoinInfo['dj_dk'];

                $auto_status = ($CoinInfo['zc_zd'] && ($num < $CoinInfo['zc_zd']) ? 1 : 0);
                $block_io = BlockIO($dj_username, $dj_password, $dj_address, $dj_port, 5, array(), 1);
                $json = $block_io->get_balance();
                $can_withdraw = 1;
                if (!isset($json->status) || $json->status != 'success') {
                    //$this->error(L('Wallet link failure! blockio'));
                    debug('Blockio Could not be connected at ' . time() . '<br/>');
                    $can_withdraw = 0;
                }

                $valid_res = $block_io->validateaddress($addr);

                if (!$valid_res) {
                    $this->error($addr . ' :' . L('Not valid address!'));
                }


                if ($json->data->available_balance < $num) {
                    //$this->error(L('Wallet balance of less than'));
                    debug('Blockio Balance is lower than  ' . $num . ' at time:' . time() . '<br/>');
                    $can_withdraw = 0;
                }

                $mo = M();
                $mo->execute('set autocommit=0');
                $mo->execute('nolock tables  extrade_user_coin write  , extrade_myzc write ,extrade_myzr write, extrade_myzc_fee write');
                $rs = array();
                //Reduce Withdrawers balance
                $rs[] = $r = $mo->table('extrade_user_coin')->where(array('userid' => $uid))->setDec($coin, $num);
                //Add entry of withdraw [zc] in database 
                $rs[] = $aid = $mo->table('extrade_myzc')->add(array('userid' => $uid, 'username' => $addr, 'coinname' => $coin, 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'addtime' => time(), 'status' => $auto_status));

                if ($fee && $auto_status) {

                    $rs[] = $mo->table('extrade_myzc_fee')->add(array('userid' => $fee_user['userid'], 'username' => $CoinInfo['zc_user'], 'coinname' => $coin, 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'type' => 2, 'addtime' => time(), 'status' => 1));

                    if ($mo->table('extrade_user_coin')->where(array($qbdz => $CoinInfo['zc_user']))->find()) {
                        $rs[] = $r = $mo->table('extrade_user_coin')->where(array($qbdz => $CoinInfo['zc_user']))->setInc($coin, $fee);
                        debug(array('res' => $r, 'lastsql' => $mo->table('extrade_user_coin')->getLastSql()), L('Additional costs'));
                    } else {
                        $rs[] = $r = $mo->table('extrade_user_coin')->add(array($qbdz => $CoinInfo['zc_user'], $coin => $fee));
                    }
                }

                if (check_arr($rs)) {
                    if ($auto_status && $can_withdraw == 1) {
                        $mo->execute('commit');
                        $mo->execute('unlock tables');

                        $sendrs = $block_io->withdraw(array('amounts' => $mum, 'to_addresses' => $addr));
                        $flag = 0;
                        if ($sendrs) {
                            if (isset($sendrs->status) && ($sendrs->status == 'success')) {
                                $flag = 1;
                            }
                        } else {
                            $flag = 0;
                        }
                        if (!$flag) {
                            $this->error('wallet server  Withdraw currency failure,Manually turn out');
                        } else {
                            $this->success('Successful Withdrawal!');
                        }
                    }

                    if ($auto_status && $can_withdraw == 1) {
                        $mo->execute('commit');
                        $mo->execute('unlock tables');
                        session('myzc_verify', null);
                        $this->success('Successful Withdrawal!');
                    } else {
                        $mo->execute('commit');
                        $mo->execute('unlock tables');
                        session('myzc_verify', null);
                        $this->success('Application is successful Withdrawal,Please wait for the review!');
                    }
                } else {
                    $mo->execute('rollback');
                    $this->error('Withdrawal failure!');
                }
            }
        }
        //BlockIO ends
        //cryptonote starts
        if ($CoinInfo['type'] == 'cryptonote') {
            $mo = M();

            if ($mo->table('extrade_user_coin')->where(array($qbdz => $addr))->find()) {
                $peer = M('UserCoin')->where(array($qbdz => $addr))->find();

                if (!$peer) {
                    $this->error(L('Withdraw address does not exist!'));
                }
                $mo = M();
                $mo->execute('set autocommit=0');
                $mo->execute('nolock tables  extrade_user_coin write  , extrade_myzc write  , extrade_myzr write , extrade_myzc_fee write');
                $rs = array();
                $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $uid))->setDec($coin, $num);
                $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $peer['userid']))->setInc($coin, $mum);

                if ($fee) {
                    if ($mo->table('extrade_user_coin')->where(array($qbdz => $CoinInfo['zc_user']))->find()) {
                        $rs[] = $mo->table('extrade_user_coin')->where(array($qbdz => $CoinInfo['zc_user']))->setInc($coin, $fee);
                    } else {
                        $rs[] = $mo->table('extrade_user_coin')->add(array($qbdz => $CoinInfo['zc_user'], $coin => $fee));
                    }
                }

                $rs[] = $mo->table('extrade_myzc')->add(array('userid' => $uid, 'username' => $addr, 'coinname' => $coin, 'txid' => md5($addr . $user_coin[$coin . 'b'] . time()), 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'addtime' => time(), 'status' => 1));
                $rs[] = $mo->table('extrade_myzr')->add(array('userid' => $peer['userid'], 'username' => $user_coin[$coin . 'b'], 'coinname' => $coin, 'txid' => md5($user_coin[$coin . 'b'] . $addr . time()), 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'addtime' => time(), 'status' => 1));

                if ($fee_user) {
                    $rs[] = $mo->table('extrade_myzc_fee')->add(array('userid' => $fee_user['userid'], 'username' => $CoinInfo['zc_user'], 'coinname' => $coin, 'txid' => md5($user_coin[$coin . 'b'] . $CoinInfo['zc_user'] . time()), 'num' => $num, 'fee' => $fee, 'type' => 1, 'mum' => $mum, 'addtime' => time(), 'status' => 1));
                }

                if (check_arr($rs)) {
                    $mo->execute('commit');
                    $mo->execute('unlock tables');
                    session('myzc_verify', null);
                    $this->success(L('Transfer success!'));
                } else {
                    $mo->execute('rollback');
                    $this->error('Transfer Failed!');
                }
            } else {

                $dj_username = $CoinInfo['dj_yh'];
                $dj_password = $CoinInfo['dj_mm'];
                $dj_address = $CoinInfo['dj_zj'];
                $dj_port = $CoinInfo['dj_dk'];

                $auto_status = ($CoinInfo['zc_zd'] && ($num < $CoinInfo['zc_zd']) ? 1 : 0);
                $cryptonote = CryptoNote($dj_address, $dj_port);
                $open_wallet = $cryptonote->open_wallet($dj_username, $dj_password);

                $json = json_decode($cryptonote->get_height());
                $can_withdraw = 1;
                if (!isset($json->height) || $json->error != 0) {
                    debug('CryptoNote ' . $coin . ' Could not be connected at ' . time() . '<br/>');
                    $can_withdraw = 0;
                }

                $bal_info = json_decode($cryptonote->getBalance());
                $crypto_balance = $cryptonote->deAmount($bal_info->unlocked_balance);

                if ($crypto_balance < $num) {
                    debug('CryptoNote ' . $coin . ' Balance is lower than  ' . $num . ' at time:' . time() . '<br/>');
                    $can_withdraw = 0;
                }

                $mo = M();
                $mo->execute('set autocommit=0');
                $mo->execute('nolock tables  extrade_user_coin write  , extrade_myzc write ,extrade_myzr write, extrade_myzc_fee write');
                $rs = array();
                //Reduce Withdrawers balance
                $rs[] = $r = $mo->table('extrade_user_coin')->where(array('userid' => $uid))->setDec($coin, $num);
                //Add entry of withdraw [zc] in database 
                $rs[] = $aid = $mo->table('extrade_myzc')->add(array('userid' => $uid, 'username' => $addr, 'coinname' => $coin, 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'addtime' => time(), 'status' => $auto_status));

                if ($fee && $auto_status) {

                    $rs[] = $mo->table('extrade_myzc_fee')->add(array('userid' => $fee_user['userid'], 'username' => $CoinInfo['zc_user'], 'coinname' => $coin, 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'type' => 2, 'addtime' => time(), 'status' => 1));

                    if ($mo->table('extrade_user_coin')->where(array($qbdz => $CoinInfo['zc_user']))->find()) {
                        $rs[] = $r = $mo->table('extrade_user_coin')->where(array($qbdz => $CoinInfo['zc_user']))->setInc($coin, $fee);
                        debug(array('res' => $r, 'lastsql' => $mo->table('extrade_user_coin')->getLastSql()), L('Additional costs'));
                    } else {
                        $rs[] = $r = $mo->table('extrade_user_coin')->add(array($qbdz => $CoinInfo['zc_user'], $coin => $fee));
                    }
                }

                if (check_arr($rs)) {
                    if ($auto_status && $can_withdraw == 1) {
                        $mo->execute('commit');
                        $mo->execute('unlock tables');


                        //$sendrs = json_decode($cryptonote->transfer($send_amt, $myzc['username']));     
                        $sendrs = json_decode($cryptonote->transfer($num, $addr));

                        $flag = 0;
                        clog($coin . '_cryptno_error', json_encode($sendrs));
                        if ($sendrs->error == 0) {
                            if (isset($sendrs->tx_hash) && isset($sendrs->tx_key)) {
                                $flag = 1;
                            }
                        } else {
                            $flag = 0;
                        }
                        if (!$flag) {
                            $this->error('Ooops!');
                        } else {
                            $this->success('Successful Withdrawal!');
                        }
                    }

                    if ($auto_status && $can_withdraw == 1) {
                        $mo->execute('commit');
                        $mo->execute('unlock tables');
                        session('myzc_verify', null);
                        $this->success('Successful Withdrawal!');
                    } else {
                        $mo->execute('commit');
                        $mo->execute('unlock tables');
                        session('myzc_verify', null);
                        $this->success('Application is successful Withdrawal,Please wait for the review!');
                    }
                } else {
                    $mo->execute('rollback');
                    $this->error('Withdrawal failure!');
                }
            }
        }
        //CryptoNote Ends
        //Bitcoin Type Starts
        if ($CoinInfo['type'] == 'qbb') {
            $mo = M();

            if ($mo->table('extrade_user_coin')->where(array($qbdz => $addr))->find()) {
                $peer = M('UserCoin')->where(array($qbdz => $addr))->find();

                if (!$peer) {
                    $this->error(L('Withdraw address does not exist!'));
                }

                $mo = M();
                $mo->execute('set autocommit=0');
                $mo->execute('nolock tables  extrade_user_coin write  , extrade_myzc write  , extrade_myzr write , extrade_myzc_fee write');
                $rs = array();
                $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $uid))->setDec($coin, $num);
                $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $peer['userid']))->setInc($coin, $mum);

                if ($fee) {
                    if ($mo->table('extrade_user_coin')->where(array($qbdz => $CoinInfo['zc_user']))->find()) {
                        $rs[] = $mo->table('extrade_user_coin')->where(array($qbdz => $CoinInfo['zc_user']))->setInc($coin, $fee);
                    } else {
                        $rs[] = $mo->table('extrade_user_coin')->add(array($qbdz => $CoinInfo['zc_user'], $coin => $fee));
                    }
                }

                $rs[] = $mo->table('extrade_myzc')->add(array('userid' => $uid, 'username' => $addr, 'coinname' => $coin, 'txid' => md5($addr . $user_coin[$coin . 'b'] . time()), 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'addtime' => time(), 'status' => 1));
                $rs[] = $mo->table('extrade_myzr')->add(array('userid' => $peer['userid'], 'username' => $user_coin[$coin . 'b'], 'coinname' => $coin, 'txid' => md5($user_coin[$coin . 'b'] . $addr . time()), 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'addtime' => time(), 'status' => 1));

                if ($fee_user) {
                    $rs[] = $mo->table('extrade_myzc_fee')->add(array('userid' => $fee_user['userid'], 'username' => $CoinInfo['zc_user'], 'coinname' => $coin, 'txid' => md5($user_coin[$coin . 'b'] . $CoinInfo['zc_user'] . time()), 'num' => $num, 'fee' => $fee, 'type' => 1, 'mum' => $mum, 'addtime' => time(), 'status' => 1));
                }

                if (check_arr($rs)) {
                    $mo->execute('commit');
                    $mo->execute('unlock tables');
                    session('myzc_verify', null);
                    $this->success(L('Transfer success!'));
                } else {
                    $mo->execute('rollback');
                    $this->error('Transfer Failed!');
                }
            } else {

                $dj_username = $CoinInfo['dj_yh'];
                $dj_password = $CoinInfo['dj_mm'];
                $dj_address = $CoinInfo['dj_zj'];
                $dj_port = $CoinInfo['dj_dk'];
                $dj_decimal = 8;
                $CoinClient = CoinClient($dj_username, $dj_password, $dj_address, $dj_port, 5, array(), 1);
                $can_withdraw = 1;

                $auto_status = ($CoinInfo['zc_zd'] && ($num < $CoinInfo['zc_zd']) ? 1 : 0);

                $json = $CoinClient->getinfo();

                if (!isset($json['version']) || !$json['version']) {

                    debug($coin . ' Could not be connected at ' . time() . '<br/>');
                    $can_withdraw = 0;
                }

                $valid_res = $CoinClient->validateaddress($addr);

                if (!$valid_res['isvalid']) {
                    $this->error($addr . L('It is not a valid address wallet!'));
                }
                $daemon_balance = $CoinClient->getbalance();

                if ($daemon_balance < $num) {
                    //$this->error(L('Wallet balance of less than'));
                    debug($coin . ' :Low wallet balance: ' . time() . '<br/>');
                    $can_withdraw = 0;
                }

                $mo = M();
                $mo->execute('set autocommit=0');
                $mo->execute('nolock tables extrade_user_coin write, extrade_myzc write,extrade_myzr write, extrade_myzc_fee write');
                $rs = array();
                //Reduce Withdrawers balance
                $rs[] = $r = $mo->table('extrade_user_coin')->where(array('userid' => $uid))->setDec($coin, $num);
                //Add entry of withdraw [zc] in database 
                $rs[] = $aid = $mo->table('extrade_myzc')->add(array('userid' => $uid, 'username' => $addr, 'coinname' => $coin, 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'addtime' => time(), 'status' => $auto_status));

                if ($fee && $auto_status) {

                    $rs[] = $mo->table('extrade_myzc_fee')->add(array('userid' => $fee_user['userid'], 'username' => $CoinInfo['zc_user'], 'coinname' => $coin, 'num' => $num, 'fee' => $fee, 'mum' => $mum, 'type' => 2, 'addtime' => time(), 'status' => 1));

                    if ($mo->table('extrade_user_coin')->where(array($qbdz => $CoinInfo['zc_user']))->find()) {
                        $rs[] = $r = $mo->table('extrade_user_coin')->where(array($qbdz => $CoinInfo['zc_user']))->setInc($coin, $fee);
                        debug(array('res' => $r, 'lastsql' => $mo->table('extrade_user_coin')->getLastSql()), L(' Received fees amount'));
                    } else {
                        $rs[] = $r = $mo->table('extrade_user_coin')->add(array($qbdz => $CoinInfo['zc_user'], $coin => $fee));
                    }
                }

                if (check_arr($rs)) {

                    if ($auto_status && $can_withdraw == 1) {
                        $mo->execute('commit');
                        $mo->execute('unlock tables');
                        if (strpos($dj_address, 'new') !== false) {
                            $send_amt = bcadd($mum, 0, 5);
                        } else {
                            $send_amt = (float)bcadd($mum, 0, 5);
                        }

                        $sendrs = $CoinClient->sendtoaddress($addr, $send_amt);

                        if ($sendrs) {
                            $flag = 1;
                            $arr = json_decode($sendrs, true);

                            if (isset($arr['status']) && ($arr['status'] == 0)) {
                                $flag = 0;
                            }
                        } else {
                            $flag = 0;
                        }

                        if (!$flag) {
                            //$this->error('Wallet Server  Withdraw failure:'.$sendrs);
                            $mo->execute('rollback');
                            $this->error('Wallet Server  Withdraw failure:' . ($sendrs));
                        } else {
                            M('Myzc')->where(array('id' => $aid))->save(array('txid' => $sendrs));
                            $this->success('Successful Withdrawal!');
                        }
                    }

                    if ($auto_status && $can_withdraw == 1) {
                        $mo->execute('commit');
                        $mo->execute('unlock tables');
                        session('myzc_verify', null);

                        $this->success('Successful Withdrawal!');
                    } else {
                        $mo->execute('commit');
                        $mo->execute('unlock tables');
                        session('myzc_verify', null);
                        $this->success('Withdrawal application is successful,Please wait for the review!');
                    }
                } else {
                    $mo->execute('rollback');
                    $this->error('Withdrawal failure!');
                }
            }
        }
        //Bitcoin Type Ends
    }

    public function invit($userId = null)
    {
        $uid = $this->userid();


        check_server();
        $user = M('User')->where(array('id' => $uid))->find();

        if (!$user['invit']) {
            for (; true;) {
                $tradeno = tradenoa();

                if (!M('User')->where(array('invit' => $tradeno))->find()) {
                    break;
                }
            }

            M('User')->where(array('id' => $uid))->save(array('invit' => $tradeno));
            $user = M('User')->where(array('id' => $uid))->find();
        }
        $data['username'] = $user['username'];
        $data['invite'] = $user['invit'];
        $data['inviteurl'] = SITEE_URL . 'login?inviteCode=' . $user['invit'];
        $this->ajaxShow($data);
        //$this->assign('user', $user);
        //$this->display();
    }

    public function Leaderboard($userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $active = M('User')->order('total_profit desc')->select();


        foreach ($active as $key => $val) {
            $activee[$key]['id'] = $val['id'];
            $activee[$key]['username'] = $val['username'];
            $activee[$key]['image'] = $val['idcard'];
            $activee[$key]['Total Earning'] = $val['total_profit'];
            $activee[$key]['Total Reward'] = $val['reward_total'];
        }
        $activee = M('User')->order('circle_income desc')->select();


        foreach ($activee as $key => $val) {
            $activeee[$key]['id'] = $val['id'];
            $activeee[$key]['username'] = $val['username'];
            $activeee[$key]['image'] = $val['idcardimg1'];
            $activeee[$key]['Total Income'] = $val['circle_income'];
        }
        $ret['Personal Income List'] = $activee;
        $ret['Circle Owner income list'] = $activeee;
        $this->ajaxShow($ret);
    }

    public function Transfer($amount, $userId = null)
    {

        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $coin = "usdt";
        $coind = "usdtd";
        $user_coin = M('UserCoin')->where(array('userid' => $uid))->find();

        if ($user_coin[$coin] < $amount) {
            $this->error(L('Insufficient funds available'));
        }


        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables  extrade_user_coin write  , extrade_myzc write ,extrade_myzr write');
        $rs = array();
        //Reduce Withdrawers balance
        $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $uid))->setDec($coin, $amount);
        $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $uid))->setInc($coind, $amount);
        //Add entry of withdraw [zc] in database 
        $rs[] = $mo->table('extrade_myzc')->add(array('userid' => $uid, 'username' => 'RP Transfer', 'coinname' => $coin, 'num' => $amount, 'mum' => $amount, 'addtime' => time(), 'status' => 1));
        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success('Successful Transferred');
        } else {
            $mo->execute('rollback');
            $this->error(L('TRANSFER_FAILED'));
        }
    }

    public function TransfertoUser($amount, $email, $userId = null)
    {

        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $coin = "usdt";
        $coind = "usdtd";
        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables  extrade_user_coin write  , extrade_user write  ,extrade_myzc write , extrade_myzr write');
        $rs = array();
        $receiver = M('User')->where(array('email' => $email))->getField("id");
        $sender = M('User')->where(array('id' => $uid))->getField("email");
        $user_coin = M('UserCoin')->where(array('userid' => $uid))->find();
        if ($user_coin[$coin] < $amount) {
            $this->error(L('Insufficient funds available'));
        }



        //Reduce Withdrawers balance
        $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $uid))->setDec($coin, $amount);
        $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $receiver))->setInc($coin, $amount);
        //Add entry of withdraw [zc] in database 
        $rs[] = $mo->table('extrade_myzc')->add(array('userid' => $uid, 'username' => 'User to User', 'coinname' => $coin, 'num' => $amount, 'mum' => $amount, 'addtime' => time(), 'status' => 1));
        $rs[] = $mo->table('extrade_myzr')->add(array('userid' => $receiver, 'username' => $sender, 'coinname' => $coin, 'num' => $amount, 'txid' => 'Internal send', 'mum' => $amount, 'addtime' => time(), 'status' => 1));
        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success('Successful Transferred');
        } else {
            $mo->execute('rollback');
            $this->error(L('TRANSFER_FAILED'));
        }
    }


    public function Feedback($userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }


        $active = M('chat')->where(array('userid' => $uid))->select();


        foreach ($active as $key => $val) {
            $activee[$key]['id'] = $val['id'];
            $activee[$key]['title'] = $val['title'];
            $activee[$key]['message'] = $val['content'];
            $activee[$key]['image'] = $val['image'];
            $activee[$key]['support reply'] = $val['reply'];
            $activee[$key]['status'] = $val['status'];
        }
        $ret['Tickets'] = $activee;
        $this->ajaxShow($ret);
    }

    public function SendFeedback($title, $content, $userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $userimg = M('extrade_chat')->where(array('id' => 1))->getField("image");
        if ($userimg) {
            $img_arr = array();
            $img_arr = explode("_", $userimg);
            if (count($img_arr) >= 1) {
                M('extrade_chat')->where(array('id' => 1))->save(array('image' => ''));
            }
        }
        $username = M('User')->where(array('id' => $uid))->getField("username");
        $upload = new \Think\Upload();
        $upload->maxSize = 2048000;
        $upload->exts = array('jpg', 'gif', 'png', 'jpeg');
        $upload->rootPath = './Upload/idcard/';
        $upload->autoSub = false;
        $info = $upload->upload();

        if (!$info) {
            echo "error";
            exit();
        }

        foreach ($info as $k => $v) {




            $userimg = M('extrade_chat')->where(array('id' => 1))->getField("image");
            if ($userimg) {
                $img_arr = array();
                $img_arr = explode("_", $userimg);
                if (count($img_arr) >= 1) {
                    echo "error2";
                    exit();
                }

                $path = $userimg . "_" . $v['savename'];
            } else {
                $path = $v['savename'];
            }

            $mo = M();
            $mo->execute('set autocommit=0');
            $mo->execute('nolock tables  extrade_chat write ');
            $rs = array();
            $rs[] = $mo->table('extrade_chat')->add(array('userid' => $uid, 'username' => $username, 'title' => $title, 'content' => $content, 'image' => $v['savename'], 'addtime' => time(), 'endtime' => time(), 'status' => 0));
            if (check_arr($rs)) {
                $mo->execute('commit');
                $mo->execute('unlock tables');
                $this->success('Successful');
            } else {
                $mo->execute('rollback');
                $this->error(L('FAILED'));
            }
        }
    }

    public function joincircle($id, $type, $userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $one_circle = M('User')->where(array('id' => $uid))->getField("one_circle");
        $two_circle = M('User')->where(array('id' => $uid))->getField("two_circle");
        $three_circle = M('User')->where(array('id' => $uid))->getField("three_circle");
        $four_circle = M('User')->where(array('id' => $uid))->getField("four_circle");
        $five_circle = M('User')->where(array('id' => $uid))->getField("five_circle");
        $six_circle = M('User')->where(array('id' => $uid))->getField("six_circle");
        $seven_circle = M('User')->where(array('id' => $uid))->getField("seven_circle");
        $eight_circle = M('User')->where(array('id' => $uid))->getField("eight_circle");
        $nine_circle = M('User')->where(array('id' => $uid))->getField("nine_circle");
        $ten_circle = M('User')->where(array('id' => $uid))->getField("ten_circle");
        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables  extrade_circle write, extrade_user write ');
        $rs = array();
        if ($one_circle  == 0 and $type == 1) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('one_circle', $id);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('member', 1);
        } else if ($two_circle == 0 and $type == 1) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('two_circle', $id);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('member', 1);
        } else if ($three_circle  == 0 and $type == 1) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('three_circle', $id);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('member', 1);
        } else if ($four_circle  == 0 and $type == 1) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('four_circle', $id);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('member', 1);
        } else if ($five_circle  == 0 and $type == 1) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('five_circle', $id);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('member', 1);
        } else if ($six_circle  == 0 and $type == 1) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('six_circle', $id);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('member', 1);
        } else if ($seven_circle  == 0 and $type == 1) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('seven_circle', $id);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('member', 1);
        } else if ($eight_circle  == 0 and $type == 1) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('eight_circle', $id);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('member', 1);
        } else if ($nine_circle  == 0 and $type == 1) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('nine_circle', $id);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('member', 1);
        } else if ($ten_circle  == 0 and $type == 1) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('ten_circle', $id);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('member', 1);
        } else if ($one_circle == $id and $type == 0) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('one_circle', 0);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setDec('member', 1);
        } else if ($two_circle == $id and $type == 0) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('two_circle', 0);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setDec('member', 1);
        } else if ($three_circle  == $id and $type == 0) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('three_circle', 0);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setDec('member', 1);
        } else if ($four_circle  == $id and $type == 0) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('four_circle', 0);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setDec('member', 1);
        } else if ($five_circle  == $id and $type == 0) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('five_circle', 0);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setDec('member', 1);
        } else if ($six_circle  == $id and $type == 0) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('six_circle', 0);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setDec('member', 1);
        } else if ($seven_circle  == $id and $type == 0) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('seven_circle', 0);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setDec('member', 1);
        } else if ($eight_circle  == $id and $type == 0) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('eight_circle', 0);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setDec('member', 1);
        } else if ($nine_circle  == $id and $type == 0) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('nine_circle', 0);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setDec('member', 1);
        } else if ($ten_circle  == $id and $type == 0) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('ten_circle', 0);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setDec('member', 1);
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('circle limit reached');
        }



        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success('success!');
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('failed!');
        }
    }

    public function viewcircle($id, $userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user  write, extrade_circle_chat  write, extrade_circle  write');
        $active = M('circle')->where(array('id' => $id))->select();


        foreach ($active as $key => $val) {
            $activee[$key]['id'] = $val['id'];
            $activee[$key]['type'] = $val['type'];
            $activee[$key]['name'] = $val['name'];
            $activee[$key]['profile image'] = $val['profile_image'];
            $activee[$key]['sync strategy'] = $val['enable_sync'];
            $activee[$key]['profit sharing percent'] = $val['profit_sharing'];
            $activee[$key]['members'] = $val['member'];
            $activee[$key]['circle profile'] = $val['intro'];
            $activee[$key]['created'] = $val['addtime'];
            $activee[$key]['circle owner'] =  M('User')->where(array('id' => $val['userid']))->getField("username");
            $activee[$key]['titles'] =  M('circle_chat')->where(array('circle' => $id))->count();;
        }
        $title = M('circle_chat')->where(array('circle' => $id))->select();
        foreach ($title as $key => $val) {
            $post[$key]['writer'] = M('User')->where(array('id' => $val['userid']))->getField("username");
            $post[$key]['date'] = $val['addtime'];
            $post[$key]['details'] = $val['content'];
            $post[$key]['image'] = $val['image'];
        }
        $ret['Circle'] = $activee;
        $ret['Topics'] = $post;
        $mo->execute('unlock tables');
        $this->ajaxShow($ret);
    }

    public function viewjoinedcircle($id, $userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user  write, extrade_circle write, extrade_circle_chat  write');
        $active = M('circle')->where(array('id' => $id))->select();


        foreach ($active as $key => $val) {
            $activee[$key]['id'] = $val['id'];
            $activee[$key]['title'] = $val['title'];
            $activee[$key]['name'] = $val['name'];
            $activee[$key]['profile image'] = $val['profile_image'];
            $activee[$key]['intro'] = $val['intro'];
            $activee[$key]['members'] = $val['member'];
            $activee[$key]['liked'] = $val['liked'];
            $activee[$key]['profit'] = $val['profit'];
            $activee[$key]['Essence'] = $val['essence'];
        }
        $title = M('circle_chat')->where(array('circle' => $id))->select();
        foreach ($title as $key => $val) {
            $post[$key]['writer'] = M('User')->where(array('id' => $val['userid']))->getField("username");
            $post[$key]['date'] = $val['addtime'];
            $post[$key]['details'] = $val['content'];
            $post[$key]['image'] = $val['image'];
        }
        $ret['Circle'] = $activee;
        $ret['Topics'] = $post;
        $mo->execute('unlock tables');
        $this->ajaxShow($ret);
    }

    public function viewsynccircle($id, $userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $g = M('circle')->where(array('id' => $id))->getField("userid");
        $profit = M('circle')->where(array('id' => $id))->getField("profit");
        $binance = M('user_set')->where(array('userid' => $g))->where(array('exchange' => 1))->select();


        foreach ($binance as $key => $val) {
            $activee[$key]['market'] = $val['market'];
            $activee[$key]['cumulative profit'] = $val['circle_profit'];
        }
        $kucoin = M('user_set')->where(array('userid' => $g))->where(array('exchange' => 2))->select();
        foreach ($kucoin as $key => $val) {
            $activeee[$key]['market'] = $val['market'];
            $activeee[$key]['cumulative profit'] = $val['circle_profit'];
        }
        $coinbasepro = M('user_set')->where(array('userid' => $g))->where(array('exchange' => 3))->select();
        foreach ($coinbasepro as $key => $val) {
            $activeee[$key]['market'] = $val['market'];
            $activeee[$key]['cumulative profit'] = $val['circle_profit'];
        }
        $kraken = M('user_set')->where(array('userid' => $g))->where(array('exchange' => 4))->select();
        foreach ($kraken as $key => $val) {
            $activeee[$key]['market'] = $val['market'];
            $activeee[$key]['cumulative profit'] = $val['circle_profit'];
        }
        $ret['cumulative profit rate'] = $profit;
        $ret['Binance'] = $activee;
        $ret['kucoin'] = $activeee;
        $ret['coinbasepro'] = $activeee;
        $ret['kraken'] = $activeee;
        $this->ajaxShow($ret);
    }

    public function updatecircle($id, $type, $userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $one_circle = M('User')->where(array('id' => $uid))->getField("one_circle");
        $two_circle = M('User')->where(array('id' => $uid))->getField("two_circle");
        $three_circle = M('User')->where(array('id' => $uid))->getField("three_circle");
        $four_circle = M('User')->where(array('id' => $uid))->getField("four_circle");
        $five_circle = M('User')->where(array('id' => $uid))->getField("five_circle");
        $six_circle = M('User')->where(array('id' => $uid))->getField("six_circle");
        $seven_circle = M('User')->where(array('id' => $uid))->getField("seven_circle");
        $eight_circle = M('User')->where(array('id' => $uid))->getField("eight_circle");
        $nine_circle = M('User')->where(array('id' => $uid))->getField("nine_circle");
        $ten_circle = M('User')->where(array('id' => $uid))->getField("ten_circle");
        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables  extrade_circle write, extrade_user write ');
        $rs = array();
        if ($one_circle  == 0 and $type == 1) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('liked', 1);
        } else if ($two_circle == 0 and $type == 1) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('liked', 1);
        } else if ($three_circle  == 0 and $type == 1) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('liked', 1);
        } else if ($four_circle  == 0 and $type == 1) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('liked', 1);
        } else if ($five_circle  == 0 and $type == 1) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('liked', 1);
        } else if ($six_circle  == 0 and $type == 1) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('liked', 1);
        } else if ($seven_circle  == 0 and $type == 1) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('liked', 1);
        } else if ($eight_circle  == 0 and $type == 1) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('liked', 1);
        } else if ($nine_circle  == 0 and $type == 1) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('liked', 1);
        } else if ($ten_circle  == 0 and $type == 1) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('liked', 1);
        } else if ($one_circle == $id and $type == 0) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('essence', 1);
        } else if ($two_circle == $id and $type == 0) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('essence', 1);
        } else if ($three_circle  == $id and $type == 0) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('essence', 1);
        } else if ($four_circle  == $id and $type == 0) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('essence', 1);
        } else if ($five_circle  == $id and $type == 0) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('essence', 1);
        } else if ($six_circle  == $id and $type == 0) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('essence', 1);
        } else if ($seven_circle  == $id and $type == 0) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('essence', 1);
        } else if ($eight_circle  == $id and $type == 0) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('essence', 1);
        } else if ($nine_circle  == $id and $type == 0) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('essence', 1);
        } else if ($ten_circle  == $id and $type == 0) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('essence', 1);
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('circle limit reached');
        }



        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success('success!');
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('failed!');
        }
    }

    public function syncircle($id, $sync, $profit, $exchange, $userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $one_circle = M('circle')->where(array('id' => $id))->where(array('userid' => $uid))->getField("id");
        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables  extrade_circle write, extrade_user write ');
        $rs = array();
        if ($one_circle  == $id and $exchange == 1) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setField('enable_sync', $sync);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setField('profit_sharing', $profit);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setField('binance', $exchange);
        } else if ($one_circle  == $id and $exchange == 2) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setField('enable_sync', $sync);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setField('profit_sharing', $profit);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setField('kucoin', $exchange);
        } else if ($one_circle  == $id and $exchange == 3) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setField('enable_sync', $sync);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setField('profit_sharing', $profit);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setField('coinbasepro', $exchange);
        } else if ($one_circle  == $id and $exchange == 4) {
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setField('enable_sync', $sync);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setField('profit_sharing', $profit);
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setField('kraken', $exchange);
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('You dont own this circle');
        }



        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success('success!');
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('failed!');
        }
    }

    public function joincirclestrategy($id, $first_buy, $market, $exchange, $userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $one_circle = M('circle')->where(array('id' => $id))->getField("userid");
        $set = M('user_set')->where(array('userid' => $one_circle))->where(array('market' => $market))->where(array('exchange' => $exchange))->find();
        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables  extrade_user_set write');
        $rs = array();
        if ($exchange == 1) {
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('firstbuy_amount', $first_buy);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('double_position', $set['double_position']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('margin_limit', $set['margin_limit']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('profit_ratio', $set['profit_ratio']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('whole_ratio', $set['whole_ratio']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('price_drop', $set['price_drop']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('m_ratio', $set['m_ratio']);

            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('cycle', $set['cycle']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('profit_callback', $set['profit_callback']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('one_shot', $set['one_shot']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('circle_sync', $id);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('sync', 1);
        } else if ($exchange == 2) {
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('firstbuy_amount', $first_buy);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('double_position', $set['double_position']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('margin_limit', $set['margin_limit']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('profit_ratio', $set['profit_ratio']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('whole_ratio', $set['whole_ratio']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('price_drop', $set['price_drop']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('m_ratio',  $set['m_ratio']);

            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('cycle', $set['cycle']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('profit_callback', $set['profit_callback']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('one_shot', $set['one_shot']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('circle_sync', $id);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('sync', 1);
        } else if ($exchange == 3) {
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('firstbuy_amount', $first_buy);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('double_position', $set['double_position']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('margin_limit', $set['margin_limit']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('profit_ratio', $set['profit_ratio']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('whole_ratio', $set['whole_ratio']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('price_drop', $set['price_drop']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('m_ratio',  $set['m_ratio']);

            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('cycle', $set['cycle']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('profit_callback', $set['profit_callback']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('one_shot', $set['one_shot']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('circle_sync', $id);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('sync', 1);
        } else if ($exchange == 4) {
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('firstbuy_amount', $first_buy);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('double_position', $set['double_position']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('margin_limit', $set['margin_limit']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('profit_ratio', $set['profit_ratio']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('whole_ratio', $set['whole_ratio']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('price_drop', $set['price_drop']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('m_ratio',  $set['m_ratio']);

            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('cycle', $set['cycle']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('profit_callback', $set['profit_callback']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('one_shot', $set['one_shot']);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('circle_sync', $id);
            $rs[] = $mo->table('extrade_user_set')->where(array('userid' => $uid))->where(array('market' => $market))->where(array('exchange' => $exchange))->setField('sync', 1);
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('error');
        }

        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success('success!');
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('failed!');
        }
    }

    public function getcircle($userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user  write, extrade_circle write');
        $active = M('circle')->order('member desc')->select();


        foreach ($active as $key => $val) {
            $activee[$key]['id'] = $val['id'];
            $activee[$key]['type'] = $val['type'];
            $activee[$key]['name'] = $val['name'];
            $activee[$key]['image'] = $val['profile_image'];
            $activee[$key]['sync strategy'] = $val['enable_sync'];
            $activee[$key]['profit sharing percent'] = $val['profit_sharing'];
            $activee[$key]['members'] = $val['member'];
            $activee[$key]['ownerid'] = $val['userid'];
            $activee[$key]['intro'] = $val['intro'];
            $one_circle = M('User')->where(array('id' => $uid))->getField("one_circle");
            $two_circle = M('User')->where(array('id' => $uid))->getField("two_circle");
            $three_circle = M('User')->where(array('id' => $uid))->getField("three_circle");
            $four_circle = M('User')->where(array('id' => $uid))->getField("four_circle");
            $five_circle = M('User')->where(array('id' => $uid))->getField("five_circle");
            $six_circle = M('User')->where(array('id' => $uid))->getField("six_circle");
            $seven_circle = M('User')->where(array('id' => $uid))->getField("seven_circle");
            $eight_circle = M('User')->where(array('id' => $uid))->getField("eight_circle");
            $nine_circle = M('User')->where(array('id' => $uid))->getField("nine_circle");
            $ten_circle = M('User')->where(array('id' => $uid))->getField("ten_circle");
            //$arr = explode('|', $user);
            if ($val['id'] == $one_circle) {
                $activee[$key]['joined'] = 1;
            } else if ($val['id'] == $two_circle) {
                $activee[$key]['joined'] = 1;
            } else if ($val['id'] == $three_circle) {
                $activee[$key]['joined'] = 1;
            } else if ($val['id'] == $four_circle) {
                $activee[$key]['joined'] = 1;
            } else if ($val['id'] == $five_circle) {
                $activee[$key]['joined'] = 1;
            } else if ($val['id'] == $six_circle) {
                $activee[$key]['joined'] = 1;
            } else if ($val['id'] == $seven_circle) {
                $activee[$key]['joined'] = 1;
            } else if ($val['id'] == $eight_circle) {
                $activee[$key]['joined'] = 1;
            } else if ($val['id'] == $nine_circle) {
                $activee[$key]['joined'] = 1;
            } else if ($val['id'] == $ten_circle) {
                $activee[$key]['joined'] = 1;
            } else {
                $activee[$key]['joined'] = 0;
            }
        }
        $ret['Circles'] = $activee;
        $mo->execute('unlock tables');
        $this->ajaxShow($ret);
    }

    public function mysync($userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_circle  write, extrade_user_set  write');
        $active = M('user_set')->where(array('userid' => $uid))->where(array('sync' => 1))->where(array('exchange' => 1))->select();


        foreach ($active as $key => $val) {
            $activee[$key]['circle name'] = M('circle')->where(array('id' => $val['circle_sync']))->getField("name");
            $activee[$key]['circle image'] =  M('circle')->where(array('id' => $val['circle_sync']))->getField("profile_image");
            $activee[$key]['first buy in amount'] = $val['firstbuy_amount'];
            $activee[$key]['market'] = $val['market'];
            $activee[$key]['strategy id'] = $val['id'];
            $activee[$key]['profit sharing'] = M('circle')->where(array('id' => $val['circle_sync']))->getField("profit_sharing");
        }
        $kucoin = M('user_set')->where(array('userid' => $uid))->where(array('sync' => 1))->where(array('exchange' => 2))->select();


        foreach ($kucoin as $key => $val) {
            $activeee[$key]['circle name'] = M('circle')->where(array('id' => $val['circle_sync']))->getField("name");
            $activeee[$key]['circle image'] =  M('circle')->where(array('id' => $val['circle_sync']))->getField("profile_image");
            $activeee[$key]['first buy in amount'] = $val['firstbuy_amount'];
            $activeee[$key]['market'] = $val['market'];
            $activee[$key]['strategy id'] = $val['id'];
            $activeee[$key]['profit sharing'] = M('circle')->where(array('id' => $val['circle_sync']))->getField("profit_sharing");
        }
        $coinbasepro = M('user_set')->where(array('userid' => $uid))->where(array('sync' => 1))->where(array('exchange' => 3))->select();


        foreach ($coinbasepro as $key => $val) {
            $activeee[$key]['circle name'] = M('circle')->where(array('id' => $val['circle_sync']))->getField("name");
            $activeee[$key]['circle image'] =  M('circle')->where(array('id' => $val['circle_sync']))->getField("profile_image");
            $activeee[$key]['first buy in amount'] = $val['firstbuy_amount'];
            $activeee[$key]['market'] = $val['market'];
            $activee[$key]['strategy id'] = $val['id'];
            $activeee[$key]['profit sharing'] = M('circle')->where(array('id' => $val['circle_sync']))->getField("profit_sharing");
        }
        $kraken = M('user_set')->where(array('userid' => $uid))->where(array('sync' => 1))->where(array('exchange' => 4))->select();


        foreach ($kraken as $key => $val) {
            $activeee[$key]['circle name'] = M('circle')->where(array('id' => $val['circle_sync']))->getField("name");
            $activeee[$key]['circle image'] =  M('circle')->where(array('id' => $val['circle_sync']))->getField("profile_image");
            $activeee[$key]['first buy in amount'] = $val['firstbuy_amount'];
            $activeee[$key]['market'] = $val['market'];
            $activee[$key]['strategy id'] = $val['id'];
            $activeee[$key]['profit sharing'] = M('circle')->where(array('id' => $val['circle_sync']))->getField("profit_sharing");
        }
        $ret['Binance'] = $activee;
        $ret['kucoin'] = $activeee;
        $ret['coinbasepro'] = $activeee;
        $ret['kraken'] = $activeee;
        $mo->execute('unlock tables');
        $this->ajaxShow($ret);
    }

    public function circleleaderboard($userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user_set  write ,extrade_circle  write');
        $profitlist = M('circle')->order('profitusd desc')->select();


        foreach ($profitlist as $key => $val) {
            $activeee[$key]['circle id'] = $val['id'];
            $activee[$key]['circle name'] = $val['name'];
            $activee[$key]['circle image'] =  $val['profile_image'];
            $activee[$key]['profit usdt'] = $val['profitusd'];
        }
        $hotlist = M('circle')->order('member desc')->select();


        foreach ($hotlist as $key => $val) {
            $activeee[$key]['circle id'] = $val['id'];
            $activeee[$key]['circle name'] = $val['name'];
            $activeee[$key]['circle image'] =  $val['profile_image'];
            $activeee[$key]['people'] = $val['member'];
        }
        $poplist = M('circle')->order('member desc')->select();

        $sum = 0;
        foreach ($poplist as $key => $val) {
            $activeee[$key]['circle id'] = $val['id'];
            $activeeee[$key]['circle name'] = $val['name'];
            $activeeee[$key]['circle image'] =  $val['profile_image'];
            $paidteam = M('user_set')->where(array('sync' => 1))->where(array('circle_sync' => $val['id']))->count();
            $sum += $paidteam;
            $activeeee[$key]['No of sync'] = $sum;
        }
        $ret['profit list'] = $activee;
        $ret['hot list'] = $activeee;
        $ret['popilarity list'] = $activeeee;
        $mo->execute('unlock tables');
        $this->ajaxShow($ret);
    }

    public function cancelsync($strategyid, $userId = null)
    {

        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables  extrade_user_set write ');
        $rs = array();
        $synuser = $mo->table('extrade_user_set')->where(array('id' => $strategyid))->getField('circle_sync');
        $synuser = $mo->table('extrade_user_set')->where(array('id' => $synuser))->getField('userid');
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $strategyid))->setField('sync', 0);
        $rs[] = $mo->table('extrade_user_set')->where(array('id' => $strategyid))->setField('circle_sync', 0);
        $rs[] = $mo->table('extrade_circle')->where(array('id' => $synuser))->setDec('member', 1);
        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success('success!');
        } else {
            $mo->execute('rollback');
            $mo->execute('unlock tables');
            $this->error('failed!');
        }
    }

    public function circleincome($userId = null)
    {

        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $active = M('invit')->where(array('userid' => $uid, 'type' => "circle"))->order('id desc')->select();
        $one_circle = M('User')->where(array('id' => $uid))->getField("circle_income");


        foreach ($active as $key => $val) {
            $activee[$key]['id'] = $val['id'];
            $activee[$key]['type'] = $val['type'];
            $activee[$key]['name'] = $val['name'];
            $activee[$key]['profit'] = $val['mum'];
            $activee[$key]['date'] = $val['addtime'];
        }
        $ret['Profit details'] = $activee;
        $ret['cumulative profit'] = $one_circle;
        $this->ajaxShow($ret);
    }

    public function createcircle($name, $type, $intro, $userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $userimg = M('extrade_chat')->where(array('id' => 1))->getField("image");
        if ($userimg) {
            $img_arr = array();
            $img_arr = explode("_", $userimg);
            if (count($img_arr) >= 1) {
                M('extrade_chat')->where(array('id' => 1))->save(array('image' => ''));
            }
        }
        $username = M('User')->where(array('id' => $uid))->getField("username");
        $upload = new \Think\Upload();
        $upload->maxSize = 2048000;
        $upload->exts = array('jpg', 'gif', 'png', 'jpeg');
        $upload->rootPath = './Upload/idcard/';
        $upload->autoSub = false;
        $info = $upload->upload();

        if (!$info) {
            echo "error";
            exit();
        }

        foreach ($info as $k => $v) {




            $userimg = M('extrade_chat')->where(array('id' => 1))->getField("image");
            if ($userimg) {
                $img_arr = array();
                $img_arr = explode("_", $userimg);
                if (count($img_arr) >= 1) {
                    echo "error2";
                    exit();
                }

                $path = $userimg . "_" . $v['savename'];
            } else {
                $path = $v['savename'];
            }
            $circle = M('circle')->where(array('userid' => $uid))->getField('id');
            if ($circle > 1) {
                $this->error(L('You cannot own more than one circle'));
            }
            $mo = M();
            $mo->execute('set autocommit=0');
            $mo->execute('nolock tables  extrade_circle write ');
            $rs = array();
            $rs[] = $mo->table('extrade_circle')->add(array('userid' => $uid, 'name' => $name, 'type' => $type, 'intro' => $intro, 'profile_image' => $v['savename'], 'addtime' => time()));
            if (check_arr($rs)) {
                $mo->execute('commit');
                $mo->execute('unlock tables');
                $this->success($rs[0]);
            } else {
                $mo->execute('rollback');
                $this->error(L('FAILED'));
            }
        }
    }

    public function postcircle($id, $topic, $userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $userimg = M('extrade_chat')->where(array('id' => 1))->getField("image");
        if ($userimg) {
            $img_arr = array();
            $img_arr = explode("_", $userimg);
            if (count($img_arr) >= 1) {
                M('extrade_chat')->where(array('id' => 1))->save(array('image' => ''));
            }
        }
        $username = M('User')->where(array('id' => $uid))->getField("username");
        $upload = new \Think\Upload();
        $upload->maxSize = 2048000;
        $upload->exts = array('jpg', 'gif', 'png', 'jpeg');
        $upload->rootPath = './Upload/idcard/';
        $upload->autoSub = false;
        $info = $upload->upload();

        if (!$info) {
            echo "error";
            exit();
        }

        foreach ($info as $k => $v) {




            $userimg = M('extrade_chat')->where(array('id' => 1))->getField("image");
            if ($userimg) {
                $img_arr = array();
                $img_arr = explode("_", $userimg);
                if (count($img_arr) >= 1) {
                    echo "error2";
                    exit();
                }

                $path = $userimg . "_" . $v['savename'];
            } else {
                $path = $v['savename'];
            }

            $mo = M();
            $mo->execute('set autocommit=0');
            $mo->execute('nolock tables  extrade_circle write, extrade_circle_chat write ');
            $rs = array();
            $rs[] = $mo->table('extrade_circle_chat')->add(array('userid' => $uid, 'circle' => $id, 'content' => $topic, 'image' => $v['savename'], 'addtime' => time()));
            $rs[] = $mo->table('extrade_circle')->where(array('id' => $id))->setInc('title', 1);
            if (check_arr($rs)) {
                $mo->execute('commit');
                $mo->execute('unlock tables');
                $this->success($rs[0]);
            } else {
                $mo->execute('rollback');
                $this->error(L('FAILED'));
            }
        }
    }

    public function deletecircle($id, $userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables  extrade_circle write, extrade_circle_chat write, extrade_user_set write ');
        $rs = array();
        $rs[] = $mo->table('extrade_circle_chat')->where(array('userid' => $uid, 'circle' => $id))->delete();
        $rs[] = $mo->table('extrade_circle')->where(array('id' => $id, 'userid' => $uid,))->delete();
        $rs[] = $mo->table('extrade_user_set')->where(array('circle_sync' => $id, 'sync' => 1))->setField('sync', 0);
        $rs[] = $mo->table('extrade_user_set')->where(array('circle_sync' => $id))->setField('circle_sync', 0);
        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            $this->success('success!');
        } else {
            $mo->execute('rollback');
            $this->error(L('FAILED'));
        }
    }

    public function Profile1($userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }


        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_config  write, extrade_user write');
        $active = M('User')->where(array('id' => $uid))->select();


        foreach ($active as $key => $val) {
            $activee[$key]['id'] = $val['id'];
            $activee[$key]['image'] = $val['idcardimg1'];
            $activee[$key]['username'] = $val['username'];
            $activee[$key]['Email'] = $val['email'];
            $activee[$key]['Subscribed'] = $val['paid'];
            $activee[$key]['plan'] = $val['plan'];
            $activee[$key]['line'] = $val['line'];
            $activee[$key]['lifetime'] = $val['lifetime'];
            $activee[$key]['expires'] = $val['expiretime'];
            $activee[$key]['amount'] = M('Config')->where(array('id' => 1))->getField('sub_fee');
            $activee[$key]['level'] = $val['level'];
            $activee[$key]['binancebind'] = $val['bbind'];
            $activee[$key]['kucoinbind'] = $val['kbind'];
            $activee[$key]['binanceapi'] = $val['bapi_key'];
            $activee[$key]['kucoinapi'] = $val['kapi_key'];
            $activee[$key]['binancescret'] = "**********";
            $activee[$key]['kucoinsecret'] =  "**********";
        }

        $ret['User Details'] = $activee;
        $mo->execute('unlock tables');
        $this->ajaxShow($ret);
    }

    public function Profile($userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }


        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_config  write, extrade_user write');
        $active = M('User')->where(array('id' => $uid))->select();



        foreach ($active as $key => $val) {
            $activee[$key]['id'] = $val['id'];
            $activee[$key]['image'] = $val['idcard'];
            $activee[$key]['username'] = $val['username'];
            $activee[$key]['Email'] = $val['email'];
            $activee[$key]['Subscribed'] = $val['paid'];
            $activee[$key]['plan'] = $val['plan'];
            $activee[$key]['phone no'] = $val['cellphone'];
            $activee[$key]['role'] = $val['usertype'];
            $activee[$key]['country'] = $val['country'];
            $activee[$key]['expires'] = $val['expiretime'];
            $activee[$key]['referred by'] = $val['invit_1'];
            $activee[$key]['referral left link'] = $val['leftref'];
            $activee[$key]['referral right link'] = $val['rightref'];
            $activee[$key]['binancebind'] = $val['bbind'];
            $activee[$key]['kucoinbind'] = $val['kbind'];
            $activee[$key]['coinbaseprobind'] = $val['cbind'];
            $activee[$key]['krakenbind'] = $val['krbind'];
            $activee[$key]['binanceapi'] = $val['bapi_key'];
            $activee[$key]['kucoinapi'] = $val['kapi_key'];
            $activee[$key]['coinbaseproapi'] = $val['capi_key'];
            $activee[$key]['krakenapi'] = $val['krapi_key'];
            $activee[$key]['binancescret'] = "**********";
            $activee[$key]['kucoinsecret'] =  "**********";
            $activee[$key]['coinbaseprosecret'] = "**********";
            $activee[$key]['krakensecret'] = "**********";
            $activee[$key]['api group'] =  "206.189.23.93,138.68.138.94,46.101.21.246,46.101.86.28,138.68.138.26,46.101.93.251,46.101.23.91,46.101.87.120,167.172.175.128,46.101.23.85,164.90.179.120,46.101.103.234,165.232.126.255,142.93.108.99,104.248.27.160,159.89.110.240,161.35.75.195,161.35.79.136,209.38.192.13,142.93.160.31,46.101.233.159,64.227.121.152,64.226.77.30,64.226.77.42,157.230.19.79,157.230.19.102,64.226.70.71,157.230.27.55,157.230.27.146,167.172.181.223,167.172.110.47,167.172.181.218,167.172.105.45,167.172.181.230";
        }

        $ret['User Details'] = $activee;
        $mo->execute('unlock tables');
        $this->ajaxShow($ret);
    }

    public function Getplan3($plantype, $userId = null)
    {
        if (!($uid = $this->userid())) {
            $this->error(L('PLEASE_LOGIN'));
        }
        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user  write, extrade_user_coin write, extrade_invit write');
        if ($plantype == 1) {
            $amount = 200;
            $time = time();
            $expiretime = strtotime("+1 years", $time);
        } else if ($plantype == 2) {
            $amount = 500;
            $time = time();
            $expiretime = strtotime("+10 years", $time);
        }
        $coin = "usdt";
        $coind = "usdtd";
        $user_coin = M('UserCoin')->where(array('userid' => $uid))->find();

        if ($user_coin[$coin] < $amount) {
            $this->error(L('Insufficient funds available'));
        }
        $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $uid))->setDec($coin, $amount);
        $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('expiretime', $expiretime);
        $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('paid', 1);
        $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('plan', $plantype);
        $level = $mo->table('extrade_user')->where(array('id' => $uid))->getField('level');
        $Userref = $mo->table('extrade_user')->where(array('id' => $uid))->getField('invit_1');

        if ($level == 0) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('level', 1);
        }

        $ref1 = $mo->table('extrade_user')->where(array('id' => $Userref))->getField('id');
        $ref2 = $mo->table('extrade_user')->where(array('id' => $ref1))->getField('invit_1');
        $ref3 = $mo->table('extrade_user')->where(array('id' => $ref2))->getField('invit_1');
        $ref4 = $mo->table('extrade_user')->where(array('id' => $ref3))->getField('invit_1');
        $ref5 = $mo->table('extrade_user')->where(array('id' => $ref4))->getField('invit_1');
        $ref6 = $mo->table('extrade_user')->where(array('id' => $ref5))->getField('invit_1');
        $refline1 = $mo->table('extrade_user')->where(array('id' => $ref1))->getField('line');
        $refline2 = $mo->table('extrade_user')->where(array('id' => $ref2))->getField('line');
        $refline3 = $mo->table('extrade_user')->where(array('id' => $ref3))->getField('line');
        $refline4 = $mo->table('extrade_user')->where(array('id' => $ref4))->getField('line');
        $refline5 = $mo->table('extrade_user')->where(array('id' => $ref5))->getField('line');
        $refline6 = $mo->table('extrade_user')->where(array('id' => $ref6))->getField('line');
        $reflevel1 = $mo->table('extrade_user')->where(array('id' => $ref1))->getField('level');
        $reflevel2 = $mo->table('extrade_user')->where(array('id' => $ref2))->getField('level');
        $reflevel3 = $mo->table('extrade_user')->where(array('id' => $ref3))->getField('level');
        $reflevel4 = $mo->table('extrade_user')->where(array('id' => $ref4))->getField('level');
        $reflevel5 = $mo->table('extrade_user')->where(array('id' => $ref5))->getField('level');
        $reflevel6 = $mo->table('extrade_user')->where(array('id' => $ref6))->getField('level');
        $refpaid1 = $mo->table('extrade_user')->where(array('id' => $ref1))->getField('paid');
        $refpaid2 = $mo->table('extrade_user')->where(array('id' => $ref2))->getField('paid');
        $refpaid3 = $mo->table('extrade_user')->where(array('id' => $ref3))->getField('paid');
        $refpaid4 = $mo->table('extrade_user')->where(array('id' => $ref4))->getField('paid');
        $refpaid5 = $mo->table('extrade_user')->where(array('id' => $ref5))->getField('paid');
        $refpaid6 = $mo->table('extrade_user')->where(array('id' => $ref6))->getField('paid');
        #echo $ref5;
        if ($refline1 > 0 and $refline1 < 6) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $Userref))->setInc('line', 1);
        }
        if ($refline1 == 0 and $refpaid1 == 1 and $plantype == 1) {
            if ($reflevel1 == 1) {
                $teamfee = 30;
            } else if ($reflevel1 == 2) {
                $teamfee = 40;
            } else if ($reflevel1 == 3) {
                $teamfee = 45;
            } else if ($reflevel1 == 4) {
                $teamfee = 50;
            } else if ($reflevel1 == 5) {
                $teamfee = 60;
            } else if ($reflevel1 == 6) {
                $teamfee = 70;
            }
            $rs[] = $mo->table('extrade_user')->where(array('id' => $Userref))->setInc('line', 1);
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref1))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref1, 'invit' => $uid, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline1 > 0 and $refpaid1 == 1 and $plantype == 1) {
            if ($reflevel1 == 1) {
                $teamfee = 30;
            } else if ($reflevel1 == 2) {
                $teamfee = 40;
            } else if ($reflevel1 == 3) {
                $teamfee = 45;
            } else if ($reflevel1 == 4) {
                $teamfee = 50;
            } else if ($reflevel1 == 5) {
                $teamfee = 60;
            } else if ($reflevel1 == 6) {
                $teamfee = 70;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref1))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref1, 'invit' => $uid, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline2 > 1 and $refpaid2 == 1 and $plantype == 1) {
            if ($reflevel2 == 1) {
                $teamfee = 13;
            } else if ($reflevel2 == 2) {
                $teamfee = 17;
            } else if ($reflevel2 == 3) {
                $teamfee = 19;
            } else if ($reflevel2 == 4) {
                $teamfee = 21;
            } else if ($reflevel2 == 5) {
                $teamfee = 26;
            } else if ($reflevel2 == 6) {
                $teamfee = 30;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref2))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref2))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref2))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref2, 'invit' => $ref1, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline3 > 2 and $refpaid3 == 1 and $plantype == 1) {
            if ($reflevel3 == 1) {
                $teamfee = 11;
            } else if ($reflevel3 == 2) {
                $teamfee = 14;
            } else if ($reflevel3 == 3) {
                $teamfee = 16;
            } else if ($reflevel3 == 4) {
                $teamfee = 18;
            } else if ($reflevel3 == 5) {
                $teamfee = 21;
            } else if ($reflevel3 == 6) {
                $teamfee = 25;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref3))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref3))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref3))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref3, 'invit' => $ref2, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline4  > 3 and $refpaid4 == 1 and $plantype == 1) {
            if ($reflevel4 == 1) {
                $teamfee = 9;
            } else if ($reflevel4 == 2) {
                $teamfee = 11;
            } else if ($reflevel4 == 3) {
                $teamfee = 13;
            } else if ($reflevel4 == 4) {
                $teamfee = 14;
            } else if ($reflevel4 == 5) {
                $teamfee = 17;
            } else if ($reflevel4 == 6) {
                $teamfee = 20;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref4))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref4))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref4))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref4, 'invit' => $ref3, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline5  > 4 and $refpaid5 == 1 and $plantype == 1) {
            if ($reflevel5 == 1) {
                $teamfee = 4;
            } else if ($reflevel5 == 2) {
                $teamfee = 6;
            } else if ($reflevel5 == 3) {
                $teamfee = 6;
            } else if ($reflevel5 == 4) {
                $teamfee = 7;
            } else if ($reflevel5 == 5) {
                $teamfee = 9;
            } else if ($reflevel5 == 6) {
                $teamfee = 10;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref5))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref5))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref5))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref5, 'invit' => $ref4, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline6  > 5 and $refpaid6 == 1 and $plantype == 1) {
            if ($reflevel6 == 1) {
                $teamfee = 3;
            } else if ($reflevel6 == 2) {
                $teamfee = 4;
            } else if ($reflevel6 == 3) {
                $teamfee = 5;
            } else if ($reflevel6 == 4) {
                $teamfee = 5;
            } else if ($reflevel6 == 5) {
                $teamfee = 6;
            } else if ($reflevel6 == 6) {
                $teamfee = 7;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref6))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref6))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref6))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref6, 'invit' => $ref5, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline1  > 0 and $refpaid1 == 1 and $plantype == 2) {
            if ($reflevel1 == 1) {
                $teamfee = 150;
            } else if ($reflevel1 == 2) {
                $teamfee = 200;
            } else if ($reflevel1 == 3) {
                $teamfee = 225;
            } else if ($reflevel1 == 4) {
                $teamfee = 250;
            } else if ($reflevel1 == 5) {
                $teamfee = 300;
            } else if ($reflevel1 == 6) {
                $teamfee = 350;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref1))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref1, 'invit' => $uid, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline2  > 1 and $refpaid2 == 1 and $plantype == 2) {
            if ($reflevel2 == 1) {
                $teamfee = 65;
            } else if ($reflevel2 == 2) {
                $teamfee = 86;
            } else if ($reflevel2 == 3) {
                $teamfee = 96;
            } else if ($reflevel2 == 4) {
                $teamfee = 107;
            } else if ($reflevel2 == 5) {
                $teamfee = 129;
            } else if ($reflevel2 == 6) {
                $teamfee = 150;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref2))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref2))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref2))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref2, 'invit' => $ref1, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline3  > 2 and $refpaid3 == 1 and $plantype == 2) {
            if ($reflevel3 == 1) {
                $teamfee = 54;
            } else if ($reflevel3 == 2) {
                $teamfee = 71;
            } else if ($reflevel3 == 3) {
                $teamfee = 80;
            } else if ($reflevel3 == 4) {
                $teamfee = 89;
            } else if ($reflevel3 == 5) {
                $teamfee = 107;
            } else if ($reflevel3 == 6) {
                $teamfee = 125;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref3))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref3))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref3))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref3, 'invit' => $ref2, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline4  > 3 and $refpaid4 == 1 and $plantype == 2) {
            if ($reflevel4 == 1) {
                $teamfee = 43;
            } else if ($reflevel4 == 2) {
                $teamfee = 57;
            } else if ($reflevel4 == 3) {
                $teamfee = 65;
            } else if ($reflevel4 == 4) {
                $teamfee = 71;
            } else if ($reflevel4 == 5) {
                $teamfee = 86;
            } else if ($reflevel4 == 6) {
                $teamfee = 100;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref4))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref4))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref4))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref4, 'invit' => $ref3, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline5  > 4 and $refpaid5 == 1 and $plantype == 2) {
            if ($reflevel5 == 1) {
                $teamfee = 21;
            } else if ($reflevel5 == 2) {
                $teamfee = 29;
            } else if ($reflevel5 == 3) {
                $teamfee = 32;
            } else if ($reflevel5 == 4) {
                $teamfee = 36;
            } else if ($reflevel5 == 5) {
                $teamfee = 43;
            } else if ($reflevel5 == 6) {
                $teamfee = 50;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref5))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref5))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref5))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref5, 'invit' => $ref4, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline6  > 5 and $refpaid6 == 1 and $plantype == 2) {
            if ($reflevel6 == 1) {
                $teamfee = 15;
            } else if ($reflevel6 == 2) {
                $teamfee = 20;
            } else if ($reflevel6 == 3) {
                $teamfee = 23;
            } else if ($reflevel6 == 4) {
                $teamfee = 25;
            } else if ($reflevel6 == 5) {
                $teamfee = 30;
            } else if ($reflevel6 == 6) {
                $teamfee = 35;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref6))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref6))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref6))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref6, 'invit' => $ref5, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        #upgrade level
        $Directref = M('User')->where(array('invit_1' => $ref1))->count();
        $level2 = M('User')->where(array('invit_1' =>  $ref1))->select();

        $sum2 = 0;
        $user2 = array();
        foreach ($level2 as $key => $val2) {
            $user2[] =  M('User')->where(array('invit_1' => $val2['id']))->getField('id');
            $level2total = M('User')->where(array('invit_1' => $val2['id']))->count();
            $sum2 += $level2total;
        }
        $sum3 = 0;
        $user3 = array();
        foreach ($user2 as $key => $val3) {
            $user3[] = M('User')->where(array('invit_1' => $val3))->getField('id');
            $level3total = M('User')->where(array('invit_1' => $val3))->count();
            $sum3 += $level3total;
        }
        $sum4 = 0;
        $user4 = array();
        foreach ($user3 as $key => $val4) {
            $user4[] = M('User')->where(array('invit_1' => $val4))->getField('id');
            $level4total = M('User')->where(array('invit_1' => $val4))->count();
            $sum4 += $level4total;
        }
        $sum5 = 0;
        $user5 = array();
        foreach ($user4 as $key => $val5) {
            $user5[] = M('User')->where(array('invit_1' => $val5))->getField('id');
            $level5total = M('User')->where(array('invit_1' => $val5))->count();
            $sum5 += $level5total;
        }
        $sum6 = 0;
        $user6 = array();
        foreach ($user5 as $key => $val6) {
            $user6[] = M('User')->where(array('invit_1' => $val6))->getField('id');
            $level6total = M('User')->where(array('invit_1' => $val6))->count();
            $sum6 += $level6total;
        }
        $total = $sum2 + $sum3 + $sum4 + $sum5 + $sum6;
        if ($Directref > 2 and $total > 19 and $reflevel1 == 1) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setField('level', 2);
        } else if ($Directref > 4 and $total > 19 and $reflevel1 == 2) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setField('level', 3);
        } else if ($Directref > 7 and $total > 299 and $reflevel1 == 3) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setField('level', 4);
        } else if ($Directref > 11 and $total > 799 and $reflevel1 == 4) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setField('level', 5);
        } else if ($Directref > 19 and $total > 1499 and $reflevel1 == 5) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setField('level', 6);
        }
        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            #$this->success($rs[0]);
            $this->success('Subscription succesful!');
        } else {
            $mo->execute('rollback');
            $this->error(L('FAILED'));
        }
    }

    public function Getplan($plantype, $userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user  write, extrade_user_coin write, extrade_invit write');
        if ($plantype == 1) {
            $amount = 200;
            $time = time();
            $expiretime = strtotime("+1 years", $time);
        } else if ($plantype == 2) {
            $amount = 500;
            $time = time();
            $expiretime = strtotime("+10 years", $time);
        }
        $coin = "usdt";
        $coind = "usdtd";
        $user_coin = M('UserCoin')->where(array('userid' => $uid))->find();

        if ($user_coin[$coin] < $amount) {
            $this->error(L('Insufficient funds available'));
        }
        $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $uid))->setDec($coin, $amount);
        $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('expiretime', $expiretime);
        $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('paid', 1);
        $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('plan', $plantype);
        $level = $mo->table('extrade_user')->where(array('id' => $uid))->getField('level');
        $Userref = $mo->table('extrade_user')->where(array('id' => $uid))->getField('invit_1');

        if ($level == 0) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $uid))->setField('level', 1);
        }

        $ref1 = $mo->table('extrade_user')->where(array('id' => $Userref))->getField('id');
        $ref2 = $mo->table('extrade_user')->where(array('id' => $ref1))->getField('invit_1');
        $ref3 = $mo->table('extrade_user')->where(array('id' => $ref2))->getField('invit_1');
        $ref4 = $mo->table('extrade_user')->where(array('id' => $ref3))->getField('invit_1');
        $ref5 = $mo->table('extrade_user')->where(array('id' => $ref4))->getField('invit_1');
        $ref6 = $mo->table('extrade_user')->where(array('id' => $ref5))->getField('invit_1');
        $refline1 = $mo->table('extrade_user')->where(array('id' => $ref1))->getField('line');
        $refline2 = $mo->table('extrade_user')->where(array('id' => $ref2))->getField('line');
        $refline3 = $mo->table('extrade_user')->where(array('id' => $ref3))->getField('line');
        $refline4 = $mo->table('extrade_user')->where(array('id' => $ref4))->getField('line');
        $refline5 = $mo->table('extrade_user')->where(array('id' => $ref5))->getField('line');
        $refline6 = $mo->table('extrade_user')->where(array('id' => $ref6))->getField('line');
        $reflevel1 = $mo->table('extrade_user')->where(array('id' => $ref1))->getField('level');
        $reflevel2 = $mo->table('extrade_user')->where(array('id' => $ref2))->getField('level');
        $reflevel3 = $mo->table('extrade_user')->where(array('id' => $ref3))->getField('level');
        $reflevel4 = $mo->table('extrade_user')->where(array('id' => $ref4))->getField('level');
        $reflevel5 = $mo->table('extrade_user')->where(array('id' => $ref5))->getField('level');
        $reflevel6 = $mo->table('extrade_user')->where(array('id' => $ref6))->getField('level');
        $refpaid1 = $mo->table('extrade_user')->where(array('id' => $ref1))->getField('paid');
        $refpaid2 = $mo->table('extrade_user')->where(array('id' => $ref2))->getField('paid');
        $refpaid3 = $mo->table('extrade_user')->where(array('id' => $ref3))->getField('paid');
        $refpaid4 = $mo->table('extrade_user')->where(array('id' => $ref4))->getField('paid');
        $refpaid5 = $mo->table('extrade_user')->where(array('id' => $ref5))->getField('paid');
        $refpaid6 = $mo->table('extrade_user')->where(array('id' => $ref6))->getField('paid');
        #echo $ref5;
        if ($refline1 > 0 and $refline1 < 6) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $Userref))->setInc('line', 1);
        }
        if ($refline1 == 0 and $refpaid1 == 1 and $plantype == 1) {
            if ($reflevel1 == 1) {
                $teamfee = 30;
            } else if ($reflevel1 == 2) {
                $teamfee = 40;
            } else if ($reflevel1 == 3) {
                $teamfee = 45;
            } else if ($reflevel1 == 4) {
                $teamfee = 50;
            } else if ($reflevel1 == 5) {
                $teamfee = 60;
            } else if ($reflevel1 == 6) {
                $teamfee = 70;
            }
            $rs[] = $mo->table('extrade_user')->where(array('id' => $Userref))->setInc('line', 1);
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref1))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref1, 'invit' => $uid, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline1 > 0 and $refpaid1 == 1 and $plantype == 1) {
            if ($reflevel1 == 1) {
                $teamfee = 30;
            } else if ($reflevel1 == 2) {
                $teamfee = 40;
            } else if ($reflevel1 == 3) {
                $teamfee = 45;
            } else if ($reflevel1 == 4) {
                $teamfee = 50;
            } else if ($reflevel1 == 5) {
                $teamfee = 60;
            } else if ($reflevel1 == 6) {
                $teamfee = 70;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref1))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref1, 'invit' => $uid, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline2 > 1 and $refpaid2 == 1 and $plantype == 1) {
            if ($reflevel2 == 1) {
                $teamfee = 13;
            } else if ($reflevel2 == 2) {
                $teamfee = 17;
            } else if ($reflevel2 == 3) {
                $teamfee = 19;
            } else if ($reflevel2 == 4) {
                $teamfee = 21;
            } else if ($reflevel2 == 5) {
                $teamfee = 26;
            } else if ($reflevel2 == 6) {
                $teamfee = 30;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref2))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref2))->setInc('indirect', 1);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref2))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref2))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref2, 'invit' => $ref1, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline3 > 2 and $refpaid3 == 1 and $plantype == 1) {
            if ($reflevel3 == 1) {
                $teamfee = 11;
            } else if ($reflevel3 == 2) {
                $teamfee = 14;
            } else if ($reflevel3 == 3) {
                $teamfee = 16;
            } else if ($reflevel3 == 4) {
                $teamfee = 18;
            } else if ($reflevel3 == 5) {
                $teamfee = 21;
            } else if ($reflevel3 == 6) {
                $teamfee = 25;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref3))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref3))->setInc('indirect', 1);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref3))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref3))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref3, 'invit' => $ref2, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline4  > 3 and $refpaid4 == 1 and $plantype == 1) {
            if ($reflevel4 == 1) {
                $teamfee = 9;
            } else if ($reflevel4 == 2) {
                $teamfee = 11;
            } else if ($reflevel4 == 3) {
                $teamfee = 13;
            } else if ($reflevel4 == 4) {
                $teamfee = 14;
            } else if ($reflevel4 == 5) {
                $teamfee = 17;
            } else if ($reflevel4 == 6) {
                $teamfee = 20;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref4))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref4))->setInc('indirect', 1);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref4))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref4))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref4, 'invit' => $ref3, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline5  > 4 and $refpaid5 == 1 and $plantype == 1) {
            if ($reflevel5 == 1) {
                $teamfee = 4;
            } else if ($reflevel5 == 2) {
                $teamfee = 6;
            } else if ($reflevel5 == 3) {
                $teamfee = 6;
            } else if ($reflevel5 == 4) {
                $teamfee = 7;
            } else if ($reflevel5 == 5) {
                $teamfee = 9;
            } else if ($reflevel5 == 6) {
                $teamfee = 10;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref5))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref5))->setInc('indirect', 1);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref5))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref5))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref5, 'invit' => $ref4, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline6  > 5 and $refpaid6 == 1 and $plantype == 1) {
            if ($reflevel6 == 1) {
                $teamfee = 3;
            } else if ($reflevel6 == 2) {
                $teamfee = 4;
            } else if ($reflevel6 == 3) {
                $teamfee = 5;
            } else if ($reflevel6 == 4) {
                $teamfee = 5;
            } else if ($reflevel6 == 5) {
                $teamfee = 6;
            } else if ($reflevel6 == 6) {
                $teamfee = 7;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref6))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref6))->setInc('indirect', 1);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref6))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref6))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref6, 'invit' => $ref5, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline1  == 0 and $refpaid1 == 1 and $plantype == 2) {
            if ($reflevel1 == 1) {
                $teamfee = 75;
            } else if ($reflevel1 == 2) {
                $teamfee = 100;
            } else if ($reflevel1 == 3) {
                $teamfee = 112;
            } else if ($reflevel1 == 4) {
                $teamfee = 125;
            } else if ($reflevel1 == 5) {
                $teamfee = 150;
            } else if ($reflevel1 == 6) {
                $teamfee = 175;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref1))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $Userref))->setInc('line', 1);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref1, 'invit' => $uid, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline1  > 0 and $refpaid1 == 1 and $plantype == 2) {
            if ($reflevel1 == 1) {
                $teamfee = 75;
            } else if ($reflevel1 == 2) {
                $teamfee = 100;
            } else if ($reflevel1 == 3) {
                $teamfee = 112;
            } else if ($reflevel1 == 4) {
                $teamfee = 125;
            } else if ($reflevel1 == 5) {
                $teamfee = 150;
            } else if ($reflevel1 == 6) {
                $teamfee = 175;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref1))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref1, 'invit' => $uid, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline2  > 1 and $refpaid2 == 1 and $plantype == 2) {
            if ($reflevel2 == 1) {
                $teamfee = 32;
            } else if ($reflevel2 == 2) {
                $teamfee = 43;
            } else if ($reflevel2 == 3) {
                $teamfee = 48;
            } else if ($reflevel2 == 4) {
                $teamfee = 53;
            } else if ($reflevel2 == 5) {
                $teamfee = 65;
            } else if ($reflevel2 == 6) {
                $teamfee = 75;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref2))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref2))->setInc('indirect', 1);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref2))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref2))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref2, 'invit' => $ref1, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline3  > 2 and $refpaid3 == 1 and $plantype == 2) {
            if ($reflevel3 == 1) {
                $teamfee = 27;
            } else if ($reflevel3 == 2) {
                $teamfee = 35;
            } else if ($reflevel3 == 3) {
                $teamfee = 40;
            } else if ($reflevel3 == 4) {
                $teamfee = 44;
            } else if ($reflevel3 == 5) {
                $teamfee = 53;
            } else if ($reflevel3 == 6) {
                $teamfee = 62;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref3))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref3))->setInc('indirect', 1);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref3))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref3))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref3, 'invit' => $ref2, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline4  > 3 and $refpaid4 == 1 and $plantype == 2) {
            if ($reflevel4 == 1) {
                $teamfee = 21;
            } else if ($reflevel4 == 2) {
                $teamfee = 23;
            } else if ($reflevel4 == 3) {
                $teamfee = 32;
            } else if ($reflevel4 == 4) {
                $teamfee = 35;
            } else if ($reflevel4 == 5) {
                $teamfee = 43;
            } else if ($reflevel4 == 6) {
                $teamfee = 50;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref4))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref4))->setInc('indirect', 1);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref4))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref4))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref4, 'invit' => $ref3, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline5  > 4 and $refpaid5 == 1 and $plantype == 2) {
            if ($reflevel5 == 1) {
                $teamfee = 10;
            } else if ($reflevel5 == 2) {
                $teamfee = 14;
            } else if ($reflevel5 == 3) {
                $teamfee = 16;
            } else if ($reflevel5 == 4) {
                $teamfee = 18;
            } else if ($reflevel5 == 5) {
                $teamfee = 21;
            } else if ($reflevel5 == 6) {
                $teamfee = 25;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref5))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref5))->setInc('indirect', 1);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref5))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref5))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref5, 'invit' => $ref4, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        if ($refline6  > 5 and $refpaid6 == 1 and $plantype == 2) {
            if ($reflevel6 == 1) {
                $teamfee = 7;
            } else if ($reflevel6 == 2) {
                $teamfee = 10;
            } else if ($reflevel6 == 3) {
                $teamfee = 12;
            } else if ($reflevel6 == 4) {
                $teamfee = 12;
            } else if ($reflevel6 == 5) {
                $teamfee = 15;
            } else if ($reflevel6 == 6) {
                $teamfee = 17;
            }
            $rs[] = $mo->table('extrade_user_coin')->where(array('userid' => $ref6))->setInc($coin, $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref6))->setInc('reward_total', $teamfee);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref6))->setInc('indirect', 1);
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref6))->setInc('reward_today', $teamfee);
            $rs[] = $mo->table('extrade_invit')->add(array('userid' => $ref6, 'invit' => $ref5, 'name' => 'ACTIVATION EARN', 'type' => 'activation', 'num' => $teamfee, 'mum' => $teamfee, 'fee' => 0, 'addtime' => time(), 'status' => 1));
        }
        #upgrade level
        $Directref1 = M('User')->where(array('invit_1' => $ref1, 'paid' => 1))->count();
        $Directref2 = M('User')->where(array('invit_1' => $ref2, 'paid' => 1))->count();
        $Directref3 = M('User')->where(array('invit_1' => $ref3, 'paid' => 1))->count();
        $Directref4 = M('User')->where(array('invit_1' => $ref4, 'paid' => 1))->count();
        $Directref5 = M('User')->where(array('invit_1' => $ref5, 'paid' => 1))->count();
        $Directref6 = M('User')->where(array('invit_1' => $ref6, 'paid' => 1))->count();
        $inDirectref1 = M('User')->where(array('id' => $ref1))->getField('indirect');
        $inDirectref2 = M('User')->where(array('id' => $ref2))->getField('indirect');
        $inDirectref3 = M('User')->where(array('id' => $ref3))->getField('indirect');
        $inDirectref4 = M('User')->where(array('id' => $ref4))->getField('indirect');
        $inDirectref5 = M('User')->where(array('id' => $ref5))->getField('indirect');
        $inDirectref6 = M('User')->where(array('id' => $ref6))->getField('indirect');

        if ($Directref1 > 2 and $inDirectref1 > 19 and $reflevel1 == 1) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setField('level', 2);
        } else if ($Directref1 > 4 and $inDirectref1 > 19 and $reflevel1 == 2) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setField('level', 3);
        } else if ($Directref1 > 7 and $inDirectref1 > 299 and $reflevel1 == 3) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setField('level', 4);
        } else if ($Directref1 > 11 and $inDirectref1 > 799 and $reflevel1 == 4) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setField('level', 5);
        } else if ($Directref1 > 19 and $inDirectref1 > 1499 and $reflevel1 == 5) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setField('level', 6);
        }
        if ($Directref2 > 2 and $inDirectref2 > 19 and $reflevel2 == 1) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref2))->setField('level', 2);
        } else if ($Directref2 > 4 and $inDirectref2 > 19 and $reflevel2 == 2) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref2))->setField('level', 3);
        } else if ($Directref2 > 7 and $inDirectref2 > 299 and $reflevel2 == 3) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref2))->setField('level', 4);
        } else if ($Directref2 > 11 and $inDirectref2 > 799 and $reflevel2 == 4) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref2))->setField('level', 5);
        } else if ($Directref2 > 19 and $inDirectref2 > 1499 and $reflevel2 == 5) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref1))->setField('level', 6);
        }
        if ($Directref3 > 2 and $inDirectref3 > 19 and $reflevel3 == 1) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref3))->setField('level', 2);
        } else if ($Directref3 > 4 and $inDirectref3 > 19 and $reflevel3 == 2) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref3))->setField('level', 3);
        } else if ($Directref3 > 7 and $inDirectref3 > 299 and $reflevel3 == 3) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref3))->setField('level', 4);
        } else if ($Directref3 > 11 and $inDirectref3 > 799 and $reflevel3 == 4) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref3))->setField('level', 5);
        } else if ($Directref3 > 19 and $inDirectref3 > 1499 and $reflevel3 == 5) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref3))->setField('level', 6);
        }
        if ($Directref4 > 2 and $inDirectref4 > 19 and $reflevel4 == 1) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref4))->setField('level', 2);
        } else if ($Directref4 > 4 and $inDirectref4 > 19 and $reflevel4 == 2) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref4))->setField('level', 3);
        } else if ($Directref4 > 7 and $inDirectref4 > 299 and $reflevel4 == 3) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref4))->setField('level', 4);
        } else if ($Directref4 > 11 and $inDirectref4 > 799 and $reflevel4 == 4) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref4))->setField('level', 5);
        } else if ($Directref4 > 19 and $inDirectref4 > 1499 and $reflevel4 == 5) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref4))->setField('level', 6);
        }
        if ($Directref5 > 2 and $inDirectref5 > 19 and $reflevel5 == 1) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref5))->setField('level', 2);
        } else if ($Directref5 > 4 and $inDirectref5 > 19 and $reflevel5 == 2) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref5))->setField('level', 3);
        } else if ($Directref5 > 7 and $inDirectref5 > 299 and $reflevel5 == 3) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref5))->setField('level', 4);
        } else if ($Directref5 > 11 and $inDirectref5 > 799 and $reflevel5 == 4) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref5))->setField('level', 5);
        } else if ($Directref5 > 19 and $inDirectref5 > 1499 and $reflevel5 == 5) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref5))->setField('level', 6);
        }
        if ($Directref6 > 2 and $inDirectref6 > 19 and $reflevel6 == 1) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref6))->setField('level', 2);
        } else if ($Directref6 > 4 and $inDirectref6 > 19 and $reflevel6 == 2) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref6))->setField('level', 3);
        } else if ($Directref6 > 7 and $inDirectref6 > 299 and $reflevel6 == 3) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref6))->setField('level', 4);
        } else if ($Directref6 > 11 and $inDirectref6 > 799 and $reflevel6 == 4) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref6))->setField('level', 5);
        } else if ($Directref6 > 19 and $inDirectref6 > 1499 and $reflevel6 == 5) {
            $rs[] = $mo->table('extrade_user')->where(array('id' => $ref6))->setField('level', 6);
        }
        if (check_arr($rs)) {
            $mo->execute('commit');
            $mo->execute('unlock tables');
            #$this->success($rs[0]);
            $this->success('Subscription succesful!');
        } else {
            $mo->execute('rollback');
            $this->error(L('FAILED'));
        }
    }

    public function imgUser($userId = null)
    {
        //Upload a user ID
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $userimg = M('User')->where(array('id' => $uid))->getField("idcardimg1");
        if ($userimg) {
            $img_arr = array();
            $img_arr = explode("_", $userimg);
            if (count($img_arr) >= 1) {
                M('User')->where(array('id' => $uid))->save(array('idcardimg1' => ''));
            }
        }

        $upload = new \Think\Upload();
        $upload->maxSize = 2048000;
        $upload->exts = array('jpg', 'gif', 'png', 'jpeg');
        $upload->rootPath = './Upload/idcard/';
        $upload->autoSub = false;
        $info = $upload->upload();

        if (!$info) {
            echo "error";
            exit();
        }

        foreach ($info as $k => $v) {


            $userimg = M('User')->where(array('id' => $uid))->getField("idcardimg1");
            if ($userimg) {
                $img_arr = array();
                $img_arr = explode("_", $userimg);
                if (count($img_arr) >= 1) {
                    echo "error2";
                    exit();
                }

                $path = $userimg . "_" . $v['savename'];
            } else {
                $path = $v['savename'];
            }
            if (count($img_arr) >= 1) {
                M('User')->where(array('id' => $uid))->save(array('idcardimg1' => $path, 'idcardinfo' => ''));
            } else {
                M('User')->where(array('id' => $uid))->save(array('idcardimg1' => $path));
            }
            echo $v['savename'];
            exit();
        }
    }

    public function Mycounselor()
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user  write');
        $active = M('User')->where(array('id' => $uid))->select();


        foreach ($active as $key => $val) {
            $activee[$key]['name'] = M('User')->where(array('id' => $val['invit_1']))->getField('username');
            $activee[$key]['email'] = M('User')->where(array('id' => $val['invit_1']))->getField('email');
        }
        $ret['My Counselor'] = $activee;
        $mo->execute('unlock tables');
        $this->ajaxShow($ret);
    }

    public function Team($userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        $mo = M();
        $mo->execute('set autocommit=0');
        $mo->execute('nolock tables extrade_user  write');
        $ret['Activate profit today'] = M('User')->where(array('id' => $uid))->getField('activate_today');
        $ret['Activate total profit'] = M('User')->where(array('id' => $uid))->getField('activate_total');
        $ret['Direct activated'] = M('User')->where(array('invit_1' => $uid))->where(array('paid' => 1))->count();
        $ret['Direct not activated'] = M('User')->where(array('invit_1' => $uid))->where(array('paid' => 0))->count();
        //$ret['Team activated'] =M('User')->where(array('invit_1' => $uid))->where(array('paid' => 1))->count();
        //$ret['Team not activated'] = M('User')->where(array('invit_1' => $uid))->where(array('paid' => 0))->count();


        $level2 = M('User')->where(array('invit_1' =>  $uid))->select();

        $sum2 = 0;
        $user2 = array();
        foreach ($level2 as $key => $val2) {
            $user2[] =  M('User')->where(array('invit_1' => $val2['id']))->getField('id');
            $level2total = M('User')->where(array('invit_1' => $val2['id'], 'paid' => 1))->count();
            $sum2 += $level2total;
        }
        $sum3 = 0;
        $user3 = array();
        foreach ($user2 as $key => $val3) {
            $user3[] = M('User')->where(array('invit_1' => $val3))->getField('id');
            $level3total = M('User')->where(array('invit_1' => $val3, 'paid' => 1))->count();
            $sum3 += $level3total;
        }
        $sum4 = 0;
        $user4 = array();
        foreach ($user3 as $key => $val4) {
            $user4[] = M('User')->where(array('invit_1' => $val4, 'paid' => 1))->getField('id');
            $level4total = M('User')->where(array('invit_1' => $val4, 'paid' => 1))->count();
            $sum4 += $level4total;
        }
        $sum5 = 0;
        $user5 = array();
        foreach ($user4 as $key => $val5) {
            $user5[] = M('User')->where(array('invit_1' => $val5))->getField('id');
            $level5total = M('User')->where(array('invit_1' => $val5, 'paid' => 1))->count();
            $sum5 += $level5total;
        }
        $sum6 = 0;
        $user6 = array();
        foreach ($user5 as $key => $val6) {
            $user6[] = M('User')->where(array('invit_1' => $val6))->getField('id');
            $level6total = M('User')->where(array('invit_1' => $val6, 'paid' => 1))->count();
            $sum6 += $level6total;
        }
        $total = $sum2 + $sum3 + $sum4 + $sum5 + $sum6;
        $level2 = M('User')->where(array('invit_1' =>  $uid))->select();

        $isum2 = 0;
        $user2 = array();
        foreach ($level2 as $key => $val2) {
            $user2[] =  M('User')->where(array('invit_1' => $val2['id']))->getField('id');
            $level2total = M('User')->where(array('invit_1' => $val2['id'], 'paid' => 0))->count();
            $isum2 += $level2total;
        }
        $isum3 = 0;
        $user3 = array();
        foreach ($user2 as $key => $val3) {
            $user3[] = M('User')->where(array('invit_1' => $val3))->getField('id');
            $level3total = M('User')->where(array('invit_1' => $val3, 'paid' => 0))->count();
            $isum3 += $level3total;
        }
        $isum4 = 0;
        $user4 = array();
        foreach ($user3 as $key => $val4) {
            $user4[] = M('User')->where(array('invit_1' => $val4))->getField('id');
            $level4total = M('User')->where(array('invit_1' => $val4, 'paid' => 0))->count();
            $isum4 += $level4total;
        }
        $isum5 = 0;
        $user5 = array();
        foreach ($user4 as $key => $val5) {
            $user5[] = M('User')->where(array('invit_1' => $val5))->getField('id');
            $level5total = M('User')->where(array('invit_1' => $val5, 'paid' => 0))->count();
            $isum5 += $level5total;
        }
        $isum6 = 0;
        $user6 = array();
        foreach ($user5 as $key => $val6) {
            $user6[] = M('User')->where(array('invit_1' => $val6))->getField('id');
            $level6total = M('User')->where(array('invit_1' => $val6, 'paid' => 0))->count();
            $isum6 += $level6total;
        }

        $itotal = $isum2 + $isum3 + $isum4 + $isum5 + $isum6;
        $active = M('User')->where(array('invit_1' => $uid))->select();



        foreach ($active as $key => $val) {
            $activee[$key]['Grade'] = $val['level'];
            $activee[$key]['Account'] = $val['username'];
            $activee[$key]['Number of team'] = M('User')->where(array('invit_1' => $val['id']))->count();
            $activee[$key]['Registration time'] = $val['addtime'];
        }

        $ret['Direct referrals'] = $activee;
        $ret['Team activated'] = $total;
        $ret['Team not activated'] = $itotal;
        $mo->execute('unlock tables');
        $this->ajaxShow($ret);
    }

    /* Google 2FA Function to set your 2FA code*/
    public function GetSet2FA($secret, $ga, $type, $ga_login, $ga_transfer, $userId = null)
    {
        if (empty($userId)) {
            if (!($uid = $this->userid())) {
                $this->error(L('PLEASE_LOGIN'));
            }
        } else {
            $uid = $userId;
        }

        if ($type == 'view') {

            $user = M('User')->where(array('id' => $uid))->find();
            $is_ga = ($user['ga'] ? 1 : 0);

            if ((!$is_ga)  and $type == 'view') {
                $ga = new \Common\Ext\GoogleAuthenticator();
                $secret = $ga->createSecret();
                session('secret', $secret);

                $qrCodeUrl = $ga->getQRCodeGoogleUrl($user['username'] . '%20-%20' . $_SERVER['HTTP_HOST'], $secret);
                $ret_array = array('secret' => $secret, 'qrCodeUrl' => $qrCodeUrl);
                $ret_array['status'] = 1;
                $ret_array['message'] = "Now use this secret and enter in authy ,save it and post in GetSet2FA";
                echo json_encode($ret_array);
                exit;
            } else {
                $arr = explode('|', $user['ga']);
                $out['status'] = 0;
                $out['ga_login'] = $arr[1];
                $out['ga_transfer'] = $arr[2];
                $out['message'] = "2FA required for login=$arr[1], 2FA required for withdrawal=$arr[2], Use post function and send your 2FA to add/update/or delete";
                echo json_encode($out);
                exit;
            }
        } else {
            if (!$uid) {
                $this->error('Please login first!');
            }

            $delete = '';
            $gacode = $ga;
            $type = $type;
            $ga_login = ($ga_login == false ? 0 : 1);
            $ga_transfer = ($ga_transfer == false ? 0 : 1);

            if (!$gacode) {
                $this->error('Enter 2FA Code!');
            }

            if ($type == 'add') {
                $secret = $secret;

                if (!$secret) {
                    $this->error('2FA has expired,Please resend!');
                }
            } else if (($type == 'update') || ($type == 'delete')) {
                $user = M('User')->where('id = ' . $uid)->find();

                if (!$user['ga']) {
                    $this->error('2FA setup isnt done yet!');
                }

                $arr = explode('|', $user['ga']);
                $secret = $arr[0];
                $delete = ($type == 'delete' ? 1 : 0);
            } else {
                $this->error(L('Type is undefined'));
            }

            $ga = new \Common\Ext\GoogleAuthenticator();


            if ($ga->verifyCode($secret, $gacode, 1)) {
                $ga_val = ($delete == '' ? $secret . '|' . $ga_login . '|' . $ga_transfer : '');
                M('User')->save(array('id' => $uid, 'ga' => $ga_val));
                $this->success(L('Successful operation'));
            } else {
                $this->error(L('Verification failed'));
            }
        }
    }
}
