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

def TradePrice(exchange, market):
    trade_price = exchange.fetch_ticker(market)
    trade_price = trade_price['last']

    return trade_price

def ExpHandler(resp):
    if resp['retCode'] != 0:
        raise Exception(resp['retMsg'])
    
def PostTradeLog(setid, user_id, balance, message, platform,trade_type=1):
    link = f"{base_url}/posttradelog?setid={setid}&user_id={user_id}&tgmessage={message}&balance={balance}&platform={platform}&trade_type={trade_type}"
    response = requests.get(link)
    link = f"{base_url}/return?setid={setid}&user_id={user_id}&balance={balance}&platform={platform}&trade_type={trade_type}"
    response = requests.get(link)

def Posttrade(setid=0,user_id=0,platform=0,qty=0,in_position=False,buy_position=0,sell_position=0,trade_price=0,tgmessage=
"",first_buy=0,qtyusdt=0,first_price=0,balance=0,entry_call=0,stop_loss=0,price_above=0,price_below=0,re_capital=0,closing_price=0,strategy_cal=0,total_profit=0,trade_type=1,current_profit=0,position_amount=0):
    link = (f"{base_url}/posttrade?setid={setid}&user_id={user_id}&qty={qty}&in_position={in_position}"
            f"&buy_position={buy_position}&sell_position={sell_position}&trade_price={trade_price}&"
            f"tgmessage={tgmessage}&first_buy={first_buy}&position_amount={qtyusdt}"
            f"&first_price={first_price}&balance={balance}&platform={platform}&trade_type={trade_type}"
            f"entry_call={entry_call}&stop_loss={stop_loss}&price_above={price_above}&price_below={price_below}&re_capital={re_capital}&closing_price={closing_price}&strategy_cal={strategy_cal}")
    response = requests.get(link)
    
