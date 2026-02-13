import numpy as np
import pandas as pd
from sklearn.svm import SVR
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler

def train_svm(df):
    """
    Trains an SVM Regressor (SVR).
    """
    if len(df) < 30:
        return {"error": "Not enough data for SVM (need 30+ points)"}

    df = df.copy()
    
    # Feature Engineering (shifts)
    df['Prev_Close'] = df['Close'].shift(1)
    df.dropna(inplace=True)
    
    X = df[['Prev_Close']]
    y = df['Close']
    
    # Scale features
    scaler_X = StandardScaler()
    scaler_y = StandardScaler()
    
    X_scaled = scaler_X.fit_transform(X)
    y_scaled = scaler_y.fit_transform(y.values.reshape(-1, 1)).ravel()
    
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y_scaled, test_size=0.2, shuffle=False)
    
    # SVM with RBF kernel
    model = SVR(kernel='rbf', C=100, gamma=0.1, epsilon=.1)
    model.fit(X_train, y_train)
    
    predictions_scaled = model.predict(X_test)
    
    # Inverse transform to get actual prices
    predictions = scaler_y.inverse_transform(predictions_scaled.reshape(-1, 1)).ravel()
    y_test_actual = scaler_y.inverse_transform(y_test.reshape(-1, 1)).ravel()
    
    mse = mean_squared_error(y_test_actual, predictions)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test_actual, predictions)
    
    # Calculate Correlation
    correlation = np.corrcoef(y_test_actual, predictions)[0, 1] if len(y_test_actual) > 1 else 0
    
    return {
        "model": "SVM (RBF)",
        "mse": mse,
        "rmse": rmse,
        "r2": r2,
        "correlation": correlation,
        "predictions": predictions.tolist(),
        "actual": y_test_actual.tolist(),
        "dates": df['Date'].iloc[-len(y_test):].dt.strftime('%Y-%m-%d').tolist()
    }
