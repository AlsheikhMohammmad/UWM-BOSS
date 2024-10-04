import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const UserConfirmRide = () => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Confirm Your Ride</Text>

      {/* Ride Type Info */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Ride Type:</Text>
        <Text style={styles.value}>On-Campus</Text>
      </View>

      {/* Pickup Location Info */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Pickup Location:</Text>
        <Text style={styles.value}>Library</Text>
      </View>

      {/* Drop-off Location Info */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Drop-off Location:</Text>
        <Text style={styles.value}>Student Center</Text>
      </View>

      {/* Confirm Ride Button */}
      <TouchableOpacity style={styles.button} onPress={() => alert("Ride Confirmed!")}>
        <Text style={styles.buttonText}>Confirm Ride</Text>
      </TouchableOpacity>
    </View>
  );
};

// StyleSheet for styling the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1c1c1c',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
  },
  infoBox: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#2a2a2a',
    padding: 10,
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 5,
  },
  value: {
    color: '#cfcfcf',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#0078D4',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default UserConfirmRide;
