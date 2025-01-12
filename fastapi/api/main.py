import joblib
import os
import numpy as np
import pandas as pd
import yfinance as yf
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Load the trained model
model_path = os.path.join(os.path.dirname(__file__), "model/xgb_model.pkl")
model = joblib.load(model_path)


# Define the input structure for manual requests
class AnomalyRequest(BaseModel):
    VIX: float = None
    DXY: float = None
    GT10: float = None
    Cl1: float = None
    CRY: float = None
    BDIY: float = None


# Initialize the FastAPI app
app = FastAPI()

# Configure CORS to allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def home():
    return {"message": "Market Anomaly Detection API is running."}


@app.get("/fetch-and-predict")
def fetch_and_predict():
    """
    Fetch the latest data from Yahoo Finance and make a prediction.
    NOTE: This part is not finalized since not all features are freely available.
    Here are the hardcoded values used as an example.
    """
    # Hardcoded values as examples
    data = {
        "VIX": 19.54,
        "DXY": 109.65,
        "GT10": 4.762,
        "Cl1": 76.57,
        "CRY": 361.73,
        "BDIY": 969,
        "VIX_rolling_mean": 19.288,
        "VIX_rolling_std": 0.4204,
    }

    # Uncomment and finalize this part when ready to fetch actual data
    # Define the tickers for Yahoo Finance
    # tickers = {
    #     "VIX": "^VIX",  # CBOE Volatility Index
    #     "DXY": "DX-Y.NYB",  # US Dollar Index
    #     "GT10": "^TNX",  # 10-Year Treasury Yield
    #     "Cl1": "CL=F",  # Crude Oil Futures
    # }

    # Fetch the latest data from Yahoo Finance
    # data = {}
    # for feature, ticker in tickers.items():
    #     try:
    #         df = yf.download(ticker, period="1d", interval="1d")  # Fetch the latest day
    #         data[feature] = float(df["Close"].iloc[-1])  # Use the latest closing price
    #     except Exception as e:
    #         return {"error": f"Failed to fetch {feature}: {str(e)}"}

    # Convert the data to a DataFrame
    input_data = pd.DataFrame([data])
    print(input_data)

    # Make a prediction
    prediction = model.predict(input_data)[0]
    probability = model.predict_proba(input_data)[0, 1]

    return {
        "prediction": int(prediction),
        "probability": float(probability),
    }


@app.post("/predict")
def predict(request: AnomalyRequest):
    """
    Make a prediction using manually provided input values.
    """
    # Convert the input data to a DataFrame
    input_data = pd.DataFrame([request.dict()])

    # Make a prediction
    prediction = model.predict(input_data)[0]
    probability = model.predict_proba(input_data)[0, 1]

    return {
        "prediction": int(prediction),
        "probability": float(probability),
    }