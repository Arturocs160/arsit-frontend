import { setBackgroundColorAsync } from "expo-system-ui";
import React from "react";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Weather from "@/components/Parametros/Wheater";
import PieChart from "react-native-pie-chart";
import axios from "axios";

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene.",
    "Feb.",
    "Mar.",
    "Abr.",
    "May.",
    "Jun.",
    "Jul.",
    "Ago.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ],
  dayNamesShort: ["D", "L.", "M.", "M.", "J.", "V.", "S."],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = "fr";

export default function PanelScreen({}) {
  const [temperatura, setTemperatura] = useState(0);
  const [humedadAmbiente, setHumedadAmbiente] = useState(0);
  const [humedadSuelo, setHumedadSuelo] = useState(0);
  const [selected, setSelected] = useState(new Date().toISOString().split("T")[0]);

  const router = useRouter();

  async function obtenerDatosSensor() {
    try {
      const result = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/sensores/datosSensor`
      );
      setTemperatura(result.data.usuario1.temperature);
      setHumedadAmbiente(result.data.usuario1.humidity);
      setHumedadSuelo(result.data.usuario1.soilMoisture);
    } catch (error) {
      console.error(
        "Ha ocurrido un error al obtener los datos de los sensores:",
        error
      );
    }
  }

  useEffect(() => {
    obtenerDatosSensor();

    const intervalo = setInterval(() => {
      obtenerDatosSensor();
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.general}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Image
              style={[{ width: 90, height: 50 }]}
              source={require("@/assets/images/logoarsit.png")}
            />
            <Text style={styles.welcome}>Bienvenido</Text>
          </View>
        </View>
        <View style={styles.barraDispositivos}>
          <Text>Dispositivo 1</Text>
          <Text>Dispositivo 2</Text>
          <Text>Dispositivo 3</Text>
        </View>
        <View style={styles.clima}>
          <Weather />
        </View>

        <View style={styles.contendor}>
          <View>
            <TouchableOpacity onPress={() => router.push(`/parametroscreen`)}>
              {/**/}
              <View style={styles.box1}>
                <Text style={styles.titulo}>Humedad</Text>
                <Text style={styles.texto}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                  unde laborum culpa aspernatur blanditiis nobis consequuntur!
                  Saepe ipsum alias repudiandae, iste nihil atque commodi ut
                  incidunt! Distinctio adipisci enim labore.
                </Text>
                {humedadAmbiente > 0 && (
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <PieChart
                      series={[
                        { value: humedadAmbiente, color: "#FFAB0F" },
                        { value: 100 - humedadAmbiente, color: "#E0E0E0" },
                      ]}
                      widthAndHeight={120}
                    />
                    <Text
                      style={{
                        position: "absolute",
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      {humedadAmbiente}%
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/parametroscreen")}
            >
              <View style={styles.box2}>
                <Text style={styles.titulo}>Temperatura</Text>
                {temperatura > 0 && (
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <PieChart
                      series={[
                        {
                          value: temperatura,
                          color:
                            temperatura <= 20
                              ? "#4CAF50"
                              : temperatura <= 35
                              ? "#FFAB0F"
                              : "#FF5722",
                        },
                        { value: 100 - temperatura, color: "#E0E0E0" },
                      ]}
                      widthAndHeight={120}
                    />
                    <Text
                      style={{
                        position: "absolute",
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      {temperatura}°C
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.calendarContainer}>
                <View style={styles.calendar}>
                  <Calendar
                    onDayPress={(day: {
                      dateString: React.SetStateAction<string>;
                    }) => {
                      setSelected(day.dateString);
                    }}
                    markedDates={{
                      [selected]: {
                        selected: true,
                        disableTouchEvent: true,
                        selectedDotColor: "#29463D",
                      },
                    }}
                    theme={{
                      calendarBackground: "transparent",
                      textSectionTitleColor: "#29463D",
                      selectedDayBackgroundColor: "#29463D",
                      selectedDayTextColor: "#ffffff",
                      todayTextColor: "#29463D",
                      dayTextColor: "#29463D",
                      textDisabledColor: "#29463D",
                    }}
                    hideExtraDays={true}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  barraDispositivos: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    marginHorizontal: "10%",
    color: "#29463D",
    fontWeight: "900",
    fontFamily: "Poppins-Medium",
  },
  box1: {
    width: 180,
    height: 400,
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    borderRadius: 20,
    marginHorizontal: "1%",
    marginTop: 5,
    backgroundColor: "#29463D",
    alignItems: "center",
  },
  box2: {
    width: 180,
    height: 170,
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    borderRadius: 20,
    marginHorizontal: "3%",
    marginTop: 5,
    backgroundColor: "#29463D",
    alignItems: "center",
  },
  buttonFooter: {
    flexDirection: "column",
    width: "70%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  calendarContainer: {
    width: 180,
    height: 220,
    backgroundColor: "rgb(229, 223, 223)",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    borderRadius: 20,
    marginHorizontal: "3%",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  calendar: {
    flex: 1,
    width: 300,
    height: "100%",
    transform: [{ scale: 0.6 }],
    top: -40,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "flex-start",
    paddingTop: 28,
  },
  contendor: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
  },
  clima: {
    width: "90%",
    height: 200,
    borderRadius: "10%",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    marginHorizontal: "5%",
    backgroundColor: "rgb(113, 232, 192)",
    marginTop: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: 5,
    padding: 5,
    height: 85,
  },
  general: {
    flex: 1,
    width: "100%",
  },
  header: {
    padding: 8,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 50,
    marginBottom: 20,
    marginTop: 25,
    marginLeft: 20,
  },
  texto: {
    color: "white",
    textAlign: "center",
    fontSize: 12,
    margin: 4,
  },
  titulo: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    margin: 5,
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
