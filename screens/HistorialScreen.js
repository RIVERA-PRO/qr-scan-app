import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Linking, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Historial from '../components/Historial';
import HeaderBlanco from '../components/HeaderBlanco'
export default function HistorialScreen() {
    return (
        <View style={styles.container}>
            <HeaderBlanco />

            <Historial />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
})