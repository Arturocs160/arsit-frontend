import React from 'react';

import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Button } from 'react-native';

import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';


export default function DeviceScreen() {

  const fecha = new Date()

  const [notas, setNotas] = useState<string>('');
  const [cultivo, setCultivo] = useState<string>('');
  const [fechaActual, setFechaActual] = useState<Date>(fecha);
  const [temperaturaMin, setTemperaturaMin] = useState<number>(40);
  const [temperaturaMax, setTemperaturaMax] = useState<number>(30);
  const [humedadMax, setHumedadMax] = useState<number>(60);
  const [humedadMin, setHumedadMin] = useState<number>(25);

  async function guardarCultivo(notas: string, cultivo: string, temperaturaMin: number, temperaturaMax: number, humedadMin: number, humedadMax: number, fechaActual: Date) {

    const fechaFormateada = fechaActual.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    if (!cultivo || !temperaturaMin || !temperaturaMax || !humedadMin || !humedadMax || !fechaActual) {
      alert("Para guardar se necesita llenar todos los campos en los que se requiere información")
    } else {
      const data = {
        cultivoId: undefined,
        cultivo: cultivo,
        invernaderoId: undefined, 
        fecha_siembra: fechaFormateada,
        notasId: undefined,
        temperaturaMin: temperaturaMin,
        temperaturaMax: temperaturaMax,
        humedadMax: humedadMax,
        humedadMin: humedadMin,
      }
  
      const result = await axios.post("http://192.168.1.37:3000/cultivos", data)
      
      if(result.status === 200) {
        alert("Datos guardados")
      } else {
        alert("Ocurrio un error, favor de intentar más tarde")
      }
    }
  }

  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Button title="Volver a Home" onPress={() => router.back()} /> */}

      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/panelscreen')}>
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

      <View style={styles.inputContainer}>
        {/* <Text style={styles.label}>Nombre</Text> */}
        <TextInput style={styles.input} placeholder="Nombre" placeholderTextColor="#29463D" value={cultivo}
          onChangeText={setCultivo} />
      </View>

      <View style={styles.inputContainer}>
        {/* <Text style={styles.label}>Cultivo</Text> */}
        <TextInput style={styles.input} placeholder="Nombre dispositivo" placeholderTextColor="#29463D" />
      </View>

      <View style={styles.controlContainer}>
        <Text style={styles.label}>Temperatura</Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button}><Ionicons name="chevron-up" size={20} color="#29463D" /></TouchableOpacity>
          <TouchableOpacity style={styles.button}><Ionicons name="chevron-down" size={20} color="#29463D" /></TouchableOpacity>
        </View>
      </View>

      <View style={styles.controlContainer}>
        <Text style={styles.label}>Humedad</Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button}><Ionicons name="chevron-up" size={20} color="#29463D" /></TouchableOpacity>
          <TouchableOpacity style={styles.button}><Ionicons name="chevron-down" size={20} color="#29463D" /></TouchableOpacity>
        </View>
      </View>

      <View style={styles.notesContainer}>
        <Text style={styles.notesLabel}>Notas:</Text>
        <TextInput
          style={styles.notesText}
          multiline
          placeholder=""
          placeholderTextColor="#2D4B41"
          value={notas}
          onChangeText={setNotas}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={()=> guardarCultivo(notas, cultivo, temperaturaMin, temperaturaMax, humedadMin, humedadMax, fechaActual)}>
        <Text style={styles.saveButtonText}>GUARDAR</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/conectionscreen')}>
          <Image source={require("../../assets/images/icons/conexion_Mesa de trabajo 1.png")} style={styles.iconsFooter} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/')}>
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
    paddingTop: 28, 
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
    padding: 8
  },
  welcome: {
    fontSize: 16,
    fontWeight: '500',
    color: '#29463D',
    marginTop: -8
  },
  inputContainer: {
    width: '100%',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    color: '#2D4B41',
    marginBottom: 5,
    fontWeight: 600,
  },
  input: {
    backgroundColor: '#CCCCCC',
    padding: 17,
    borderRadius: 20,
    color: '#29463D',
    fontSize: 15,
    fontWeight: 500,
  },
  controlContainer: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#CCCCCC',
    padding: 10,
    marginLeft: 30,
    borderRadius: 8,
  },
  notesContainer: {
    backgroundColor: '#CCCCCC',
    padding: 12,
    borderRadius: 15,
    width: '100%',
    height: 170,
    marginBottom: 45,
    marginTop: 10,
  },
  notesLabel: {
    color: '#29463D',
    fontWeight: 'bold',
    fontSize: 17,
  },
  notesText: {
    color: '#2D4B41',
    paddingTop: 5,
    fontWeight: 'bold',
    minHeight: 60,
    textAlignVertical: 'top',
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
