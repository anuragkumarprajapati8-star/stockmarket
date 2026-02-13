from flask import Blueprint, request, jsonify
from utils.data_fetcher import fetch_stock_data
import yfinance as yf

stock_bp = Blueprint('stock_routes', __name__)

@stock_bp.route('/search', methods=['GET'])
def search_stock():
    query = request.args.get('query')
    if not query:
        return jsonify({"error": "Query parameter is required"}), 400
    
    # In a real app, we might use a dedicated search API or a local database of tickers.
    # For now, we'll return a simple valid response if it looks like a ticker.
    # yfinance doesn't have a robust search function, so we'll just return the query as a suggestion.
    return jsonify([
        {"symbol": query.upper(), "name": f"{query.upper()} Stock"},
        {"symbol": "AAPL", "name": "Apple Inc."},
        {"symbol": "GOOGL", "name": "Alphabet Inc."},
        {"symbol": "MSFT", "name": "Microsoft Corp."},
        {"symbol": "TCS.NS", "name": "Tata Consultancy Services"},
        {"symbol": "RELIANCE.NS", "name": "Reliance Industries"}
    ])

@stock_bp.route('/overview', methods=['GET'])
def get_stock_overview():
    symbol = request.args.get('symbol')
    if not symbol:
        return jsonify({"error": "Symbol parameter is required"}), 400

    try:
        stock = yf.Ticker(symbol)
        info = stock.info
        
        # Safe extraction of data
        overview_data = {
            "symbol": symbol,
            "name": info.get('longName', symbol),
            "sector": info.get('sector', 'N/A'),
            "industry": info.get('industry', 'N/A'),
            "description": info.get('longBusinessSummary', 'No description available.'),
            "marketCap": info.get('marketCap', 'N/A'),
            "peRatio": info.get('trailingPE', 'N/A'),
            "dividendYield": info.get('dividendYield', 'N/A'),
            "previousClose": info.get('previousClose', 0.0),
            "open": info.get('open', 0.0),
            "dayLow": info.get('dayLow', 0.0),
            "dayHigh": info.get('dayHigh', 0.0),
            "volume": info.get('volume', 0)
        }
        
        return jsonify(overview_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@stock_bp.route('/history', methods=['GET'])
def get_stock_history():
    symbol = request.args.get('symbol')
    period = request.args.get('period', '1y')
    
    if not symbol:
        return jsonify({"error": "Symbol parameter is required"}), 400
        
    df = fetch_stock_data(symbol, period)
    if df is None:
        return jsonify({"error": "Could not fetch data"}), 404
        
    # Convert dates to string for JSON serialization
    df['Date'] = df['Date'].dt.strftime('%Y-%m-%d')
    return jsonify(df.to_dict(orient='records'))
