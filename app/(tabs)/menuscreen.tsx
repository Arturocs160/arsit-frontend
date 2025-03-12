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
        <View style={{ marginTop: 70 }}>
          {/* <View>
            <Text style={styles.titulo}>Agregar</Text>
          </View> */}
          <View >
            <TouchableOpacity style={styles.contenedor}
              onPress={() => router.push("/(tabs)/invernaderoscreen")}
            >
              <Text style={styles.texto}>INVERNADEROS</Text>
            </TouchableOpacity>
          </View>
          <View >
            <TouchableOpacity style={styles.contenedor}
              onPress={() => router.push("/(tabs)/calendarscreen")}
            >
              <Text style={styles.texto}>CALENDARIO</Text>
            </TouchableOpacity>
          </View>
          <View >
            <TouchableOpacity style={styles.contenedor}
              onPress={() => router.push("/(tabs)/cultivosscreen")}
            >
              <Text style={styles.texto}>CULTIVOS</Text>
            </TouchableOpacity>
          </View>
          <View >
            <TouchableOpacity style={styles.contenedor}
              onPress={() => router.push("/(tabs)/addsensorscreen")}
            >
              <Text style={styles.texto}>DISPOSITIVOS</Text>
            </TouchableOpacity>
          </View>
          <View >
            <TouchableOpacity style={styles.contenedor}
              onPress={() => router.push("/(tabs)/assistentscreen")}
            >
              <Text style={styles.texto}>ASISTENTE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/conectionscreen')}>
          <View style={styles.buttonFooter}>
            <Image source={require("../../assets/images/icons/conexion_Mesa de trabajo 1.png")} style={styles.iconsFooter} />
            <Text>Conexión</Text>
          </View>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/panelscreen')}>
          <View style={styles.buttonFooter}>
            <Image source={require("../../assets/images/icons/iconocasa_Mesa de trabajo 1.png")} style={styles.iconsFooter} />
            <Text>Inicio</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/menuscreen')}>
          <View style={styles.buttonFooter}>
            <Image source={require("../../assets/images/icons/iconocategoria_Mesa de trabajo 1.png")} style={styles.iconsFooter} />
            <Text>Categorias</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backIcon: {
    alignSelf: "flex-end",
    marginRight: 10,
    padding: 8,
  },
  buttonText: {
    padding: 10,
    fontSize: 15,
    fontWeight: "600",
    color: "#29463D",
    borderRadius: 8,
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
  buttonFooter: {
    flexDirection: 'column',
    width: '70%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30
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
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "flex-start",
    paddingTop: 28,
  },
  contenedor: {
    width: "80%",
    borderRadius: 20,
    height: 80,
    justifyContent: "center",
    backgroundColor: "#29463D",
    alignItems: "center",
    marginHorizontal: "10%",
    marginVertical: 10,
  },
  general: {
    flex: 1,
    width: "100%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: 85,
    padding: 5,
    backgroundColor: "#FFFFFF",
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
  texto: {
    color: "#FFFFFF",
    fontSize: 35,
    fontWeight: '700'
  },
  titulo: {
    fontSize: 25,
    textAlign: "center",
    margin: 50,
  },
  iconsFooter: {
    width: 40,
    height: 40,
  },
  welcome: {
    fontSize: 16,
    fontWeight: "500",
    color: "#29463D",
    marginTop: -8,
  },
});
