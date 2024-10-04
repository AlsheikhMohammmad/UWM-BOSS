import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation'; // Ensure this is installed
import MapView, { Marker } from 'react-native-maps'; // Ensure react-native-maps is installed
import { PermissionsAndroid, Platform } from 'react-native';

const UserRideTracking: React.FC = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [isTracking, setIsTracking] = useState(false);

  // Request location permission (if needed)
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This app needs to access your location for ride tracking.',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('Location permission denied');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // Start tracking location
  const startTracking = async () => {
    const hasPermission = await requestLocationPermission();
    if (hasPermission) {
      setIsTracking(true);
      Geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => console.log(error),
        {
          enableHighAccuracy: true,
          distanceFilter: 5,
          interval: 5000,
          fastestInterval: 2000,
        }
      );
    }
  };

  // Stop tracking location
  const stopTracking = () => {
    setIsTracking(false);
    Geolocation.clearWatch(); // Stop watching location
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Ride Tracking</Text>

      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
      </MapView>

      <View style={styles.buttonContainer}>
        {!isTracking ? (
          <Button title="Start Tracking" onPress={startTracking} />
        ) : (
          <Button title="Stop Tracking" onPress={stopTracking} color="red" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  map: {
    width: '100%',
    height: '70%',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default UserRideTracking;
