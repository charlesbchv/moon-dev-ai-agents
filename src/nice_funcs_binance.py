"""
🌙 Moon Dev's Binance Integration
Trading functions for Binance Spot and Futures
Built with love by Moon Dev 🚀
"""

from binance.client import Client
from binance.exceptions import BinanceAPIException
from termcolor import colored, cprint
import os
from dotenv import load_dotenv
import pandas as pd
import time

load_dotenv()

# Initialize Binance client
BINANCE_API_KEY = os.getenv('BINANCE_API_KEY')
BINANCE_SECRET_KEY = os.getenv('BINANCE_SECRET_KEY')
BINANCE_TESTNET = os.getenv('BINANCE_TESTNET', 'False').lower() == 'true'

# Initialize client
if BINANCE_TESTNET:
    cprint("⚠️  Using Binance TESTNET", "yellow")
    client = Client(BINANCE_API_KEY, BINANCE_SECRET_KEY, testnet=True)
else:
    client = Client(BINANCE_API_KEY, BINANCE_SECRET_KEY)


def get_balance(asset='USDT'):
    """
    Get balance for a specific asset
    
    Args:
        asset: Asset symbol (default: USDT)
        
    Returns:
        float: Available balance
    """
    try:
        balance = client.get_asset_balance(asset=asset)
        return float(balance['free'])
    except BinanceAPIException as e:
        cprint(f"❌ Error getting balance: {e}", "red")
        return 0.0


def get_all_balances():
    """
    Get all non-zero balances
    
    Returns:
        dict: Dictionary of asset balances
    """
    try:
        account = client.get_account()
        balances = {}
        
        for balance in account['balances']:
            free = float(balance['free'])
            locked = float(balance['locked'])
            total = free + locked
            
            if total > 0:
                balances[balance['asset']] = {
                    'free': free,
                    'locked': locked,
                    'total': total
                }
        
        return balances
    except BinanceAPIException as e:
        cprint(f"❌ Error getting balances: {e}", "red")
        return {}


def get_price(symbol):
    """
    Get current price for a symbol
    
    Args:
        symbol: Trading pair (e.g., 'BTCUSDT')
        
    Returns:
        float: Current price
    """
    try:
        ticker = client.get_symbol_ticker(symbol=symbol)
        return float(ticker['price'])
    except BinanceAPIException as e:
        cprint(f"❌ Error getting price for {symbol}: {e}", "red")
        return 0.0


def get_24h_change(symbol):
    """
    Get 24h price change percentage
    
    Args:
        symbol: Trading pair (e.g., 'BTCUSDT')
        
    Returns:
        dict: 24h stats
    """
    try:
        ticker = client.get_ticker(symbol=symbol)
        return {
            'price': float(ticker['lastPrice']),
            'change_percent': float(ticker['priceChangePercent']),
            'high': float(ticker['highPrice']),
            'low': float(ticker['lowPrice']),
            'volume': float(ticker['volume'])
        }
    except BinanceAPIException as e:
        cprint(f"❌ Error getting 24h stats for {symbol}: {e}", "red")
        return {}


def market_buy(symbol, usd_amount):
    """
    Execute a market buy order
    
    Args:
        symbol: Trading pair (e.g., 'BTCUSDT')
        usd_amount: USD amount to spend
        
    Returns:
        dict: Order result
    """
    try:
        # Get current price
        price = get_price(symbol)
        if price == 0:
            return {'success': False, 'error': 'Could not get price'}
        
        # Calculate quantity
        quantity = usd_amount / price
        
        # Get symbol info for precision
        info = client.get_symbol_info(symbol)
        step_size = None
        for f in info['filters']:
            if f['filterType'] == 'LOT_SIZE':
                step_size = float(f['stepSize'])
                break
        
        if step_size:
            # Round to step size
            from decimal import Decimal, ROUND_DOWN
            quantity = float(Decimal(str(quantity)).quantize(Decimal(str(step_size)), rounding=ROUND_DOWN))
        
        cprint(f"🔵 Market BUY {symbol}", "cyan")
        cprint(f"   Amount: ${usd_amount:.2f} | Quantity: {quantity}", "cyan")
        
        # Place order
        order = client.order_market_buy(
            symbol=symbol,
            quantity=quantity
        )
        
        cprint(f"✅ Buy order executed successfully", "green")
        cprint(f"   Order ID: {order['orderId']}", "green")
        cprint(f"   Status: {order['status']}", "green")
        
        return {
            'success': True,
            'order_id': order['orderId'],
            'symbol': symbol,
            'side': 'BUY',
            'quantity': quantity,
            'status': order['status'],
            'fills': order.get('fills', [])
        }
        
    except BinanceAPIException as e:
        cprint(f"❌ Buy order failed: {e}", "red")
        return {'success': False, 'error': str(e)}


