import numpy as np
import pandas as pd
from sklearn.metrics import mean_squared_error, r2_score

def train_correlation_model(df, max_lags=30):
    """
    Trains a Correlation-based model (Auto-Regressive Lag Model).
    It finds the past time lag (1 to 30 days) that has the highest correlation 
    with the current price and uses that lagged data to predict.
    """
    if len(df) < 60:
         return {"error": "Not enough data for Auto-Correlation (need 60+ points)"}
         
    df = df.copy()
    
    # 1. Find the best lag
    best_lag = 1
    best_corr = -1
    
    # Iterate through potential lags to find the 'rhythm' of the stock
    for lag in range(1, max_lags + 1):
        # Create lagged series
        shifted = df['Close'].shift(lag)
        
        # Calculate correlation for this lag
        # We need to drop NaNs to calc correlation
        temp_df = pd.DataFrame({'Close': df['Close'], 'Shifted': shifted}).dropna()
        
        if len(temp_df) > 10:
            corr = temp_df['Close'].corr(temp_df['Shifted'])
            if abs(corr) > best_corr:
                best_corr = abs(corr)
                best_lag = lag
                
    # 2. Use the best lag to create predictions
    # prediction[t] = close[t - best_lag]
    # We are essentially saying: "The price today behaves like it did 'best_lag' days ago"
    
    # Create the feature for the model
    df['Predicted_Signal'] = df['Close'].shift(best_lag)
    
    # We can't predict for the first 'best_lag' days, so we drop them for evaluation
    df.dropna(inplace=True)
    
    predictions = df['Predicted_Signal'].values
    actuals = df['Close'].values
    
    # 3. Calculate Metrics
    mse = mean_squared_error(actuals, predictions)
    rmse = np.sqrt(mse)
    r2 = r2_score(actuals, predictions)
    
    # Correlation of the final prediction vs actual
    correlation = np.corrcoef(actuals, predictions)[0, 1] if len(actuals) > 1 else 0
    
    return {
        "model": f"Correlation (Lag-{best_lag})",
        "mse": mse,
        "rmse": rmse,
        "r2": r2,
        "correlation": correlation,
        "predictions": predictions.tolist(),
        "actual": actuals.tolist(),
        "dates": df['Date'].dt.strftime('%Y-%m-%d').tolist(),
        "details": f"Best Lag: {best_lag} days (Corr: {best_corr:.2f})"
    }
