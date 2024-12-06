import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';  // Import useFocusEffect
import ThemedText from '../../components/ThemedText';
import ThemedView from '../../components/ThemedView';
import Card from '../../components/Card';
import { RootStackParamList } from '@/components/navigation/NavigationTypes';
import baseStyles from '../../styles/General';
import userPageStyles from '../../styles/UserPage';

const styles = { ...baseStyles, ...userPageStyles };

type VansPageNavigationProp = StackNavigationProp<RootStackParamList, 'SupervisorVans'>;

const SupervisorVans: React.FC = () => {
    const [vans, setVans] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigation = useNavigation<VansPageNavigationProp>();

    // Fetch vans when the screen is focused
    useFocusEffect(
        React.useCallback(() => {
            fetchVans();
        }, [])
    );

    const fetchVans = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/vans/get_all_vans'); // Fetch vans from the backend
            if (!response.ok) {
                throw new Error('Failed to fetch vans');
            }
            const data = await response.json();
            setVans(data);
        } catch (error) {
            console.error('Error fetching vans:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemedView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-circle" size={30} color="black" />
                </TouchableOpacity>
                <ThemedText type="title" style={styles.headerText}>Manage Vans</ThemedText>

                <TouchableOpacity
                    style={styles.squareButton}
                    onPress={() => navigation.navigate('SupervisorCreateVan')}
                >
                    <Ionicons name="create-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
        
            {/* Content Area */}
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {vans.map((van) => (
                        <Card
                            key={van.id}
                            title={`Van Number: ${van.van_number}`}
                            description={`ADA Accessible: ${van.ADA ? 'Yes' : 'No'}\nDriver: ${van.driver?.name || 'Not Assigned'}`}
                            buttonLabel="Edit"
                            onPress={() => navigation.navigate('SupervisorEditVan', { id: van.id })}
                            iconName="car-sport"
                        />
                    ))}
                </ScrollView>
            )}
        </ThemedView>
    );
};

export default SupervisorVans;