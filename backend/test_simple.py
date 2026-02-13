import yfinance as yf
print("--- Minimal yfinance Test ---")
try:
    ticker = yf.Ticker("AAPL")
    df = ticker.history(period="1mo")
    print(f"Result Type: {type(df)}")
    print(f"Empty: {df.empty if df is not None else 'None'}")
    if df is not None and not df.empty:
        print(f"Columns: {df.columns}")
        print(f"Head: {df.head(1)}")
    else:
        print("Data is empty!")
except Exception as e:
    print(f"CRASH: {e}")
    import traceback
    traceback.print_exc()
