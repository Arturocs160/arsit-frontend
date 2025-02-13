import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Button } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DeviceScreen() {
    const [notes, setNotes] = useState('');
    const router = useRouter();
    const [devices, setDevices] = useState([
        { id: 1, name: 'Dispositivo 1', selected: false },
        { id: 2, name: 'Dispositivo 2', selected: false },
        { id: 3, name: 'Dispositivo 3', selected: false },
        { id: 4, name: 'Dispositivo 4', selected: false },
    ]);

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image
                            style={[{ width: 90, height: 50 }]}
                            source={require("./../../assets/images/logoarsit.png")}
                        />
                        <Text
                            style={styles.welcome}
                        >Bienvenido</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={30} color="#2D4B41" style={styles.backIcon} />
                </TouchableOpacity>

            </View>
            <View style={styles.textContainer}>

                {devices.map((device) => (
                    <View key={device.id} style={styles.deviceRow}>
                        <TouchableOpacity
                            style={[styles.checkbox, device.selected && styles.checkboxSelected]}
                            onPress={() =>
                                setDevices(devices.map(d => d.id === device.id ? { ...d, selected: !d.selected } : d))
                            }
                        />
                        <Text style={styles.deviceName}>{device.name}</Text>
                        <TouchableOpacity /*onPress={}*/>
                            <Ionicons name="pencil" size={20} color="#29463D" />
                        </TouchableOpacity>
                    </View>
                ))}

            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    placeholderTextColor="#29463D"
                />
            </View>

            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>GUARDAR</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                            <TouchableOpacity onPress={() => router.push('/')}>
                              <Image source={require("../../assets/images/icons/conexion_Mesa de trabajo 1.png")} style={styles.iconsFooter} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => router.push('/(tabs)/addscreen')}>
                              <Image source={require("../../assets/images/icons/mas.png")} style={styles.iconsFooter} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => router.push('/(tabs)/assistentscreen')}>
                              <Image source={require("../../assets/images/icons/asistencia.png")} style={styles.iconsFooter} />
                            </TouchableOpacity>
                    </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'flex-start',
        padding: 20,
        paddingTop: 28
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
        marginBottom: 50,
        marginTop: 25,
    },
    header: {
        padding: 8,
    },
    backIcon: {
        alignSelf: 'flex-end',
        marginRight: 10,
        padding: 8,
    },
    welcome: {
        fontSize: 16,
        fontWeight: '500',
        color: '#29463D',
        marginTop: -8
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 30,
    },

    deviceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 40,
        backgroundColor: 'none',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#29463D',
        borderRadius: 5,
        marginRight: 10,
    },
    checkboxSelected: {
        backgroundColor: '#29463D',
    },
    deviceName: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: '#29463D',
    },
    saveButton: {
        backgroundColor: '#29463D',
        padding: 12,
        borderRadius: 25,
        alignItems: 'center',
        width: '100%',
        marginBottom: 23,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#CCCCCC',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginBottom: 40,
        marginTop: 230,
    },
    input: {
        flex: 1,
        backgroundColor: '#CCCCCC',
        padding: 17,
        borderRadius: 20,
        color: '#29463D',
        fontSize: 15,
        fontWeight: 500,
    },
    iconsFooter: {
        width: 30,
        height: 30,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 5,
        padding: 5,
    },
});
