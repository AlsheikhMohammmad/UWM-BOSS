import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "@/components/navigation/NavigationTypes";
import ThemedText from "@/components/ThemedText";
import {Ionicons} from "@expo/vector-icons";
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
        if (!username.trim()) {
            setErrorMessage('Please enter a username.');
            return;
        }
        if (password !== rePassword) {
            setErrorMessage('Passwords do not match, re-enter your new password.');
            return;
        }

        if (unmetRequirements.length > 0) {
            return;
        }

        try {
            const response = await fetch(
                'https://mohammadalsheikh.pythonanywhere.com/api/auth/reset_password/', // Production API endpoint
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                }
            );
            const data = await response.json();

            if (response.ok) {
                setErrorMessage('Password reset successfully.');
                navigation.goBack(); // Navigate back after successful reset
            } else {
                setErrorMessage(data.error || 'Failed to reset password. Please try again.');
            }
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
                    value={username}
                />
            </View>
            <Text style={styles.label}>New Password</Text>
            <TextInput
                placeholder="Password"
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
