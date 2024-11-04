# myapp/management/commands/populate_stocks.py
from django.core.management.base import BaseCommand
from myapp.models import Stock
import yfinance as yf
import csv


class Command(BaseCommand):
    help = 'Populate the Stock model with S&P 500 stock data'

    def handle(self, *args, **options):
        with open('../data/sp500_tickers.csv', 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                symbol = row['Symbol']
                try:
                    stock_data = yf.Ticker(symbol).info
                    Stock.objects.update_or_create(
                        symbol=symbol,
                        defaults={
                            'name': stock_data.get('longName', ''),
                            'sector': stock_data.get('sector', ''),
                            'industry': stock_data.get('industry', ''),
                            'market_cap': stock_data.get('marketCap', None),
                            'current_price': stock_data.get('currentPrice', None),
                        }
                    )
                    print(f"Saved {symbol}")
                except Exception as e:
                    print(f"Error saving {symbol}: {e}")
