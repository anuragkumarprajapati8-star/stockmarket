from flask import Blueprint, request, jsonify
from utils.data_fetcher import fetch_stock_data
from models.regression_model import train_linear_regression
from models.arima_model import train_arima
from models.knn_model import train_knn
from models.svm_model import train_svm
from models.correlation_model import train_correlation_model

ml_bp = Blueprint('ml_routes', __name__)

@ml_bp.route('/predict/linear', methods=['GET'])
def predict_linear():
    symbol = request.args.get('symbol')
    if not symbol:
        return jsonify({"error": "Symbol is required"}), 400
    
    df = fetch_stock_data(symbol, period="2y") # Need enough history
    if df is None:
        return jsonify({"error": "Could not fetch data"}), 404
        
    try:
        result = train_linear_regression(df)
        return jsonify(result)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Linear Regression failed: {str(e)}"}), 500

@ml_bp.route('/predict/arima', methods=['GET'])
def predict_arima():
    symbol = request.args.get('symbol')
    if not symbol:
        return jsonify({"error": "Symbol is required"}), 400
        
    df = fetch_stock_data(symbol, period="2y")
    if df is None:
        return jsonify({"error": "Could not fetch data"}), 404
        
    try:
        result = train_arima(df)
        return jsonify(result)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"ARIMA failed: {str(e)}"}), 500

@ml_bp.route('/predict/knn', methods=['GET'])
def predict_knn():
    symbol = request.args.get('symbol')
    k = int(request.args.get('k', 5))
    
    if not symbol:
        return jsonify({"error": "Symbol is required"}), 400
        
    df = fetch_stock_data(symbol, period="2y")
    if df is None:
        return jsonify({"error": "Could not fetch data"}), 404
        
    try:
        result = train_knn(df, k=k)
        return jsonify(result)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"KNN failed: {str(e)}"}), 500

@ml_bp.route('/predict/svm', methods=['GET'])
def predict_svm():
    symbol = request.args.get('symbol')
    if not symbol:
        return jsonify({"error": "Symbol is required"}), 400
        
    df = fetch_stock_data(symbol, period="2y")
    if df is None:
        return jsonify({"error": "Could not fetch data"}), 404
        
    try:
        result = train_svm(df)
        return jsonify(result)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"SVM failed: {str(e)}"}), 500

@ml_bp.route('/predict/correlation', methods=['GET'])
def predict_correlation():
    symbol = request.args.get('symbol')
    if not symbol:
        return jsonify({"error": "Symbol is required"}), 400
        
    df = fetch_stock_data(symbol, period="2y")
    if df is None:
        return jsonify({"error": "Could not fetch data"}), 404
        
    try:
        result = train_correlation_model(df)
        return jsonify(result)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Correlation Algo failed: {str(e)}"}), 500
