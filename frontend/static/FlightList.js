import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const FlightList = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch('http://your-backend-url/flight-info')
      .then((response) => response.json())
      .then((data) => setFlights(data))
      .catch((error) => console.error('Error fetching flight data:', error));
  }, []);

  return (
    <ScrollView style={styles.container}>
      {flights.map((flight, index) => (
        <View key={index} style={styles.flightItem}>
          <Text>Flight Number: {flight.flight_number}</Text>
          <Text>Arrival Time: {flight.arrival_time}</Text>
          <Text>Departure Time: {flight.departure_time}</Text>
          <Text>Bay: {flight.bay}</Text>
          <Text>Status: {flight.status}</Text>
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
