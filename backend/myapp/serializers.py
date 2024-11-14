# myapp/serializers.py
from rest_framework import serializers
from .models import Stock, CurrencyRate


class StockListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ['symbol', 'name', 'sector', 'industry',
                  'market_cap', 'current_price', 'last_updated']


class StockDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'


class CurrencyRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrencyRate
        fields = '__all__'
