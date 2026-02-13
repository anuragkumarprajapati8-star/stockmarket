import sys
import os
import yfinance as yf
import pandas as pd

# Add current directory to path
sys.path.append(os.getcwd())

from utils.data_fetcher import fetch_stock_data

def log(msg):
    with open("debug_log.txt", "a") as f:
        f.write(msg + "\n")
    print(msg)

def test_fetch(symbol):
    log(f"--- TESTING {symbol} ---")
    try:
        df = fetch_stock_data(symbol)
        if df is None:
            log(f"FAIL: {symbol} returned None")
        else:
            log(f"SUCCESS: {symbol} returned {len(df)} rows")
            log(f"Columns: {df.columns.tolist()}")
            log(f"Head: \n{df.head(2)}")
            log(f"Tail: \n{df.tail(2)}")
    except Exception as e:
        log(f"CRASH: {e}")
        import traceback
        with open("debug_log.txt", "a") as f:
            traceback.print_exc(file=f)

if __name__ == "__main__":
    if os.path.exists("debug_log.txt"):
        os.remove("debug_log.txt")
        
    test_fetch("TCS.NS")
    test_fetch("META")
    test_fetch("AAPL")
