import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Header from "@/components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function DeviceScreen() {
  const [wifi, setWifi] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Estado para ver/ocultar contraseña
  const router = useRouter();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const buscarDispositivo = async () => {
    try {
      // Realizar la solicitud GET al backend, enviando wifi y password en los parámetros
      const result = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/sensores/dispositivos/${wifi}`
      );

      // Obtener los dispositivos de la respuesta
      const dispositivos = result.data;

      console.log(dispositivos);

      if (dispositivos) {
        // Mostrar los dispositivos encontrados
        Alert.alert("Dispositivos encontrados", JSON.stringify(dispositivos));
      } else {
        // Mostrar mensaje si no se encontraron dispositivos
        Alert.alert("No se encontraron dispositivos");
      }

      // Limpiar los inputs después de la búsqueda
      setWifi("");
      setPassword("");
    } catch (error) {
      // Mostrar mensaje de error si falla la solicitud
      Alert.alert("Error", "No se pudo obtener los dispositivos");
      console.error("Error al buscar dispositivos:", error);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.general}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/panelscreen")}
            >
              <Ionicons
                name="arrow-back"
                size={30}
                color="#2D4B41"
                style={styles.backIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Coloca tu red"
              placeholderTextColor="#29463D"
              value={wifi}
              onChangeText={setWifi}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#29463D"
              secureTextEntry={!isPasswordVisible} // Controla la visibilidad de la contraseña
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)} // Alterna visibilidad
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={24}
                color="#29463D"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={buscarDispositivo}
          >
            <Text style={styles.saveButtonText}>BUSCAR</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {!keyboardVisible && (
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/conectionscreen")}
          >
            <View style={styles.buttonFooter}>
              <Ionicons name="ios-settings-sharp" size={24} color="#29463D" />
              <Text>Conexión</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(tabs)/panelscreen")}>
            <View style={styles.buttonFooter}>
              <Ionicons name="ios-home" size={24} color="#29463D" />
              <Text>Inicio</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(tabs)/menuscreen")}>
            <View style={styles.buttonFooter}>
              <Ionicons name="ios-list" size={24} color="#29463D" />
              <Text>Categorías</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
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
  buttonFooter: {
    flexDirection: "column",
    width: "70%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  general: {
    flex: 1,
    width: "100%",
  },
  backIcon: {
    alignSelf: "flex-end",
    marginRight: 10,
    padding: 8,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    height: 50,
    marginBottom: 50,
    marginTop: 25,
    marginHorizontal: "5%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#CCCCCC",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginHorizontal: "5%",
  },
  input: {
    flex: 1,
    backgroundColor: "#CCCCCC",
    padding: 17,
    borderRadius: 20,
    color: "#29463D",
    fontSize: 15,
    fontWeight: "500",
  },
  eyeIcon: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#29463D",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    width: "90%",
    marginHorizontal: "5%",
    marginBottom: 23,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
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
  deviceRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#29463D",
    borderRadius: 5,
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: "#29463D",
  },
  deviceName: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#29463D",
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
});
