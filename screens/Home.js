import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { FontAwesome } from '@expo/vector-icons';

import { MaterialIcons } from '@expo/vector-icons';

import Scaner from '../components/Scaner';
import HeaderBlanco from '../components/HeaderBlanco'
const windowWidth = Dimensions.get('window').width;

export default function Home() {
    const navigation = useNavigation();


    return (
        <View style={styles.contenedor}>
            <HeaderBlanco />
            <Scaner />
            <View style={styles.espacio}>

            </View>

        </View>
    );

}

const styles = StyleSheet.create({
    contenedor: {

        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',


    },


});
