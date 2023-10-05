from flask import Flask, jsonify, request,Response
import ccxt
from flask_cors import CORS
from waitress import serve
import warnings
warnings.filterwarnings('ignore')
import requests
import urllib.parse
from multiprocessing import Process
import time

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

def TradePrice(exchange, market):
    trade_price = exchange.fetch_ticker(market)
    trade_price = trade_price['last']

    return trade_price

def ExpHandler(resp):
    if resp['retCode'] != 0:
        raise Exception(resp['retMsg'])
    
    
def Exchange_(values):
    exchange = getattr(ccxt, values['exchange_name'])({
        "apiKey": values.get('api_key', None),
        "secret": values.get('secret_key', None),
        "password": values.get('password', None),
        "options": {
            'defaultType': values.get('default_type', 'swap'),
            'defaultSubType': 'linear',
            'marginMode': 'cross',
            'newOrderRespType': 'RESULT',
            'recvWindow': 60000,
            'adjustForTimeDifference': True,
            'createMarketBuyOrderRequiresPrice': False
        },
    })
    
    return exchange

app = Flask(__name__)
CORS(app)

@app.route('/botapi',  methods=['POST', 'GET'])
def bot():
    api_key = "X5sVMBJguI+v11RLs7k/RQwPZnNQDuh/jX+4MZqtqqSG2mz276Pz14ha"
    api_secret = "K4JucpPN63YvWTbqvR5S1+iZDfVw6joTzRY6f6IJ0cZa85VQ9eoaYzQE1feo/hDSHScIRBOgES+v3+rGzxlDIw=="
    api_passphrase = 0
    coin = "ETH"
    first_amount = 2
    leverage = 1
        
    while True:
        try:
            market = coin + '/USDT'
            exchange_name = 'kraken'
            values = {'exchange_name': exchange_name, 'api_key': Decrypt_(api_key),
                            'secret_key': Decrypt_(api_secret),
                            'market_name': exchange_name}
            exchange = Exchange_(values)
            
            balance = GetBalance(exchange, 4)
            
            trade_price = TradePrice(exchange, market)
            trade_price = float(trade_price)
            
            qty = float(first_amount) / float(trade_price)
            qty = "{:0.0{}f}".format(qty, 5)
            
            qty = float(qty) * float(leverage)
            # setlev = exchange.set_leverage(leverage, market)
            mode = exchange.set_margin_mode(
                    marginMode='cross', symbol=market, params={})
            order = exchange.create_market_buy_order(
                    market, qty, params={'newClientOrderId': "x-zcYWaQcS"})
            
            return jsonify({"order": order})
            
            
        except (ccxt.ExchangeError, ccxt.AuthenticationError, ccxt.ExchangeNotAvailable, ccxt.RequestTimeout,
                    ccxt.PermissionDenied, ccxt.InsufficientFunds, ccxt.OrderNotFound, ccxt.InvalidOrder,
                    ccxt.NotSupported) as e:
                    errorMessage = (f"{e}, L{e.__traceback__.tb_lineno}N")
                    
                    return jsonify({'errorMessage': errorMessage})
        except Exception as e:
                errorMessage = (f"{e}, L{e.__traceback__.tb_lineno}N")
                
                return jsonify({'errorMessage': errorMessage})
            

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5236, debug=True)