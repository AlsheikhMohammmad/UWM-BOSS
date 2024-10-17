import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import ThemedText from '../components/ThemedText';
import ThemedView from '../components/ThemedView';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/components/navigation/NavigationTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserEditInfoNavigationProp = StackNavigationProp<RootStackParamList, 'UserEditInfo'>;
type RouteParams = { username: string };

const UserEditInfo: React.FC = () => {
    const navigation = useNavigation<UserEditInfoNavigationProp>();
    const route = useRoute();
    const { username } = route.params as RouteParams;

    const [user, setUser] = useState({
        name: '',
        email: '',
        phone_number: '',
        address: '',
        password: '',  // Added password field
    });
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/manage-users/?username=${username}`);
            const data = await response.json();
            if (response.ok && data.length > 0) {
                const userData = data[0];
                setUser({
                    name: userData.name,
                    email: userData.email,
                    phone_number: userData.phone_number,
                    address: userData.address,
                    password: '', // Reset password field
                });
            } else {
                Alert.alert('Error', data.error || 'Failed to fetch user details.');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch user details.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateInfo = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/manage-users/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    edit_info: {
                        ...user,
                        password: user.password,
                    },
                }),
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert('Success', 'User updated successfully.');
                navigation.goBack();
            } else {
                Alert.alert('Error', data.error || 'Error updating user.');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to update user.');
        }
    };

    const handleDeleteAccount = async () => {
        // Alert.alert(
        //    "Confirm Deletion",
        //    "Are you sure you want to delete your account? This action cannot be undone.",
        //    [
        //        {
        //            text: "Cancel",
        //            style: "cancel"
        //        },
        //        { text: "OK", onPress: async () => {
                    try {
                        const response = await fetch(`http://127.0.0.1:8000/api/manage-users/`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                username,
                                delete: true,
                            }),
                        });
                        if (response.ok) {
                            await AsyncStorage.removeItem('accessToken');
                            await AsyncStorage.removeItem('refreshToken');
                            Alert.alert('Success', 'account deleted successfully.');
                            navigation.navigate('Login');
                        } else {
                            Alert.alert('Error', 'Error deleting user.');
                        }
                    } catch (error) {
                        Alert.alert('Error', 'Failed to delete user.');
                    }
        //        }}
        //    ]
        //);
    };

    return (
        <ThemedView style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View>
                    <TextInput
                        placeholder="Name"
                        value={user.name}
                        onChangeText={(text) => setUser({ ...user, name: text })}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Email"
                        value={user.email}
                        onChangeText={(text) => setUser({ ...user, email: text })}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Phone Number"
                        value={user.phone_number}
                        onChangeText={(text) => setUser({ ...user, phone_number: text })}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Address"
                        value={user.address}
                        onChangeText={(text) => setUser({ ...user, address: text })}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="New Password"
                        value={user.password}
                        onChangeText={(text) => setUser({ ...user, password: text })}
                        style={styles.input}
                        secureTextEntry // Secure entry for password
                    />

                    <TouchableOpacity onPress={handleUpdateInfo} style={styles.updateButton}>
                        <ThemedText type="buttonText" style={styles.buttonText}>Update Info</ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleDeleteAccount} style={styles.deleteButton}>
                        <ThemedText type="buttonText" style={styles.buttonText}>Delete Account</ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ThemedText type="buttonText" style={styles.buttonText}>Back</ThemedText>
                    </TouchableOpacity>
                </View>
            )}
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: { height: 50, borderColor: 'gray', borderWidth: 1, marginBottom: 15, paddingHorizontal: 10 },
    updateButton: { backgroundColor: 'blue', padding: 15, alignItems: 'center', borderRadius: 10, marginBottom: 10 },
    deleteButton: { backgroundColor: 'red', padding: 15, alignItems: 'center', borderRadius: 10, marginBottom: 10 },
    backButton: { backgroundColor: 'gray', padding: 15, alignItems: 'center', borderRadius: 10 },
    buttonText: { color: 'white', fontSize: 16 },
});

export default UserEditInfo;
