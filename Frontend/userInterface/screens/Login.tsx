import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemedText from '../components/ThemedText';
import ThemedView from '../components/ThemedView';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/components/navigation/NavigationTypes";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  useFocusEffect(
    React.useCallback(() => {
      setUsername('');
      setPassword('');
      setErrorMessage(null);
    }, [])
  );

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        await AsyncStorage.setItem('accessToken', data.access);
        await AsyncStorage.setItem('refreshToken', data.refresh);
        await AsyncStorage.setItem('username', username);

        if (data.user_type === "S") {
          navigation.navigate('SupervisorHome');
        } else if(data.user_type === "R"){
          navigation.navigate('RiderDashboard');
        }
      } else if (response.status === 400) {
        setErrorMessage(data.error);
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Failed to connect. Please check your internet connection.');
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('CreateAccount');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/UWM.png')} style={styles.logo} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {errorMessage && <ThemedText type="error" style={styles.errorText}>{errorMessage}</ThemedText>}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <ThemedText type="defaultSemiBold" style={styles.loginText}>Login</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
        <ThemedText type="defaultSemiBold" style={styles.createAccountText}>Create Account</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white', justifyContent: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 30 },
  logo: { width: 150, height: 150 },
  inputContainer: { marginBottom: 30 },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  errorText: { color: 'red', textAlign: 'center', marginBottom: 10 },
  loginButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginText: { color: 'white', fontSize: 16 },
  createAccountButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  createAccountText: { color: 'white', fontSize: 16 },
});

export default LoginScreen;
