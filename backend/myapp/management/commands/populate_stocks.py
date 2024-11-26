# myapp/management/commands/populate_stocks.py
from django.utils import timezone
from django.core.management.base import BaseCommand
from myapp.models import Stock
import yfinance as yf
import json
import math

# class Command(BaseCommand):
#     help = 'Populate the Stock model with S&P 500 stock data'

#     def handle(self, *args, **options):
#         with open('../data/sp500_tickers.json', 'r') as file:
#             symbols = json.load(file)
#             for symbol in symbols:
#                 try:
#                     stock_data = yf.Ticker(symbol).info
#                     Stock.objects.update_or_create(
#                         symbol=symbol,
#                         defaults={
#                             'name': stock_data.get('longName', ''),
#                             'sector': stock_data.get('sector', ''),
#                             'industry': stock_data.get('industry', ''),
#                             'market_cap': stock_data.get('marketCap', None),
#                             'current_price': stock_data.get('currentPrice', None),
#                             'last_updated': timezone.now(),
#                             'description': stock_data.get('longBusinessSummary', ''),
#                             'ceo': stock_data.get('ceo', ''),
#                             'headquarters': stock_data.get('address1', ''),
#                             'founded': stock_data.get('founded', None),
#                             'pe_ratio': stock_data.get('trailingPE', None),
#                             'dividend_yield': stock_data.get('dividendYield', None),
#                             'eps': stock_data.get('trailingEps', None),
#                         }
#                     )
#                     print(f"Saved {symbol}")
#                 except Exception as e:
#                     print(f"Error saving {symbol}: {e}")


class Command(BaseCommand):
    help = 'Populate the Stock model with data from the S&P 500'

    def handle(self, *args, **options):
        with open('../data/sp500_tickers.json', 'r') as file:
            symbols = json.load(file)
            for symbol in symbols:
                try:
                    stock_data = yf.Ticker(symbol).info
                    Stock.objects.update_or_create(
                        symbol=symbol,
                        defaults={
                            'name': stock_data.get('longName', ''),
                            'sector': stock_data.get('sector', ''),
                            'industry': stock_data.get('industry', ''),
                            'market_cap': self.clean_float(stock_data.get('marketCap', None)),
                            'current_price': self.clean_float(stock_data.get('currentPrice', None)),
                            'last_updated': timezone.now(),
                            'description': stock_data.get('longBusinessSummary', ''),
                            'ceo': stock_data.get('ceo', ''),
                            'headquarters': stock_data.get('address1', ''),
                            'founded': stock_data.get('founded', None),
                            'pe_ratio': self.clean_float(stock_data.get('trailingPE', None)),
                            'dividend_yield': self.clean_float(stock_data.get('dividendYield', None)),
                        }
                    )
                    self.stdout.write(self.style.SUCCESS(
                        f'Successfully updated {symbol}'))
                except Exception as e:
                    self.stdout.write(self.style.ERROR(
                        f'Error updating {symbol}: {e}'))

    def clean_float(self, value):
        if value is None or math.isnan(value) or math.isinf(value):
            return None
        return value
