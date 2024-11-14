# myapp/management/commands/refresh_data.py
from django.core.management.base import BaseCommand
from django.core.management import call_command


class Command(BaseCommand):
    help = 'Refresh both stocks and currencies data'

    def handle(self, *args, **options):
        self.stdout.write('Refreshing stocks data...')
        call_command('populate_stocks')
        self.stdout.write('Refreshing currencies data...')
        call_command('populate_currencies')
        self.stdout.write(self.style.SUCCESS(
            'Successfully refreshed stocks and currencies data'))
