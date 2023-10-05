from flask import Flask, jsonify, request,Response
import requests
import time
import json
import sys
import ccxt
from flask_cors import CORS, cross_origin
from dateutil import parser
from waitress import serve
import warnings
warnings.filterwarnings('ignore')
import urllib.parse

app = Flask(__name__)

CORS(app)

@app.route('/botapi',  methods=['POST', 'GET'])
def bot():
    # get post/get parameters 
    user_id = request.args.get(
            'user_id') or request.get_json().get('user_id', '')
    setid = request.args.get(
            'setid') or request.get_json().get('setid', '')
    gas = request.args.get('gas') or request.get_json().get('gas', '')
    first_buy = request.args.get(
            'first_buy') or request.get_json().get('first_buy', '')
    first_price = request.args.get(
            'first_price') or request.get_json().get('first_price', '')
    platform = request.args.get(
            'platform') or request.get_json().get('platform', '')
    api_key = request.args.get(
            'api_key') or request.get_json().get('api_key', '')
    api_secret = request.args.get(
            'api_secret') or request.get_json().get('api_secret', '')
    api_passphrase = request.args.get(
            'api_passphrase') or request.get_json().get('api_passphrase', '')
    in_position = request.args.get(
            'in_position', False) or request.get_json().get('in_position', False)
    buy_position = request.args.get(
            'buy_position', False) or request.get_json().get('buy_position', False)
    sell_position = request.args.get(
            'sell_position', False) or request.get_json().get('sell_position', False)
    coin = request.args.get('coin') or request.get_json().get('coin', '')
    trade_price = request.args.get(
            'trade_price') or request.get_json().get('trade_price', '')
    firstbuy_amount = request.args.get(
            'firstbuy_amount') or request.get_json().get('firstbuy_amount', '')
    qty = request.args.get('qty') or request.get_json().get('qty', '')
    double_position = request.args.get(
            'double_position') or request.get_json().get('double_position', '')
    margin_call = request.args.get(
            'margin_limit') or request.get_json().get('margin_limit', '')
    profit_ratio = request.args.get(
            'profit_ratio') or request.get_json().get('profit_ratio', '')
    whole_ratio = request.args.get(
            'whole_ratio') or request.get_json().get('whole_ratio', '')
    price_drop = request.args.get(
            'price_drop') or request.get_json().get('price_drop', '')
    m_ratio = request.args.get(
            'm_ratio') or request.get_json().get('m_ratio', '')
    profit_callback = request.args.get(
            'profit_callback') or request.get_json().get('profit_callback', '')
    buycallback = request.args.get(
            'buycallback') or request.get_json().get('buycallback', '')
    position_amount = request.args.get(
            'position_amount') or request.get_json().get('position_amount', '')
    
    string_to_bool = lambda str: True if str.lower()=="true" else False
    
    in_position = string_to_bool(in_position)
    buy_position = string_to_bool(buy_position)
    sell_position = string_to_bool(sell_position)

    gas = float(gas)
    balance = 0
    qtyusdt = 0
    price_drop = price_drop.split('|')
    m_ratio = m_ratio.split('|')
    platform = int(platform)
    margin_call = int(margin_call)
    setid = int(setid)
    user_id = int(user_id)
    usdt = 'USDT'
    buycallback = float(buycallback)
    profit_ratio = float(profit_ratio)
    whole_ratio = float(whole_ratio)
    profit_callback = float(profit_callback)
    trade_price = float(trade_price)
    order_price = float(trade_price)
    firstbuy_amount = int(firstbuy_amount)
    first_buy = int(first_buy)
    first_price = float(first_price)
    position_amount = float(position_amount)
    sold = 0
    beforeqty = qty
    
    api_key = urllib.parse.unquote(api_key)
    api_secret = urllib.parse.unquote(api_secret)
    api_passphrase = urllib.parse.unquote(api_passphrase)
    
    flag = 0
    
    while True:
        try:
            #set market
            market = coin + '/USDT'
            # set exchange for binance
            if platform == 1:
                exchange = ccxt.binance({
                    "apiKey": api_key,
                    "secret": api_secret,
                })
                m = exchange.load_markets()
                
                balance = exchange.fetch_balance()
                # print(balance)
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
                
                link = f"https://backend.deltacyborg.pro/Api/Mobile/postconvertbalance?user_id={user_id}&platform={platform}&btc={BTC}&eth={ETH}&bnb={BNB}&hbar={HBAR}&hot={HOT}&qtum={QTUM}&vet={VET}&xlm={XLM}&inch={INCH}&aave={AAVE}&ada={ADA}&cake={CAKE}&dash={DASH}&doge={DOGE}&dot={DOT}&eos={EOS}&etc={ETC}&fil={FIL}&ftt={FTT}&grt={GRT}&link={LINK}&ltc={LTC}&theta={THETA}&uni={UNI}&xmr={XMR}&xrp={XRP}&xtz={XTZ}&alice={ALICE}&sol={SOL}&luna={LUNA}&ftm={FTM}"
                response = requests.get(link)
            
            # set exchange for kucoin
            elif platform == 2:
                exchange = ccxt.kucoin({
                    "apiKey": api_key,
                    "secret": api_secret,
                    "password": api_passphrase,
                })
                
                m = exchange.load_markets()
                
                balance = exchange.fetch_balance()
                balance = balance['total']['USDT']

                
            # set exchange coinbase pro
            elif platform == 3:
                exchange = ccxt.coinbasepro({
                    "apiKey": api_key,
                    "secret": api_secret,
                    "password": api_passphrase
                })
                
                m = exchange.load_markets()
                
                balance = exchange.fetch_balance()
                balance = balance["total"]['USDT']
                
            # set exchange kraken
            elif platform == 4:
                exchange = ccxt.kraken({
                    "apiKey": api_key,
                    "secret": api_secret,
                })
                
                m = exchange.load_markets()
                
                balance = exchange.fetch_balance()
                balance = balance["USDT"]["total"]
            
            # check position 
            if in_position == False:
                # check the gas fee
                if platform == 1 and in_position == False and sell_position == False and buy_position == False and gas > 9 and  first_buy == 0:
                    trade_price = exchange.fetch_ticker(market)
                    trade_price = trade_price['last'] 
                    trade_price = float(trade_price)                    
                    qty = float(firstbuy_amount) / float(trade_price) 
                    qty =  "{:0.0{}f}".format(qty , 5) 
                    order = exchange.create_market_buy_order(market, qty)
                    qty = order['info']['executedQty'] 
                    cal_qty = float(qty) * 0.1 / 100 
                    qty = float(qty) - float(cal_qty) 
                    qty = float(qty)
                    qtyusdt = order['info']['cummulativeQuoteQty'] 
                    trade_price = order['price'] 
                    order_price = trade_price
                    #order = exchange.create_order(symbol, type, side, amount, price, params)
                    position_amount = qtyusdt
                    tgmessage="First buy order succesfully filled. "                                        
                    sell_position = False
                    buy_position = True
                    in_position = True
                    first_buy = 0
                    link = f"https://backend.deltacyborg.pro/Api/Mobile/posttrade?setid={setid}&user_id={user_id}&qty={qty}&in_position={in_position}&buy_position={buy_position}&sell_position={sell_position}&trade_price={trade_price}&tgmessage={tgmessage}&first_buy={first_buy}&position_amount={qtyusdt}&first_price={trade_price}&balance={balance}&platform={platform}"
                    response = requests.get(link)
 
                if platform == 2 and in_position == False and sell_position == False and buy_position == False and gas > 9 and  first_buy == 0:
                    trade_price = exchange.fetch_ticker(market)
                    trade_price = trade_price['last'] 
                    trade_price = float(trade_price)                    
                    qty = float(firstbuy_amount) / float(trade_price) 
                    qty =  "{:0.0{}f}".format(qty , 5) 
                    order = exchange.create_market_buy_order(market, qty)
                    order_id = order['info']['orderId']
                    getorder = exchange.fetch_order(order_id)
                    qty = getorder['amount']
                    qty = float(qty)
                    qtyusdt = getorder['cost'] 
                    order_price = getorder['price']
                    trade_price =  order_price
                    position_amount = qtyusdt
                    tgmessage="First buy order succesfully filled. "                                        
                    sell_position = False
                    buy_position = True
                    in_position = True
                    first_buy = 0
                    link = f"https://backend.deltacyborg.pro/Api/Mobile/posttrade?setid={setid}&user_id={user_id}&qty={qty}&in_position={in_position}&buy_position={buy_position}&sell_position={sell_position}&trade_price={trade_price}&tgmessage={tgmessage}&first_buy={first_buy}&position_amount={qtyusdt}&first_price={trade_price}&balance={balance}&platform={platform}"
                    response = requests.get(link) 
                    
                if platform == 3 and in_position == False and sell_position == False and buy_position == False and gas > 9 and  first_buy == 0:
                    trade_price = exchange.fetch_ticker(market)
                    trade_price = trade_price['last'] 
                    trade_price = float(trade_price)                    
                    qty = float(firstbuy_amount) / float(trade_price) 
                    qty =  "{:0.0{}f}".format(qty , 5) 
                    order = exchange.create_market_buy_order(market, qty)
                    qty = order['filled_size']
                    qty = float(qty) 
                    qtyusdt = order['executed_value'] 
                    order_price = order['price']
                    trade_price =  order_price
                    position_amount = qtyusdt
                    tgmessage="First buy order succesfully filled. "                                        
                    sell_position = False
                    buy_position = True
                    in_position = True
                    first_buy = 0
                    link = f"https://backend.deltacyborg.pro/Api/Mobile/posttrade?setid={setid}&user_id={user_id}&qty={qty}&in_position={in_position}&buy_position={buy_position}&sell_position={sell_position}&trade_price={trade_price}&tgmessage={tgmessage}&first_buy={first_buy}&position_amount={qtyusdt}&first_price={trade_price}&balance={balance}&platform={platform}"
                    response = requests.get(link)                     
                    
                if platform == 4 and in_position == False and sell_position == False and buy_position == False and gas > 9 and  first_buy == 0:
                    trade_price = exchange.fetch_ticker(market)
                    trade_price = trade_price['last'] 
                    trade_price = float(trade_price)                    
                    qty = float(firstbuy_amount) / float(trade_price) 
                    qty =  "{:0.0{}f}".format(qty , 5) 
                    order = exchange.create_market_buy_order(market, qty)
                    order_id = order["id"]
                    getorder = exchange.fetch_order(order_id)
                    qty = getorder['amount']
                    qty = float(qty) 
                    qtyusdt = getorder['cost'] 
                    order_price = getorder['price']
                    trade_price =  order_price
                    position_amount = qtyusdt
                    tgmessage="First buy order succesfully filled. "                                        
                    sell_position = False
                    buy_position = True
                    in_position = True
                    first_buy = 0
                    link = f"https://backend.deltacyborg.pro/Api/Mobile/posttrade?setid={setid}&user_id={user_id}&qty={qty}&in_position={in_position}&buy_position={buy_position}&sell_position={sell_position}&trade_price={trade_price}&tgmessage={tgmessage}&first_buy={first_buy}&position_amount={qtyusdt}&first_price={trade_price}&balance={balance}&platform={platform}"
                    response = requests.get(link)                     
                    
                    
            if in_position == True and buy_position == True  and sell_position == False and platform == 1:
                cal = float(order_price) * float(whole_ratio) / 100
                cal2 = float(order_price) + float(cal)
                trade_price = exchange.fetch_ticker(market)
                trade_price = trade_price['last']
                trade_price = float(trade_price)
                if trade_price  >  cal2:
                    nqty = float(qty) * 0.1 / 100
                    qty = float(qty) - float(nqty)
                    qty = round(qty,5)
                    sold = 1
                    order = exchange.create_market_sell_order(market, qty)
                    qty = order['info']['executedQty'] 
                    qtyusdt = order['info']['cummulativeQuoteQty'] 
                    trade_price = order['price']
                    qtyusdt =  float(qtyusdt)
                    qty = float(qty)
                    profit = qtyusdt - position_amount
                    #print(order)
                    tgmessage="Trade closed, take profit ratio reached " 
                    buy_position = False
                    sell_position = False
                    in_position = False   
                    first_buy = 0 
                    balance = exchange.fetch_balance()
                    balance = balance['free']['USDT']                    
                    link = f"https://backend.deltacyborg.pro/Api/Mobile/settletrade?setid={setid}&user_id={user_id}&qty={qty}&in_position={in_position}&buy_position={buy_position}&sell_position={sell_position}&trade_price={trade_price}&tgmessage={tgmessage}&first_buy={first_buy}&position_amount={qtyusdt}&profit={profit}&coin={coin}&exchange={platform}&balance={balance}"
                    response = requests.get(link)            
                    
            if in_position == True and buy_position == True  and sell_position == False and platform == 2:
                cal = float(order_price) * float(whole_ratio) / 100
                cal2 = float(order_price) + float(cal)
                trade_price = exchange.fetch_ticker(market)
                trade_price = trade_price['last']
                trade_price = float(trade_price)
                if trade_price  >  cal2:
                    nqty = float(qty) * 0.1 / 100
                    qty = float(qty) - float(nqty)
                    qty = round(qty,5)
                    sold = 1
                    order = exchange.create_market_sell_order(market, qty)
                    order_id = order['info']['orderId']
                    getorder = exchange.fetch_order(order_id)
                    qty = getorder['amount']
                    qty = float(qty)
                    qtyusdt = getorder['cost'] 
                    order_price = getorder['price']
                    trade_price =  order_price
                    position_amount = qtyusdt
                    qtyusdt =  float(qtyusdt)
                    profit = qtyusdt - position_amount
                    tgmessage="Trade closed, take profit ratio reached " 
                    buy_position = False
                    sell_position = False
                    in_position = False   
                    first_buy = 0 
                    balance = exchange.fetch_balance()
                    balance = balance['total']['USDT']                    
                    link = f"https://backend.deltacyborg.pro/Api/Mobile/settletrade?setid={setid}&user_id={user_id}&qty={qty}&in_position={in_position}&buy_position={buy_position}&sell_position={sell_position}&trade_price={trade_price}&tgmessage={tgmessage}&first_buy={first_buy}&position_amount={qtyusdt}&profit={profit}&coin={coin}&exchange={platform}&balance={balance}"
                    response = requests.get(link)  

            if in_position == True and buy_position == True  and sell_position == False and platform == 3:
                cal = float(order_price) * float(whole_ratio) / 100
                cal2 = float(order_price) + float(cal)
                trade_price = exchange.fetch_ticker(market)
                trade_price = trade_price['last']
                trade_price = float(trade_price)
                if trade_price  >  cal2:
                    nqty = float(qty) * 0.1 / 100
                    qty = float(qty) - float(nqty)
                    qty = round(qty,5)
                    sold = 1
                    order = exchange.create_market_sell_order(market, qty)
                    order_id = order['info']['orderId']
                    getorder = exchange.fetch_order(order_id)
                    qty = getorder['amount']
                    qtyusdt = getorder['cost'] 
                    order_price = getorder['price']
                    trade_price =  order_price
                    position_amount = qtyusdt
                    qtyusdt =  float(qtyusdt)
                    qty = float(qty)
                    profit = qtyusdt - position_amount
                    tgmessage="Trade closed, take profit ratio reached " 
                    buy_position = False
                    sell_position = False
                    in_position = False   
                    first_buy = 0 
                    balance = exchange.fetch_balance()
                    balance = balance["total"]['USDT']                    
                    link = f"https://backend.deltacyborg.pro/Api/Mobile/settletrade?setid={setid}&user_id={user_id}&qty={qty}&in_position={in_position}&buy_position={buy_position}&sell_position={sell_position}&trade_price={trade_price}&tgmessage={tgmessage}&first_buy={first_buy}&position_amount={qtyusdt}&profit={profit}&coin={coin}&exchange={platform}&balance={balance}"
                    response = requests.get(link)  
                                        

            if in_position == True and buy_position == True  and sell_position == False and platform == 4:
                cal = float(order_price) * float(whole_ratio) / 100
                cal2 = float(order_price) + float(cal)
                trade_price = exchange.fetch_ticker(market)
                trade_price = trade_price['last']
                trade_price = float(trade_price)
                if trade_price  >  cal2:
                    nqty = float(qty) * 0.1 / 100
                    qty = float(qty) - float(nqty)
                    qty = round(qty,5)
                    sold = 1
                    order = exchange.create_market_sell_order(market, qty)
                    order_id = order["id"]
                    getorder = exchange.fetch_order(order_id)
                    qty = getorder['amount']
                    qty = float(qty) 
                    qtyusdt = getorder['cost'] 
                    order_price = getorder['price']
                    trade_price =  order_price
                    position_amount = qtyusdt
                    qtyusdt =  float(qtyusdt)
                    qty = float(qty)
                    profit = qtyusdt - position_amount
                    tgmessage="Trade closed, take profit ratio reached " 
                    buy_position = False
                    sell_position = False
                    in_position = False   
                    first_buy = 0 
                    balance = exchange.fetch_balance()
                    balance = balance["USDT"]["total"]                    
                    link = f"https://backend.deltacyborg.pro/Api/Mobile/settletrade?setid={setid}&user_id={user_id}&qty={qty}&in_position={in_position}&buy_position={buy_position}&sell_position={sell_position}&trade_price={trade_price}&tgmessage={tgmessage}&first_buy={first_buy}&position_amount={qtyusdt}&profit={profit}&coin={coin}&exchange={platform}&balance={balance}"
                    response = requests.get(link)  
                                                           
                    
            margin_call = int(margin_call)
            first_buy = int(first_buy)
            if platform == 1 and in_position == True and sell_position == False and buy_position == True and gas > 9 and margin_call  > 0  and  margin_call != first_buy:
                cal = float(first_price) * float(price_drop[first_buy]) / 100
                cal2 = first_price - cal
                trade_price = exchange.fetch_ticker(market)
                trade_price = trade_price['last'] 
                trade_price = float(trade_price)
                if trade_price  <  cal2:
                    qty = float(firstbuy_amount) * float(m_ratio[first_buy]) / float(trade_price) 
                    qty = round(qty,5)
                    order = exchange.create_market_buy_order(market, qty)
                    qty = order['info']['executedQty'] 
                    qtyusdt = order['info']['cummulativeQuoteQty'] 
                    cal_qty = float(qty) * 0.1 / 100 
                    qty = float(qty) - float(cal_qty) 
                    qty = float(qty)
                    trade_price = order['price'] 
                    # trade_price = float(order_price) + float(trade_price)
                    # trade_price = trade_price  / 2
                    # trade_price = float(trade_price)
                    position_amount = float(qtyusdt) + float(position_amount)
                    totalqty = float(qty) + float(beforeqty) 
                    avgprice = float(position_amount) /  float(totalqty)
                    trade_price = avgprice
                    first_buy = first_buy + 1
                    tgmessage= f"No {first_buy} martingale buy succesfully filled. "                                        
                    sell_position = False
                    buy_position = True
                    in_position = True
                    link = f"https://backend.deltacyborg.pro/Api/Mobile/posttrade?setid={setid}&user_id={user_id}&qty={qty}&in_position={in_position}&buy_position={buy_position}&sell_position={sell_position}&trade_price={trade_price}&tgmessage={tgmessage}&first_buy={first_buy}&position_amount={qtyusdt}&first_price={first_price}&balance={balance}&platform={platform}"
                    response = requests.get(link)   

            if platform == 2 and in_position == True and sell_position == False and buy_position == True and gas > 9 and margin_call  > 0  and  margin_call != first_buy:
                cal = float(first_price) * float(price_drop[first_buy]) / 100
                cal2 = first_price - cal
                trade_price = exchange.fetch_ticker(market)
                trade_price = trade_price['last'] 
                trade_price = float(trade_price)
                if trade_price  <  cal2:
                    qty = float(firstbuy_amount) * float(m_ratio[first_buy]) / float(trade_price) 
                    qty = round(qty,5)
                    order = exchange.create_market_buy_order(market, qty)
                    order_id = order['info']['orderId']
                    getorder = exchange.fetch_order(order_id)
                    qty = getorder['amount']
                    qty = float(qty)
                    qtyusdt = getorder['cost'] 
                    order_price = getorder['price']
                    position_amount = float(qtyusdt) + float(position_amount)
                    totalqty = float(qty) + float(beforeqty) 
                    avgprice = float(position_amount) /  float(totalqty)
                    trade_price = avgprice
                    first_buy = first_buy + 1
                    tgmessage= f"No {first_buy} martingale buy succesfully filled. "                                        
                    sell_position = False
                    buy_position = True
                    in_position = True
                    link = f"https://backend.deltacyborg.pro/Api/Mobile/posttrade?setid={setid}&user_id={user_id}&qty={qty}&in_position={in_position}&buy_position={buy_position}&sell_position={sell_position}&trade_price={trade_price}&tgmessage={tgmessage}&first_buy={first_buy}&position_amount={qtyusdt}&first_price={first_price}&balance={balance}&platform={platform}"
                    response = requests.get(link)  

            if platform == 3 and in_position == True and sell_position == False and buy_position == True and gas > 9 and margin_call  > 0  and  margin_call != first_buy:
                cal = float(first_price) * float(price_drop[first_buy]) / 100
                cal2 = first_price - cal
                trade_price = exchange.fetch_ticker(market)
                trade_price = trade_price['last'] 
                trade_price = float(trade_price)
                if trade_price  <  cal2:
                    qty = float(firstbuy_amount) * float(m_ratio[first_buy]) / float(trade_price) 
                    qty = round(qty,5)
                    order = exchange.create_market_buy_order(market, qty)
                    order_id = order['info']['orderId']
                    getorder = exchange.fetch_order(order_id)
                    qty = getorder['amount']
                    qty = float(qty)
                    qtyusdt = getorder['cost'] 
                    order_price = getorder['price']
                    position_amount = float(qtyusdt) + float(position_amount)
                    totalqty = float(qty) + float(beforeqty) 
                    avgprice = float(position_amount) /  float(totalqty)
                    trade_price = avgprice
                    first_buy = first_buy + 1
                    tgmessage= f"No {first_buy} martingale buy succesfully filled. "                                        
                    sell_position = False
                    buy_position = True
                    in_position = True
                    link = f"https://backend.deltacyborg.pro/Api/Mobile/posttrade?setid={setid}&user_id={user_id}&qty={qty}&in_position={in_position}&buy_position={buy_position}&sell_position={sell_position}&trade_price={trade_price}&tgmessage={tgmessage}&first_buy={first_buy}&position_amount={qtyusdt}&first_price={first_price}&balance={balance}&platform={platform}"
                    response = requests.get(link) 

            if platform == 4 and in_position == True and sell_position == False and buy_position == True and gas > 9 and margin_call  > 0  and  margin_call != first_buy:
                cal = float(first_price) * float(price_drop[first_buy]) / 100
                cal2 = first_price - cal
                trade_price = exchange.fetch_ticker(market)
                trade_price = trade_price['last'] 
                trade_price = float(trade_price)
                if trade_price  <  cal2:
                    qty = float(firstbuy_amount) * float(m_ratio[first_buy]) / float(trade_price) 
                    qty = round(qty,5)
                    order = exchange.create_market_buy_order(market, qty)
                    order_id = order["id"]
                    getorder = exchange.fetch_order(order_id)
                    qty = getorder['amount']
                    qty = float(qty) 
                    qtyusdt = getorder['cost'] 
                    order_price = getorder['price']
                    trade_price =  order_price
                    position_amount = float(qtyusdt) + float(position_amount)
                    totalqty = float(qty) + float(beforeqty) 
                    avgprice = float(position_amount) /  float(totalqty)
                    trade_price = avgprice
                    first_buy = first_buy + 1
                    tgmessage= f"No {first_buy} martingale buy succesfully filled. "                                        
                    sell_position = False
                    buy_position = True
                    in_position = True
                    link = f"https://backend.deltacyborg.pro/Api/Mobile/posttrade?setid={setid}&user_id={user_id}&qty={qty}&in_position={in_position}&buy_position={buy_position}&sell_position={sell_position}&trade_price={trade_price}&tgmessage={tgmessage}&first_buy={first_buy}&position_amount={qtyusdt}&first_price={first_price}&balance={balance}&platform={platform}"
                    response = requests.get(link)                      
                                
            link = f"https://backend.deltacyborg.pro/Api/Mobile/return?setid={setid}&user_id={user_id}&balance={balance}&platform={platform}"
            response = requests.get(link)
            
            if in_position == True:
                flag += 1

            if in_position == False:
                flag += 0
            else:
                pass

            if flag > 0:
                return jsonify({"Status": "INTRADE"})
            else:
                return jsonify({"Status": "NOTRADE"})
                
        except Exception as e:
            errorMessage = (f"{e}")
            link = f"https://backend.deltacyborg.pro/Api/Mobile/return?setid={setid}&user_id={user_id}&balance={balance}&platform={platform}"
            response = requests.get(link)
            
            if in_position == True and buy_position == True and sell_position == False and sold == 1:
                cal = float(order_price) * float(whole_ratio) / 100
                cal2 = float(order_price) + float(cal)
                trade_price = exchange.fetch_ticker(market)
                trade_price = trade_price['last']
                trade_price = float(trade_price)
                
                if trade_price > cal2:
                    nqty = float(qty) * 0.1 / 100
                    qty = float(qty) - float(nqty)
                    qty = round(qty, 5)
                    profit = position_amount * profit_ratio / 100
                    qtyusdt = position_amount + profit
                    tgmessage = "Trade closed, take profit ratio reached "
                    buy_position = False
                    sell_position = False
                    in_position = False
                    first_buy = 0
                    sold = 0
                    balance = exchange.fetch_balance()
                    
                    if platform == 1:
                        balance = balance['free']['USDT']
                    elif platform == 2:
                        balance = balance['total']['USDT']
                    elif platform == 3:
                        balance = balance["total"]['USDT']
                    elif platform == 4:
                        balance = balance["USDT"]["total"]
                    
                    link = f"https://backend.deltacyborg.pro/Api/Mobile/settletrade?setid={setid}&user_id={user_id}&qty={qty}&in_position={in_position}&buy_position={buy_position}&sell_position={sell_position}&trade_price={trade_price}&tgmessage={tgmessage}&first_buy={first_buy}&position_amount={qtyusdt}&profit={profit}&coin={coin}&exchange={platform}&balance={balance}"
                    response = requests.get(link)
            
            if "insufficient" in errorMessage:
                tgmessage = "Your balance is insufficient to perform the next buy"
                link = f"https://backend.deltacyborg.pro/Api/Mobile/posttradelog?setid={setid}&user_id={user_id}&tgmessage={tgmessage}&balance={balance}&platform={platform}"
                response = requests.get(link)
                link = f"https://backend.deltacyborg.pro/Api/Mobile/return?setid={setid}&user_id={user_id}&balance={balance}&platform={platform}"
                response = requests.get(link)
                # tgmessage="Ooops! Seems to be some issue with your exchange account"
            if "API" in errorMessage:
                tgmessage = "Your exchange Api not connecting, kindly check and make sure all api is correct and has proper permission"
                link = f"https://backend.deltacyborg.pro/Api/Mobile/posttradelog?setid={setid}&user_id={user_id}&tgmessage={tgmessage}&balance={balance}&platform={platform}"
                response = requests.get(link)
                link = f"https://backend.deltacyborg.pro/Api/Mobile/return?setid={setid}&user_id={user_id}&balance={balance}&platform={platform}"
                response = requests.get(link)
            return jsonify({"Status": " EROR","message":errorMessage})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5236, debug=True)
    # serve(app, port=5231)