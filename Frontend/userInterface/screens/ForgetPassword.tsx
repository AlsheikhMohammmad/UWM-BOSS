import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/components/navigation/NavigationTypes';
import ThemedText from '@/components/ThemedText';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import forgetPassword from '../styles/ForgetPassword';
import baseStyles from '../styles/General';

const styles = { ...baseStyles, ...forgetPassword };

type ForgetPasswordNavigationProp = StackNavigationProp<RootStackParamList, 'ForgetPassword'>;

const ForgetPassword: React.FC = () => {
    const navigation = useNavigation<ForgetPasswordNavigationProp>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });

    const handlePasswordChange = (input: string) => {
        setPassword(input);

        setPasswordCriteria({
            length: input.length >= 8,
            uppercase: /[A-Z]/.test(input),
            lowercase: /[a-z]/.test(input),
            number: /\d/.test(input),
            specialChar: /[@#*!%$]/.test(input),
        });
    };

    const handleForgetPassword = async () => {
        if (!username) {
            setErrorMessage('Please enter a username.');
            return;
        }
        if (password !== rePassword) {
            setErrorMessage('Passwords do not match, re-enter your new password.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/reset_password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            const data = await response.json();
            setErrorMessage(data.message);
        } catch (error) {
            setErrorMessage('Failed to connect. Please check your internet connection.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-circle" size={30} color="black" />
                </TouchableOpacity>
                <ThemedText type="title" style={styles.headerText}>Reset Password</ThemedText>
            </View>
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputWithIcon}>
                <Ionicons name="person-circle-outline" size={20} color="#007bff" />
                <TextInput
                    placeholder="Username"
                    onChangeText={setUsername}
                    style={styles.input}
                    placeholderTextColor="gray"
                />
            </View>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.inputWithIcon}>
                <FontAwesome name="lock" size={20} color="#007bff" />
                <TextInput
                    placeholder="Password"
                    onChangeText={handlePasswordChange}
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor="gray"
                />
            </View>
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
            <Text style={styles.label}>Re-enter Password</Text>
            <View style={styles.inputWithIcon}>
                <FontAwesome name={password === rePassword ? 'check-circle' : 'times-circle'}
                             size={20}
                             color={password === rePassword ? 'green' : 'red'}
                />
                <TextInput
                    placeholder="Re-enter Password"
                    onChangeText={setRePassword}
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor="gray"
                />
            </View>
            {errorMessage && <ThemedText style={styles.errorText}>{errorMessage}</ThemedText>}
            <TouchableOpacity onPress={handleForgetPassword} style={styles.resetButton}>
                <Text style={styles.resetText}>Reset Password</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ForgetPassword;
