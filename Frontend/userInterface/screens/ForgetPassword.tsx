import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/components/navigation/NavigationTypes';
import ThemedText from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
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

    const validatePassword = (password: string) => {
        const criteria = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            specialChar: /[@#%!&*]/.test(password),
        };
        setPasswordCriteria(criteria);
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        validatePassword(value);
    };

    const handleForgetPassword = async () => {
        if (!username) {
            setErrorMessage('Please enter a username.');
            return;
        }
        if (password !== rePassword) {
            setErrorMessage('Passwords do not match. Please re-enter your new password.');
            return;
        }

        const isPasswordValid = Object.values(passwordCriteria).every(Boolean);
        if (!isPasswordValid) {
            setErrorMessage('Please meet all password requirements.');
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
            setErrorMessage(data.message || 'Password reset successful.');
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
            <TextInput
                placeholder="Username"
                onChangeText={setUsername}
                style={styles.input}
                placeholderTextColor="gray"
            />
            <Text style={styles.label}>New Password</Text>
            <TextInput
                placeholder="Password"
                onChangeText={handlePasswordChange}
                secureTextEntry
                style={styles.input}
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
                    • At least one special character (@, #, %, !, &)
                </Text>
            </View>
            <TextInput
                placeholder="Re-enter Password"
                onChangeText={setRePassword}
                secureTextEntry
                style={styles.input}
                placeholderTextColor="gray"
            />

            {errorMessage && <ThemedText style={styles.errorText}>{errorMessage}</ThemedText>}

            <TouchableOpacity onPress={handleForgetPassword} style={styles.resetButton}>
                <Text style={styles.resetText}>Reset Password</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ForgetPassword;
