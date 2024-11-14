from django.shortcuts import render

from rest_framework import viewsets
from .models import Stock, CurrencyRate
from .serializers import StockSerializer, CurrencyRateSerializer


class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer


class CurrencyRateViewSet(viewsets.ModelViewSet):
    queryset = CurrencyRate.objects.all()
    serializer_class = CurrencyRateSerializer
