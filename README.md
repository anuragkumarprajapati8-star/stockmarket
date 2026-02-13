# Stock Market Analysis & Prediction App

A full-stack web application for analyzing stock market data and predicting future prices using Machine Learning (Linear Regression, KNN, SVM, ARIMA, and Correlation).

## 🚀 How to Run Manually

You need to run **two separate terminals**: one for the Backend (Python) and one for the Frontend (React).

### 1. Start the Backend (Server)
Open a terminal in the root folder and run:

```powershell
cd backend
venv\Scripts\activate
python app.py
```

*You should see:* `Running on http://127.0.0.1:5000`

### 2. Start the Frontend (UI)
Open a **new** terminal in the root folder and run:

```powershell
cd frontend
npm run dev
```

*You should see:* `Local: http://localhost:5173/`

### 3. Open the App in Browser
Go to: **[http://localhost:5173](http://localhost:5173)**

---

## 🛠️ Features
- **Real-time Data**: Fetches stock data from Yahoo Finance.
- **ML Models**:
    - **Linear Regression (AR)**: Trend analysis using previous day's OHLC.
    - **ARIMA**: Time-series forecasting.
    - **KNN**: K-Nearest Neighbors regression.
    - **SVM**: Support Vector Machine regression.
    - **Correlation**: Lag-based pattern matching (New!).
- **Visualization**: Interactive charts and heatmaps.

## ⚠️ Troubleshooting
- **Blank Page?** Restart the frontend: `Ctrl+C`, then `npm run dev`.
- **API Errors?** Ensure the backend is running on `127.0.0.1:5000`.
- **Missing Modules?** Run `pip install -r requirements.txt` in the `backend` folder.
