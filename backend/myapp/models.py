# myapp/models.py
from django.db import models
from django.utils import timezone


class Stock(models.Model):
    symbol = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    sector = models.CharField(max_length=50, blank=True, null=True)
    industry = models.CharField(max_length=50, blank=True, null=True)
    market_cap = models.BigIntegerField(blank=True, null=True)
    current_price = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    last_updated = models.DateTimeField(auto_now=True)  # Add this field

    def __str__(self):
        return self.symbol


class CurrencyRate(models.Model):
    base_currency = models.CharField(max_length=3)
    target_currency = models.CharField(max_length=3)
    rate = models.FloatField()
    last_updated = models.DateTimeField(auto_now=True)  # Add this field

    def __str__(self):
        return f'{self.base_currency} to {self.target_currency}: {self.rate}'
