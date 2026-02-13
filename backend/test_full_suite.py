import sys
import os
import yfinance as yf
import pandas as pd
import traceback
import json

# Add current directory to path
sys.path.append(os.getcwd())

from models.regression_model import train_linear_regression
from models.knn_model import train_knn
from models.svm_model import train_svm
from models.arima_model import train_arima
from models.correlation_model import train_correlation_model
from utils.data_fetcher import fetch_stock_data

def test_model(name, func, df, **kwargs):
    print(f"  Testing {name}...", end=" ")
    try:
        result = func(df, **kwargs)
        if "error" in result:
             print(f"FAIL: {result['error']}")
        elif "predictions" not in result or not result['predictions']:
             print("FAIL: No predictions returned")
        else:
             print("SUCCESS")
    except Exception as e:
        print(f"CRASH: {str(e)}")
        # traceback.print_exc()

def run_suite():
    tickers = ["AAPL", "TCS.NS", "GOOGL"] # Add a problematic one if known
    
    for symbol in tickers:
        print(f"\n--- DIAGNOSING {symbol} ---")
        df = fetch_stock_data(symbol)
        
        if df is None or df.empty:
            print(f"CRITICAL: Could not fetch data for {symbol}")
            continue
            
        print(f"Fetched {len(df)} rows.")
        
        test_model("Linear (AR)", train_linear_regression, df)
        test_model("KNN", train_knn, df, k=5)
        test_model("SVM", train_svm, df)
        test_model("ARIMA", train_arima, df)
        test_model("Correlation", train_correlation_model, df)

if __name__ == "__main__":
    run_suite()
