import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import baseStyles from '../../styles/General';
import userPageStyles from '../../styles/SuperCreateVan';
import styles from '../../styles/SuperEditVan';
import ThemedText from "@/components/ThemedText";

const SupervisorCreateVan: React.FC = () => {
    const [vanNumber, setVanNumber] = useState('');
    const [ADA, setADA] = useState(false);
    const [drivers, setDrivers] = useState<any[]>([]);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigation = useNavigation();

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/vans/get_all_drivers');
            if (!response.ok) {
                throw new Error('Failed to fetch drivers');
            }
            const data = await response.json();
            setDrivers(data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch drivers.');
            console.error('Error fetching drivers:', error);
        }
    };

    const handleCreateVan = async () => {
        if (!vanNumber.trim()) {
            setErrorMessage('Please fill out all fields.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/vans/create_van', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    van_number: vanNumber,
                    ADA,
                    driver: selectedDriver,
                }),
            });
            if (response.ok) {
                Alert.alert('Success', 'Van created successfully.');
                navigation.goBack();
            } else {
                const errorData = await response.json();
                setErrorMessage('Please enter a unique van number.');
                console.error('Error:', errorData);
            }
        } catch (error) {
            setErrorMessage('An error occurred while creating the van.');
            console.error('Error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-circle" size={30} color="black" />
                </TouchableOpacity>
                <ThemedText type="title" style={styles.headerText}>Create Van</ThemedText>

                <TouchableOpacity
                    style={styles.squareButton}
                    onPress={() => {}}
                >
                    <Ionicons name="create-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Van Number Input */}
            <View style={styles.inputContainer}>
                <Text style={baseStyles.label}>Van Number:</Text>
                <TextInput
                    style={userPageStyles.input}
                    placeholder="Unique van #"
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    value={vanNumber}
                    keyboardType="numeric"
                    onChangeText={setVanNumber}
                />
            </View>

            {/* ADA Accessible Switch */}
            <View style={styles.inputContainer}>
                <Text style={baseStyles.label}>ADA Accessible:</Text>
                <View style={styles.toggleContainer}>
                    <FontAwesome
                        name="wheelchair"
                        size={24}
                        color={ADA ? '#81b0ff' : '#767577'}
                    />
                    <Switch
                        value={ADA}
                        onValueChange={setADA}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={ADA ? '#f5dd4b' : '#f4f3f4'}
                    />
                </View>
            </View>

            {/* Driver Selection */}
            <View style={styles.inputContainer}>
                <Text style={baseStyles.label}>Driver:</Text>
                <Picker
                    selectedValue={selectedDriver}
                    onValueChange={(itemValue) => setSelectedDriver(itemValue)}
                >
                    <Picker.Item label="Select a Driver" value="" />
                    {drivers.map((driver) => (
                        <Picker.Item key={driver.username} label={driver.name} value={driver.username} />
                    ))}
                </Picker>
            </View>

            {/* Error Message */}
            {errorMessage && <Text style={baseStyles.errorText}>{errorMessage}</Text>}

            {/* Create Van Button */}
            <TouchableOpacity onPress={handleCreateVan} style={styles.updateButton}>
                <Text style={styles.updateButtonText}>Create Van</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SupervisorCreateVan;
