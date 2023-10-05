import json
import time
import ccxt
import ctypes
import requests
import time,os,sys
import schedule
import threading
import sys
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import datetime
from dateutil import parser
from waitress import serve
import warnings
warnings.filterwarnings('ignore')
import urllib.parse

base_url = "https://backend.deltacyborg.pro/Api/Mobile"

def Decrypt_(enc_string):
    return urllib.parse.unquote(enc_string)

def GetBalance(exchange, exchange_id):
    balance = 0
    if exchange_id == 1:
        balance = exchange.fetch_balance()
        balance = balance['info']['availableBalance']
    elif exchange_id == 2:
        balance = exchange.fetch_balance()
        balance = balance['total']['USDT']
    elif exchange_id == 3:
        balance = exchange.fetch_balance()
        balance = balance["total"]['USDT']
    elif exchange_id == 4:
        balance = exchange.fetch_balance()
        balance = balance["USDT"]["total"]
    return balance

def Exchange_(values):
    exchange = getattr(ccxt, values['exchange_name'])({
        "apiKey": values.get('api_key', None),
        "secret": values.get('secret_key', None),
        "password": values.get('password', None),
        # "proxies": {
        #     'https': values.get('proxy', None),
        # },
        "options": {
            'defaultType': values.get('default_type', 'swap'),
            'defaultSubType': 'linear',
            'marginMode': 'cross',
            'newOrderRespType': 'RESULT',
            'recvWindow': 60000,
            'adjustForTimeDifference': True,
            'createMarketBuyOrderRequiresPrice': False,
        },
    })
    return exchange

app = Flask(__name__)
CORS(app)

