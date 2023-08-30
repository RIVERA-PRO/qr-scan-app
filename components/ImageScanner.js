import React, { useState } from 'react';
import { View, Text, Button, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, Clipboard } from 'react-native';
import axios from 'axios';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
export default function QRGenerator() {
    const [qrValue, setQRValue] = useState('');
    const [bgColor, setBgColor] = useState('FFFFFF'); // Color de fondo por defecto en blanco
    const [fgColor, setFgColor] = useState('000000'); // Color del módulo por defecto en negro
    const [qrImage, setQRImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const generateQRCode = async () => {
        if (qrValue.trim() === '') {
            setErrorMessage('El campo de enlace no puede estar vacío.');
            return;
        }

        try {
            const response = await axios.get(
                `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}&bgcolor=${bgColor}&color=${fgColor}`
            );
            setQRImage(response.config.url);
            setErrorMessage(''); // Limpiar el mensaje de error si la generación es exitosa
        } catch (error) {
            console.error(error);
        }
    };

    const shareQRImage = async () => {
        if (!qrImage) {
            return;
        }

        try {
            const result = await Share.share({
                url: qrImage,
            });
            console.log(result.action);
        } catch (error) {
            console.error(error);
        }
    };
    const colorList = [
        '000000', 'FF0000', '00FF00', '0000FF', 'FFFF00', 'FF00FF', '00FFFF', 'FFFFFF',
        'C71585', '1E90FF', 'FF8C00', '32CD32', '8A2BE2', 'FF1493', '7B68EE', 'FF4500',
        '2E8B57', 'FF69B4', '6A5ACD', 'FFD700', '20B2AA', '9370DB', 'FF6347', '00CED1',
        '7FFF00', 'BA55D3', 'FFA500', '48D1CC', 'ADFF2F', '8B008B', 'FFD700', '556B2F',
        '8B4513', '191970', 'A0522D', 'D2691E', '8B0000', 'FF00FF', '4B0082', '6B8E23',

        '00FF80', 'FFDAB9', '800080', 'F08080', '8B4513', 'FF7F50', '008080', 'D2B48C',
        '6A5ACD', '00FA9A', '9932CC', 'FA8072', '00FFFF', 'DA70D6', 'ADFF2F', '8A2BE2',
        'FF69B4', '20B2AA', 'DB7093', 'FF4500', '32CD32', '4169E1', 'FF6347', '8B008B',

    ];



    const copyColorToClipboard = (color) => {
        Clipboard.setString(`${color}`);
    };

    return (
        <View style={styles.container}>
            {qrImage && (
                <>
                    <Image
                        source={{ uri: qrImage }}
                        style={[styles.qrImage, styles.shadow]}
                    />
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity title="Descargar QR" onPress={() => {/* Lógica para descargar la imagen */ }} >
                            <AntDesign name="download" size={24} color="#1FC2D7" />
                        </TouchableOpacity>
                        <TouchableOpacity title="Compartir QR" onPress={shareQRImage} >
                            <Entypo name="share" size={24} color="#1FC2D7" />
                        </TouchableOpacity>
                    </View>
                </>
            )}
            <TextInput
                placeholder="Ingrese el enlace"
                value={qrValue}
                onChangeText={text => setQRValue(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Color de fondo (hexadecimal)"
                value={bgColor}
                onChangeText={text => setBgColor(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Color del módulo (hexadecimal)"
                value={fgColor}
                onChangeText={text => setFgColor(text)}
                style={styles.input}
            />
            <TouchableOpacity onPress={generateQRCode} style={styles.generarBtn}>
                <Text style={styles.generarText}>Generar QR</Text>
            </TouchableOpacity>
            {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}



            <ScrollView style={styles.colores}>
                <View style={styles.colorContainer}>
                    {colorList.map((color, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.deColumnColor}
                            onPress={() => copyColorToClipboard(color)}
                        >
                            <View style={[styles.colorCircle, { backgroundColor: `#${color}` }]}></View>
                            <Text style={styles.colorText}>{`${color}`}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60,
        padding: 20,

    },
    input: {
        width: '100%',
        padding: 10,
        borderColor: 'gray',

        marginBottom: 10,
        color: '#000',
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 30
    },
    qrImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 50,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,

    },

    colores: {
        marginTop: 20,
    },
    colorContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    colorCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 7,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    colorText: {
        color: 'rgba(00, 00, 00, 0.8)',
        fontSize: 13
    },
    generarText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16
    },
    generarBtn: {
        backgroundColor: '#1FC2D7',
        width: '100%',
        textAlign: 'center',
        padding: 14,

        alignItems: 'center',
        borderRadius: 40
    },
    deColumnColor: {
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 30,
        padding: 10
    }
});
