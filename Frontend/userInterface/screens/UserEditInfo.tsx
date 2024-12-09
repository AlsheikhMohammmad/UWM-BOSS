import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
} from 'react-native';
import ThemedText from '../components/ThemedText';
import ThemedView from '../components/ThemedView';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/components/navigation/NavigationTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import baseStyles from '../styles/General';
import editInfo from '../styles/EditInfo';

const styles = { ...baseStyles, ...editInfo };

const API_BASE_URL = 'https://mohammadalsheikh.pythonanywhere.com/api';

type UserEditInfoNavigationProp = StackNavigationProp<RootStackParamList, 'UserEditInfo'>;
type UserEditInfoRouteProp = RouteProp<RootStackParamList, 'UserEditInfo'>;

const UserEditInfo: React.FC = () => {
    const navigation = useNavigation<UserEditInfoNavigationProp>();
    const route = useRoute<UserEditInfoRouteProp>();
    const { username } = route.params;

    const [user, setUser] = useState({
        name: '',
        phone_number: '',
        address: '',
        password: '',
    });
    const [emailPrefix, setEmailPrefix] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [oldPassword, setOldPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [rePassword, setRePassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });

    useEffect(() => {
        const fetchDetails = async () => {
            await fetchUserDetails();
        };
        fetchDetails();
    }, []);

    const fetchUserDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${API_BASE_URL}/manage-users/?username=${username}`
            );
            const data = await response.json();
            if (response.ok && data.length > 0) {
                const userData = data[0];
                const [prefix] = userData.email.split('@');
                setUser({
                    name: userData.name,
                    phone_number: userData.phone_number,
                    address: userData.address,
                    password: '',
                });
                setEmailPrefix(prefix);
            } else {
                console.error('Error', data.error);
            }
        } catch (error) {
            console.error('Error', 'Failed to fetch user details.');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = (input: string) => {
        setUser({ ...user, password: input });
        setPasswordCriteria({
            length: input.length >= 8,
            uppercase: /[A-Z]/.test(input),
            lowercase: /[a-z]/.test(input),
            number: /\d/.test(input),
            specialChar: /[@#*!%$]/.test(input),
        });
    };

    const handleRePasswordChange = (input: string) => {
        setRePassword(input);
        setPasswordMatch(input === user.password);
    };

    const handleUpdateInfo = async () => {
        if (!oldPassword.trim()) {
            setErrorMessage('Please enter your current password!');
            return;
        }
        if (user.password && user.password !== rePassword) {
            setErrorMessage('Passwords do not match, re-enter your new password.');
            return;
        }
        const email = `${emailPrefix}@uwm.edu`;
        try {
            const response = await fetch(`${API_BASE_URL}/manage-users/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    oldPassword,
                    edit_info: {
                        ...user,
                        email,
                    },
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setErrorMessage(data.message);
                setOldPassword('');
            } else {
                setErrorMessage(data.error);
            }
        } catch (error) {
            setErrorMessage('Current password incorrect!');
        }
    };

    const handleDeleteAccount = async () => {
        if (!oldPassword.trim()) {
            setErrorMessage('Please enter your current password!');
            return;
        }

        const confirmDelete = Platform.OS === 'web'
            ? window.confirm('Are you sure? This action cannot be undone.')
            : await new Promise((resolve) => {
                Alert.alert(
                    'Delete Account',
                    'Are you sure? This action cannot be undone.',
                    [
                        { text: 'Cancel', onPress: () => resolve(false), style: 'cancel' },
                        { text: 'Yes', onPress: () => resolve(true) },
                    ]
                );
            });

        if (!confirmDelete) return;

        try {
            const response = await fetch(`${API_BASE_URL}/manage-users/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    oldPassword,
                    username,
                    delete: true,
                }),
            });

            if (response.ok) {
                await AsyncStorage.removeItem('accessToken');
                await AsyncStorage.removeItem('refreshToken');
                Alert.alert('Account Deleted', 'Your account has been deleted successfully!');
                navigation.navigate('Login');
            } else {
                setErrorMessage('Error deleting user. Please try again.');
            }
        } catch (error) {
            console.error('Error', 'Failed to delete user.');
        }
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-circle" size={30} color="black" />
                </TouchableOpacity>
                <ThemedText type="title" style={styles.headerText}>Edit Account</ThemedText>
                <TouchableOpacity onPress={handleDeleteAccount}>
                    <Ionicons name="trash" size={30} color="red" />
                </TouchableOpacity>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View>
                    <Text style={styles.sectionTitle}>Personal Details</Text>
                    <Text style={styles.label}><FontAwesome5 name="user" /> Name:</Text>
                    <TextInput
                        placeholder="Name"
                        value={user.name}
                        onChangeText={(text) => setUser({ ...user, name: text })}
                        style={styles.input}
                        placeholderTextColor="gray"
                    />
                    <Text style={styles.label}><FontAwesome5 name="envelope" /> Email:</Text>
                    <View style={styles.emailContainer}>
                        <TextInput
                            placeholder="Enter email address"
                            value={emailPrefix}
                            onChangeText={(text) => setEmailPrefix(text)}
                            style={styles.emailInput}
                            placeholderTextColor="gray"
                        />
                        <View style={styles.verticalLine} />
                        <Text style={styles.emailDomain}>@uwm.edu</Text>
                    </View>
                    <Text style={styles.label}><FontAwesome5 name="home" /> Home Address:</Text>
                    <TextInput
                        placeholder="Home Address"
                        value={user.address}
                        onChangeText={(text) => setUser({ ...user, address: text })}
                        style={styles.input}
                        placeholderTextColor="gray"
                    />

                    <Text style={styles.sectionTitle}>Security Details</Text>
                    <Text style={styles.label}><FontAwesome5 name="lock" /> Current Password:</Text>
                    <TextInput
                        placeholder="Current Password"
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        style={styles.input}
                        secureTextEntry
                        placeholderTextColor="gray"
                    />
                    <Text style={styles.label}><FontAwesome5 name="key" /> New Password:</Text>
                    <TextInput
                        placeholder="New Password"
                        value={user.password}
                        onChangeText={handlePasswordChange}
                        style={styles.input}
                        secureTextEntry
                        placeholderTextColor="gray"
                    />
                    <View style={styles.passwordCriteria}>
                        <Text style={{ color: passwordCriteria.length ? 'green' : 'red' }}>
                            • At least 8 characters long
                        </Text>
                        <Text style={{ color: passwordCriteria.uppercase ? 'green' : 'red' }}>
                            • At least one uppercase letter
                        </Text>
                        <Text style={{ color: passwordCriteria.lowercase ? 'green' : 'red' }}>
                            • At least one lowercase letter
                        </Text>
                        <Text style={{ color: passwordCriteria.number ? 'green' : 'red' }}>
                            • At least one number
                        </Text>
                        <Text style={{ color: passwordCriteria.specialChar ? 'green' : 'red' }}>
                            • At least one special character (@, #, !, *, %, $)
                        </Text>
                    </View>
                    <Text style={styles.label}><FontAwesome5 name="check-circle" /> Confirm Password:</Text>
                    <View style={styles.inputWithIcon}>
                        <TextInput
                            placeholder="Confirm Password"
                            value={rePassword}
                            onChangeText={handleRePasswordChange}
                            style={styles.input}
                            secureTextEntry
                            placeholderTextColor="gray"
                        />
                        {passwordMatch !== null && (
                            <Ionicons
                                name={passwordMatch ? 'checkmark-circle' : 'close-circle'}
                                size={24}
                                color={passwordMatch ? 'green' : 'red'}
                                style={styles.icon}
                            />
                        )}
                    </View>
                    {errorMessage && <ThemedText style={styles.errorText}>{errorMessage}</ThemedText>}
                    <TouchableOpacity onPress={handleUpdateInfo} style={styles.updateButton}>
                        <ThemedText style={styles.buttonText}>Update Info</ThemedText>
                    </TouchableOpacity>
                </View>
            )}
        </ThemedView>
    );
};

export default UserEditInfo;
