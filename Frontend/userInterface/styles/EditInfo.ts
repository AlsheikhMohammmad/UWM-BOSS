import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 50,
        backgroundColor: '#fff',
        marginBottom: 15, // Added to create space between inputs
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    emailInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    emailDomain: {
        fontSize: 16,
        color: '#666',
        marginLeft: 5,
    },
    verticalLine: {
        width: 1,
        height: '100%',
        backgroundColor: '#ccc',
        marginHorizontal: 10,
    },
    passwordCriteria: {
        marginVertical: 10,
        marginLeft: 5,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },
    updateButton: {
        backgroundColor: '#007bff',
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 50,
        backgroundColor: '#fff',
    },
    icon: {
        marginLeft: 10,
    },
});

export default styles;
