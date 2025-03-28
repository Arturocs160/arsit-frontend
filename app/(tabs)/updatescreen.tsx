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
  Alert,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import Header from "@/components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Invernadero {
  _id: string;
  nombre: string;
}

interface Dispositivo {
  id: number;
  nombreDispositivo: string;
  password: number;
  humidity: number;
  soilMoisture: number;
  temperature: number;
  wifi: string;
}

export default function UpdateScreen() {
  const params = useLocalSearchParams();
  const { cultivoId } = params;

  const [notas, setNotas] = useState<string>("");
  const [cultivo, setCultivo] = useState<string>("");
  const [invernaderos, setInvernaderos] = useState<Invernadero[]>([]);
  const [fechaActual, setFechaActual] = useState<Date>(new Date());
  const [temperaturaMin, setTemperaturaMin] = useState<number>(0);
  const [temperaturaMax, setTemperaturaMax] = useState<number>(0);
  const [humedadMax, setHumedadMax] = useState<number>(0);
  const [humedadMin, setHumedadMin] = useState<number>(0);
  const [invernaderoSeleccionado, setInvernaderoSeleccionado] = useState(null);
  const [dispositivoSeleccionado, setDispositivoSeleccionado] = useState(null);
  const [invernaderoID, setInvernaderoID] = useState("");
  const [dispositivos, setDispositivos] = useState<Dispositivo[]>([]);

  const router = useRouter();

  useEffect(() => {
    obtenerInvernaderos();
  }, []);

  useEffect(() => {
    if (invernaderoID) {
      obtenerInvernaderoPorID();
    }
  }, [invernaderoID]);

  const obtenerInvernaderos = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/invernaderos`
      );
      setInvernaderos(response.data);
    } catch (error) {
      console.error("Error al obtener los invernaderos:", error);
    }
  };

  const dispositivoDisponible = async () => {
    try {
      const valor = await AsyncStorage.getItem("dispositivos");
      if (valor !== null) {
        const datos = JSON.parse(valor);
        setDispositivos(datos);
      } else {
        console.log("No hay datos disponibles.");
      }
    } catch (error) {
      console.error("Error al recuperar datos:", error);
    }
  };

  useEffect(() => {
    obtenerDetallesCultivo();
    dispositivoDisponible();
  }, []);

  const obtenerDetallesCultivo = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/cultivos/${cultivoId}`
      );
      const cultivoData = response.data;

      setCultivo(cultivoData.cultivo);
      setNotas(cultivoData.nota);
      setFechaActual(new Date(cultivoData.fecha_siembra));
      setTemperaturaMin(cultivoData.parametros_optimos.temperatura.min);
      setTemperaturaMax(cultivoData.parametros_optimos.temperatura.max);
      setHumedadMin(cultivoData.parametros_optimos.humedad.min);
      setHumedadMax(cultivoData.parametros_optimos.humedad.max);
      setDispositivoSeleccionado(cultivoData.dispositivo);
      setInvernaderoID(cultivoData.invernaderoId);
    } catch (error) {
      console.error("Error al obtener los detalles del cultivo:", error);
    }
  };

  const obtenerInvernaderoPorID = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/invernaderos/${invernaderoID}`
      );
      setInvernaderoSeleccionado(response.data._id);
    } catch (error) {
      console.error("Error al obtener los invernaderos:", error);
    }
  };

  async function actualizarCultivo(
    notas: string,
    cultivo: string,
    temperaturaMin: number,
    temperaturaMax: number,
    humedadMin: number,
    humedadMax: number,
    fechaActual: Date
  ) {
    if (temperaturaMin >= temperaturaMax) {
      alert("La temperatura máxima debe ser mayor a la minima");
      return;
    }

    if (humedadMin >= humedadMax) {
      alert("La humeadad máxima debe ser mayor a la minima");
      return;
    }

    if (!dispositivoSeleccionado) {
      Alert.alert("Dispositivo no seleccionado", "Selecciona un dispositivo");
    }

    if (!invernaderoSeleccionado) {
      Alert.alert("Invernadero no seleccionado", "Selecciona un invernadero");
    }

    const fechaFormateada = fechaActual.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    if (
      !cultivo.trim() ||
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
        cultivoId: cultivoId,
        cultivo: cultivo,
        invernaderoId: invernaderoSeleccionado,
        fecha_siembra: fechaFormateada,
        nota: notas,
        temperaturaMin: temperaturaMin,
        temperaturaMax: temperaturaMax,
        humedadMax: humedadMax,
        humedadMin: humedadMin,
      };

      try {
        const result = await axios.put(
          `${process.env.EXPO_PUBLIC_BASE_URL}/cultivos/${cultivoId}`,
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

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const eliminarCultivo = async () => {
    try {
      await axios.delete(
        `${process.env.EXPO_PUBLIC_BASE_URL}/cultivos/${cultivoId}`
      );

      Alert.alert(
        "Cultivo eliminado",
        "El cultivo ha sido eliminado correctamente.",
        [
          {
            text: "Aceptar",
            onPress: () => router.push("/(tabs)/cultivosscreen"),
          },
        ]
      );
    } catch (error) {
      console.error("Error al eliminar el cultivo:", error);
      Alert.alert("Error", "Ocurrió un error, favor de intentar más tarde");
    }
  };

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
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        {/* <Button title="Volver a Home" onPress={() => router.back()} /> */}
        <View style={styles.general}>
          <View style={styles.headerContainer}>
            <Header></Header>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/cultivosscreen")}
            >
              <Ionicons
                name="arrow-back"
                size={30}
                color="#2D4B41"
                style={styles.backIcon}
              />
            </TouchableOpacity>
          </View>
          <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.titulo}>
              <Text style={styles.textoTitulo}>EDITAR CULTIVOS</Text>
            </View>
            <View style={styles.selectDispositivo}>
              <Picker
                placeholder="Dispositivo"
                selectedValue={dispositivoSeleccionado}
                style={styles.picker}
                onValueChange={(itemValue) => {
                  if (itemValue === null) {
                    setDispositivoSeleccionado(null);
                  } else {
                    setDispositivoSeleccionado(itemValue);
                  }
                }}                
              >
                <Picker.Item label="Escoge un dispositivo" value={null} />
                {dispositivos.map((dispositivo) => (
                  <Picker.Item
                    key={dispositivo.id}
                    label={dispositivo.nombreDispositivo}
                    value={dispositivo.id}
                  />
                ))}
                <Picker.Item label="Dispositivo 2" value={2} />
                <Picker.Item label="Dispositivo 3" value={3} />
                <Picker.Item label="Dispositivo 4" value={4} />
              </Picker>
            </View>
            <View style={styles.inputContainer}>
              {/* <Text style={styles.label}>Nombre</Text> */}
              <View>
                <Picker
                  selectedValue={invernaderoSeleccionado}
                  style={styles.picker}
                  onValueChange={(itemValue) => {
                    if (itemValue === null) {
                      setInvernaderoSeleccionado(null);
                    } else {
                      setInvernaderoSeleccionado(itemValue);
                    }
                  }}
                >
                  <Picker.Item label="Escoge un invernadero" value={null} />
                  {invernaderos.map((invernadero) => (
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
            <View style={styles.parametroText}>
              <Text
                style={{
                  fontWeight: "700",
                  color: "#29463D",
                  width: "30%",
                  textAlign: "center",
                  marginRight: "22%",
                  marginLeft: "5%",
                }}
              >
                Min.
              </Text>
              <Text
                style={{
                  fontWeight: "700",
                  color: "#29463D",
                  width: "35%",
                  textAlign: "center",
                }}
              >
                Max.
              </Text>
            </View>
            <View style={styles.controlContainer}>
              <Text style={styles.label}>Temperatura</Text>
              <View style={styles.buttons}>
                <View style={styles.parametro}>
                  <Picker
                    selectedValue={temperaturaMin}
                    style={styles.pickerParametros}
                    onValueChange={(itemValue) => setTemperaturaMin(itemValue)}
                  >
                    {Array.from({ length: 101 }, (_, i) => (
                      <Picker.Item key={i} label={`${i}°`} value={i} />
                    ))}
                  </Picker>
                </View>
                <View style={styles.parametro}>
                  <Text style={styles.buttonText}>{temperaturaMin}°</Text>
                </View>
                <View style={styles.parametro}>
                  <Picker
                    selectedValue={temperaturaMax}
                    style={styles.pickerParametros}
                    onValueChange={(itemValue) => setTemperaturaMax(itemValue)}
                  >
                    {Array.from({ length: 101 }, (_, i) => (
                      <Picker.Item key={i} label={`${i}°`} value={i} />
                    ))}
                  </Picker>
                </View>
                <View style={styles.parametro}>
                  <Text style={styles.buttonText}>{temperaturaMax}°</Text>
                </View>
              </View>
            </View>
            <View style={styles.parametroText}>
              <Text
                style={{
                  fontWeight: "700",
                  color: "#29463D",
                  width: "30%",
                  textAlign: "center",
                  marginRight: "22%",
                  marginLeft: "5%",
                }}
              >
                Min.
              </Text>
              <Text
                style={{
                  fontWeight: "700",
                  color: "#29463D",
                  width: "35%",
                  textAlign: "center",
                }}
              >
                Max.
              </Text>
            </View>
            <View style={styles.controlContainer}>
              <Text style={styles.label}>Humedad</Text>
              <View style={styles.buttons}>
                <View style={styles.parametro}>
                  <Picker
                    selectedValue={humedadMin}
                    style={styles.pickerParametros}
                    onValueChange={(itemValue) => setHumedadMin(itemValue)}
                  >
                    {Array.from({ length: 101 }, (_, i) => (
                      <Picker.Item key={i} label={`${i}%`} value={i} />
                    ))}
                  </Picker>
                </View>
                <View style={styles.parametro}>
                  <Text style={styles.buttonText}>{humedadMin}%</Text>
                </View>
                <View style={styles.parametro}>
                  <Picker
                    selectedValue={humedadMax}
                    style={styles.pickerParametros}
                    onValueChange={(itemValue) => setHumedadMax(itemValue)}
                  >
                    {Array.from({ length: 101 }, (_, i) => (
                      <Picker.Item key={i} label={`${i}%`} value={i} />
                    ))}
                  </Picker>
                </View>
                <View style={styles.parametro}>
                  <Text style={styles.buttonText}>{humedadMax}%</Text>
                </View>
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
                actualizarCultivo(
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
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => eliminarCultivo()}
            >
              <Text style={styles.deleteButtonText}>ELIMINAR</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
      </KeyboardAvoidingView>
      {!keyboardVisible && (
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/conectionscreen")}
          >
            <View style={styles.buttonFooter}>
              <Image
                source={require("../../assets/images/icons/conexion_Mesa de trabajo 1.png")}
                style={styles.iconsFooter}
              />
              <Text>Conexión</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(tabs)/panelscreen")}>
            <View style={styles.buttonFooter}>
              <Image
                source={require("../../assets/images/icons/iconocasa_Mesa de trabajo 1.png")}
                style={styles.iconsFooter}
              />
              <Text>Inicio</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(tabs)/menuscreen")}>
            <View style={styles.buttonFooter}>
              <Image
                source={require("../../assets/images/icons/iconocategoria_Mesa de trabajo 1.png")}
                style={styles.iconsFooter}
              />
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
    flexDirection: "column",
    width: "70%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
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
  selectDispositivo: {
    width: "90%",
    marginHorizontal: "5%",
    borderRadius: 50,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#CCCCCC",
    marginBottom: 12,
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
    marginBottom: 10,
  },
  // header: {
  //   padding: 8,
  // },
  backIcon: {
    alignSelf: "flex-end",
    marginRight: 10,
    padding: 8,
  },
  // welcome: {
  //   fontSize: 16,
  //   fontWeight: "500",
  //   color: "#29463D",
  //   marginTop: -8,
  // },
  buttonText: {
    padding: 10,
    fontSize: 15,
    fontWeight: "600",
    color: "#29463D",
    borderRadius: 8,
  },
  inputContainer: {
    width: "90%",
    marginBottom: 10,
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
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "5%",
  },
  buttons: {
    flexDirection: "row",
    width: "60%",
  },
  parametro: {
    width: "25%",
  },
  parametroText: {
    width: "50%",
    flexDirection: "row",
    marginLeft: "50%",
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
    height: 150,
    marginBottom: 12,
    marginTop: 5,
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
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: 85,
    padding: 5,
    backgroundColor: "#FFFFFF",
  },
  pickerParametros: {
    backgroundColor: "#CCCCCC",
    height: 42,
    width: 42,
    marginHorizontal: 5,
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
});
