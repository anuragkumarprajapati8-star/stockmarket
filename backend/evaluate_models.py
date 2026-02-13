import sys
import os
import pandas as pd
import warnings

# Suppress sklearn warnings and pandas warnings
warnings.filterwarnings('ignore')

# Add current directory to path
sys.path.append(os.getcwd())

from utils.data_fetcher import fetch_stock_data
from models.svm_model import train_svm

def evaluate_models():
    tickers = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA"]
    results = []
    
    with open("evaluation_results.txt", "w") as f:
        f.write("Evaluating SVM Model Accuracy...\n\n")
        
        for symbol in tickers:
            try:
                df = fetch_stock_data(symbol, period="1y") 
            except Exception:
                df = None
            
            if df is None or df.empty:
                f.write(f"FAILED to fetch data for {symbol}\n")
                continue
                
            try:
                result = train_svm(df)
                if "error" not in result:
                    results.append({
                        "Ticker": symbol,
                        "MSE": result['mse'],
                        "RMSE": result['rmse'],
                        "R2": result['r2'],
                        "Corr": result['correlation']
                    })
            except Exception as e:
                 f.write(f"Error for {symbol}: {e}\n")

        f.write("\n--- SVM Model Performance Summary ---\n")
        f.write(f"{'Ticker':<8} | {'MSE':<10} | {'RMSE':<10} | {'R2 Score':<10} | {'Correlation':<10}\n")
        f.write("-" * 65 + "\n")
        
        avg_r2 = 0
        avg_corr = 0
        
        for res in results:
            f.write(f"{res['Ticker']:<8} | {res['MSE']:<10.4f} | {res['RMSE']:<10.4f} | {res['R2']:<10.4f} | {res['Corr']:<10.4f}\n")
            avg_r2 += res['R2']
            avg_corr += res['Corr']
            
        if results:
            avg_r2 /= len(results)
            avg_corr /= len(results)
            f.write("-" * 65 + "\n")
            f.write(f"{'AVERAGE':<8} | {'-':<10} | {'-':<10} | {avg_r2:<10.4f} | {avg_corr:<10.4f}\n")

if __name__ == "__main__":
    evaluate_models()
