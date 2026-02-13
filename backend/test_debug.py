import sys
import os
import traceback
import pandas as pd

# Add current directory to path
sys.path.append(os.getcwd())

from utils.data_fetcher import fetch_stock_data
from models.regression_model import train_linear_regression
from models.knn_model import train_knn
from models.svm_model import train_svm
from models.arima_model import train_arima

def test_pipeline():
    tickers = ["AAPL", "META", "TSLA", "NIFTY"]
    
    for symbol in tickers:
        print(f"\n================ SYSTEM TEST: {symbol} ================")
        
        print("1. Fetching Data...")
        df = fetch_stock_data(symbol, period="6mo") # Shorter period for faster test
        
        if df is None or df.empty:
            print(f"FAILED: Data fetch returned None/Empty for {symbol}")
            continue
            
        print(f"SUCCESS: Data fetched. Rows: {len(df)}")
        if df.isnull().values.any():
            print("WARNING: Data contains NaNs even after fetcher processing!")
        
        # Test all models
        models = [
            ("Linear Regression", train_linear_regression, {}),
            ("KNN", train_knn, {'k': 5}),
            ("SVM", train_svm, {}),
            ("ARIMA", train_arima, {})
        ]
        
        for name, func, kwargs in models:
            print(f"  > Testing {name}...")
            try:
                if kwargs:
                    func(df, **kwargs)
                else:
                    func(df)
                print(f"    Pass: {name}")
            except Exception as e:
                print(f"    FAIL: {name} crashed!")
                print(f"    Error: {e}")
                traceback.print_exc()

if __name__ == "__main__":
    test_pipeline()
