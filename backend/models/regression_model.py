import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

class SalesLinearRegressionRequest:
    # Just a placeholder class name, this is actually StockLinearRegression
    pass

# def train_linear_regression(df):
#     """
#     Trains a Linear Regression model on stock data.
#     Predicts 'Close' price based on numerical index (simple trend).
#     """
#     if len(df) < 30:
#         return {"error": "Not enough data for Regression (need 30+ points)"}
        
#     # Prepare data for Auto-Regressive analysis (use past to predict future)
#     df = df.copy()
    
#     # Feature Engineering: Use Previous Day's data
#     df['Prev_Open'] = df['Open'].shift(1)
#     df['Prev_High'] = df['High'].shift(1)
#     df['Prev_Low'] = df['Low'].shift(1)
#     df['Prev_Close'] = df['Close'].shift(1)
#     df['Prev_Volume'] = df['Volume'].shift(1)
    
#     # Drop rows with NaNs created by shift
#     df.dropna(inplace=True)
    
#     features = ['Prev_Open', 'Prev_High', 'Prev_Low', 'Prev_Close', 'Prev_Volume']
#     X = df[features]
#     y = df['Close']
    
#     X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)
    
#     model = LinearRegression()
#     model.fit(X_train, y_train)
    
#     predictions = model.predict(X_test)
    
#     mse = mean_squared_error(y_test, predictions)
#     rmse = np.sqrt(mse)
#     r2 = r2_score(y_test, predictions)
    
#     # Calculate Pearson Correlation
#     correlation = np.corrcoef(y_test, predictions)[0, 1] if len(y_test) > 1 else 0
    
#     return {
#         "model": "Linear Regression (AR)",
#         "mse": mse,
#         "rmse": rmse,
#         "r2": r2,
#         "correlation": correlation,
#         "predictions": predictions.tolist(),
#         "actual": y_test.tolist(),
#         "dates": df['Date'].iloc[y_test.index].dt.strftime('%Y-%m-%d').tolist()
#     }

def train_linear_regression(df):
    """
    Trains a Linear Regression model on stock data.
    Predicts 'Close' price using previous day's values.
    """

    if len(df) < 30:
        return {"error": "Not enough data for Regression (need 30+ points)"}

    df = df.copy()

    # Reset index to avoid indexing issues
    df.reset_index(drop=True, inplace=True)

    # Feature Engineering (Auto-Regressive)
    df['Prev_Open'] = df['Open'].shift(1)
    df['Prev_High'] = df['High'].shift(1)
    df['Prev_Low'] = df['Low'].shift(1)
    df['Prev_Close'] = df['Close'].shift(1)
    df['Prev_Volume'] = df['Volume'].shift(1)

    df.dropna(inplace=True)
    df.reset_index(drop=True, inplace=True)

    features = ['Prev_Open', 'Prev_High', 'Prev_Low', 'Prev_Close', 'Prev_Volume']
    X = df[features]
    y = df['Close']

    # Time-series split (no shuffle)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, shuffle=False
    )

    model = LinearRegression()
    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    mse = mean_squared_error(y_test, predictions)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, predictions)

    correlation = np.corrcoef(y_test, predictions)[0, 1] if len(y_test) > 1 else 0

    # Now this works safely because index is reset
    test_dates = df.loc[y_test.index, 'Date'].dt.strftime('%Y-%m-%d').tolist()

    return {
        "model": "Linear Regression (AR)",
        "mse": mse,
        "rmse": rmse,
        "r2": r2,
        "correlation": correlation,
        "predictions": predictions.tolist(),
        "actual": y_test.tolist(),
        "dates": test_dates
    }
