import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
export default function Historial() {
    const [scannedItems, setScannedItems] = useState([]);

    useEffect(() => {
        fetchScannedItems();
    }, []);

    const fetchScannedItems = async () => {
        try {
            const items = await AsyncStorage.getItem('scannedItems');
            if (items) {
                setScannedItems(JSON.parse(items));
            }
        } catch (error) {
            console.error('Error fetching scanned items:', error);
        }
    };

    const openLink = (link) => {
        if (Linking.canOpenURL(link)) {
            Linking.openURL(link);
        }
    };

    const deleteItem = async (index) => {
        try {
            const updatedItems = scannedItems.filter((item, i) => i !== index);
            await AsyncStorage.setItem('scannedItems', JSON.stringify(updatedItems));
            setScannedItems(updatedItems);
        } catch (error) {
            console.error('Error deleting scanned item:', error);
        }
    };

    const confirmDeleteItem = (index) => {
        Alert.alert(
            'Eliminar elemento',
            '¿Estás seguro de que quieres eliminar este elemento?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', onPress: () => deleteItem(index) }
            ]
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Historial de Escaneos</Text>
            {scannedItems.map((item, index) => (
                <View key={index} style={styles.itemContainer}>


                    <TouchableOpacity onPress={() => openLink(item.data)}>
                        <Text style={styles.itemText}>{item.data}</Text>
                    </TouchableOpacity>
                    <View style={styles.deFex}>
                        <Text style={styles.timestampText}>{new Date(item.timestamp).toLocaleString()}</Text>

                        <TouchableOpacity onPress={() => confirmDeleteItem(index)}>
                            <MaterialIcons name="delete" size={20} color="red" />
                        </TouchableOpacity>

                    </View>

                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 15,


    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'rgba(00, 00, 00, 0.6)',
    },
    itemContainer: {
        borderBottomWidth: 0.2,
        borderColor: 'gray',
        paddingVertical: 10,


        flexDirection: 'column',


        gap: 5

    },
    itemText: {
        fontSize: 15,
        marginBottom: 5,
        color: '#1FC2D7',
    },
    timestampText: {
        color: 'gray',
        fontSize: 12,
    },
    deFex: {
        flexDirection: 'row',
        justifyContent: 'space-between',


    }

});
