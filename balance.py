from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import ccxt
import ctypes
import requests
import time,os,sys
from dateutil import parser
from waitress import serve
import warnings
warnings.filterwarnings('ignore')
import urllib.parse

base_url = "https://backend.deltacyborg.pro/Api/Mobile"

def Decrypt_(enc_string):
    return urllib.parse.unquote(enc_string)

def Exchange_(values,default_type=None):
    exchange_class = getattr(ccxt, values['exchange_name'])
    exchange = exchange_class({
        "apiKey": values.get('api_key', None),
        "secret": values.get('secret_key', None),
        "password": values.get('password', None),
        # 'adjustForTimeDifference': False
    })
    
    if(default_type is not None):
        exchange.options['defaultType'] = default_type
        exchange.options['adjustForTimeDifference'] = True
    
    return exchange

def GetBalance(exchange,exchange_id):
    balance = 0
    
    if exchange_id == 1:
        balance = exchange.fetch_balance()
        balance = balance['total']['USDT']
        # balance = balance['info']['availableBalance']
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
    platform = int(platform)
    
    api_key = Decrypt_(api_key)
    api_secret = Decrypt_(api_secret)
    api_passphrase = Decrypt_(api_passphrase)
    
    future_balance =0
    spot_balance = 0
    
    while True:
        try:
            if platform == 1:#bianace
                values = {'exchange_name': 'binance', 'api_key': api_key,
                          'secret_key': api_secret}
                # future market
                futureExchange = Exchange_(values,"future")   
                # spot market
                spotExchange = Exchange_(values)    
                spot_balance = GetBalance(spotExchange,platform)    

            
            if platform == 2: #kucoin
                future_values = {'exchange_name': 'kucoinfutures', 'api_key': api_key,
                          'secret_key': api_secret,"password": api_passphrase}
                
                values = {'exchange_name': 'kucoin', 'api_key': api_key,
                          'secret_key': api_secret, "password": api_passphrase}
                
               # future market
                futureExchange = Exchange_(future_values,"future")        
                 
                # spot market
                spotExchange = Exchange_(values) 
                spot_balance = GetBalance(spotExchange,platform)
                    
            if platform == 3: #coinbasepro
                values = {'exchange_name': 'coinbasepro', 'api_key': api_key,
                          'secret_key': api_secret,"password": api_passphrase}       
                 
                # spot market
                spotExchange = Exchange_(values)
                spot_balance = GetBalance(spotExchange,platform)
                
            if platform == 4: #kraken
                
                values = {'exchange_name': 'kraken', 'api_key': api_key,
                          'secret_key': api_secret}      
                # spot market
                spotExchange = Exchange_(values) 
                
                spot_balance = GetBalance(spotExchange,platform)
            
            future_balance = GetBalance(futureExchange,platform)
            
            link = f"{base_url}/postbalance?&user_id={user_id}&balance={spot_balance}&platform={platform}&futures_balance={future_balance}"
            requests.get(link)
            
            return jsonify({"Status": "SUCCESS","balance":spot_balance,"futures_balance":future_balance})
            
                
        except Exception as e:
            errorMessage = (f"{e}")
            print(e)
            return jsonify({"Status": " EROR","message": errorMessage})


if __name__ == '__main__':
    # app.run(host="0.0.0.0", port=5232, debug=True)
    serve(app, port=5232, threads=100)