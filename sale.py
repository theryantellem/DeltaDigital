from flask import Flask, jsonify, request
import ccxt
from flask_cors import CORS
from waitress import serve
import warnings
warnings.filterwarnings("ignore")
import requests
import urllib.parse
import time

def Decrypt_(enc_string):
    return urllib.parse.unquote(enc_string)

def GetBalance(exchange, exchange_id):
    balance = 0
    if exchange_id == 1:
        balance = exchange.fetch_balance()
        balance = balance["info"]["availableBalance"]
    elif exchange_id == 2:
        balance = exchange.fetch_balance()
        balance = balance["total"]["USDT"]
    elif exchange_id == 3:
        balance = exchange.fetch_balance()
        balance = balance["total"]["USDT"]
    elif exchange_id == 4:
        balance = exchange.fetch_balance()
        balance = balance["USDT"]["total"]
    return balance

def Exchange_(values):
    exchange = getattr(ccxt, values["exchange_name"])(
        {
            "apiKey": values.get("api_key", None),
            "secret": values.get("secret_key", None),
            "password": values.get("password", None),
            "options": {
                "defaultType": values.get("default_type", "swap"),
                "defaultSubType": "linear",
                "marginMode": "cross",
                "newOrderRespType": "RESULT",
                "recvWindow": 60000,
                "adjustForTimeDifference": True,
                "createMarketBuyOrderRequiresPrice": False,
            },
        }
    )

    return exchange

app = Flask(__name__)
CORS(app)

@app.route("/botapi", methods=["POST", "GET"])
def bot():
    coin = "HBAR"
    api_key="bcSY6cq2k7JAfLrK5MsnRgcrBjmKEIT7l1BitZZwCKJ8sCeekamCLwRi8Qic8dbK"
    api_secret="aq9VU0o5bIEtplFPqexB3QHpWpTWatjuG6ITp9mCsOCbMJTblipaMApBSuifjNxo"
    
    market = coin + "USDT"
    exchange_name = "binance"
    
    values = {
        "exchange_name": exchange_name,
        "api_key": Decrypt_(api_key),
        "secret_key": Decrypt_(api_secret),
        "default_type": "future",
        "market_name": exchange_name,
        }
    
    exchange = Exchange_(values)
    
    balance = GetBalance(exchange, 1)
    
    return jsonify(balance)
    
    # order = exchange.create_market_sell_order(
    #                         market,
    #                         ,
    #                         params={
    #                             "leverage": 1,
    #                             "newClientOrderId": "x-zcYWaQcS",
    #                             "reduceOnly": True,
    #                      },
    #                 )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5236, debug=True)
    # serve(app, port=5231)
    bot()