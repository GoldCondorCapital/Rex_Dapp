import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const FlightList = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch('http://your-backend-url/flight-info')  // Replace with your actual backend URL
      .then((response) => response.json())
      .then((data) => setFlights(data))
      .catch((error) => console.error('Error fetching flight data:', error));
  }, []);

  return (
    <ScrollView style={styles.container}>
      {flights.map((flight, index) => (
        <View key={index} style={styles.flightItem}>
          <Text>Flight Number: {flight.departure_flight_number || 'N/A'}</Text>
          <Text>Arrival Time: {flight.arrival_time || 'N/A'}</Text>
          <Text>Scheduled Departure Time: {flight.scheduled_departure || 'N/A'}</Text>
          <Text>Estimated Departure Time: {flight.estimated_departure || 'N/A'}</Text>
          <Text>Bay: {flight.bay || 'N/A'}</Text>
          <Text>Arrival Status: {flight.status || 'N/A'}</Text>
          <Text>Departure Status: {flight.departure_status || 'N/A'}</Text>
          <Text>Destination: {flight.destination || 'N/A'}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  flightItem: {
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 5,
  },
});

export default FlightList;
