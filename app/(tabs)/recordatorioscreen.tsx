import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface Recordatorio {
  idFecha: string;
  fechaInicio: string;
  fechaFinal: string;
  nota: string;
}

export default function ListaRecordatorios() {
  const [recordatorios, setRecordatorios] = useState<Recordatorio[]>([]);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    obtenerFechas();
  }, []);

  const obtenerFechas = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/calendario`
      );
      const data: Recordatorio[] = response.data;

      const recordatoriosAjustados = data.map((recordatorio) => ({
        ...recordatorio,
        fechaInicio: new Date(recordatorio.fechaInicio).toISOString(),
        fechaFinal: new Date(recordatorio.fechaFinal).toISOString(),
      }));

      const recordatoriosOrdenados = recordatoriosAjustados.sort(
        (a, b) =>
          new Date(a.fechaInicio).getTime() - new Date(b.fechaInicio).getTime()
      );

      setRecordatorios(recordatoriosOrdenados);
    } catch (error) {
      console.error("Error al obtener los recordatorios:", error);
    }
  };

  const borrarRecordatorio = async (fechaInicio: string) => {
    try {
      const response = await axios.delete(
        `${process.env.EXPO_PUBLIC_BASE_URL}/calendario/${fechaInicio}`
      );
      if (response.status === 200) {
        console.log("Recordatorio eliminado exitosamente");
        obtenerFechas();
      }
    } catch (error) {
      console.error("Error al borrar el recordatorio:", error);
    }
  };

  const formatearFecha = (fechaISO: string): string => {
    const fecha = new Date(fechaISO);
    const opciones: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return fecha.toLocaleDateString("es-MX", opciones);
  };

  return (
    <View style={styles.container}>
      <View style={styles.general}>
        <Text style={styles.header}>Lista de Recordatorios</Text>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            { paddingBottom: 100 },
          ]}
        >
          {recordatorios.map((recordatorio, index) => (
            <View key={index} style={styles.cardContainer}>
              <View style={styles.card}>
                <Text style={styles.text}>
                  <Text style={styles.bold}>Inicio:</Text>{" "}
                  {formatearFecha(recordatorio.fechaInicio)}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.bold}>Fin:</Text>{" "}
                  {formatearFecha(recordatorio.fechaFinal)}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.bold}>Nota:</Text> {recordatorio.nota}
                </Text>
              </View>
              <TouchableOpacity
                style={{ marginLeft: 8, alignItems: "center", marginTop: 8 }}
                onPress={() => borrarRecordatorio(recordatorio.fechaInicio)}
              >
                <Ionicons name="trash" size={20} color="#29463D" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#29463D",
    marginTop: 20,
  },
  scrollContainer: {
    paddingBottom: 16,
  },
  cardContainer: {
    backgroundColor: "#f8f9fa",
    flexDirection: "row",
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#dddddd",
  },
  card: {
    padding: 16,
    width: "90%",
  },
  text: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 8,
  },
  bold: {
    fontWeight: "bold",
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
  buttonFooter: {
    flexDirection: "column",
    width: "70%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  iconsFooter: {
    width: 40,
    height: 40,
  },
});
