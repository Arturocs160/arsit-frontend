import React from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Button,
  Keyboard,
} from "react-native";

import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "@/components/Header";

export default function DeviceScreen() {
  const fecha = new Date();

  const [cultivo, setCultivo] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [ubicacion, setUbicacion] = useState<string>("");
  const [fechaActual, setFechaActual] = useState<Date>(fecha);

  const router = useRouter();

  async function guardarInvernadero(
    invernadero: string,
    ubicacion: string
  ) {
    const fechaFormateada = fechaActual.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    if (!invernadero || !ubicacion) {
      alert(
        "Para guardar se necesita llenar todos los campos en los que se requiere información"
      );
    } else {
      const data = {
        nombre: nombre,
        ubicacion: ubicacion,
        fecha_agregado: fechaFormateada
      };

      const result = await axios.post(
        `${process.env.EXPO_PUBLIC_BASE_URL}/invernaderos`,
        data
      );

      if (result.status === 200) {
        alert("Datos guardados");
      } else {
        alert("Ocurrio un error, favor de intentar más tarde");
      }
    }
  }

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        {/* <Button title="Volver a Home" onPress={() => router.back()} /> */}
        <View style={styles.general}>
          <View style={styles.headerContainer}>
            <Header></Header>
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
              <Text style={styles.textoTitulo} >AGREGAR INVERNADERO</Text>
            </View>
            <View style={{ marginTop: 40 }}>
              <View style={styles.inputContainer}>
                {/* <Text style={styles.label}>Cultivo</Text> */}
                <TextInput
                  style={styles.input}
                  placeholder="Invernadero"
                  placeholderTextColor="#29463D"
                  value={nombre}
                  onChangeText={setNombre}
                />
              </View>
              <View style={styles.inputContainer}>
                {/* <Text style={styles.label}>Cultivo</Text> */}
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
              <TouchableOpacity style={styles.saveButton}
                onPress={() =>
                  guardarInvernadero(
                    nombre,
                    ubicacion
                  )
                }>
                <Text style={styles.saveButtonText}>GUARDAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>CANCELAR</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </KeyboardAvoidingView>
      {!keyboardVisible && (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonFooter: {
    flexDirection: 'column',
    width: '70%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30
  },
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
  titulo: {
    width: '90%',
    marginHorizontal: '5%',
    alignItems: 'center'
  },
  textoTitulo: {
    fontSize: 27,
    fontWeight: '800',
    color: "#29463D",
    marginTop: 20
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
    fontWeight: 500,
  },
  saveButton: {
    backgroundColor: "#29463D",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    width: "90%",
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: "5%",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  cancelButton: {
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    width: "90%",
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: "5%",
  },
  cancelButtonText: {
    color: "#29463D",
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
});
