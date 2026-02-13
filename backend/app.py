# from flask import Flask, jsonify
# from flask_cors import CORS
# import os

# from routes.stock_routes import stock_bp
# from routes.ml_routes import ml_bp

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})

# app.register_blueprint(stock_bp, url_prefix='/api/stock')
# app.register_blueprint(ml_bp, url_prefix='/api')

# # Basic health check route
# @app.route('/health', methods=['GET'])
# def health_check():
#     return jsonify({"status": "healthy", "service": "Stock Market Prediction API"})

# if __name__ == '__main__':
#     port = int(os.environ.get('PORT', 5000))
#     app.run(debug=True, host='0.0.0.0', port=port)
from flask import Flask, jsonify
from flask_cors import CORS
import os

from routes.stock_routes import stock_bp
from routes.ml_routes import ml_bp

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(stock_bp, url_prefix='/api/stock')
app.register_blueprint(ml_bp, url_prefix='/api')

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "Stock Market Prediction API"})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
