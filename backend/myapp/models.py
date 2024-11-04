from django.db import models


class Stock(models.Model):
    symbol = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    sector = models.CharField(max_length=50, blank=True, null=True)
    industry = models.CharField(max_length=50, blank=True, null=True)
    market_cap = models.BigIntegerField(blank=True, null=True)
    current_price = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.symbol
