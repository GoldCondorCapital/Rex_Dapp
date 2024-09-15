document.addEventListener('DOMContentLoaded', () => {
    const flightTableBody = document.getElementById('flightTableBody');
    const errorMessage = document.getElementById('errorMessage');
    
    // Function to save checkbox state to localStorage
    const saveCheckboxState = (checkboxId, isChecked) => {
        localStorage.setItem(checkboxId, isChecked);
    };

    // Function to load checkbox state from localStorage
    const loadCheckboxState = (checkboxId) => {
        return localStorage.getItem(checkboxId) === 'true';
    };

    // Add event listener to the refresh button
    document.getElementById('refreshButton').addEventListener('click', () => {
        flightTableBody.innerHTML = ''; // Clear the current table content

        // Fetch flight data from the Flask backend
        fetch('http://127.0.0.1:5000/api/flight-info', { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    data.forEach((flight, index) => {
                        // Create a new table row
                        const row = document.createElement('tr');
                        const checkboxId = `completed_${index}`;
                        
                        // Restore checkbox state from localStorage
                        const isChecked = loadCheckboxState(checkboxId);

                        row.innerHTML = `
                            <td>${flight.arrival_flight_number}</td>
                            <td>${flight.departure_flight_number}</td>
                            <td>${flight.rego}</td>
                            <td>${flight.bay}</td>
                            <td>${flight.status}</td>
                            <td>${flight.departure_status}</td>
                            <td>${flight.destination}</td>
                            <td><input type="checkbox" id="${checkboxId}" name="${checkboxId}" ${isChecked ? 'checked' : ''}></td>
                        `;

                        // Add event listener to save checkbox state when clicked
                        row.querySelector('input[type="checkbox"]').addEventListener('change', function() {
                            saveCheckboxState(checkboxId, this.checked);
                        });

                        // Append the new row to the table body
                        flightTableBody.appendChild(row);
                    });
                    errorMessage.textContent = ''; // Clear error message if data is successfully loaded
                } else {
                    errorMessage.textContent = 'No flight data available at the moment.';
                }
            })
            .catch(error => {
                errorMessage.textContent = 'Error loading flight data. Please try again.';
                console.error('Error fetching flight data:', error);
            });
    });
});
