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

interface Invernadero {
  _id: string;
  nombre: string;
}

export default function DeviceScreen() {
  const fecha = new Date();

  const [notas, setNotas] = useState<string>("");
  const [cultivo, setCultivo] = useState<string>("");
  const [invernaderos, setInvernaderos] = useState<Invernadero[]>([]);
  const [fechaActual, setFechaActual] = useState<Date>(fecha);
  const [temperaturaMin, setTemperaturaMin] = useState<number>(30);
  const [temperaturaMax, setTemperaturaMax] = useState<number>(40);
  const [humedadMax, setHumedadMax] = useState<number>(60);
  const [humedadMin, setHumedadMin] = useState<number>(25);
  const [dispositivoSeleccionado, setDispositivoSeleccionado] = useState("1");
  const [invernaderoSeleccionado, setInvernaderoSeleccionado] = useState("1");

  const router = useRouter();

  useEffect(() => {
    obtenerInvernaderos();
  }, []);

  const obtenerInvernaderos = async () => {
    try {
      const response = await axios.get("http://192.168.1.37:3000/invernaderos");
      setInvernaderos(response.data);
    } catch (error) {
      console.error("Error al obtener los invernaderos:", error);
    }
  };

  async function guardarCultivo(
    notas: string,
    cultivo: string,
    temperaturaMin: number,
    temperaturaMax: number,
    humedadMin: number,
    humedadMax: number,
    fechaActual: Date
  ) {
    const fechaFormateada = fechaActual.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    if (
      !cultivo ||
      !temperaturaMin ||
      !temperaturaMax ||
      !humedadMin ||
      !humedadMax ||
      !fechaActual
    ) {
      alert(
        "Para guardar se necesita llenar todos los campos en los que se requiere información"
      );
    } else {
      const data = {
        cultivoId: undefined,
        cultivo: cultivo,
        invernaderoId: invernaderos[0]._id,
        fecha_siembra: fechaFormateada,
        nota: notas,
        temperaturaMin: temperaturaMin,
        temperaturaMax: temperaturaMax,
        humedadMax: humedadMax,
        humedadMin: humedadMin,
      };

      const result = await axios.post(
        "http://192.168.1.37:3000/cultivos",
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
      <KeyboardAwareScrollView style={styles.general} resetScrollToCoords={{ x: 0, y: 0 }}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/panelscreen")}
            >
              <Image
                style={[{ width: 90, height: 50 }]}
                source={require("./../../assets/images/logoarsit.png")}
              />
              <Text style={styles.welcome}>Bienvenido</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => router.push("/(tabs)/panelscreen")}>
            <Ionicons
              name="arrow-back"
              size={30}
              color="#2D4B41"
              style={styles.backIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.selectDispositivo}>
          <Picker
            placeholder="Dispositivo"
            selectedValue={dispositivoSeleccionado}
            style={styles.picker}
            onValueChange={(itemValue) => setDispositivoSeleccionado(itemValue)}
          >
            <Picker.Item label="Dispositivo 1" value="1" />
            <Picker.Item label="Dispositivo 2" value="2" />
            <Picker.Item label="Dispositivo 3" value="3" />
            <Picker.Item label="Dispositivo 4" value="4" />
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          {/* <Text style={styles.label}>Nombre</Text> */}
          <View>
            <Picker
              placeholder="Invernadero"
              selectedValue={invernaderoSeleccionado}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setInvernaderoSeleccionado(itemValue)
              }
            >
              {invernaderos.map((invernadero, index) => (
                <Picker.Item
                  key={invernadero._id}
                  label={invernadero.nombre}
                  value={invernadero._id}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/* <Text style={styles.label}>Cultivo</Text> */}
          <TextInput
            style={styles.input}
            placeholder="Cultivo"
            placeholderTextColor="#29463D"
            value={cultivo}
            onChangeText={setCultivo}
          />
        </View>

        <View style={styles.controlContainer}>
          <Text style={styles.label}>Temperatura</Text>
          <View style={styles.buttons}>
            <Picker
              selectedValue={temperaturaMin}
              style={styles.pickerParametros}
              onValueChange={(itemValue) => setTemperaturaMin(itemValue)}
            >
              {Array.from({ length: 101 }, (_, i) => (
                <Picker.Item key={i} label={`${i}°`} value={i} />
              ))}
            </Picker>
            <Text style={styles.buttonText}>{temperaturaMin}°</Text>
            <Picker
              selectedValue={temperaturaMax}
              style={styles.pickerParametros}
              onValueChange={(itemValue) => setTemperaturaMax(itemValue)}
            >
              {Array.from({ length: 101 }, (_, i) => (
                <Picker.Item key={i} label={`${i}°`} value={i} />
              ))}
            </Picker>
            <Text style={styles.buttonText}>{temperaturaMax}°</Text>
          </View>
        </View>

        <View style={styles.controlContainer}>
          <Text style={styles.label}>Humedad</Text>
          <View style={styles.buttons}>
            <Picker
              selectedValue={humedadMin}
              style={styles.pickerParametros}
              onValueChange={(itemValue) => setHumedadMin(itemValue)}
            >
              {Array.from({ length: 101 }, (_, i) => (
                <Picker.Item key={i} label={`${i}°`} value={i} />
              ))}
            </Picker>
            <Text style={styles.buttonText}>{humedadMin}%</Text>
            <Picker
              selectedValue={humedadMax}
              style={styles.pickerParametros}
              onValueChange={(itemValue) => setHumedadMax(itemValue)}
            >
              {Array.from({ length: 101 }, (_, i) => (
                <Picker.Item key={i} label={`${i}%`} value={i} />
              ))}
            </Picker>
            <Text style={styles.buttonText}>{humedadMax}%</Text>
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

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() =>
            guardarCultivo(
              notas,
              cultivo,
              temperaturaMin,
              temperaturaMax,
              humedadMin,
              humedadMax,
              fechaActual
            )
          }
        >
          <Text style={styles.saveButtonText}>GUARDAR</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
      {!keyboardVisible && (
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => router.push("/(tabs)/conectionscreen")}>
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
          <TouchableOpacity onPress={() => router.push("/(tabs)/assistentscreen")}>
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
      backgroundColor: "#FFFFFF"
  },
  pickerParametros: {
    backgroundColor: "#CCCCCC",
    height: 42,
    width: 42,
    marginHorizontal: 5,
  },
});