def market_sell(symbol, quantity_or_percent):
    """
    Execute a market sell order
    
    Args:
        symbol: Trading pair (e.g., 'BTCUSDT')
        quantity_or_percent: Either quantity to sell or percentage (0-100)
        
    Returns:
        dict: Order result
    """
    try:
        # Get base asset (e.g., 'BTC' from 'BTCUSDT')
        base_asset = symbol.replace('USDT', '').replace('BUSD', '').replace('USDC', '')
        
        # If percentage, calculate quantity
        if 0 < quantity_or_percent <= 100:
            balance = get_balance(base_asset)
            quantity = balance * (quantity_or_percent / 100)
        else:
            quantity = quantity_or_percent
        
        # Get symbol info for precision
        info = client.get_symbol_info(symbol)
        step_size = None
        for f in info['filters']:
            if f['filterType'] == 'LOT_SIZE':
                step_size = float(f['stepSize'])
                break
        
        if step_size:
            from decimal import Decimal, ROUND_DOWN
            quantity = float(Decimal(str(quantity)).quantize(Decimal(str(step_size)), rounding=ROUND_DOWN))
        
        if quantity == 0:
            cprint(f"⚠️  No {base_asset} to sell", "yellow")
            return {'success': False, 'error': 'Insufficient balance'}
        
        cprint(f"🔴 Market SELL {symbol}", "red")
        cprint(f"   Quantity: {quantity}", "red")
        
        # Place order
        order = client.order_market_sell(
            symbol=symbol,
            quantity=quantity
        )
        
        cprint(f"✅ Sell order executed successfully", "green")
        cprint(f"   Order ID: {order['orderId']}", "green")
        cprint(f"   Status: {order['status']}", "green")
        
        return {
            'success': True,
            'order_id': order['orderId'],
            'symbol': symbol,
            'side': 'SELL',
            'quantity': quantity,
            'status': order['status'],
            'fills': order.get('fills', [])
        }
        
    except BinanceAPIException as e:
        cprint(f"❌ Sell order failed: {e}", "red")
        return {'success': False, 'error': str(e)}


def limit_buy(symbol, usd_amount, limit_price):
    """
    Place a limit buy order
    
    Args:
        symbol: Trading pair (e.g., 'BTCUSDT')
        usd_amount: USD amount to spend
        limit_price: Limit price
        
    Returns:
        dict: Order result
    """
    try:
        quantity = usd_amount / limit_price
        
        # Get symbol info for precision
        info = client.get_symbol_info(symbol)
        step_size = None
        for f in info['filters']:
            if f['filterType'] == 'LOT_SIZE':
                step_size = float(f['stepSize'])
                break
        
        if step_size:
            from decimal import Decimal, ROUND_DOWN
            quantity = float(Decimal(str(quantity)).quantize(Decimal(str(step_size)), rounding=ROUND_DOWN))
        
        order = client.order_limit_buy(
            symbol=symbol,
            quantity=quantity,
            price=str(limit_price)
        )
        
        cprint(f"✅ Limit buy order placed at ${limit_price}", "green")
        return {
            'success': True,
            'order_id': order['orderId'],
            'symbol': symbol,
            'side': 'BUY',
            'type': 'LIMIT',
            'quantity': quantity,
            'price': limit_price,
            'status': order['status']
        }
        
    except BinanceAPIException as e:
        cprint(f"❌ Limit buy failed: {e}", "red")
        return {'success': False, 'error': str(e)}


def limit_sell(symbol, quantity, limit_price):
    """
    Place a limit sell order
    
    Args:
        symbol: Trading pair (e.g., 'BTCUSDT')
        quantity: Quantity to sell
        limit_price: Limit price
        
    Returns:
        dict: Order result
    """
    try:
        order = client.order_limit_sell(
            symbol=symbol,
            quantity=quantity,
            price=str(limit_price)
        )
        
        cprint(f"✅ Limit sell order placed at ${limit_price}", "green")
        return {
            'success': True,
            'order_id': order['orderId'],
            'symbol': symbol,
            'side': 'SELL',
            'type': 'LIMIT',
            'quantity': quantity,
            'price': limit_price,
            'status': order['status']
        }
        
    except BinanceAPIException as e:
        cprint(f"❌ Limit sell failed: {e}", "red")
        return {'success': False, 'error': str(e)}


