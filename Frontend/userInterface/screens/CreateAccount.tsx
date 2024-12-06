import React, {useState, useEffect} from 'react';
import {Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "@/components/navigation/NavigationTypes";
import ThemedText from "@/components/ThemedText";
import createBaseStyles from '../styles/CreateAccountCommon';
import loginStyles from '../styles/GeneralCreate';
import baseStyles from '../styles/General';

const styles = { ...baseStyles, ...loginStyles, ...createBaseStyles };

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const CreateAccount: React.FC = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [RePassword, setRePassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [emailPrefix, setEmailPrefix] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [unmetRequirements, setUnmetRequirements] = useState<string[]>([]);

    const passwordRequirements = [
        { test: (pw: string) => pw.length >= 8, message: "At least 8 characters long" },
        { test: (pw: string) => /[A-Z]/.test(pw), message: "At least one uppercase letter" },
        { test: (pw: string) => /[a-z]/.test(pw), message: "At least one lowercase letter" },
        { test: (pw: string) => /[0-9]/.test(pw), message: "At least one number" },
        { test: (pw: string) => /[@#!<%]/.test(pw), message: "At least one special character (@,#,!<%)" },
    ];

    useEffect(() => {
        const unmet = passwordRequirements
            .filter(req => !req.test(password))
            .map(req => req.message);

        setUnmetRequirements(unmet);
    }, [password]);

    const handleCreateAccount = async () => {
        const email = `${emailPrefix}@uwm.edu`;
        if (!username || !password || !name || !phoneNumber || !address || !email) {
            setErrorMessage('Please fill in all fields.');
            return;
        }
        if (password !== RePassword) {
            setErrorMessage("Passwords do not match, re-enter your new password.");
            return;
        }

        if (unmetRequirements.length > 0) {
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    name,
                    phone_number: phoneNumber,
                    address,
                    email,
                }),
            });

            const data = await response.json();

            if (response.status === 201) {
                navigation.navigate('Login');
            } else {
                if (data.username) {
                    setErrorMessage('Username already exists.');
                } else if (data.email) {
                    setErrorMessage('Email already exists.');
                } else if (data.phone_number) {
                    setErrorMessage('Invalid phone number.');
                } else {
                    setErrorMessage('Registration failed. Please check your inputs.');
                }
            }
        } catch (error) {
            setErrorMessage('Failed to connect. Please check your internet connection.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ThemedText type="title" style={styles.headerText}>Create Account</ThemedText>
            </View>
            <Text style={styles.label}>Username:</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                placeholderTextColor="gray"
            />
            <Text style={styles.label}>Name:</Text>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
                placeholderTextColor="gray"
                autoCapitalize="words"
            />
            <Text style={styles.label}>Phone Number:</Text>
            <TextInput
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={styles.input}
                placeholderTextColor="gray"
            />
            <Text style={styles.label}>Home Address:</Text>
            <TextInput
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
                style={styles.input}
                placeholderTextColor="gray"
            />
            <Text style={styles.label}>Email Address:</Text>
            <View style={styles.emailContainer}>
                <TextInput
                    placeholder="Enter email address"
                    value={emailPrefix}
                    onChangeText={(text) => {
                        if (!text.includes('@')) setEmailPrefix(text);
                    }}
                    style={styles.emailInput}
                    placeholderTextColor="gray"
                />
                <View style={styles.verticalLine}/>
                <Text style={styles.emailDomain}>@uwm.edu</Text>
            </View>
            <Text style={styles.helperText}>You can use letters, numbers & periods</Text>
            <Text style={styles.label}>Password:</Text>
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                placeholderTextColor="gray"
            />

            {/* Display unmet requirements */}
            {unmetRequirements.length > 0 && (
                <View style={{marginVertical: 5}}>
                    {unmetRequirements.map((req, index) => (
                        <Text key={index} style={{color: 'red', fontSize: 12}}>
                            • {req}
                        </Text>
                    ))}
                </View>
            )}

            <Text style={styles.label}>Confirm Password:</Text>
            <TextInput
                placeholder="Re-enter Password"
                value={RePassword}
                onChangeText={setRePassword}
                secureTextEntry
                style={styles.input}
                placeholderTextColor="gray"
            />

            {errorMessage && <ThemedText style={styles.errorText}>{errorMessage}</ThemedText>}

            <TouchableOpacity onPress={handleCreateAccount} style={styles.createAccountButton}>
                <Text style={styles.createAccountText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
                <Text style={styles.loginText}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CreateAccount;