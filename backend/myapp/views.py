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
