import React, { useState } from 'react';
import {FlatList, Platform, Switch, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/components/navigation/NavigationTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../styles/CreateRide';

const API_BASE_URL = 'https://mohammadalsheikh.pythonanywhere.com/api';

type CreateRideScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateRide'>;

interface LocationSuggestion {
    place_id: string;
    description: string;
}

const CreateRide: React.FC = () => {
    const navigation = useNavigation<CreateRideScreenNavigationProp>();
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [pickupSuggestions, setPickupSuggestions] = useState<LocationSuggestion[]>([]);
    const [dropoffSuggestions, setDropoffSuggestions] = useState<LocationSuggestion[]>([]);
    const [numPassengers, setNumPassengers] = useState(1);
    const [ADA, setADA] = useState(false);
    const [pickupTime, setPickupTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchLocationSuggestions = async (
        query: string,
        setSuggestions: React.Dispatch<React.SetStateAction<LocationSuggestion[]>>
    ) => {
        if (query.length > 2) {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/locations/search/?query=${encodeURIComponent(query)}`
                );
                const data = await response.json();
                setSuggestions(data.predictions || []);
            } catch (error) {
                console.error('Error fetching location suggestions', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleCreateRide = async () => {
        if (!pickupLocation || !dropoffLocation || !pickupTime) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        setLoading(true);
        try {
            const username = await AsyncStorage.getItem('username');
            const response = await fetch(`${API_BASE_URL}/rides/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    pickup_location: pickupLocation,
                    dropoff_location: dropoffLocation,
                    num_passengers: numPassengers,
                    ADA_required: ADA,
                    pickup_time: pickupTime,
                }),
            });

            const data = await response.json();

            if (response.status === 201) {
                // Ride created successfully
                await AsyncStorage.setItem('ride_code', JSON.stringify(data.ride_code));
                await AsyncStorage.setItem('ride_id_view', data.ride_id);
                await AsyncStorage.setItem('ride_driverName', data.driver);
                navigation.navigate('DisplayRideInfo', {
                    rideId: data.ride_id,
                    driverName: data.driver,
                });
            } else if (response.status === 200) {
                // Ride added to queue
                await AsyncStorage.setItem('ride_code', JSON.stringify(data.ride_code));
                navigation.navigate('Queue', {
                    queuePosition: data.queue_position,
                    rideId: data.ride_id,
                    driverName: data.driver,
                });
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            setErrorMessage('Failed to connect. Please check your internet connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-circle" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Request Ride</Text>
            </View>

            {/* Pickup Location */}
            <View style={styles.inputWrapper}>
                <Ionicons name="location-outline" size={24} style={styles.inputIcon} />
                <TextInput
                    placeholder="Enter pickup location"
                    value={pickupLocation}
                    onChangeText={async (text) => {
                        setPickupLocation(text);
                        await fetchLocationSuggestions(text, setPickupSuggestions);
                    }}
                    style={styles.input}
                    placeholderTextColor="gray"
                />
            </View>
            {pickupSuggestions.length > 0 && (
                <FlatList
                    data={pickupSuggestions}
                    keyExtractor={(item) => item.place_id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setPickupLocation(item.description);
                                setPickupSuggestions([]);
                            }}
                        >
                            <Text style={styles.suggestion}>{item.description}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.suggestionContainer}
                />
            )}

            {/* Dropoff Location */}
            <View style={styles.inputWrapper}>
                <Ionicons name="location-outline" size={24} style={styles.inputIcon} />
                <TextInput
                    placeholder="Enter dropoff location"
                    value={dropoffLocation}
                    onChangeText={async (text) => {
                        setDropoffLocation(text);
                        await fetchLocationSuggestions(text, setDropoffSuggestions);
                    }}
                    style={styles.input}
                    placeholderTextColor="gray"
                />
            </View>
            {dropoffSuggestions.length > 0 && (
                <FlatList
                    data={dropoffSuggestions}
                    keyExtractor={(item) => item.place_id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setDropoffLocation(item.description);
                                setDropoffSuggestions([]);
                            }}
                        >
                            <Text style={styles.suggestion}>{item.description}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.suggestionContainer}
                />
            )}

            {/* Pickup Time */}
            <Text style={styles.label}>Pickup Time:</Text>
            <TouchableOpacity style={styles.timePickerButton} onPress={() => setShowPicker(true)}>
                <Text style={styles.timePickerText}>{pickupTime.toLocaleString()}</Text>
            </TouchableOpacity>
            {Platform.OS === 'web' && showPicker && (
                <DatePicker
                    selected={pickupTime}
                    onChange={(date) => date && setPickupTime(date)}
                    showTimeSelect
                    timeIntervals={1}
                    dateFormat="Pp"
                />
            )}

            {/* Number of Passengers */}
            <Text style={styles.label}>Number of Passengers:</Text>
            <View style={styles.carouselContainer}>
                <TouchableOpacity
                    onPress={() => setNumPassengers((prev) => Math.max(1, prev - 1))}
                    style={styles.carouselButton}
                >
                    <Ionicons name="remove-circle-outline" size={40} color="#007bff" />
                </TouchableOpacity>
                <View style={styles.passengerBubble}>
                    <Text style={styles.passengerCount}>{numPassengers}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => setNumPassengers((prev) => Math.min(5, prev + 1))}
                    style={styles.carouselButton}
                >
                    <Ionicons name="add-circle-outline" size={40} color="#007bff" />
                </TouchableOpacity>
            </View>

            {/* ADA Switch */}
            <View style={styles.toggleContainer}>
                <FontAwesome name="wheelchair" size={24} color={ADA ? '#81b0ff' : '#767577'} />
                <Switch
                    value={ADA}
                    onValueChange={setADA}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={ADA ? '#f5dd4b' : '#f4f3f4'}
                />
            </View>

            {/* Error Message */}
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

            {/* Create Ride Button */}
            <TouchableOpacity onPress={handleCreateRide} style={styles.createRideButton} disabled={loading}>
                <Text style={styles.createRideText}>{loading ? 'Creating Ride...' : 'Create Ride'}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CreateRide;
