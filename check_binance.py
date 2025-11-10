#!/usr/bin/env python3
"""
🔶 Quick Binance Setup Test
Built with love by Moon Dev 🚀
"""

import os
import sys
from termcolor import cprint

def check_binance_setup():
    """Check if Binance is properly configured"""
    
    cprint("\n" + "="*60, "cyan")
    cprint("🔶 Binance Setup Check", "cyan")
    cprint("="*60 + "\n", "cyan")
    
    # Check 1: Environment variables
    cprint("📋 Step 1: Checking environment variables...", "yellow")
    
    api_key = os.getenv('BINANCE_API_KEY')
    secret_key = os.getenv('BINANCE_SECRET_KEY')
    testnet = os.getenv('BINANCE_TESTNET', 'False')
    
    if not api_key:
        cprint("❌ BINANCE_API_KEY not found in .env", "red")
        cprint("   Add: BINANCE_API_KEY=your_key", "yellow")
        return False
    else:
        masked = api_key[:8] + "..." + api_key[-4:]
        cprint(f"✅ BINANCE_API_KEY found: {masked}", "green")
    
    if not secret_key:
        cprint("❌ BINANCE_SECRET_KEY not found in .env", "red")
        cprint("   Add: BINANCE_SECRET_KEY=your_secret", "yellow")
        return False
    else:
        masked = secret_key[:8] + "..." + secret_key[-4:]
        cprint(f"✅ BINANCE_SECRET_KEY found: {masked}", "green")
    
    if testnet.lower() == 'true':
        cprint("⚠️  Using TESTNET mode (safe for testing)", "yellow")
    else:
        cprint("🔴 Using MAINNET mode (real money!)", "red")
    
    # Check 2: Python package
    cprint("\n📦 Step 2: Checking python-binance package...", "yellow")
    
    try:
        from binance.client import Client
        cprint("✅ python-binance is installed", "green")
    except ImportError:
        cprint("❌ python-binance not installed", "red")
        cprint("   Run: ./python -m pip install python-binance", "yellow")
        return False
    
    # Check 3: Connection test
    cprint("\n🔗 Step 3: Testing Binance connection...", "yellow")
    
    try:
        if testnet.lower() == 'true':
            client = Client(api_key, secret_key, testnet=True)
        else:
            client = Client(api_key, secret_key)
        
        # Test ping
        client.ping()
        cprint("✅ Connection successful (ping OK)", "green")
        
        # Test server time
        server_time = client.get_server_time()
        cprint(f"✅ Server time: {server_time['serverTime']}", "green")
        
    except Exception as e:
        cprint(f"❌ Connection failed: {str(e)}", "red")
        cprint("   Check your API keys and network", "yellow")
        return False
    
    # Check 4: Account access
    cprint("\n👤 Step 4: Testing account access...", "yellow")
    
    try:
        account = client.get_account()
        cprint("✅ Account access successful", "green")
        
        # Check balances
        balances = [b for b in account['balances'] if float(b['free']) > 0 or float(b['locked']) > 0]
        
        if balances:
            cprint(f"✅ Found {len(balances)} assets in your account", "green")
            
            # Show USDT balance
            usdt = next((b for b in balances if b['asset'] == 'USDT'), None)
            if usdt:
                usdt_balance = float(usdt['free']) + float(usdt['locked'])
                cprint(f"💰 USDT Balance: ${usdt_balance:.2f}", "cyan")
            else:
                cprint("⚠️  No USDT found (you'll need USDT to trade)", "yellow")
        else:
            cprint("⚠️  Account has no balances", "yellow")
            if testnet.lower() == 'true':
                cprint("   Go to testnet.binance.vision to get test funds", "yellow")
        
    except Exception as e:
        cprint(f"❌ Account access failed: {str(e)}", "red")
        cprint("   Check API key permissions", "yellow")
        return False
    
    # Check 5: Config file
    cprint("\n⚙️  Step 5: Checking config.py...", "yellow")
    
    try:
        from src import config
        
        if config.EXCHANGE.lower() == 'binance':
            cprint("✅ EXCHANGE set to 'binance' in config.py", "green")
        else:
            cprint(f"⚠️  EXCHANGE is '{config.EXCHANGE}', not 'binance'", "yellow")
            cprint("   Change in src/config.py: EXCHANGE = 'binance'", "yellow")
        
        if hasattr(config, 'BINANCE_SYMBOLS'):
            symbols = config.BINANCE_SYMBOLS
            cprint(f"✅ BINANCE_SYMBOLS configured: {len(symbols)} symbols", "green")
            cprint(f"   Symbols: {', '.join(symbols[:5])}", "cyan")
        else:
            cprint("⚠️  BINANCE_SYMBOLS not configured", "yellow")
            cprint("   Add in src/config.py", "yellow")
        
    except Exception as e:
        cprint(f"❌ Config error: {str(e)}", "red")
        return False
    
    # Check 6: Test trading functions
    cprint("\n🔧 Step 6: Testing Binance functions...", "yellow")
    
    try:
        from src import nice_funcs_binance as binance
        
        # Test price fetch
        price = binance.get_price('BTCUSDT')
        if price > 0:
            cprint(f"✅ Price fetch working: BTC = ${price:,.2f}", "green")
        else:
            cprint("❌ Price fetch failed", "red")
            return False
        
        # Test 24h stats
        stats = binance.get_24h_change('BTCUSDT')
        if stats:
            change = stats.get('change_percent', 0)
            color = "green" if change > 0 else "red"
            cprint(f"✅ 24h stats: BTC {change:+.2f}%", color)
        
    except Exception as e:
        cprint(f"❌ Function test failed: {str(e)}", "red")
        return False
    
    # Final summary
    cprint("\n" + "="*60, "green")
    cprint("🎉 Binance Setup Complete!", "green")
    cprint("="*60, "green")
    
    cprint("\n📝 Next Steps:", "cyan")
    cprint("1. Start trading:", "white")
    cprint("   ./start_agents.sh", "yellow")
    cprint("\n2. Or test directly:", "white")
    cprint("   ./python src/nice_funcs_binance.py", "yellow")
    cprint("\n3. Check docs:", "white")
    cprint("   cat docs/BINANCE_SETUP.md", "yellow")
    
    return True


if __name__ == "__main__":
    # Load env
    from dotenv import load_dotenv
    load_dotenv()
    
    success = check_binance_setup()
    
    if not success:
        cprint("\n❌ Setup incomplete. Fix the errors above.", "red")
        sys.exit(1)
    else:
        cprint("\n✅ Ready to trade on Binance! 🚀", "green")
        sys.exit(0)