@app.route('/botapi',  methods=['POST','GET'])
def botapi():

    user_id = request.args.get('user_id')  or request.get_json().get('user_id', '')
    api_key = request.args.get('api_key')  or request.get_json().get('api_key', '')
    api_secret = request.args.get('api_secret')  or request.get_json().get('api_secret', '')
    api_passphrase = request.args.get('api_passphrase')  or request.get_json().get('api_passphrase', '')
    platform = request.args.get('platform')  or request.get_json().get('platform', '')
    
    user_id = int(user_id)
    usdt = 'USDT'
    in_position = False
    platform = int(platform)
    
    api_key = Decrypt_(api_key)
    api_secret = Decrypt_(api_secret)
    api_passphrase = Decrypt_(api_passphrase)

    
    if platform == 1:
        exchange = ccxt.binance({
            "apiKey": api_key,
            "secret": api_secret
        })
        
        exchange_name = 'binance'
        values = {'exchange_name': exchange_name, 'api_key': Decrypt_(api_key),
                          'secret_key': Decrypt_(api_secret),
                          'default_type': 'future', 'market_name': exchange_name}
        
        featureExchange = Exchange_(values)
        
    if platform == 2:
        exchange = ccxt.kucoin({
            "apiKey": api_key,
            "secret": api_secret,
            "password": api_passphrase,
        })
        
        exchange_name = 'kucoinfutures'
        values = {'exchange_name': exchange_name, 'api_key': Decrypt_(api_key),
                          'secret_key': Decrypt_(api_secret), "password": api_passphrase,
                          'market_name': exchange_name}
        
        featureExchange = Exchange_(values)
        
    if platform == 3:
        exchange = ccxt.coinbasepro({
            "apiKey": api_key,
            "secret": api_secret,
            "password": api_passphrase
        })
        
        exchange_name = 'coinbasepro'
        values = {'exchange_name': exchange_name, 'api_key': Decrypt_(api_key),
                          'secret_key': Decrypt_(api_secret), "password": api_passphrase,
                          'market_name': exchange_name}
        
        featureExchange = Exchange_(values)
        
    if platform == 4:
        exchange = ccxt.kraken({
            "apiKey": api_key,
            "secret": api_secret,
        })
        
        exchange_name = 'coinbasepro'
        values = {'exchange_name': exchange_name, 'api_key': Decrypt_(api_key),
                          'secret_key': Decrypt_(api_secret),
                          'market_name': exchange_name}
        
        featureExchange = Exchange_(values)

    flag = 0
    while True:
        try:
                    
            if platform == 1:
               #market = 'BTC/USDT'
               balance = exchange.fetch_balance()
               #print(balance)
               BTC = balance['free']['BTC']
               ETH = balance['free']['ETH']
               BNB = balance['free']['BNB']
               HBAR = balance['free']['HBAR']
               HOT = balance['free']['HOT']
               QTUM = balance['free']['QTUM']
               VET = balance['free']['VET']
               XLM = balance['free']['XLM']
               INCH = balance['free']['1INCH']
               AAVE = balance['free']['AAVE']
               ADA = balance['free']['ADA']
               CAKE = balance['free']['CAKE']
               DASH = balance['free']['DASH']
               DOGE = balance['free']['DOGE']
               DOT = balance['free']['DOT']
               EOS = balance['free']['EOS']
               ETC = balance['free']['ETC']
               FIL = balance['free']['FIL']
               FTT = balance['free']['FTT']
               GRT = balance['free']['GRT']
               LINK = balance['free']['LINK']
               LTC = balance['free']['LTC']
               THETA = balance['free']['THETA']            
               UNI = balance['free']['UNI']
               XMR = balance['free']['XMR']
               XRP = balance['free']['XRP']
               XTZ = balance['free']['XTZ']
               ALICE = balance['free']['ALICE']
               SOL = balance['free']['SOL']
               LUNA = balance['free']['LUNA']
               FTM = balance['free']['FTM']
               balance = balance['free']['USDT'] 
               futures_balance = GetBalance(featureExchange, platform)
               
               link = f"{base_url}/postconvertbalance?user_id={user_id}&platform={platform}&btc={BTC}&eth={ETH}&bnb={BNB}&hbar={HBAR}&hot={HOT}&qtum={QTUM}&vet={VET}&xlm={XLM}&inch={INCH}&aave={AAVE}&ada={ADA}&cake={CAKE}&dash={DASH}&doge={DOGE}&dot={DOT}&eos={EOS}&etc={ETC}&fil={FIL}&ftt={FTT}&grt={GRT}&link={LINK}&ltc={LTC}&theta={THETA}&uni={UNI}&xmr={XMR}&xrp={XRP}&xtz={XTZ}&alice={ALICE}&sol={SOL}&luna={LUNA}&ftm={FTM}"
               response = requests.get(link)
               print(balance)
               
               link = f"{base_url}/postbalance?&user_id={user_id}&balance={balance}&platform={platform}&futures_balance={futures_balance}"
               #print(link)
               response = requests.get(link)
               #print(response
               
            if platform == 2:
                m = exchange.load_markets()
                
                balance = exchange.fetch_balance()
                balance = balance['total']['USDT']
                
                futures_balance = GetBalance(featureExchange, platform)
                #print(balance)
                in_position = True
                link = f"{base_url}/postbalance?&user_id={user_id}&balance={balance}&platform={platform}&futures_balance={futures_balance}"
                response = requests.get(link)
               
            if platform == 3:
               #market = 'BTC/USDT'
               balance = exchange.fetch_balance()
               balance = balance["total"]['USDT']
               futures_balance = GetBalance(featureExchange, platform)
               link = f"{base_url}/postbalance?&user_id={user_id}&balance={balance}&platform={platform}&futures_balance={futures_balance}"
               #print(link)
               response = requests.get(link)
               #print(response)
               
            if platform == 4:
               #market = 'BTC/USDT'
               balance = exchange.fetch_balance()
               balance = balance["USDT"]["total"]
               futures_balance = GetBalance(featureExchange, platform)
               link = f"{base_url}/postbalance?&user_id={user_id}&balance={balance}&platform={platform}&futures_balance={futures_balance}"
               #print(link)
               response = requests.get(link)
               #print(response)
                        
            return jsonify({"Status": "SUCCESS","balance":balance,"futures_balance":futures_balance})

        except Exception as e:
            errorMessage = (f"{e}")
            print(e)
            return jsonify({"Status": " EROR","message": errorMessage})
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5232, debug=True)
    # serve(app, port=5232, threads=100)
