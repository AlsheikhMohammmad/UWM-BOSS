import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const UserActiveRiding: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: 0,
    longitude: 0,
  });
  const [rideStatus, setRideStatus] = useState('Driver is on the way');

  // Fetch the current location of the user
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* Map displaying user's location */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Marker for User Location */}
        <Marker
          coordinate={location}
          title="Your Location"
          description="This is where you are"
          pinColor="blue"
        />
      </MapView>

      {/* Ride Details Container */}
      <View style={styles.detailsContainer}>
        <Text style={styles.rideStatus}>Ride Status: {rideStatus}</Text>
        <Text style={styles.rideDetail}>Driver: John Doe</Text>
        <Text style={styles.rideDetail}>Car: Toyota Camry (White)</Text>
        <Text style={styles.rideDetail}>Estimated Arrival: 10 mins</Text>

        {/* Buttons for Ride Actions */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setRideStatus('Ride Canceled')}>
            <Text style={styles.buttonText}>Cancel Ride</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => setRideStatus('Ride Completed')}>
            <Text style={styles.buttonText}>Complete Ride</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '50%',
  },
  detailsContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  rideStatus: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rideDetail: {
    fontSize: 16,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#0078D4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
    width: '40%',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserActiveRiding;
