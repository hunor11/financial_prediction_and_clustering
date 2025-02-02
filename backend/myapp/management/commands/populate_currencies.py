# myapp/management/commands/populate_currencies.py
from django.core.management.base import BaseCommand
from myapp.models import CurrencyRate
from backend.scraper import CurrencyConverter
from django.utils import timezone


class Command(BaseCommand):
    help = 'Populate the CurrencyRate model with exchange rates between USD, EUR, HUF, and RON'

    def handle(self, *args, **options):
        converter = CurrencyConverter()
        currencies = ['USD', 'EUR', 'HUF', 'RON']

        for base_currency in currencies:
            for target_currency in currencies:
                if base_currency != target_currency:
                    try:
                        rate = converter.get_rate(
                            base_currency, target_currency)
                        if rate is not None:
                            CurrencyRate.objects.update_or_create(
                                base_currency=base_currency,
                                target_currency=target_currency,
                                defaults={
                                    'rate': rate,
                                    'last_updated': timezone.now(),
                                }
                            )
                            self.stdout.write(self.style.SUCCESS(
                                f'Successfully saved rate for {base_currency} to {target_currency}'))
                        else:
                            self.stdout.write(self.style.WARNING(
                                f'No rate found for {base_currency} to {target_currency}'))
                    except Exception as e:
                        self.stdout.write(self.style.ERROR(
                            f'Error saving rate for {base_currency} to {target_currency}: {e}'))
