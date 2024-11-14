from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StockViewSet, CurrencyRateViewSet

router = DefaultRouter()
router.register(r'stocks', StockViewSet)  # Registers /stocks endpoint
# Registers /currencies endpoint
router.register(r'currencies', CurrencyRateViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
