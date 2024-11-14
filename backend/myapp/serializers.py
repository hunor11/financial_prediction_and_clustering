# myapp/serializers.py
from rest_framework import serializers
from .models import Stock, CurrencyRate


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'  # Serialize all fields of the Stock model


class CurrencyRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrencyRate
        fields = '__all__'  # Serialize all fields of the CurrencyRate model
