import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  KeyboardAvoidingViewBase,
  Keyboard,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import Header from "@/components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function UpdateScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.general}>
        <View style={styles.headerContainer}>
          <Header></Header>
          <TouchableOpacity onPress={() => router.push("/(tabs)/panelscreen")}>
            <Ionicons
              name="arrow-back"
              size={30}
              color="#2D4B41"
              style={styles.backIcon}
            />
          </TouchableOpacity>
        </View>
        <View>
          <View>
            <Text style={styles.titulo}>Agregar</Text>
          </View>
          <View style={styles.contenedor}>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/addsensorscreen")}
            >
              <Text style={styles.texto}>Sensor</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contenedor}>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/addinvernaderoscreen")}
            >
              <Text style={styles.texto}>Invernadero</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contenedor}>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/addcultivoscreen")}
            >
              <Text style={styles.texto}>Cultivo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/conectionscreen")}
        >
          <Image
            source={require("../../assets/images/icons/conexion_Mesa de trabajo 1.png")}
            style={styles.iconsFooter}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/icons/mas.png")}
            style={styles.iconsFooter}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/assistentscreen")}
        >
          <Image
            source={require("../../assets/images/icons/asistencia.png")}
            style={styles.iconsFooter}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "flex-start",
    paddingTop: 28,
  },
  general: {
    flex: 1,
    width: "100%",
  },
  titulo: {
    fontSize: 25,
    textAlign: "center",
    margin: 50,
  },
  contenedor: {
    width: "70%",
    borderRadius: 20,
    height: 100,
    justifyContent: "center",
    backgroundColor: "#29463D",
    alignItems: "center",
    marginHorizontal: "15%",
    marginVertical: 5,
  },
  texto: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  selectDispositivo: {
    width: "90%",
    marginHorizontal: "5%",
    borderRadius: 50,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#CCCCCC",
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    height: 50,
    marginBottom: 20,
    marginTop: 25,
    marginLeft: 10,
  },
  header: {
    padding: 8,
  },
  backIcon: {
    alignSelf: "flex-end",
    marginRight: 10,
    padding: 8,
  },
  welcome: {
    fontSize: 16,
    fontWeight: "500",
    color: "#29463D",
    marginTop: -8,
  },
  buttonText: {
    padding: 10,
    fontSize: 15,
    fontWeight: "600",
    color: "#29463D",
    borderRadius: 8,
  },
  inputContainer: {
    width: "90%",
    marginBottom: 20,
    marginHorizontal: "5%",
  },
  label: {
    fontSize: 16,
    color: "#2D4B41",
    marginBottom: 5,
    fontWeight: 600,
  },
  input: {
    backgroundColor: "#CCCCCC",
    padding: 17,
    borderRadius: 20,
    color: "#29463D",
    fontSize: 15,
    fontWeight: 500,
  },
  controlContainer: {
    width: "90%",
    height: 50,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "5%",
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#CCCCCC",
    padding: 10,
    marginLeft: 5,
    borderRadius: 8,
  },
  notesContainer: {
    backgroundColor: "#CCCCCC",
    padding: 12,
    borderRadius: 15,
    width: "90%",
    height: 170,
    marginBottom: 45,
    marginTop: 10,
    marginHorizontal: "5%",
  },
  notesLabel: {
    color: "#29463D",
    fontWeight: "bold",
    fontSize: 17,
  },
  notesText: {
    color: "#2D4B41",
    paddingTop: 5,
    fontWeight: "bold",
    minHeight: 60,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#29463D",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    width: "90%",
    marginBottom: 23,
    marginHorizontal: "5%",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  iconsFooter: {
    width: 40,
    height: 40,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: 65,
    padding: 5,
    backgroundColor: "#FFFFFF",
  },
  pickerParametros: {
    backgroundColor: "#CCCCCC",
    height: 42,
    width: 42,
    marginHorizontal: 5,
  },
});
