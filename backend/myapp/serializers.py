# myapp/serializers.py
from rest_framework import serializers
from .models import Stock, CurrencyRate

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


class StockDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'

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
