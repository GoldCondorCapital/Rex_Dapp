# Importing scraper function from scraper.py
from scraper import get_flight_details  # Assuming this function fetches the data
import logging

# Filtering and logging Rex ZL flights only
def filter_rex_flights(flights):
    relevant_flights = []
    for flight in flights:
        if flight['flight_number'].startswith('ZL'):
            logging.info(f"Found Rex ZL flight: {flight['flight_number']}")
            relevant_flights.append(flight)
    return relevant_flights

def match_flights_by_rego(departure_flights, arrival_flights):
    matched_flights = []
    for arrival in arrival_flights:
        for departure in departure_flights:
            if arrival['rego'] == departure['rego'] and arrival['flight_number'].startswith('ZL'):
                matched_flights.append({
                    'arrival_flight_number': arrival['flight_number'],
                    'departure_flight_number': departure['flight_number'],
                    'rego': arrival['rego'],
                    'bay': arrival['bay'],
                    'status': arrival['status'],
                    'departure_status': departure['status'],
                    'destination': departure['destination'],
                    'arrival_time': arrival.get('arrival_time', 'N/A'),  # Adding arrival time
                    'departure_time': departure.get('departure_time', 'N/A')  # Adding departure time
                })
                logging.info(f"Matched Rex ZL Flight: Arrival {arrival['flight_number']} with Departure {departure['flight_number']}")
    return matched_flights

# Example usage
if __name__ == "__main__":
    # URLs for fetching departure and arrival flight details
    domestic_departure_url = "http://sydneyairport.com.au/infosyd/direct-view/44268d53-5830-49f7-bc2a-f64fe9c8cff8/today"
    domestic_arrival_url = "https://www.sydneyairport.com.au/infosyd/direct-view/74cd0295-038c-49a3-806a-19ef530cad93/today"

    # Get departure and arrival flight details
    departure_flights = get_flight_details(domestic_departure_url)
    arrival_flights = get_flight_details(domestic_arrival_url)

    # Filter only Rex flights (ZL)
    departure_flights = filter_rex_flights(departure_flights)
    arrival_flights = filter_rex_flights(arrival_flights)

    # Match flights based on rego
    matched_flights = match_flights_by_rego(departure_flights, arrival_flights)

    # Print matched flights with times
    for flight in matched_flights:
        print(f"Arrival Flight Number: {flight['arrival_flight_number']}, "
              f"Departure Flight Number: {flight['departure_flight_number']}, "
              f"Rego: {flight['rego']}, Bay: {flight['bay']}, "
              f"Arrival Status: {flight['status']}, Departure Status: {flight['departure_status']}, "
              f"Arrival Time: {flight['arrival_time']}, Departure Time: {flight['departure_time']}")
        
# Enable logging
logging.basicConfig(level=logging.INFO)
