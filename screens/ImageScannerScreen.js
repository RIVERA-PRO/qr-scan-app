import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageScanner from '../components/ImageScanner';
import HeaderBlanco from '../components/HeaderBlanco'
export default function ImageScannerScreen() {
    return (
        <View style={styles.container}>
            <HeaderBlanco />
            <ScrollView>
                <ImageScanner />
                <View style={styles.espacio}>

                </View>
            </ScrollView>




        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    espacio: {
        height: 200
    }
})