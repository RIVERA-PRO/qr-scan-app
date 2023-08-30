import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, image, style, Platform } from 'react-native';
import Home from '../screens/Home'
import { Ionicons } from '@expo/vector-icons';
import HistorialScreen from "../screens/HistorialScreen";
import ImageScanner from "../screens/ImageScannerScreen";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function BottomTabsNavigation() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 25,  // Fixed typo: "bottonm" should be "bottom"
                    left: 20,
                    right: 20,
                    borderRadius: 15,
                    height: 56,
                },
                labelStyle: {
                    fontSize: 11,
                    marginBottom: 3,
                },
                activeTintColor: '#1FC2D7',
                inactiveTintColor: '#9B9B9B',
            }}>
            <Tab.Screen name="ImageScanner"
                component={ImageScanner}
                options={{
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 53,
                        elevation: 0,
                        position: 'absolute',
                    },
                    activeTintColor: '#1FC2D7',
                    inactiveTintColor: '#9B9B9B',
                    headerShown: false,
                    tabBarLabel: 'Scan Image',  // Added tab bar label
                    tabBarIcon: ({ color }) => (
                        <Entypo name="home" size={24} color={color} />
                    ),
                }} />
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <View
                            style={{
                                top: Platform.OS === "ios" ? -10 : -10,
                                width: Platform.OS === "ios" ? 45 : 55,
                                height: Platform.OS === "ios" ? 45 : 55,
                                borderRadius: Platform.OS === "ios" ? 25 : 30,
                                position: 'absolute',
                                bottom: 10,
                                backgroundColor: '#1FC2D7',
                                alignItems: 'center',
                                justifyContent: 'center',
                                shadowColor: '#000',
                                shadowOffset: { width: 10, height: 20 },
                                shadowOpacity: 10.25,
                                shadowRadius: 300,
                                elevation: 7,
                            }}
                        >
                            <Ionicons name="qr-code" size={24} color="#fff" />
                        </View>
                    ),
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 53,
                        elevation: 0,
                        position: 'absolute',
                    },
                    activeTintColor: '#022a9b',
                    inactiveTintColor: '#9B9B9B',
                    headerShown: false,
                    tabBarLabel: 'Home',  // Added tab bar label
                }}
            />
            <Tab.Screen name="HistorialScreen"
                component={HistorialScreen}
                options={{
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 53,
                        elevation: 0,
                        position: 'absolute',
                    },
                    activeTintColor: '#1FC2D7',
                    inactiveTintColor: '#9B9B9B',
                    headerShown: false,
                    tabBarLabel: 'History',  // Added tab bar label
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="web-plus" size={24} color={color} />
                    ),
                }} />
        </Tab.Navigator>
    );
}

export default BottomTabsNavigation;
