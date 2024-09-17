document.addEventListener('DOMContentLoaded', () => {
    const flightTableBody = document.getElementById('flightTableBody');
    const refreshButton = document.getElementById('refreshButton');
    const errorMessage = document.getElementById('errorMessage');

    refreshButton.addEventListener('click', () => {
        flightTableBody.innerHTML = ''; // Clear the table before fetching new data

        // Fetch flight data from the backend API
        fetch('/api/flight-info')  // Replace with your correct API URL
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    data.forEach(flight => {
                        const row = document.createElement('tr');

                        // Populate the table with flight data
                        row.innerHTML = `
                            <td>${flight.arrival_flight_number || 'N/A'}</td>
                            <td>${flight.departure_flight_number || 'N/A'}</td>
                            <td>${flight.rego || 'N/A'}</td>
                            <td>${flight.bay || 'N/A'}</td>
                            <td>${flight.status || 'N/A'}</td>
                            <td>${flight.departure_status || 'N/A'}</td>
                            <td>${flight.destination || 'N/A'}</td>
                            <td><input type="checkbox"></td>
                        `;
                        flightTableBody.appendChild(row);
                    });
                    errorMessage.textContent = '';  // Clear any previous error messages
                } else {
                    errorMessage.textContent = 'No flights available.';
                }
            })
            .catch(error => {
                console.error('Error fetching flight data:', error);
                errorMessage.textContent = 'Error loading flight data.';
            });
    });
});
