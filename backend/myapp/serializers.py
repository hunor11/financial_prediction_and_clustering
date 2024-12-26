# myapp/serializers.py
from rest_framework import serializers
from .models import Stock, CurrencyRate, StockPrice

import math


class StockListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ['symbol', 'name', 'sector', 'current_price', 'pe_ratio',
                  'dividend_yield', 'eps', 'last_updated']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        for key, value in representation.items():
            if isinstance(value, float) and (math.isnan(value) or math.isinf(value)):
                representation[key] = None
        return representation


class StockPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockPrice
        fields = ['date', 'open', 'high', 'low', 'close', 'volume']


class StockDetailSerializer(serializers.ModelSerializer):
    historical_prices = StockPriceSerializer(many=True, read_only=True)

    class Meta:
        model = Stock
        fields = ['symbol', 'name', 'sector', 'industry', 'market_cap', 'current_price',
                  'last_updated', 'description', 'ceo', 'headquarters', 'founded',
                  'pe_ratio', 'dividend_yield', 'eps', 'historical_prices']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        for key, value in representation.items():
            if isinstance(value, float) and (math.isnan(value) or math.isinf(value)):
                representation[key] = None
        return representation


class CurrencyRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrencyRate
        fields = '__all__'
