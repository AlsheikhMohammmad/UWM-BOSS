import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
    headerText: { fontSize: 30, fontWeight: 'bold' },
    input: { borderBottomWidth: 1, marginBottom: 20, fontSize: 16 },
    buttonText: { color: '#fff', fontSize: 16 },
    inputContainer: {
        marginBottom: 15,
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    toggleContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 15,
        gap: 10,
    },
    updateButton: {
        height: 50,
        backgroundColor: '#007bff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 15,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    squareButton: {
        opacity: 0
    }

});

export default styles;