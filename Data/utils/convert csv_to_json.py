import csv
import json

# Define the input CSV file and output JSON file paths
csv_file_path = './sp500_tickers.csv'
json_file_path = './sp500_tickers.json'

# Initialize an empty list to store the symbols
symbols = []

# Read the CSV file
with open(csv_file_path, 'r') as csv_file:
    reader = csv.DictReader(csv_file)
    for row in reader:
        symbols.append(row['Symbol'])

# Write the symbols to the JSON file
with open(json_file_path, 'w') as json_file:
    json.dump(symbols, json_file, indent=4)

print(f"Successfully converted {csv_file_path} to {json_file_path}")
