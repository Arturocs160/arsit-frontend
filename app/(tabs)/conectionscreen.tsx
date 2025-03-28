import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DeviceScreen() {
  const [wifi, setWifi] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const checkConfiguration = async () => {
      const configured = await AsyncStorage.getItem("isConfigured");
      setIsConfigured(configured === "true" && isConfigured === true);
    };
    checkConfiguration();
  }, []);

  const marcarConfiguracionCompleta = async () => {
    try {
      await AsyncStorage.setItem("isConfigured", "true");
      setIsConfigured(true);
      Alert.alert(
        "Configuración completada",
        "¡Ahora puedes usar la aplicación!"
      );
      router.push("/(tabs)/panelscreen");
    } catch (error) {
      console.error("Error al guardar configuración:", error);
    }
  };

  const buscarDispositivo = async () => {
    if (wifi && password) {
      try {
        const result = await axios.get(
          `${process.env.EXPO_PUBLIC_BASE_URL}/sensores/dispositivos`,
          {
            params: { wifi, password },
          }
        );

        const dispositivos = result.data;

        if (dispositivos) {
          Alert.alert(
            "Conexion establecida",
            `Dispositivos encontrados con la red encontrada: ${dispositivos[0].wifi}`,
            [
              {
                text: "Aceptar",
                onPress: marcarConfiguracionCompleta,
              },
            ]
          );
        } else {
          Alert.alert(
            "No se encontraron dispositivos con la red proporcionada"
          );
        }

        guardarDispositivos(dispositivos);
        setWifi("");
        setPassword("");
      } catch (error) {
        Alert.alert(
          "Error",
          "No se encontraron dispositivos con la red proporcionada"
        );
      }
    } else {
      Alert.alert("Falta de datos", "Necesita ingresar los datos solicitados");
    }
  };

  const guardarDispositivos = async (dispositivos: any) => {
    try {
      await AsyncStorage.setItem("dispositivos", JSON.stringify(dispositivos));
      console.log("Dispositivos guardados correctamente");
    } catch (error) {
      console.error("Error al guardar dispositivos:", error);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.general}>
          <View style={styles.headerContainer}>
            <Header />
            <TouchableOpacity
              onPress={() => {
                if (isConfigured) {
                  router.push("/(tabs)/panelscreen");
                } else {
                  Alert.alert(
                    "Configuración requerida",
                    "Debes configurar el dispositivo primero."
                  );
                }
              }}
            >
              <Ionicons
                name="arrow-back"
                size={30}
                color="#2D4B41"
                style={styles.backIcon}
              />
            </TouchableOpacity>
          </View>

          <View>
            <View style={styles.titulo}>
              <Text style={styles.textoTitulo}>CONFIGURACIÓN RED</Text>
            </View>
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
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={24}
                color="#29463D"
              />
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={buscarDispositivo}
            >
              <Text style={styles.searchButtonText}>BUSCAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  searchButton: {
    backgroundColor: "#29463D",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    width: "90%",
    marginHorizontal: "5%",
    marginBottom: 23,
  },
  searchButtonText: {
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
  titulo: {
    width: "90%",
    marginHorizontal: "5%",
    alignItems: "center",
  },
  textoTitulo: {
    fontSize: 27,
    fontWeight: "800",
    color: "#29463D",
    marginTop: 10,
    marginBottom: 30,
  },
});
