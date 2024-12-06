import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  Switch,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import baseStyles from '../../styles/General';
import userPageStyles from '../../styles/SuperEditVan';

const styles = { ...baseStyles, ...userPageStyles };

const SupervisorEditVan: React.FC = () => {
    const route = useRoute();
    const { id } = route.params as { id: number };  // Get van id from route params
    const [van, setVan] = useState({ van_number: '', ADA: false, driver: {username: '', name: ''}});
    const [drivers, setDrivers] = useState<any[]>([]); // Store list of available drivers
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigation = useNavigation();

    useEffect(() => {
        fetchVanDetails();
        fetchDriverList();
    }, []);

    // Fetch van details by id (using query parameter)
    const fetchVanDetails = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/vans/get_van_by_id/${id}`);
            if (response.ok) {
                const data = await response.json();
                setVan(data);

                if (data.driver) {
                    setDrivers(prevDrivers => [data.driver, ...prevDrivers]);
                }
            } else {
                Alert.alert('Error', 'Failed to fetch van details.');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while fetching van details.');
            console.error('Error fetching van:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch available drivers for the dropdown list
    const fetchDriverList = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/vans/get_all_drivers');
            if (response.ok) {
                const data = await response.json();
                setDrivers(data);
            } else {
                Alert.alert('Error', 'Failed to fetch drivers.');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while fetching drivers.');
            console.error('Error fetching drivers:', error);
        }
    };


    const handleUpdateVan = async () => {
        const updatedVanData = {
            van_number: van.van_number,
            ADA: van.ADA,
            driver: van.driver || null,
        };

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/vans/edit_van/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedVanData),
            });

            if (response.ok) {
                navigation.goBack();
            } else {
                const errorData = await response.json();
                setErrorMessage('Please enter a unique van number.');
                console.error('Error:', errorData);
            }
        } catch (error) {
            setErrorMessage('An error occurred while updating the van.');
            console.error('Error:', error);
        }
    };

    // Handle van deletion (DELETE request)
    const deleteVan = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/vans/delete_van/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                Alert.alert('Success', 'Van deleted successfully.');
                navigation.goBack();
            } else {
                Alert.alert('Error', 'Failed to delete van.');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while deleting the van.');
            console.error('Error:', error);
        }
    };

    const handleDeleteVan = () => {
        if (Platform.OS === 'web') {
            if (window.confirm("Are you sure? This action cannot be undone.")) {
                deleteVan();
            }
        } else {
            Alert.alert(
                'Confirm Deletion',
                'Are you sure? This action cannot be undone.',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Delete',
                        onPress: deleteVan,
                    },
                ]
            );
        }
    };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" size={30} color="black"/>
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Van</Text>
        <TouchableOpacity onPress={handleDeleteVan}>
          <Ionicons name="trash" size={30} color="red"/>
        </TouchableOpacity>
      </View>

      {/* Van number and ADA accessible fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Van Number:</Text>
        <TextInput
          style={styles.input}
          value={van.van_number}
          onChangeText={(text) => setVan({ ...van, van_number: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>ADA Accessible:</Text>
        <View style={styles.toggleContainer}>
          <FontAwesome
            name="wheelchair"
            size={24}
            color={van.ADA ? '#81b0ff' : '#767577'}
          />
          <Switch
            value={van.ADA}
            onValueChange={(value) => setVan({ ...van, ADA: value })}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={van.ADA ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Driver selection dropdown */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Driver:</Text>
        <Text style={styles.input}>
          {van.driver ? van.driver.name : 'No Driver Assigned'}
        </Text>
        <Picker
          selectedValue={van.driver?.username}
          onValueChange={(itemValue) => {
            const selectedDriver = drivers.find(driver => driver.username === itemValue);
            setVan({ ...van, driver: selectedDriver });
          }}
        >
          <Picker.Item label="Select Driver" value="" />
          {drivers.map((driver) => (
            <Picker.Item key={driver.username} label={driver.name} value={driver.username} />
          ))}
        </Picker>
      </View>

      {/* Error Message */}
      {errorMessage && <Text style={baseStyles.errorText}>{errorMessage}</Text>}

      {/* Update Van Button */}
      <TouchableOpacity onPress={handleUpdateVan} style={styles.updateButton}>
        <Text style={styles.buttonText}>Update Van</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SupervisorEditVan;
