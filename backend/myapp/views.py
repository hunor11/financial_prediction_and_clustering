# myapp/views.py
import json
from django.http import JsonResponse
from .utils import CustomJSONEncoder

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Stock, CurrencyRate
from .serializers import StockListSerializer, StockDetailSerializer, CurrencyRateSerializer

import pandas as pd
from sklearn.linear_model import LinearRegression

import yfinance as yf


# class StockViewSet(viewsets.ViewSet):
#     def list(self, request):
#         queryset = Stock.objects.all()
#         serializer = StockListSerializer(queryset, many=True)
#         return Response(serializer.data)

#     def retrieve(self, request, pk=None):
#         try:
#             # Assumes pk is used as 'symbol'
#             stock = Stock.objects.get(symbol=pk.upper())
#             serializer = StockDetailSerializer(stock)
#             return Response(serializer.data)
#         except Stock.DoesNotExist:
#             return Response({"error": "Stock not found"}, status=status.HTTP_404_NOT_FOUND)

class StockViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Stock.objects.all()
        serializer = StockListSerializer(queryset, many=True)
        # data = json.dumps(serializer.data, cls=CustomJSONEncoder)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            stock = Stock.objects.get(symbol=pk.upper())
            serializer = StockDetailSerializer(stock)
            # data = json.dumps(serializer.data, cls=CustomJSONEncoder)
            return Response(serializer.data)
        except Stock.DoesNotExist:
            return Response({"error": "Stock not found"}, status=status.HTTP_404_NOT_FOUND)
        
    @action(detail=False, methods=['get'], url_path='predict')
    def predict(self, request):
        symbol = request.query_params.get('symbol')
        duration = int(request.query_params.get('duration', 5))  # Default to 5 days

        if not symbol:
            return Response({"error": "Stock symbol is required"}, status=400)

        # Fetch historical data if not available in the DB
        try:
            stock = Stock.objects.get(symbol=symbol.upper())
            # Fetch historical prices using Yahoo Finance if not present
            historical_data = yf.download(symbol, period="1y", interval="1d")  # 1 year of data
            historical_prices = historical_data['Close'].values.T  # Get the closing prices

            # Update your Stock instance with the historical data
            historical_prices = historical_prices[0]
            stock.historical_prices = historical_prices
            stock.save()
            
            if len(historical_prices) < 2:
                return Response({"error": "Not enough historical data to make a prediction"}, status=400)
        except Stock.DoesNotExist:
            return Response({"error": "Stock not found"}, status=404)

        # Extract historical prices and create the model
        prices = historical_prices
        days = list(range(1, len(prices) + 1))

        # Train a linear regression model
        model = LinearRegression()
        X = pd.DataFrame(days)
        y = pd.Series(prices)
        model.fit(X, y)

        # Predict future prices
        future_days = [[len(prices) + i] for i in range(1, duration + 1)]
        predicted_prices = model.predict(future_days)

        return Response({
            "symbol": symbol.upper(),
            "predicted_prices": list(predicted_prices)
        })


class CurrencyRateViewSet(viewsets.ModelViewSet):
    queryset = CurrencyRate.objects.all()
    serializer_class = CurrencyRateSerializer

    @action(detail=False, methods=['get'], url_path='symbol/(?P<symbol>[^/.]+)')
    def get_rates_by_symbol(self, request, symbol=None):
        if symbol:
            rates = self.queryset.filter(base_currency=symbol.upper())
            if not rates.exists():
                return Response({"error": f"No rates found for base currency {symbol.upper()}"}, status=status.HTTP_404_NOT_FOUND)
            serializer = self.get_serializer(rates, many=True)
            return Response(serializer.data)
        return Response({"error": "Symbol not provided"}, status=status.HTTP_400_BAD_REQUEST)
    

