import requests
from bs4 import BeautifulSoup
import logging

# Set logging configuration
logging.basicConfig(level=logging.INFO)

def get_flight_details(url):
    try:
        response = requests.get(url)
        if response.status_code != 200:
            logging.warning(f"Failed to retrieve data from {url}. Status code: {response.status_code}")
            return []
        
        soup = BeautifulSoup(response.content, 'html.parser')
        flights = []

        for flight_row in soup.find_all('tr'):
            try:
                # Extract the flight number
                flight_number_tag = flight_row.find('td', class_='flightNumber')
                if flight_number_tag:
                    flight_number = flight_number_tag.text.strip()
                    logging.info(f"Found flight: {flight_number}")

                    # Check if it's a Rex flight (ZL prefix)
                    if flight_number.startswith("ZL"):
                        try:
                            rego = flight_row.find('td', class_='aircraftRegistration').text.strip()
                        except AttributeError:
                            rego = "Unknown"
                        
                        try:
                            bay = flight_row.find('td', class_='bay').text.strip()
                        except AttributeError:
                            bay = "Unknown"
                        
                        try:
                            status = flight_row.find('td', class_='status').text.strip()
                        except AttributeError:
                            status = "Unknown"
                        
                        try:
                            destination = flight_row.find('td', class_='destination').text.strip()  # Ensure destination is extracted
                        except AttributeError:
                            destination = "Unknown"

                        logging.info(f"Flight details - Flight Number: {flight_number}, Rego: {rego}, Bay: {bay}, Status: {status}, Destination: {destination}")
                        flights.append({
                            'flight_number': flight_number,
                            'rego': rego,
                            'bay': bay,
                            'status': status,
                            'destination': destination  # Ensure destination is appended
                        })

            except Exception as e:
                logging.error(f"Error processing flight row: {e}")

        return flights

    except requests.RequestException as e:
        logging.error(f"Request failed: {e}")
        return []
