from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import torch
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler

app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes
# Restrict to React origin
CORS(app, resources={r"/forecast": {"origins": "http://localhost:3000"}})


# Load the model (ensure you have the model in the right path)
model = torch.jit.load("stock_lstm_jit.pth")
model.eval()

# Function to process data and make predictions


def predict_next_days(data, model, days=5):
    scaler = MinMaxScaler(feature_range=(0, 1))
    data = data[-60:]  # Get the last 60 days
    last_60_days = scaler.fit_transform(np.array(data).reshape(-1, 1))
    predictions = []

    for _ in range(days):
        last_60_days_tensor = torch.tensor(
            last_60_days, dtype=torch.float32).unsqueeze(0)
        model.eval()
        with torch.no_grad():
            prediction = model(last_60_days_tensor).numpy()
            predicted_price = scaler.inverse_transform(prediction)[0][0]
            predictions.append(predicted_price)
            last_60_days = np.append(last_60_days[1:], prediction, axis=0)

    # Inverse transform the predictions
    predicted_prices = np.array(predictions)

    return predicted_prices.flatten().tolist()


@app.route('/forecast', methods=['POST'])
def forecast():
    data = request.json.get('prices')

    if len(data) < 60:
        return jsonify({"error": "Not enough data to forecast"}), 400

    forecasted_prices = predict_next_days(data, model, days=10)

    return jsonify({"forecast": forecasted_prices})


if __name__ == "__main__":
    app.run(port=5001, debug=True)
