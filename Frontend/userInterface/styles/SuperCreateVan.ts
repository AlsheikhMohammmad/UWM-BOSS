import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', // Centers the title
    },
    headerText: { fontSize: 20, fontWeight: 'bold' },
    input: {
        borderBottomWidth: 1,
        marginBottom: 20,
        fontSize: 16,
    },
    toggleContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, gap: 10 },
    dropdownContainer: { marginBottom: 20 },
    createButton: { backgroundColor: '#007bff', padding: 15, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16 },
});

export default styles;