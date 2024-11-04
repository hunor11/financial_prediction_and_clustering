from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StockViewSet

router = DefaultRouter()
router.register(r'stocks', StockViewSet)  # Registers /stocks endpoint

urlpatterns = [
    path('', include(router.urls)),
]
