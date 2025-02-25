import React from 'react';

import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Button } from 'react-native';

import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';


export default function DeviceScreen() {

  const [notes, setNotes] = useState('');

  const router = useRouter();

  return (

    <View style={styles.container}>
      <View style={styles.general}>
        <View style={styles.headerContainer}>
          <Header></Header>
          <TouchableOpacity onPress={() => router.push('/(tabs)/panelscreen')}>
            <Ionicons name="arrow-back" size={30} color="#2D4B41" style={styles.backIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Soporte
          </Text>
        </View>
        <View style={styles.notesContainer}>
          <View style={styles.notesContainerLeft}>
            <Text style={styles.notesLabel}>Notas:
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis dolore quisquam praesentium dignissimos odit debitis incidunt ex! Temporibus consectetur cum a modi adipisci aliquid praesentium. Ducimus quod iste voluptas illo.
            </Text>
            <TextInput
              style={styles.notesText}
              multiline
              placeholder=""
              placeholderTextColor="#2D4B41"
              value={notes}
              onChangeText={setNotes}
            />
          </View>
          <View style={styles.notesContainerRight}>
            <Text style={styles.notesLabel}>Notas:
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui atque maxime repellat. Dolor ab, laboriosam modi animi ipsum cupiditate corporis maxime eos voluptates, officiis quaerat, nobis aliquid repudiandae natus ratione?
            </Text>
            <TextInput
              style={styles.notesText}
              multiline
              placeholder=""
              placeholderTextColor="#2D4B41"
              value={notes}
              onChangeText={setNotes}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escribe"
            placeholderTextColor="#29463D"
          />
          <TouchableOpacity
          //onPress={handleSend} 
          //style={styles.iconContainer}
          >
            <Ionicons name="arrow-back" size={24} color="#29463D" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/conectionscreen')}>
          <Image source={require("../../assets/images/icons/conexion_Mesa de trabajo 1.png")} style={styles.iconsFooter} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/addscreen')}>
          <Image source={require("../../assets/images/icons/mas.png")} style={styles.iconsFooter} />
        </TouchableOpacity>
        <TouchableOpacity >
          <Image source={require("../../assets/images/icons/asistencia.png")} style={styles.iconsFooter} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-start',
    paddingTop: 28,
  },
  general: {
    flex: 1,
    width: '100%'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    width: '90%',
    height: 50,
    marginBottom: 50,
    marginTop: 25,
    marginLeft: 20
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'poppins medium',
  },
  notesContainer: {
    padding: 12,
    margin: 10,
    alignItems: 'baseline'
  },
  notesContainerLeft: {
    backgroundColor: '#CCCCCC',
    padding: 13,
    borderRadius: 15,
    width: '90%',
    height: 150,
    marginBottom: 50,
    marginLeft: 40,
  },
  notesContainerRight: {
    backgroundColor: '#CCCCCC',
    padding: 13,
    borderRadius: 15,
    width: '90%',
    height: 150,
    marginBottom: 50,
    marginRight: 65,
  },
  notesLabel: {
    color: '#29463D',
    fontWeight: '500',
    fontSize: 15,
  },
  notesText: {
    color: '#2D4B41',
    paddingTop: 5,
    fontWeight: '100',
    minHeight: 60,
    textAlignVertical: 'top',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CCCCCC',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 15,
    marginTop: 65,
    marginHorizontal: '5%'
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 5,
    padding: 5,
    height: 65
  },
  iconsFooter: {
    width: 40,
    height: 40,
  },

});