def cancel_order(symbol, order_id):
    """
    Cancel an open order
    
    Args:
        symbol: Trading pair
        order_id: Order ID to cancel
        
    Returns:
        dict: Cancel result
    """
    try:
        result = client.cancel_order(symbol=symbol, orderId=order_id)
        cprint(f"✅ Order {order_id} cancelled", "green")
        return {'success': True, 'result': result}
    except BinanceAPIException as e:
        cprint(f"❌ Cancel failed: {e}", "red")
        return {'success': False, 'error': str(e)}


def get_open_orders(symbol=None):
    """
    Get all open orders
    
    Args:
        symbol: Optional trading pair to filter
        
    Returns:
        list: List of open orders
    """
    try:
        if symbol:
            orders = client.get_open_orders(symbol=symbol)
        else:
            orders = client.get_open_orders()
        
        return orders
    except BinanceAPIException as e:
        cprint(f"❌ Error getting orders: {e}", "red")
        return []


def get_order_history(symbol, limit=10):
    """
    Get order history for a symbol
    
    Args:
        symbol: Trading pair
        limit: Number of orders to retrieve
        
    Returns:
        list: Order history
    """
    try:
        orders = client.get_all_orders(symbol=symbol, limit=limit)
        return orders
    except BinanceAPIException as e:
        cprint(f"❌ Error getting order history: {e}", "red")
        return []


def get_klines(symbol, interval='1h', limit=100):
    """
    Get candlestick data
    
    Args:
        symbol: Trading pair
        interval: Timeframe (1m, 5m, 15m, 1h, 4h, 1d, etc.)
        limit: Number of candles
        
    Returns:
        pandas.DataFrame: OHLCV data
    """
    try:
        klines = client.get_klines(symbol=symbol, interval=interval, limit=limit)
        
        df = pd.DataFrame(klines, columns=[
            'timestamp', 'open', 'high', 'low', 'close', 'volume',
            'close_time', 'quote_volume', 'trades', 'taker_buy_base',
            'taker_buy_quote', 'ignore'
        ])
        
        # Convert to numeric
        for col in ['open', 'high', 'low', 'close', 'volume']:
            df[col] = pd.to_numeric(df[col])
        
        # Convert timestamp
        df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
        
        return df[['timestamp', 'open', 'high', 'low', 'close', 'volume']]
        
    except BinanceAPIException as e:
        cprint(f"❌ Error getting klines: {e}", "red")
        return pd.DataFrame()


def get_portfolio_value():
    """
    Calculate total portfolio value in USDT
    
    Returns:
        dict: Portfolio breakdown
    """
    try:
        balances = get_all_balances()
        total_value = 0
        breakdown = {}
        
        for asset, balance in balances.items():
            if asset == 'USDT':
                value = balance['total']
            else:
                # Try to get USDT price
                try:
                    price = get_price(f"{asset}USDT")
                    value = balance['total'] * price
                except:
                    continue
            
            if value > 0.01:  # Ignore dust
                total_value += value
                breakdown[asset] = {
                    'balance': balance['total'],
                    'value_usdt': value
                }
        
        return {
            'total_value_usdt': total_value,
            'breakdown': breakdown
        }
        
    except Exception as e:
        cprint(f"❌ Error calculating portfolio: {e}", "red")
        return {'total_value_usdt': 0, 'breakdown': {}}


def print_portfolio():
    """Print portfolio summary"""
    portfolio = get_portfolio_value()
    
    cprint("\n📊 Portfolio Summary (Binance)", "cyan")
    cprint("=" * 50, "cyan")
    
    for asset, data in portfolio['breakdown'].items():
        value_usd = data['value_usdt']
        balance = data['balance']
        
        if value_usd > 0.01:
            cprint(f"{asset:10} {balance:15.8f} ≈ ${value_usd:12.2f}", "white")
    
    cprint("=" * 50, "cyan")
    cprint(f"{'Total':10} {'':15} ≈ ${portfolio['total_value_usdt']:12.2f}", "green")
    cprint("=" * 50, "cyan")


# Test function
if __name__ == "__main__":
    cprint("\n🚀 Testing Binance Integration", "cyan")
    
    # Test balance
    usdt_balance = get_balance('USDT')
    cprint(f"USDT Balance: ${usdt_balance:.2f}", "yellow")
    
    # Test price
    btc_price = get_price('BTCUSDT')
    cprint(f"BTC Price: ${btc_price:.2f}", "yellow")
    
    # Test 24h stats
    stats = get_24h_change('BTCUSDT')
    cprint(f"BTC 24h Change: {stats.get('change_percent', 0):.2f}%", "yellow")
    
    # Print portfolio
    print_portfolio()
