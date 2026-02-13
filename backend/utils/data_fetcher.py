import yfinance as yf
import pandas as pd
import traceback
import os

def log_debug(msg):
    try:
        with open("fetcher.log", "a") as f:
            f.write(msg + "\n")
    except:
        pass
    print(msg)

def fetch_stock_data(symbol, period="2y"):
    log_debug(f"\n--- FETCHING {symbol} ---")
    try:
        # Force import pandas
        import pandas as pd
        
        ticker = yf.Ticker(symbol)
        df = ticker.history(period=period)
        
        if df is None or df.empty:
            log_debug(f"FAIL: Empty DF from yfinance for {symbol}")
            return None
            
        # Reset index to get Date column
        df.reset_index(inplace=True)
        
        # Log raw columns
        log_debug(f"Raw columns: {df.columns.tolist()}")
        
        # Flatten MultiIndex if present
        if isinstance(df.columns, pd.MultiIndex):
            log_debug("Detected MultiIndex, flattening...")
            df.columns = df.columns.get_level_values(0)
            
        # Clean column names: Title case, strip spaces
        df.columns = [str(c).strip().title() for c in df.columns]
        log_debug(f"Cleaned columns: {df.columns.tolist()}")
        
        # Check for Datetime and timezone
        if 'Date' in df.columns:
            # Remove timezone if present to avoid issues
            df['Date'] = pd.to_datetime(df['Date']).dt.tz_localize(None)
            
        # Ensure we have critical columns
        required = ['Date', 'Close']
        if not all(col in df.columns for col in required):
            log_debug(f"CRITICAL FAIL: Missing Date or Close. Have: {df.columns.tolist()}")
            return None
            
        # Optional columns needed for ML - fill if missing
        for col in ['Open', 'High', 'Low', 'Volume']:
            if col not in df.columns:
                log_debug(f"WARN: Missing {col}, filling with Close or 0")
                if col in ['Open', 'High', 'Low']:
                    df[col] = df['Close']
                else:
                    df[col] = 0
                    
        # Filter to expected columns
        final_cols = ['Date', 'Open', 'High', 'Low', 'Close', 'Volume']
        df = df[final_cols].copy()
        
        # Drop NaNs
        before_len = len(df)
        df.dropna(inplace=True)
        after_len = len(df)
        
        if after_len == 0:
            log_debug("FAIL: dropna() removed all rows!")
            return None
            
        log_debug(f"SUCCESS: Returning {after_len} rows (dropped {before_len - after_len} NaNs)")
        return df

    except Exception as e:
        log_debug(f"EXCEPTION: {str(e)}")
        traceback.print_exc()
        return None
