document.addEventListener('DOMContentLoaded', () => {
    const flightTableBody = document.getElementById('flightTableBody');
    const refreshButton = document.getElementById('refreshButton');
    const errorMessage = document.getElementById('errorMessage');

    // Add event listener to refresh button
    refreshButton.addEventListener('click', () => {
        flightTableBody.innerHTML = '';  // Clear current table content
        errorMessage.textContent = '';   // Clear any previous errors

        // Update button to show loading state
        refreshButton.textContent = 'Loading...';
        refreshButton.disabled = true;   // Disable the button during loading

        // Fetch flight data from the backend API
        fetch('/api/flight-info')  // Replace with the correct API URL
            .then(response => response.json())
            .then(data => {
                refreshButton.textContent = 'Refresh Flight Data';  // Reset button text
                refreshButton.disabled = false;  // Re-enable the button

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
                } else {
                    errorMessage.textContent = 'No flights available.';
                }
            })
            .catch(error => {
                refreshButton.textContent = 'Refresh Flight Data';  // Reset button text
                refreshButton.disabled = false;  // Re-enable the button
                errorMessage.textContent = 'Error loading flight data. Please try again.';
                console.error('Error fetching flight data:', error);
            });
    });
});
