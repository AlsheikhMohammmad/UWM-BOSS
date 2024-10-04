import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// User Request Ride Component
const UserRequestRide: React.FC = () => {
  // States to store the form input values
  const [rideType, setRideType] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');

  // Handle form submission
  const handleSubmit = () => {
    console.log('Ride Type:', rideType);
    console.log('Pickup Location:', pickupLocation);
    console.log('Drop-off Location:', dropoffLocation);
    // Implement logic to send the request to the backend here
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Request a Ride</Text>

      {/* Ride Type Selector */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Select Ride Type</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., On-Campus / Off-Campus"
          value={rideType}
          onChangeText={setRideType}
        />
      </View>

      {/* Pickup Location Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Pickup Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter pickup location"
          value={pickupLocation}
          onChangeText={setPickupLocation}
        />
      </View>

      {/* Drop-off Location Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Drop-off Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter drop-off location"
          value={dropoffLocation}
          onChangeText={setDropoffLocation}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Request</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styling for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0078D4',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default UserRequestRide;
