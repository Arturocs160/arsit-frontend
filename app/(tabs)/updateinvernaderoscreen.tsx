import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Keyboard,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "@/components/Header";

export default function DeviceScreen() {
  const params = useLocalSearchParams();
  const { invernaderoId } = params;

  const fecha = new Date();
  const [nombre, setNombre] = useState<string>("");
  const [ubicacion, setUbicacion] = useState<string>("");
  const [fechaActual, setFechaActual] = useState<Date>(fecha);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    obtenerDetallesInvernadero();
  }, []);

  const obtenerDetallesInvernadero = async () => {
    try {
      // console.log(invernaderoId);
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/invernaderos/${invernaderoId}`
      );
      const invernaderoData = response.data;

      setNombre(invernaderoData.nombre);
      setUbicacion(invernaderoData.ubicacion);
    } catch (error) {
      console.error("Error al obtener los detalles del cultivo:", error);
    }
  };

  async function actualizarInvernadero(nombre: string, ubicacion: string) {
    const fechaFormateada = fechaActual.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const nombreSinEspacios = nombre.trim();
    const ubicacionSinEspacios = ubicacion.trim();

    if (!nombreSinEspacios || !ubicacionSinEspacios) {
      alert(
        "Para guardar se necesita llenar todos los campos en los que se requiere información"
      );
    } else {
      const data = {
        invernaderoId: invernaderoId,
        nombre: nombre,
        ubicacion: ubicacion,
        ultima_modificacion: fechaFormateada,
      };

      try {
        const result = await axios.put(
          `${process.env.EXPO_PUBLIC_BASE_URL}/invernaderos/${invernaderoId}`,
          data
        );
        if (result.status === 200) {
          alert("Datos guardados");
        } else {
          alert("Ocurrió un error, favor de intentar más tarde");
        }
      } catch (error) {
        console.error("Error al guardar los datos del cultivo:", error);
        alert("Ocurrió un error, favor de intentar más tarde");
      }
    }
  }

  const eliminarInvernadero = async () => {
    try {
      await axios.delete(`${process.env.EXPO_PUBLIC_BASE_URL}/invernaderos/${invernaderoId}`);
  
      Alert.alert(
        "Invernadero eliminado", 
        "El invernadero ha sido eliminado correctamente.", 
        [{ text: "Aceptar", onPress: () => router.push("/(tabs)/invernaderoscreen") }]
      );
    } catch (error) {
      console.error("Error al eliminar el cultivo:", error);
      Alert.alert("Error", "Ocurrió un error, favor de intentar más tarde");
    }
  };

  <TouchableOpacity
    style={styles.deleteButton}
    onPress={() => eliminarInvernadero()}
  >
    <Text style={styles.deleteButtonText}>ELIMINAR</Text>
  </TouchableOpacity>;

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

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.general}>
          <View style={styles.headerContainer}>
            <Header />
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/invernaderoscreen")}
            >
              <Ionicons
                name="arrow-back"
                size={30}
                color="#2D4B41"
                style={styles.backIcon}
              />
            </TouchableOpacity>
          </View>
          <KeyboardAwareScrollView>
            <View style={styles.titulo}>
              <Text style={styles.textoTitulo}>EDITAR INVERNADERO</Text>
            </View>
            <View style={{ marginTop: 40 }}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre del Invernadero"
                  placeholderTextColor="#29463D"
                  value={nombre}
                  onChangeText={setNombre}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Ubicación"
                  placeholderTextColor="#29463D"
                  value={ubicacion}
                  onChangeText={setUbicacion}
                />
              </View>
            </View>

            <View style={{ marginTop: 30 }}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => actualizarInvernadero(nombre.trim(), ubicacion.trim())}
              >
                <Text style={styles.saveButtonText}>GUARDAR</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => eliminarInvernadero()}
              >
                <Text style={styles.deleteButtonText}>ELIMINAR</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </KeyboardAvoidingView>

      {!keyboardVisible && (
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
  general: {
    flex: 1,
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    height: 50,
    marginBottom: 20,
    marginTop: 25,
    marginLeft: 10,
  },
  backIcon: {
    alignSelf: "flex-end",
    marginRight: 10,
    padding: 8,
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
    marginTop: 20,
  },
  inputContainer: {
    width: "90%",
    marginBottom: 20,
    marginHorizontal: "5%",
  },
  input: {
    backgroundColor: "#CCCCCC",
    padding: 17,
    borderRadius: 20,
    color: "#29463D",
    fontSize: 15,
  },
  saveButton: {
    backgroundColor: "#29463D",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    width: "90%",
    marginBottom: 10,
    marginHorizontal: "5%",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  deleteButton: {
    backgroundColor: "#bce392",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    width: "90%",
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: "5%",
  },
  deleteButtonText: {
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
});
