import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    inputIcon: {
        marginRight: 10,
        color: '#333',
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
    },
    suggestionContainer: {
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 3,
        marginBottom: 10,
        paddingVertical: 5,
    },
    suggestion: {
        padding: 10,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    timePickerButton: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginBottom: 10,
    },
    timePickerText: {
        fontSize: 16,
        color: '#333',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalCloseButton: {
        marginTop: 20,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalCloseButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 10,
    },
    createRideButton: {
        height: 50,
        backgroundColor: '#007bff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    createRideText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
    carouselContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    carouselButton: {
        padding: 10,
    },
    passengerBubble: {
        borderWidth: 2,
        borderColor: '#007bff',
        borderRadius: 50,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        backgroundColor: '#f0f8ff',
    },
    passengerCount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007bff',
    },
});

export default styles;
