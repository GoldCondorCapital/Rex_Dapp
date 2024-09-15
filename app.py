from flask import Flask, jsonify, render_template
from flask_cors import CORS
from flight_matcher import match_flights_by_rego, get_flight_details


app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)  # Enable CORS for all routes

# Serve the index page
@app.route('/')
def index():
    return render_template('flight-info.html')  # Serve the main HTML file

# Fetch flight data (JSON endpoint)
@app.route('/api/flight-info', methods=['GET'])
def flight_info():
    departure_url = "http://sydneyairport.com.au/infosyd/direct-view/44268d53-5830-49f7-bc2a-f64fe9c8cff8/today"
    arrival_url = "https://www.sydneyairport.com.au/infosyd/direct-view/74cd0295-038c-49a3-806a-19ef530cad93/today"

    # Fetch flight data using scraper functions
    departure_flights = get_flight_details(departure_url)
    arrival_flights = get_flight_details(arrival_url)

    # Match flights by rego
    matched_flights = match_flights_by_rego(departure_flights, arrival_flights)

    # Return the matched flights as JSON
    return jsonify(matched_flights)

if __name__ == '__main__':
    app.run(debug=True)
