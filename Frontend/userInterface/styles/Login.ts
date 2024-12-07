import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    }, logo: {
        width: 190,
        height: 190,
        resizeMode: 'contain',
    }, inputContainer: {
        marginBottom: 30,
        width: '100%',
    }, input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        width: '100%',
    }, passwordContainer: {
        position: 'relative',
        width: '100%',
    }, passwordInput: {
        paddingRight: 70,
    }, togglePasswordButton: {
        position: 'absolute',
        right: 10,
        top: 12,
        padding: 5,
    }, togglePasswordText: {
        color: 'blue',
        fontSize: 14,
    }, loginButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 2, // Android shadow
    }, loginText: {
        color: 'white',
        fontSize: 16,
    }, createAccountButton: {
        padding: 15,
        alignItems: 'center',
    }, createAccountText: {
        color: 'blue',
        fontSize: 16,
    }, resetButton: {
        padding: 15,
        alignItems: 'center',
    }, resetText: {
        color: 'blue',
        fontSize: 16,
    }, errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default styles;
