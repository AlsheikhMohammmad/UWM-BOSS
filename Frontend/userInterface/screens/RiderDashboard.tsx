import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '../components/ThemedText';
import ThemedView from '../components/ThemedView';
import Card from '../components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/components/navigation/NavigationTypes';

type SupervisorHomePageNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const RiderDashboard: React.FC = () => {
    const navigation = useNavigation<SupervisorHomePageNavigationProp>();
    const [username, setUsername] = useState<string | null>(null);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('accesstoken');
            await AsyncStorage.removeItem('refreshtoken');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', 'An error occurred while logging out. Please try again.');
        }
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const storedUsername = await AsyncStorage.getItem('username'); // Retrieve username from AsyncStorage
            if (!accessToken) {
                navigation.navigate('Login');
            } else if (storedUsername) {
                setUsername(storedUsername);
            }
        };
        checkLoginStatus();
    }, []);

    const handleEdit = async () => {
        if (username) {
            navigation.navigate('UserEditInfo', { username });
        } else {
            Alert.alert('Error', 'Username is not available.');
        }
    };

    return (
        <ThemedView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <ThemedText type="title" style={styles.title}>UWM Boss</ThemedText>
                    <ThemedText type="subtitle" style={styles.subtitle}>Rider View</ThemedText>
                </View>
            </View>

            {/* Cards Section */}
            <View style={styles.cardsContainer}>
                <Card
                    title="Ride Category"
                    description="Select Ride Category (BOSS General, etc.)"
                    buttonLabel="Select"
                    onPress={() => {
                        // switch view logic
                    }}
                />
                <Card
                    title="Edit Information"
                    description="Edit your account information."
                    buttonLabel="Edit"
                    onPress={handleEdit}
                />
                <Card
                    title="Generate Report"
                    description="Generate detailed reports on ride experience."
                    buttonLabel="Go"
                    onPress={() => {
                        // switch view logic
                    }}
                />
            </View>

            {/* Log Out Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <ThemedText type="defaultSemiBold" style={styles.logoutText}>Log Out</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: 'white' },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    titleContainer: { flex: 1, alignItems: 'center' },
    title: { fontSize: 28, fontWeight: 'bold' },
    subtitle: { fontSize: 20, marginTop: 5, color: 'gray' },
    cardsContainer: { flex: 1, justifyContent: 'space-around' },
    logoutButton: { backgroundColor: 'red', padding: 15, borderRadius: 10, marginTop: 20, alignItems: 'center' },
    logoutText: { color: 'white', fontSize: 16 },
});

export default RiderDashboard;
