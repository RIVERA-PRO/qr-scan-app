import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';

import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Scanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scannedData, setScannedData] = useState('');
    const [scale, setScale] = useState(1);
    const [scannedItems, setScannedItems] = useState([]);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

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

    const resetScanner = () => {
        setScanned(false);
        setScannedData('');
    };

    const reloadScanner = () => {
        setScanned(false);
        setScannedData('');
        fetchScannedItems(); // Recargar la lista de elementos escaneados
    };

    const saveScannedItem = async (data) => {
        try {
            const newItem = { data, timestamp: new Date().getTime() };
            const updatedItems = [...scannedItems, newItem];
            await AsyncStorage.setItem('scannedItems', JSON.stringify(updatedItems));
            setScannedItems(updatedItems);
            console.log('Item saved:', newItem);
        } catch (error) {
            console.error('Error saving scanned item:', error);
        }
    };


    const handleBarCodeScanned = ({ type, data }) => {
        if (data) {
            setScanned(true);
            setScannedData(data);
            saveScannedItem(data);
        }
    };



    const openLink = () => {
        if (Linking.canOpenURL(scannedData)) {
            Linking.openURL(scannedData);
        }
    };
    const openLink2 = (link) => {
        if (Linking.canOpenURL(link)) {
            Linking.openURL(link);
        }
    };
    const onZoomEvent = (event) => {
        setScale(event.nativeEvent.scale);
    };

    if (hasPermission === null) {
        return <Text style={styles.textPermisos}>Solicitando permiso de cámara</Text>;
    }
    if (hasPermission === false) {
        return <Text style={styles.textPermisos}>Sin acceso a la cámara</Text>;
    }

    return (
        <View style={styles.container}>
            {scanned ? (
                <View style={styles.dataContainer}>
                    <Text style={styles.dataText}>Exito!</Text>
                    <TouchableOpacity onPress={openLink}>
                        <Text style={styles.linkText}>{scannedData}</Text>
                    </TouchableOpacity>
                    <View style={styles.deFlex}>

                        <TouchableOpacity onPress={resetScanner} style={styles.btn}>
                            <Text style={styles.textBtn}>Escanear otra vez</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={reloadScanner} style={styles.btn}>
                            <Text style={styles.textBtn}>Recargar Scaner</Text>
                        </TouchableOpacity>
                    </View>


                    <ScrollView style={styles.containScaners}>
                        <Text style={styles.dataText}>Historial</Text>
                        {scannedItems.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => openLink2(item.data)}>
                                <Text style={styles.scannedItemText}>{item.data}</Text>
                            </TouchableOpacity>
                        ))}
                        <View style={styles.espacio}>

                        </View>
                    </ScrollView>




                </View>
            ) : (

                <PinchGestureHandler onGestureEvent={onZoomEvent}>

                    <View style={styles.cameraContainer}>
                        <BarCodeScanner
                            onBarCodeScanned={handleBarCodeScanned}
                            style={{ ...styles.cameraPreview, transform: [{ scale }] }}
                        />
                    </View>


                </PinchGestureHandler>



            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
    cameraContainer: {
        width: '100%',
        height: '100%',
        marginTop: '-14%',

    },
    cameraPreview: {
        ...StyleSheet.absoluteFillObject,
    },
    dataContainer: {
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        padding: 20
    },
    dataText: {
        color: 'rgba(00, 00, 00, 0.6)',
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    linkText: {
        color: 'blue',
        fontSize: 16,
        marginTop: 5,
        color: '#1FC2D7',
        paddingTop: 20
    },
    scannedItemText: {
        color: 'white',
        fontSize: 14,
        color: '#1FC2D7',
        backgroundColor: '#ffff',
        padding: 5,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 4,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 6
    },
    deFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
        marginTop: 30
    },
    btn: {
        backgroundColor: '#1FC2D7',
        textAlign: 'center',
        padding: 7,
        paddingHorizontal: 20,
        borderRadius: 40
    },
    textBtn: {
        color: '#fff',

    },
    containScaners: {

        marginTop: 80,

    },
    textPermisos: {
        textAlign: 'center',
        fontSize: 16,

    },
    espacio: {
        height: 60
    }

});
