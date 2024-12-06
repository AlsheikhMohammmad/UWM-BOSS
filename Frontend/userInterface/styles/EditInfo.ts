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
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#007bff',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    emailInput: {
        flex: 1,
        height: 50,
    },
    emailDomain: {
        fontSize: 16,
        color: '#333',
        marginLeft: 5,
    },
    verticalLine: {
        height: '80%',
        width: 1,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    passwordCriteria: {
        marginBottom: 15,
        marginTop: 5,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
    updateButton: {
        height: 50,
        backgroundColor: '#007bff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
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
        backgroundColor: '#fff',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    icon: {
        marginLeft: 10,
    },
});

export default styles;
