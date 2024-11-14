# myapp/views.py
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Stock, CurrencyRate
from .serializers import StockListSerializer, StockDetailSerializer, CurrencyRateSerializer


class StockViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Stock.objects.all()
        serializer = StockListSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            # Assumes pk is used as 'symbol'
            stock = Stock.objects.get(symbol=pk.upper())
            serializer = StockDetailSerializer(stock)
            return Response(serializer.data)
        except Stock.DoesNotExist:
            return Response({"error": "Stock not found"}, status=status.HTTP_404_NOT_FOUND)


class CurrencyRateViewSet(viewsets.ModelViewSet):
    queryset = CurrencyRate.objects.all()
    serializer_class = CurrencyRateSerializer
