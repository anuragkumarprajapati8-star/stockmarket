import numpy as np
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error, r2_score

def train_arima(df, order=(5,1,0)):
    """
    Trains an ARIMA model.
    Optimized: Uses a single fit if data is large enough, or walk-forward validation for accuracy.
    """
    df = df.copy()
    
    # Validation: Need at least 50 data points for ARIMA
    if len(df) < 50:
         return {"error": "Not enough data for ARIMA (need 50+ points)"}
         
    data = df['Close'].values
    
    train_size = int(len(data) * 0.8)
    train, test = data[:train_size], data[train_size:]
    
    # fast approach: fit once on train, predict test
    # (Walk-forward is too slow for web request)
    try:
        model = ARIMA(train, order=order)
        model_fit = model.fit()
        # Forecast steps=len(test)
        predictions = model_fit.forecast(steps=len(test))
    except Exception as e:
        return {"error": f"ARIMA Convergence Failed: {str(e)}"}
        
    mse = mean_squared_error(test, predictions)
    rmse = np.sqrt(mse)
    r2 = r2_score(test, predictions)
    
    # Calculate Correlation
    correlation = np.corrcoef(test, predictions)[0, 1] if len(test) > 1 else 0
    
    return {
        "model": "ARIMA",
        "mse": mse,
        "rmse": rmse,
        "r2": r2,
        "correlation": correlation,
        "predictions": predictions.tolist(),
        "actual": test.tolist(),
        "dates": df['Date'].iloc[train_size:].dt.strftime('%Y-%m-%d').tolist()
    }
