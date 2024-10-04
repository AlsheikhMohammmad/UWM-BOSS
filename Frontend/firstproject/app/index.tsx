import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SupervisorHomePage from '../screens/SupervisorHomePage'; // Adjust the path if needed
import UserRequestRide from '../components/UserRequestRide';
import UserConfirmRide from '../components/userConfirmRide';
import UserRideTracking from '../components/UserRideTracking';
import UserActiveRiding from '../components/UserActiveRiding';

const sampleImage = require('./bosspic.jpg'); // If bosspic.jpg is in the same folder

const Stack = createStackNavigator();

// HomeScreen component
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>UWM BOSS</Text>
      <Image source={sampleImage} style={styles.image} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SupervisorHome')}
      >
        <Text style={styles.buttonText}>Continue with Outlook</Text>
      </TouchableOpacity>
    </View>
  );
}

// App component with Stack Navigator
export default function App() {
  return (

    <Stack.Navigator initialRouteName="SupervisorHome">
      {/* Supervisor home screen */}
      <Stack.Screen name="SupervisorHome" component={SupervisorHomePage} />
      {/* Home screen */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="UserRequestRide" component={UserRequestRide} />
        <Stack.Screen name="UserConfirmRide" component={UserConfirmRide} />
        <Stack.Screen name="UserRideTracking" component={UserRideTracking} />
      <Stack.Screen name="UserActiveRiding" component={UserActiveRiding} />

    </Stack.Navigator>


  );
}

// StyleSheet for the dark-themed UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#0078D4',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '500',
  },
});
