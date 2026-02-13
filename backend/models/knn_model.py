import numpy as np
import pandas as pd
from sklearn.neighbors import KNeighborsRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler

def train_knn(df, k=5):
    """
    Trains a KNN Regressor.
    Features: Open, High, Low, Volume (Previous day's data to predict today's Close)
    """
    if len(df) < 30:
        return {"error": "Not enough data for KNN (need 30+ points)"}

    df = df.copy()
    
    # Shift features to use previous day's data to predict today's close
    df['Prev_Open'] = df['Open'].shift(1)
    df['Prev_High'] = df['High'].shift(1)
    df['Prev_Low'] = df['Low'].shift(1)
    df['Prev_Close'] = df['Close'].shift(1)
    df['Prev_Volume'] = df['Volume'].shift(1)
    
    df.dropna(inplace=True)
    
    features = ['Prev_Open', 'Prev_High', 'Prev_Low', 'Prev_Close', 'Prev_Volume']
    X = df[features]
    y = df['Close']
    
    # Scale features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, shuffle=False)
    
    model = KNeighborsRegressor(n_neighbors=k)
    model.fit(X_train, y_train)
    
    predictions = model.predict(X_test)
    
    mse = mean_squared_error(y_test, predictions)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, predictions)
    
    # Calculate Correlation
    correlation = np.corrcoef(y_test, predictions)[0, 1] if len(y_test) > 1 else 0
    
    return {
        "model": f"KNN (k={k})",
        "mse": mse,
        "rmse": rmse,
        "r2": r2,
        "correlation": correlation,
        "predictions": predictions.tolist(),
        "actual": y_test.tolist(),
        "dates": df['Date'].iloc[y_test.index].dt.strftime('%Y-%m-%d').tolist()
    }