def Settletrade(setid,user_id,platform,qty,coin, in_position, profit=0,buy_position=0,sell_position=0,trade_price=0,tgmessage=
"",first_buy=0,qtyusdt=0,balance=0,entry_call=0,stop_loss=0,price_above=0,price_below=0,re_capital=0,closing_price=0,trade_type=1):
    link = (f"{base_url}/settletrade?setid={setid}&user_id={user_id}&qty={qty}&in_position={in_position}"
            f"&buy_position={buy_position}&sell_position={sell_position}"
            f"&trade_price={trade_price}&tgmessage={tgmessage}&first_buy={first_buy}&position_amount={qtyusdt}"
            f"&profit={profit}&coin={coin}&exchange={platform}&balance={balance}"
            f"entry_call={entry_call}&stop_loss={stop_loss}&price_above={price_above}&trade_type={trade_type}"
            f"&price_below={price_below}&re_capital={re_capital}&closing_price={closing_price}"
            )
    response = requests.get(link)

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
    # get post/get parameters
    leverage = 1
    direction = request.args.get(
        'direction') or request.get_json().get('direction', '')
    trade_type = request.args.get(
        'trade_type') or request.get_json().get('trade_type', '')
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
    stop_loss = request.args.get(
        'stop_loss') or request.get_json().get('stop_loss', '')
    price_above = request.args.get(
        'price_above') or request.get_json().get('price_above', '')
    price_below = request.args.get(
        'price_below') or request.get_json().get('price_below', '')
    re_capital = request.args.get(
        're_capital') or request.get_json().get('re_capital', '')
    closing_price = request.args.get(
        'closing_price') or request.get_json().get('closing_price', '')
    entry_call = request.args.get(
        'entry_call') or request.get_json().get('entry_call', '')

    string_to_bool = lambda str: True if str.lower() == "true" else False

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
    first_amount = int(firstbuy_amount)
    first_buy = int(first_buy)
    first_price = float(first_price)
    position_amount = float(position_amount)
    sold = 0
    beforeqty = qty

    stop_loss = float(stop_loss)
    price_above = float(price_above)
    price_below = float(price_below)
    re_capital = float(re_capital)
    closing_price = float(closing_price)
    entry_call = float(entry_call)
    trade_type = int(trade_type)
    
    current_profit = 0

    flag = 0
    start = 1

    if trade_type == 1:
        while True:
            try:
                if platform == 1:  # binance
                    market = coin + 'USDT'
                    exchange_name = 'binance'
                    values = {'exchange_name': exchange_name, 'api_key': Decrypt_(api_key),
                            'secret_key': Decrypt_(api_secret),
                            'default_type': 'future', 'market_name': exchange_name}
                    exchange = Exchange_(values)
                    
                if platform == 2:  # kucoin
                    market = coin + 'USDTM'
                    exchange_name = 'kucoinfutures'
                    values = {'exchange_name': exchange_name, 'api_key': Decrypt_(api_key),
                            'secret_key': Decrypt_(api_secret), "password": api_passphrase,
                            'market_name': exchange_name}
                    exchange = Exchange_(values)

                if platform == 3:  # coinbase pro
                    market = coin + 'USDT'
                    exchange_name = 'coinbasepro'
                    values = {'exchange_name': exchange_name, 'api_key': Decrypt_(api_key),
                            'secret_key': Decrypt_(api_secret), "password": api_passphrase,
                            'market_name': exchange_name}
                    exchange = Exchange_(values)

                if platform == 4:  # kraken
                    market = coin + 'USDT'
                    exchange_name = 'kraken'
                    values = {'exchange_name': exchange_name, 'api_key': Decrypt_(api_key),
                            'secret_key': Decrypt_(api_secret),
                            'market_name': exchange_name}
                    exchange = Exchange_(values)

                balance = GetBalance(exchange, platform)

                if in_position == False and gas > 10:
                    balance = float(balance)
                    # print('balance', balance)

                    # check for enough balance before trading
                    check_balance = float(re_capital) - 5
                    
                    if balance < check_balance:
                        t = time.time()
                        details = "Your exchange balance is below your trade capital."
                        PostTradeLog(setid, user_id, balance, details, platform)
                        
                        return jsonify({"Status": "SUCCESS"})

                    # stop trade without setting
                    if in_position == False and re_capital < 1:
                        t = time.time()
                        details = "Your bot does not have total capital setting. Enter capital in settings to proceed with trading."
                        PostTradeLog(setid, user_id, balance, details, platform)
                        return jsonify({"Status": "SUCCESS"})

                    #stop trade without setting
                    if in_position == False and stop_loss < 1:
                        t = time.time()
                        details = "You are using a conservative bot setting without stoploss. Setup stoploss to proceed with trading."
                        PostTradeLog(setid, user_id, balance, details, platform)
                        return jsonify({"Status": "SUCCESS"})

                    if in_position == False and direction == 'Long' and balance >= first_amount:
                        trade_price = TradePrice(exchange, market)
                        trade_price = float(trade_price)
                        qty = float(first_amount) / float(trade_price)
                        qty = "{:0.0{}f}".format(qty, 5)
                        # print('qty nl', qty, 'first amnt', first_amount)

                        if platform == 1:
                            qty = float(qty) * float(leverage)
                            setlev = exchange.set_leverage(leverage, market)
                            mode = exchange.set_margin_mode(
                                marginMode='cross', symbol=market, params={})
                            order = exchange.create_market_buy_order(
                                market, qty, params={'newClientOrderId': "x-zcYWaQcS"})
                            order_id = order['id']
                            time.sleep(3)
                            positions = exchange.fetch_positions([market])
                            order_price = positions[0]['info']['entryPrice']
                            qtyusdt = positions[0]['initialMargin']
                            qtyusdt = float(qtyusdt)
                            qty = positions[0]['contracts']
                            qty = float(qty)

                        if platform == 2:
                            lots = exchange.fetch_markets(
                                params={'symbol': market})
                            for lot in lots:
                                if lot['id'] == market:
                                    lot = lot['contractSize']
                                    break
                            qtynew = first_amount / trade_price
                            qtynew = qtynew / lot
                            qtynew = float(qtynew) * float(leverage)
                            order = exchange.create_market_buy_order(
                                market, amount=qtynew, params={'leverage': leverage})
                            order_id = order['id']
                            time.sleep(3)
                            auto_margin = exchange.futuresPrivate_post_position_margin_auto_deposit_status(
                                {'symbol': market, 'status': 1, })
                            getorder = exchange.fetch_order(order_id, market)
                            qty = getorder['filled']
                            order_price = getorder['price']
                            qtyusdt = getorder['cost']
                            qty = float(qty)
                        
                        #krakan
                            

                        in_position = True
                        order_price = float(order_price)
                        avg_price = order_price
                        first_price = order_price
                        position_amount = qtyusdt
                        entry_call = 0
                        quantity = qty

                        balance = GetBalance(exchange, platform)

                        Posttrade(setid, user_id, platform,qty,in_position,buy_position,sell_position,trade_price,"",first_buy,qtyusdt,first_price,balance)

                        return jsonify({"Status": "SUCCESS"})

                    if in_position == False and direction == 'Short' and balance >= first_amount:

                        trade_price = TradePrice(exchange, market)
                        trade_price = float(trade_price)
                        qty = float(first_amount) / float(trade_price)
                        qty = "{:0.0{}f}".format(qty, 5)
                        # print('qty ns', qty, 'first amnt', first_amount)

                        if platform == 1:
                            mode = exchange.set_margin_mode(
                                marginMode='cross', symbol=market, params={})
                            qty = float(qty) * float(leverage)
                            setlev = exchange.set_leverage(leverage, market)
                            order = exchange.create_market_sell_order(
                                market, qty, params={'newClientOrderId': "x-zcYWaQcS"})
                            order_id = order['id']
                            time.sleep(3)
                            positions = exchange.fetch_positions([market])
                            order_price = positions[0]['info']['entryPrice']
                            qtyusdt = positions[0]['initialMargin']
                            qtyusdt = float(qtyusdt)
                            qty = positions[0]['contracts']
                            qty = float(qty)

                        if platform == 2:
                            lots = exchange.fetch_markets(
                                params={'symbol': market})
                            for lot in lots:
                                if lot['id'] == market:
                                    lot = lot['contractSize']
                                    break
                            qtynew = first_amount / trade_price
                            qtynew = qtynew / lot
                            qtynew = float(qtynew) * float(leverage)
                            order = exchange.create_market_sell_order(
                                market, amount=qtynew, params={'leverage': leverage})
                            order_id = order['id']
                            time.sleep(3)
                            auto_margin = exchange.futuresPrivate_post_position_margin_auto_deposit_status(
                                {'symbol': market, 'status': 1, })
                            getorder = exchange.fetch_order(order_id, market)
                            qty = getorder['filled']
                            order_price = getorder['price']
                            qtyusdt = getorder['cost']
                            qty = float(qty)

                        in_position = True
                        order_price = float(order_price)
                        avg_price = order_price
                        first_price = order_price
                        position_amount = qtyusdt
                        entry_call = 0
                        quantity = qty
                        balance = GetBalance(exchange, platform)
                        Posttrade(setid,user_id,platform,qty,in_position,buy_position,sell_position,trade_price,"",first_buy,qtyusdt,first_price,balance)
                        return jsonify({"Status": "SUCCESS"})

                    #when using strategy period
                    # re buy long
                    if direction == 'Long' and balance >= first_amount:

                        if in_position == False:
                            cal = float(closing_price) * \
                                float(price_above) / 100
                            call = float(closing_price) * \
                                float(price_below) / 100
                            cal2 = closing_price + cal
                            cal3 = closing_price - call

                            trade_price = TradePrice(exchange, market)
                            trade_price = float(trade_price)

                            re_enter = 0
                            if trade_price >= cal2:
                                re_enter = 1
                            elif trade_price < cal3:
                                re_enter = 1
                            if re_enter == 1:
                                qty = float(first_amount) / float(trade_price)
                                qty = "{:0.0{}f}".format(qty, 5)
                                # print('qty rbl', qty, 'first amnt', first_amount)

                                if platform == 1:
                                    mode = exchange.set_margin_mode(
                                        marginMode='cross', symbol=market, params={})
                                    qty = float(qty) * float(leverage)
                                    setlev = exchange.set_leverage(
                                        leverage, market)
                                    order = exchange.create_market_buy_order(
                                        market, qty, params={'newClientOrderId': "x-zcYWaQcS"})
                                    order_id = order['id']
                                    time.sleep(3)
                                    positions = exchange.fetch_positions(
                                        [market])
                                    order_price = positions[0]['info']['entryPrice']
                                    qtyusdt = positions[0]['initialMargin']
                                    qtyusdt = float(qtyusdt)
                                    qty = positions[0]['contracts']
                                    qty = float(qty)

                                if platform == 2:
                                    lots = exchange.fetch_markets(
                                        params={'symbol': market})
                                    for lot in lots:
                                        if lot['id'] == market:
                                            lot = lot['contractSize']
                                            break
                                    qtynew = first_amount / trade_price
                                    qtynew = qtynew / lot
                                    qtynew = float(qtynew) * float(leverage)
                                    order = exchange.create_market_buy_order(
                                        market, amount=qtynew, params={'leverage': leverage})
                                    order_id = order['id']
                                    time.sleep(3)
                                    auto_margin = exchange.futuresPrivate_post_position_margin_auto_deposit_status(
                                        {'symbol': market, 'status': 1, })
                                    getorder = exchange.fetch_order(
                                        order_id, market)
                                    qty = getorder['filled']
                                    order_price = getorder['price']
                                    qtyusdt = getorder['cost']
                                    qty = float(qty)

                                in_position = True
                                order_price = float(order_price)
                                avg_price = order_price
                                first_price = order_price
                                position_amount = qtyusdt
                                entry_call = 0
                                re_enter = 0
                                quantity = qty
                                balance = GetBalance(exchange, platform)
                                Posttrade(setid, user_id,platform, qty, in_position, buy_position, sell_position, trade_price, "",
                                        first_buy, qtyusdt, first_price, balance)
                                return jsonify({"Status": "SUCCESS"})

                    # re buy short
                    if direction == 'Short' and balance >= first_amount:
                        if in_position == False:
                            cal = float(closing_price) * \
                                float(price_above) / 100
                            call = float(closing_price) * \
                                float(price_below) / 100
                            cal2 = closing_price + cal
                            cal3 = closing_price - call

                            trade_price = TradePrice(exchange, market)
                            trade_price = float(trade_price)

                            re_enter = 0
                            if trade_price >= cal2:
                                re_enter = 1
                            elif trade_price < cal3:
                                re_enter = 1
                            if re_enter == 1:
                                qty = float(first_amount) / float(trade_price)
                                qty = "{:0.0{}f}".format(qty, 5)
                                # print('qty rbs', qty, 'first amnt', first_amount)

                                if platform == 1:
                                    mode = exchange.set_margin_mode(
                                        marginMode='cross', symbol=market, params={})
                                    qty = float(qty) * float(leverage)
                                    setlev = exchange.set_leverage(
                                        leverage, market)
                                    order = exchange.create_market_sell_order(
                                        market, qty, params={'newClientOrderId': "x-zcYWaQcS"})
                                    order_id = order['id']
                                    time.sleep(3)
                                    positions = exchange.fetch_positions(
                                        [market])
                                    order_price = positions[0]['info']['entryPrice']
                                    qtyusdt = positions[0]['initialMargin']
                                    qtyusdt = float(qtyusdt)
                                    qty = positions[0]['contracts']
                                    qty = float(qty)

                                if platform == 2:
                                    lots = exchange.fetch_markets(
                                        params={'symbol': market})
                                    for lot in lots:
                                        if lot['id'] == market:
                                            lot = lot['contractSize']
                                            break
                                    qtynew = first_amount / trade_price
                                    qtynew = qtynew / lot
                                    qtynew = float(qtynew) * float(leverage)
                                    order = exchange.create_market_sell_order(
                                        market, amount=qtynew, params={'leverage': leverage})
                                    order_id = order['id']
                                    time.sleep(3)
                                    auto_margin = exchange.futuresPrivate_post_position_margin_auto_deposit_status(
                                        {'symbol': market, 'status': 1, })
                                    getorder = exchange.fetch_order(
                                        order_id, market)
                                    qty = getorder['filled']
                                    order_price = getorder['price']
                                    qtyusdt = getorder['cost']
                                    qty = float(qty)

                                quantity = qty
                                in_position = True
                                avg_price = order_price
                                position_amount = qtyusdt
                                entry_call = 0
                                re_enter = 0
                                balance = GetBalance(exchange, platform)
                                Posttrade(setid, user_id,platform, qty, in_position, buy_position, sell_position, trade_price, "",
                                        first_buy, qtyusdt, first_price, balance,strategy_cal)
                                return jsonify({"Status": "SUCCESS"})

                #check rate
                if in_position == True and platform == 1:
                    trade_price = TradePrice(exchange, market)
                    check = exchange.last_response_headers
                    rate = check['x-mbx-used-weight-1m']
                    rate = float(rate)
                    if rate >= 1000:
                        details = "Rate limit reached"
                        Posttrade(setid, user_id,platform, qty, in_position, 0, 0, trade_price, details,
                                first_buy, 0, first_price, balance)

                # update current profit
                if in_position == True:
                    trade_price = TradePrice(exchange, market)
                    trade_price = float(trade_price)
                    # print('ucp trade price', trade_price)

                    if platform == 1:
                        positions = exchange.fetch_positions([market])
                        avg_price = positions[0]['info']['entryPrice']
                        position_amount = positions[0]['initialMargin']
                        qty = positions[0]['contracts']
                        quantity = qty
                        current_profit = positions[0]['info']['unRealizedProfit']

                    if platform == 2:
                        positions = exchange.fetch_positions([market])
                        avg_price = positions[0]['info']['avgEntryPrice']
                        qty = positions[0]['contracts']
                        position_amount = positions[0]['initialMargin']
                        quantity = qty
                        auto_margin = exchange.futuresPrivate_post_position_margin_auto_deposit_status(
                            {'symbol': market, 'status': 1, })
                        current_profit = positions[0]['unrealizedPnl']

                    current_profit = float(current_profit)

                    # if currentlev == 1 and orglev > 1 and leverage == 1 and current_profit > 0:
                    #     setlev = exchange.set_leverage(leverage=orglev, symbol=market)

                    if position_amount == None:
                        in_position = False
                        Posttrade(setid=setid, user_id=user_id, platform=platform,in_position=in_position)
                        return jsonify({"Status": "SUCCESS"})

                    if position_amount < 1:
                        in_position = False
                        Posttrade(setid=setid, user_id=user_id, platform=platform, in_position=in_position)
                        return jsonify({"Status": "SUCCESS"})

                    balance = GetBalance(exchange, platform)

                    Posttrade(setid=setid, user_id=user_id, platform=platform, in_position=in_position,current_profit=current_profit,qty=qty, position_amount=position_amount)

                #Take profit long
                if in_position == True  and direction == 'Long':
                    # print('take prof long')

                    if platform == 1:
                            positions = exchange.fetch_positions([market])
                            avg_price = positions[0]['info']['entryPrice']
                            side = positions[0]['side']

                    if platform == 2:
                            positions = exchange.fetch_positions([market])
                            avg_price = positions[0]['info']['avgEntryPrice']
                            side = positions[0]['side']

                    side = side.lower()
                    cal = float(avg_price) * float(take_profit) / 100
                    cal2 = float(avg_price) + float(cal)

                    trade_price = TradePrice(exchange, market)
                    trade_price = float(trade_price)

                    qty = quantity

                    if current_profit > 0:
                        if platform == 1 and side == 'long':
                            positions = exchange.fetch_positions([market])
                            avg_price = positions[0]['info']['entryPrice']
                            profit = positions[0]['info']['unRealizedProfit']
                            t = time.time()
                            t = int(t * 1000)
                            time.sleep(3)
                            order = exchange.create_market_sell_order(market, qty, params={
                                    'leverage': leverage, 'newClientOrderId': "x-zcYWaQcS", 'reduceOnly': True})
                            order_id = order['id']
                            time.sleep(3)
                            my_trades = exchange.fetch_my_trades(
                                    market, params={'startTime': t})
                            profit = 0
                            for last_trade in my_trades:
                                if last_trade['info']['orderId'] == order_id:
                                    p = last_trade['info']['realizedPnl']
                                    profit = float(profit) + float(p)
                            current_profit = profit
                            getorder = exchange.fetch_order(order_id, market)
                            qty = getorder['info']['executedQty']
                            qty = float(qty)
                            qtyusdt = getorder['info']['cumQuote']
                            qtyusdt = float(qtyusdt) / leverage
                            order_price = getorder['info']['avgPrice']
                            qtyusdt = float(qtyusdt)
                            fee = 0.06 * leverage
                            fee_call = float(profit) * float(fee) / 100
                            profit = float(profit) - float(fee_call)
                            current_profit = profit

                        if platform == 2 and side == 'long':
                            positions = exchange.fetch_positions([market])
                            avg_price = positions[0]['info']['avgEntryPrice']
                            profit = positions[0]['info']['unrealisedPnl']
                            fee = 0.08 * leverage
                            fee_call = float(profit) * float(fee) / 100
                            profit = float(profit) - float(fee_call)
                            current_profit = profit
                            order = exchange.create_market_sell_order(
                                    market, amount=qty, params={'leverage': leverage, 'reduceOnly': True})
                            order_id = order['id']
                            time.sleep(3)
                            getorder = exchange.fetch_order(order_id, market)
                            qty = getorder['filled']
                            order_price = getorder['price']
                            qtyusdt = getorder['cost'] / leverage
                            qty = float(qty)

                        if platform == 1 and side == 'short':
                            positions = exchange.fetch_positions([market])
                            avg_price = positions[0]['info']['entryPrice']
                            profit = positions[0]['info']['unRealizedProfit']
                            fee = 0.06 * leverage
                            fee_call = float(profit) * float(fee) / 100
                            profit = float(profit) - float(fee_call)
                            current_profit = profit
                            t = time.time()
                            t = int(t * 1000)
                            time.sleep(3)
                            order = exchange.create_market_buy_order(market, qty, params={
                                    'leverage': leverage, 'newClientOrderId': "x-zcYWaQcS", 'reduceOnly': True})
                            order_id = order['id']
                            time.sleep(3)
                            my_trades = exchange.fetch_my_trades(
                                    market, params={'startTime': t})
                            profit = 0
                            for last_trade in my_trades:
                                if last_trade['info']['orderId'] == order_id:
                                    p = last_trade['info']['realizedPnl']
                                    profit = float(profit) + float(p)
                            current_profit = profit
                            getorder = exchange.fetch_order(order_id, market)
                            qty = getorder['info']['executedQty']
                            qty = float(qty)
                            qtyusdt = getorder['info']['cumQuote']
                            qtyusdt = float(qtyusdt) / leverage
                            order_price = getorder['info']['avgPrice']
                            qtyusdt = float(qtyusdt)

                        if platform == 2 and side == 'short':
                            positions = exchange.fetch_positions([market])
                            avg_price = positions[0]['info']['avgEntryPrice']
                            profit = positions[0]['info']['unrealisedPnl']
                            fee = 0.08 * leverage
                            fee_call = float(profit) * float(fee) / 100
                            profit = float(profit) - float(fee_call)
                            current_profit = profit
                            order = exchange.create_market_buy_order(
                                    market, amount=qty, params={'leverage': leverage, 'reduceOnly': True})
                            order_id = order['id']
                            time.sleep(3)
                            getorder = exchange.fetch_order(order_id, market)
                            qty = getorder['filled']
                            order_price = getorder['price']
                            qtyusdt = getorder['cost'] / leverage
                            qty = float(qty)

                        profit = float(profit)
                        qty = float(qty)
                        percent = float(profit) * 100 / float(re_capital)
                        in_position = False
                        closing_price = order_price
                        avg_price = order_price
                        total_profit = float(total_profit) + float(profit)

                        balance = GetBalance(exchange, platform)

                        strategy_cal = strategy_cal + 1
                        start_bot = 1
                        gas = float(gas)

                        if gas < 20:
                            t = time.time()
                            details = "Gas balance is bellow the minimum required $20, no new trade can be executed. Refill balance to continue trade."
                            Posttrade(setid=setid, user_id=user_id, platform=platform, in_position=in_position,
                                    current_profit=current_profit, qty=qty,position_amount=position_amount, tgmessage=details)

                        if profit >= 0.00001:
                            Settletrade(setid, user_id, platform, 0, qty, coin, in_position, profit=profit, buy_position=buy_position,
                                        sell_position=sell_position, trade_price=trade_price, tgmessage="", first_buy=first_buy, qtyusdt=qtyusdt, balance=balance, entry_call=entry_call, stop_loss=stop_loss, price_above=price_above,
                                        price_below=price_below, re_capital=re_capital, closing_price=closing_price, percent=percent)

                        if profit < 0.00001:
                            Settletrade(setid, user_id, platform, 0, qty, coin, in_position, profit=profit,
                                        buy_position=buy_position,
                                        sell_position=sell_position, trade_price=trade_price, tgmessage="",
                                        first_buy=first_buy, qtyusdt=qtyusdt, balance=balance, entry_call=entry_call,
                                        stop_loss=stop_loss, price_above=price_above,
                                        price_below=price_below, re_capital=re_capital, closing_price=closing_price,
                                        percent=percent)

                        Posttrade(setid=setid, user_id=user_id, platform=platform, in_position=in_position,
                                current_profit=profit, qty=qty, position_amount=position_amount)

                        return jsonify({"Status": "SUCCESS"})

                #Take profit short
                if in_position == True and direction == 'Short':

                    if platform == 1:
                        positions = exchange.fetch_positions([market])
                        avg_price = positions[0]['info']['entryPrice']
                        side = positions[0]['side']

                    if platform == 2:
                        positions = exchange.fetch_positions([market])
                        avg_price = positions[0]['info']['avgEntryPrice']
                        side = positions[0]['side']

                    side = side.lower()
                    cal = float(avg_price) * float(take_profit) / 100
                    cal2 = float(avg_price) - float(cal)

                    trade_price = TradePrice(exchange, market)
                    trade_price = float(trade_price)

                    qty = quantity
                    if current_profit > 0:

                        if platform == 1 and side == 'short':
                            positions = exchange.fetch_positions([market])
                            avg_price = positions[0]['info']['entryPrice']
                            profit = positions[0]['info']['unRealizedProfit']
                            fee = 0.06 * leverage
                            fee_call = float(profit) * float(fee) / 100
                            profit = float(profit) - float(fee_call)
                            current_profit = profit
                            t = time.time()
                            t = int(t * 1000)
                            time.sleep(3)
                            order = exchange.create_market_buy_order(market, qty, params={
                                    'leverage': leverage, 'newClientOrderId': "x-zcYWaQcS", 'reduceOnly': True})
                            order_id = order['id']
                            time.sleep(3)
                            my_trades = exchange.fetch_my_trades(
                                    market, params={'startTime': t})
                            profit = 0
                            for last_trade in my_trades:
                                if last_trade['info']['orderId'] == order_id:
                                    p = last_trade['info']['realizedPnl']
                                    profit = float(profit) + float(p)
                            current_profit = profit
                            getorder = exchange.fetch_order(order_id, market)
                            qty = getorder['info']['executedQty']
                            qty = float(qty)
                            qtyusdt = getorder['info']['cumQuote']
                            qtyusdt = float(qtyusdt) / leverage
                            order_price = getorder['info']['avgPrice']
                            qtyusdt = float(qtyusdt)

                        if platform == 2 and side == 'short':
                            positions = exchange.fetch_positions([market])
                            avg_price = positions[0]['info']['avgEntryPrice']
                            profit = positions[0]['info']['unrealisedPnl']
                            fee = 0.08 * leverage
                            fee_call = float(profit) * float(fee) / 100
                            profit = float(profit) - float(fee_call)
                            current_profit = profit
                            order = exchange.create_market_buy_order(
                                    market, amount=qty, params={'leverage': leverage, 'reduceOnly': True})
                            order_id = order['id']
                            time.sleep(3)
                            getorder = exchange.fetch_order(order_id, market)
                            qty = getorder['filled']
                            order_price = getorder['price']
                            qtyusdt = getorder['cost'] / leverage
                            qty = float(qty)

                        if platform == 1 and side == 'long':
                            positions = exchange.fetch_positions([market])
                            avg_price = positions[0]['info']['entryPrice']
                            profit = positions[0]['info']['unRealizedProfit']
                            t = time.time()
                            t = int(t * 1000)
                            time.sleep(3)
                            order = exchange.create_market_sell_order(market, qty, params={
                                    'leverage': leverage, 'newClientOrderId': "x-zcYWaQcS", 'reduceOnly': True})
                            order_id = order['id']
                            time.sleep(3)
                            my_trades = exchange.fetch_my_trades(
                                    market, params={'startTime': t})
                            profit = 0
                            for last_trade in my_trades:
                                if last_trade['info']['orderId'] == order_id:
                                    p = last_trade['info']['realizedPnl']
                                    profit = float(profit) + float(p)
                            current_profit = profit
                            getorder = exchange.fetch_order(order_id, market)
                            qty = getorder['info']['executedQty']
                            qty = float(qty)
                            qtyusdt = getorder['info']['cumQuote']
                            qtyusdt = float(qtyusdt) / leverage
                            order_price = getorder['info']['avgPrice']
                            qtyusdt = float(qtyusdt)
                            fee = 0.06 * leverage
                            fee_call = float(profit) * float(fee) / 100
                            profit = float(profit) - float(fee_call)
                            current_profit = profit

                        if platform == 2 and side == 'long':
                            positions = exchange.fetch_positions([market])
                            avg_price = positions[0]['info']['avgEntryPrice']
                            profit = positions[0]['info']['unrealisedPnl']
                            fee = 0.08 * leverage
                            fee_call = float(profit) * float(fee) / 100
                            profit = float(profit) - float(fee_call)
                            current_profit = profit
                            order = exchange.create_market_sell_order(
                                    market, amount=qty, params={'leverage': leverage, 'reduceOnly': True})
                            order_id = order['id']
                            time.sleep(3)
                            getorder = exchange.fetch_order(order_id, market)
                            qty = getorder['filled']
                            order_price = getorder['price']
                            qtyusdt = getorder['cost'] / leverage
                            qty = float(qty)

                        profit = float(profit)
                        qty = float(qty)
                        percent = float(profit) * 100 / float(re_capital)
                        in_position = False
                        closing_price = order_price
                        total_profit = float(total_profit) + float(profit)

                        balance = GetBalance(exchange, platform)

                        strategy_cal = strategy_cal + 1
                        start_bot = 1
                        avg_price = order_price
                        gas = float(gas)

                        if gas < 20:
                            t = time.time()
                            details = "Fuel balance is bellow the minimum required $20, no new trade can be executed. Refill balance to continue trade."
                            Posttrade(setid=setid, user_id=user_id, platform=platform, in_position=in_position,
                                    current_profit=current_profit, qty=qty,position_amount=position_amount,
                                    tgmessage=details)

                        if profit >= 0.00001:
                            Settletrade(setid, user_id, platform, 0, qty, coin, in_position, profit=profit,
                                        buy_position=buy_position,
                                        sell_position=sell_position, trade_price=trade_price, tgmessage="",
                                        first_buy=first_buy, qtyusdt=qtyusdt, balance=balance, entry_call=entry_call,
                                        stop_loss=stop_loss, price_above=price_above,
                                        price_below=price_below, re_capital=re_capital, closing_price=closing_price,
                                        percent=percent)

                        if profit < 0.00001:
                            Settletrade(setid, user_id, platform, 0, qty, coin, in_position, profit=profit,
                                        buy_position=buy_position,
                                        sell_position=sell_position, trade_price=trade_price, tgmessage="",
                                        first_buy=first_buy, qtyusdt=qtyusdt, balance=balance, entry_call=entry_call,
                                        stop_loss=stop_loss, price_above=price_above,
                                        price_below=price_below, re_capital=re_capital, closing_price=closing_price,
                                        percent=percent)

                        Posttrade(setid=setid, user_id=user_id, platform=platform, in_position=in_position,
                                current_profit=profit, qty=qty, position_amount=position_amount)

                        return jsonify({"Status": "SUCCESS"})

                # stop loss long
                if direction == 'Long':
                    current_profit = float(current_profit)

                    if in_position == True:

                        qty = quantity
                        cap_cal = re_capital * stop_loss / 100
                        cap_cal = '-' + f"{cap_cal}"
                        cap_cal = float(cap_cal)

                        if current_profit < cap_cal:

                            if platform == 1:
                                positions = exchange.fetch_positions([market])
                                avg_price = positions[0]['info']['entryPrice']
                                profit = positions[0]['info']['unRealizedProfit']
                                current_profit = profit
                                t = time.time()
                                t = int(t * 1000)
                                time.sleep(3)
                                order = exchange.create_market_sell_order(market, qty, params={
                                    'leverage': leverage, 'newClientOrderId': "x-zcYWaQcS", 'reduceOnly': True})
                                order_id = order['id']
                                time.sleep(3)
                                my_trades = exchange.fetch_my_trades(
                                    market, params={'startTime': t})
                                profit = 0
                                for last_trade in my_trades:
                                    if last_trade['info']['orderId'] == order_id:
                                        p = last_trade['info']['realizedPnl']
                                        profit = float(profit) + float(p)
                                current_profit = profit
                                getorder = exchange.fetch_order(
                                    order_id, market)
                                qty = getorder['info']['executedQty']
                                qty = float(qty)
                                qtyusdt = getorder['info']['cumQuote']
                                qtyusdt = float(qtyusdt) / leverage
                                order_price = getorder['info']['avgPrice']
                                qtyusdt = float(qtyusdt)

                            if platform == 2:
                                positions = exchange.fetch_positions([market])
                                avg_price = positions[0]['info']['avgEntryPrice']
                                profit = positions[0]['info']['unrealisedPnl']
                                current_profit = profit
                                order = exchange.create_market_sell_order(
                                    market, amount=qty, params={'leverage': leverage, 'reduceOnly': True})
                                order_id = order['id']
                                time.sleep(3)
                                getorder = exchange.fetch_order(
                                    order_id, market)
                                qty = getorder['filled']
                                order_price = getorder['price']
                                qtyusdt = getorder['cost'] / leverage
                                qty = float(qty)

                            profit = float(profit)
                            qty = float(qty)
                            percent = float(profit) * 100 / float(re_capital)
                            in_position = False
                            closing_price = order_price
                            avg_price = order_price
                            total_profit = total_profit + profit

                            balance = GetBalance(exchange, platform)

                            strategy_cal = strategy_cal + 1
                            start_bot = 0
                            fuelbalance = float(gas)

                            if fuelbalance < 20:
                                t = time.time()
                                details = "Fuel balance is bellow the minimum required $20, no new trade can be executed. Refill balance to continue trade."
                                Posttrade(setid=setid, user_id=user_id, platform=platform, in_position=in_position,
                                        current_profit=current_profit, qty=qty,
                                        position_amount=position_amount,
                                        tgmessage=details)


                            if profit >= 0.00001:
                                Settletrade(setid, user_id, platform, 0, qty, coin, in_position, profit=profit,
                                            buy_position=buy_position,
                                            sell_position=sell_position, trade_price=trade_price, tgmessage="",
                                            first_buy=first_buy, qtyusdt=qtyusdt, balance=balance, entry_call=entry_call,
                                            stop_loss=stop_loss, price_above=price_above,
                                            price_below=price_below, re_capital=re_capital, closing_price=closing_price,
                                            percent=percent)

                            if profit < 0.00001:
                                Settletrade(setid, user_id, platform, 0, qty, coin, in_position, profit=profit,
                                            buy_position=buy_position,
                                            sell_position=sell_position, trade_price=trade_price, tgmessage="",
                                            first_buy=first_buy, qtyusdt=qtyusdt, balance=balance, entry_call=entry_call,
                                            stop_loss=stop_loss, price_above=price_above,
                                            price_below=price_below, re_capital=re_capital, closing_price=closing_price,
                                            percent=percent)

                            Posttrade(setid=setid, user_id=user_id, platform=platform, in_position=in_position,
                                    current_profit=profit, qty=qty, type="short", position_amount=position_amount)
                            return jsonify({"Status": "SUCCESS"})

                # stop loss short
                if direction == 'Short':

                    if in_position == True:

                        qty = quantity

                        cap_cal = re_capital * stop_loss / 100
                        cap_cal = '-' + f"{cap_cal}"
                        cap_cal = float(cap_cal)

                        if current_profit < cap_cal:

                            if platform == 1:
                                positions = exchange.fetch_positions([market])
                                avg_price = positions[0]['info']['entryPrice']
                                profit = positions[0]['info']['unRealizedProfit']
                                current_profit = profit
                                t = time.time()
                                t = int(t * 1000)
                                time.sleep(3)
                                order = exchange.create_market_buy_order(market, qty, params={
                                        'leverage': leverage, 'newClientOrderId': "x-zcYWaQcS", 'reduceOnly': True})
                                order_id = order['id']
                                time.sleep(3)
                                my_trades = exchange.fetch_my_trades(
                                        market, params={'startTime': t})
                                profit = 0
                                for last_trade in my_trades:
                                    if last_trade['info']['orderId'] == order_id:
                                        p = last_trade['info']['realizedPnl']
                                        profit = float(profit) + float(p)
                                current_profit = profit
                                getorder = exchange.fetch_order(
                                        order_id, market)
                                qty = getorder['info']['executedQty']
                                qty = float(qty)
                                qtyusdt = getorder['info']['cumQuote']
                                qtyusdt = float(qtyusdt) / leverage
                                order_price = getorder['info']['avgPrice']
                                qtyusdt = float(qtyusdt)

                            if platform == 2:
                                positions = exchange.fetch_positions([market])
                                avg_price = positions[0]['info']['avgEntryPrice']
                                profit = positions[0]['info']['unrealisedPnl']
                                current_profit = profit
                                order = exchange.create_market_buy_order(
                                        market, amount=qty, params={'leverage': leverage, 'reduceOnly': True})
                                order_id = order['id']
                                time.sleep(3)
                                getorder = exchange.fetch_order(
                                        order_id, market)
                                qty = getorder['filled']
                                order_price = getorder['price']
                                qtyusdt = getorder['cost'] / leverage
                                auto_margin = exchange.futuresPrivate_post_position_margin_auto_deposit_status(
                                        {'symbol': market, 'status': 1, })
                                qty = float(qty)

                            profit = float(profit)
                            qty = float(qty)
                            percent = float(profit) * 100 / \
                                float(re_capital)
                            in_position = False
                            closing_price = order_price
                            total_profit = float(total_profit) + float(profit)

                            balance = GetBalance(exchange, platform)

                            avg_price = order_price
                            strategy_cal = strategy_cal + 1
                            start_bot = 0
                            gas = float(gas)

                            if gas < 20:
                                t = time.time()
                                details = "Fuel balance is bellow the minimum required $20, no new trade can be executed. Refill balance to continue trade."
                                Posttrade(setid=setid, user_id=user_id, platform=platform, in_position=in_position,
                                        current_profit=current_profit, qty=qty,
                                        position_amount=position_amount,
                                        tgmessage=details)

                            if profit >= 0.00001:
                                Settletrade(setid, user_id, platform, 0, qty, coin, in_position, profit=profit,
                                            buy_position=buy_position,
                                            sell_position=sell_position, trade_price=trade_price, tgmessage="",
                                            first_buy=first_buy, qtyusdt=qtyusdt, balance=balance, entry_call=entry_call,
                                            stop_loss=stop_loss, price_above=price_above,
                                            price_below=price_below, re_capital=re_capital, closing_price=closing_price,
                                            percent=percent)

                            if profit < 0.00001:
                                Settletrade(setid, user_id, platform, 0, qty, coin, in_position, profit=profit,
                                            buy_position=buy_position,
                                            sell_position=sell_position, trade_price=trade_price, tgmessage="",
                                            first_buy=first_buy, qtyusdt=qtyusdt, balance=balance, entry_call=entry_call,
                                            stop_loss=stop_loss, price_above=price_above,
                                            price_below=price_below, re_capital=re_capital, closing_price=closing_price,
                                            percent=percent)

                            Posttrade(setid=setid, user_id=user_id, platform=platform, in_position=in_position,
                                    current_profit=profit, qty=qty,position_amount=position_amount)
                            return jsonify({"Status": "SUCCESS"})

                # normal martingale long
                entry_call = int(entry_call)
                if direction == 'Long':

                    if in_position == True and no_entry != entry_call:

                        cal = float(first_price) * \
                                float(price_drop[entry_call]) / 100
                        cal2 = first_price - cal

                        trade_price = TradePrice(exchange, market)
                        trade_price = float(trade_price)

                        if trade_price < cal2:
                            qty = float(first_amount) * \
                                    float(m_ratio[entry_call]) / float(trade_price)
                            tradec = float(first_amount) * \
                                        float(m_ratio[entry_call])
                            qty = round(qty, 5)

                            balance = GetBalance(exchange, platform)
                            balance = float(balance)

                            if balance < tradec:
                                t = time.time()
                                details = "Your exchange account does not have sufficient balance to proceed with the next Martingale entry."
                                Posttrade(setid=setid, user_id=user_id, platform=platform, in_position=in_position,
                                        current_profit=current_profit, qty=qty,
                                        position_amount=position_amount,
                                        tgmessage=details)
                                return jsonify({"Status": "SUCCESS"})

                            if platform == 1:
                                qty = float(qty) * float(leverage)
                                setlev = exchange.set_leverage(
                                        leverage, market)
                                order = exchange.create_market_buy_order(
                                        market, qty, params={'newClientOrderId': "x-zcYWaQcS"})
                                order_id = order['id']
                                time.sleep(3)
                                getorder = exchange.fetch_order(
                                        order_id, market)
                                qty = getorder['info']['executedQty']
                                qty = float(qty)
                                qtyusdt = getorder['info']['cumQuote']
                                qtyusdt = float(qtyusdt) / leverage
                                order_price = getorder['info']['avgPrice']
                                qty = float(qty) + float(quantity)
                                position_amount = position_amount + qtyusdt
                                positions = exchange.fetch_positions([market])
                                avg_price = positions[0]['info']['entryPrice']
                                profit = positions[0]['info']['unRealizedProfit']
                                current_profit = profit

                            if platform == 2:
                                lots = exchange.fetch_markets(
                                        params={'symbol': market})
                                for lot in lots:
                                    if lot['id'] == market:
                                        lot = lot['contractSize']
                                        break
                                qtynew = tradec / trade_price
                                qtynew = qtynew / lot
                                qtynew = float(qtynew) * float(leverage)
                                order = exchange.create_market_buy_order(
                                        market, amount=qtynew, params={'leverage': leverage})
                                order_id = order['id']
                                time.sleep(3)
                                getorder = exchange.fetch_order(
                                        order_id, market)
                                qty = getorder['filled']
                                order_price = getorder['price']
                                qtyusdt = getorder['cost']
                                qty = float(qty) + float(quantity)
                                auto_margin = exchange.futuresPrivate_post_position_margin_auto_deposit_status(
                                        {'symbol': market, 'status': 1, })
                                position_amount = position_amount + qtyusdt
                                positions = exchange.fetch_positions([market])
                                avg_price = positions[0]['info']['avgEntryPrice']
                                profit = positions[0]['info']['unrealisedPnl']
                                current_profit = profit

                            profit = float(profit)
                            quantity = qty
                            entry_call = entry_call + 1

                            balance = GetBalance(exchange, platform)

                            Posttrade(setid=setid, user_id=user_id, platform=platform, in_position=in_position,
                                    current_profit=profit, qty=qty, position_amount=position_amount)
                            return jsonify({"Status": "SUCCESS"})

                # martingale short
                entry_call = int(entry_call)
                if direction == 'Short':

                    if in_position == True:

                        cal = float(first_price) * \
                                float(price_drop[entry_call]) / 100
                        cal2 = first_price + cal

                        trade_price = TradePrice(exchange, market)
                        trade_price = float(trade_price)

                        if trade_price >= cal2:

                            qty = float(first_amount) * \
                                    float(m_ratio[entry_call]) / float(trade_price)
                            tradec = float(first_amount) * \
                                        float(m_ratio[entry_call])
                            qty = round(qty, 5)

                            balance = GetBalance(exchange, platform)
                            balance = float(balance)

                            if balance < tradec:
                                t = time.time()
                                details = "Your exchange account does not have sufficient balance to proceed with the next Martingale entry."
                                Posttrade(setid=setid, user_id=user_id, platform=platform, in_position=in_position,
                                        current_profit=current_profit, qty=qty,
                                        position_amount=position_amount,
                                        tgmessage=details)
                                return jsonify({"Status": "SUCCESS"})

                            if platform == 1:
                                qty = float(qty) * float(leverage)
                                setlev = exchange.set_leverage(
                                        leverage, market)
                                order = exchange.create_market_sell_order(
                                        market, qty, params={'newClientOrderId': "x-zcYWaQcS"})
                                order_id = order['id']
                                time.sleep(3)
                                getorder = exchange.fetch_order(
                                        order_id, market)
                                qty = getorder['info']['executedQty']
                                qty = float(qty)
                                qtyusdt = getorder['info']['cumQuote']
                                qtyusdt = float(qtyusdt) / leverage
                                order_price = getorder['info']['avgPrice']
                                qty = float(qty) + float(quantity)
                                position_amount = position_amount + qtyusdt
                                positions = exchange.fetch_positions([market])
                                avg_price = positions[0]['info']['entryPrice']
                                profit = positions[0]['info']['unRealizedProfit']
                                current_profit = profit

                            if platform == 2:
                                lots = exchange.fetch_markets(
                                        params={'symbol': market})
                                for lot in lots:
                                    if lot['id'] == market:
                                        lot = lot['contractSize']
                                        break
                                qtynew = tradec / trade_price
                                qtynew = qtynew / lot
                                qtynew = float(qtynew) * float(leverage)
                                order = exchange.create_market_sell_order(
                                        market, amount=qtynew, params={'leverage': leverage})
                                order_id = order['id']
                                time.sleep(3)
                                getorder = exchange.fetch_order(
                                        order_id, market)
                                qty = getorder['filled']
                                order_price = getorder['price']
                                qtyusdt = getorder['cost']
                                qty = float(qty) + float(quantity)
                                auto_margin = exchange.futuresPrivate_post_position_margin_auto_deposit_status(
                                        {'symbol': market, 'status': 1, })
                                balance = exchange.fetch_balance()
                                balance = balance['free']['USDT']
                                position_amount = position_amount + qtyusdt
                                positions = exchange.fetch_positions([market])
                                avg_price = positions[0]['info']['avgEntryPrice']
                                profit = positions[0]['info']['unrealisedPnl']
                                current_profit = profit

                            profit = float(profit)
                            balance = GetBalance(exchange, platform)
                            quantity = qty
                            entry_call = entry_call + 1
                            Posttrade(setid=setid, user_id=user_id, platform=platform, in_position=in_position,
                                    current_profit=current_profit, qty=qty,
                                    position_amount=position_amount,
                                    tgmessage="")
                            return jsonify({"Status": "SUCCESS"})

                # report current trade
                if in_position == True:
                    Posttrade(setid=setid, user_id=user_id, platform=platform, in_position=in_position,
                            current_profit=current_profit, qty=qty,
                            position_amount=position_amount,
                            tgmessage="")
                    return jsonify({"Status": "SUCCESS"})

                # new trade waiting
                if in_position == False:
                    balance = GetBalance(exchange, platform)
                    Posttrade(setid=setid, user_id=user_id, platform=platform, in_position=in_position,
                                current_profit=current_profit, qty=qty,
                                position_amount=position_amount,
                                tgmessage="")
                    return jsonify({"Status": "SUCCESS"})

                return jsonify({"Status": "SUCCESS"})

            except (ccxt.ExchangeError, ccxt.AuthenticationError, ccxt.ExchangeNotAvailable, ccxt.RequestTimeout,
                    ccxt.PermissionDenied, ccxt.InsufficientFunds, ccxt.OrderNotFound, ccxt.InvalidOrder,
                    ccxt.NotSupported) as e:
                    errorMessage = (f"{e}, L{e.__traceback__.tb_lineno}N")

                    if "position side" in errorMessage:
                        tgmessage = f"You need to set your exchange position side to oneway not hedge for {market} market"
                        PostTradeLog(setid, user_id, balance, tgmessage, platform)
                        return jsonify({"Status": "SUCCESS"})

                    if "Order is rejected" in errorMessage and direction == 'Long' and platform == 1:
                        order = exchange.create_market_sell_order(
                        market, qty, params={'leverage': leverage, 'reduceOnly': True})
                        tgmessage = f"Order to close this trade has been rejected by your exchange. The trade seems to have been closed by your exchange"
                        PostTradeLog(setid, user_id, balance, tgmessage, platform)

                    if "Order is rejected" in errorMessage and direction == 'Short' and platform == 1:
                        order = exchange.create_market_buy_order(
                                market, qty, params={'leverage': leverage, 'reduceOnly': True})
                        details = "Order to close this trade has been rejected by your exchange. The trade seems to have been closed by your exchange"
                        PostTradeLog(setid, user_id, balance, details, platform)

                    if "complete the query with linear-swap-api" in errorMessage:
                        exchange.contractPrivatePostLinearSwapApiV3SwapSwitchAccountType({
                                'account_type': 1})
                        return jsonify({"Status": "There was a technical error. Please try again!"})

                    if "country ip" in errorMessage:
                        details = errorMessage
                        PostTradeLog(setid, user_id, balance, details, platform)
                        return jsonify({"Status": "SUCCESS"})

                    if "Too Many Requests" in errorMessage:
                        details = errorMessage
                        PostTradeLog(setid, user_id, balance, details, platform)
                        return jsonify({"Status": "SUCCESS"})

                    if "insufficient" in errorMessage:
                        details = errorMessage
                        PostTradeLog(setid, user_id, balance, details, platform)
                        return jsonify({"Status": "SUCCESS"})

                    if "API" in errorMessage:
                        details = errorMessage
                        PostTradeLog(setid, user_id, balance, details, platform)
                        return jsonify({"Status": "SUCCESS"})

                    if "permission" in errorMessage:
                        details = errorMessage
                        PostTradeLog(setid, user_id, balance, details, platform)
                        return jsonify({"Status": "SUCCESS"})

                    if "minimum contract order" in errorMessage:

                        details = "Your first entry amount is bellow the minimum entry amount for this exchange"
                        PostTradeLog(setid, user_id, balance, details, platform)
                        return jsonify({"Status": "SUCCESS"})

                    if position_amount < 1 and in_position == True:
                        in_position = False
                        PostTradeLog(setid, user_id, balance, "", platform)
                        return jsonify({"Status": "SUCCESS"})

                    details = errorMessage
                    PostTradeLog(setid, user_id, balance, details, platform)
                    return jsonify({"Status": "Falied","ERROR":errorMessage})
                    return jsonify({"Status": "SUCCESS"})

            except Exception as e:
                errorMessage = (f"{e}, L{e.__traceback__.tb_lineno}N")
                # print(errorMessage)
            
                if "position side" in errorMessage:
                    t = time.time()
                    details = f"You need to set your exchange position side to oneway not hedge for {market} market"
                    PostTradeLog(setid, user_id, balance, details, platform)
                    return jsonify({"Status": "SUCCESS"})

                if "Order is rejected" in errorMessage and direction == 'Long' and platform == 1:
                    t = time.time()
                    order = exchange.create_market_sell_order(
                        market, qty, params={'leverage': leverage, 'reduceOnly': True})
                    details = "Order to close this trade has been rejected by your exchange. The trade seems to have been closed by your exchange"
                    PostTradeLog(setid, user_id, balance, details, platform)
                    return jsonify({"Status": "SUCCESS"})

                if "Order is rejected" in errorMessage and direction == 'Short' and platform == 1:
                    t = time.time()
                    order = exchange.create_market_buy_order(
                        market, qty, params={'leverage': leverage, 'reduceOnly': True})
                    details = "Order to close this trade has been rejected by your exchange. The trade seems to have been closed by your exchange"
                    PostTradeLog(setid, user_id, balance, details, platform)
                    return jsonify({"Status": "SUCCESS"})

                # if "Since you are the merged cross" in errorMessage:
                #     t = time.time()
                #     details = "Your account needs to be enabled to receive Tafabot Huobi Bonus. Do send your Huobi UID to Tafabot support inside your App."
                #     link = f"https://demo.com/Api/Connect/reportfm?record=4&ip={ip}&current_profit=0&running_capital=0&endtime=0&strategy_cal=0&apy=0&profit=0&total_profit=0&startbot=1&percent=0&take_profit=0&details={details}&table_id={table_id}&order_price=0&closing_price=0&user_id={user_id}&bot_name={bot_name}&balance=0&exchange_id={exchange_id}&exchange_name={exchange_name}&market={market}&first_price=0&qty=0&type=Short&in_position={in_position}&position_amount=0&avg_price=0&entry_call=0"
                #     response = requests.get(link)
                #     return jsonify({"Status": "SUCCESS"})

                if "complete the query with linear-swap-api" in errorMessage:
                    exchange.contractPrivatePostLinearSwapApiV3SwapSwitchAccountType({
                        'account_type': 1})
                    return jsonify({"Status": "There was a technical error. Please try again!"})

                if "country ip" in errorMessage:
                    t = time.time()
                    details = errorMessage
                    PostTradeLog(setid, user_id, balance, details, platform)
                    return jsonify({"Status": "SUCCESS"})

                if "Too Many Requests" in errorMessage:
                    t = time.time()
                    details = errorMessage
                    PostTradeLog(setid, user_id, balance, details, platform)
                    return jsonify({"Status": "SUCCESS"})

                if "insufficient" in errorMessage:
                    t = time.time()
                    details = errorMessage
                    PostTradeLog(setid, user_id, balance, details, platform)
                    return jsonify({"Status": "SUCCESS"})

                if "API" in errorMessage:
                    t = time.time()
                    details = errorMessage
                    PostTradeLog(setid, user_id, balance, details, platform)
                    return jsonify({"Status": "SUCCESS"})

                if "permission" in errorMessage:
                    t = time.time()
                    details = errorMessage
                    PostTradeLog(setid, user_id, balance, details, platform)
                    return jsonify({"Status": "SUCCESS"})

                if "minimum contract order" in errorMessage:
                    t = time.time()
                    details = "Your first entry amount is bellow the minimum entry amount for this exchange"
                    PostTradeLog(setid, user_id, balance, details, platform)
                    return jsonify({"Status": "SUCCESS"})

                if position_amount < 1 and in_position == True:
                    in_position = False
                    PostTradeLog(setid, user_id, balance, "", platform)
                    return jsonify({"Status": "SUCCESS"})
                t = time.time()
                details = errorMessage
                print(details)
                PostTradeLog(setid, user_id, balance, details, platform)
                
                return jsonify({"Status": "Falied","ERROR":errorMessage})

    if trade_type == 0:
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
                        qty =  "{:0.0{}f}".format(qty, 5)
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
                        qty =  "{:0.0{}f}".format(qty, 5)
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
    bot()