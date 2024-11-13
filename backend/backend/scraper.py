import requests
from bs4 import BeautifulSoup

class CurrencyConverter:
    def __init__(self):
        # Initialize exchange rates upon instantiation
        self.eur_to_ron = self._get_rate("EUR", "RON")
        self.ron_to_eur = self._get_rate("RON", "EUR")
        self.usd_to_ron = self._get_rate("USD", "RON")
        self.ron_to_usd = self._get_rate("RON", "USD")
        self.eur_to_usd = self._get_rate("EUR", "USD")
        self.usd_to_eur = self._get_rate("USD", "EUR")
        self.huf_to_ron = self._get_rate("HUF", "RON")
        self.ron_to_huf = self._get_rate("RON", "HUF")
        self.eur_to_huf = self._get_rate("EUR", "HUF")
        self.huf_to_eur = self._get_rate("HUF", "EUR")
        self.usd_to_huf = self._get_rate("USD", "HUF")
        self.huf_to_usd = self._get_rate("HUF", "USD")

    def _get_rate(self, from_currency: str, to_currency: str) -> float:
        """
        Private method to fetch exchange rate from one currency to another.
        """
        url = f"https://www.xe.com/currencyconverter/convert/?Amount=1&From={from_currency}&To={to_currency}"
        response = requests.get(url)
        if response.status_code != 200:
            raise Exception(f"Failed to retrieve data from XE for {from_currency} to {to_currency}")

        soup = BeautifulSoup(response.content, 'html.parser')
        rate_element = soup.find("p", class_="sc-63d8b7e3-1 bMdPIi")
        
        if not rate_element:
            raise Exception(f"Could not find exchange rate for {from_currency} to {to_currency} on the page.")
        
        rate = rate_element.get_text()
        # Remove any non-numeric characters like spaces or commas, convert to float
        #print(rate.replace(',', '').strip().split(' ')[0])
        return float(rate.replace(',', '').strip().split(' ')[0])

    def get_rate(self, from_currency: str, to_currency: str) -> float:
        """
        Public method to retrieve the stored exchange rate for a given currency pair.
        """
        # Dictionary to map input pair to the stored exchange rate attribute
        rates = {
            ("EUR", "RON"): self.eur_to_ron,
            ("RON", "EUR"): self.ron_to_eur,
            ("USD", "RON"): self.usd_to_ron,
            ("RON", "USD"): self.ron_to_usd,
            ("EUR", "USD"): self.eur_to_usd,
            ("USD", "EUR"): self.usd_to_eur,
            ("HUF", "RON"): self.huf_to_ron,
            ("RON", "HUF"): self.ron_to_huf,
            ("EUR", "HUF"): self.eur_to_huf,
            ("HUF", "EUR"): self.huf_to_eur,
            ("USD", "HUF"): self.usd_to_huf,
            ("HUF", "USD"): self.huf_to_usd,
        }
        
        return rates.get((from_currency, to_currency), None)

# Example usage
converter = CurrencyConverter()
print("EUR to RON:", converter.eur_to_ron)
print("USD to RON:", converter.usd_to_ron)
print("HUF to RON:", converter.huf_to_ron)

# Retrieve specific rate dynamically using `get_rate` method
print("USD to EUR:", converter.get_rate("USD", "EUR"))
