from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StockViewSet, CurrencyRateViewSet

router = DefaultRouter()
router.register(r'stocks', StockViewSet, basename='stock')
router.register(r'currencyrates', CurrencyRateViewSet, basename='currencyrate')

urlpatterns = [
    path('', include(router.urls)),
]
