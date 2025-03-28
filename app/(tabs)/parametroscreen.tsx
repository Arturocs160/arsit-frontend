import React from "react";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useState, useEffect } from "react";
import PieChart from "react-native-pie-chart";
import axios from "axios";
import Header from "@/components/Header";
import { Picker } from "@react-native-picker/picker";


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

const Data = [
  { value: 40, color: "#FFAB0F" },
  { value: 45, color: "#247AFD" },
  { value: 15, color: "#FE46A5" },
];

export default function ParametrosScreen() {
  const [selected, setSelected] = useState("");
  const [temperatura, setTemperatura] = useState(0);
  const [humedadAmbiente, setHumedadAmbiente] = useState(0);
  const [humedadSuelo, setHumedadSuelo] = useState(0);

  async function obtenerDatosSensor() {
    try {
      const result = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/sensores/datosSensor`
      );
      setTemperatura(result.data.usuario1.temperature);
      setHumedadAmbiente(result.data.usuario1.humidity);
      setHumedadSuelo(result.data.usuario1.soilMoisture / 10);
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
        <View style={styles.indicador}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#29463D",
              marginBottom: 8,
            }}
          >
            Humedad Ambiental
          </Text>
          {humedadAmbiente > 0 && (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
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

        <View style={styles.indicador}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#29463D",
              marginBottom: 8,
            }}
          >
            Temperatura
          </Text>
          {temperatura > 0 && (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <PieChart
                series={[
                  { value: temperatura, color: "#FF6347" },
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

        <View style={styles.indicador}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#29463D",
              marginBottom: 8,
            }}
          >
            Humedad del Suelo
          </Text>
          {humedadSuelo > 0 && (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <PieChart
                series={[
                  { value: humedadSuelo, color: "#32CD32" },
                  { value: 100 - humedadSuelo, color: "#E0E0E0" },
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
                {humedadSuelo}%
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity>
          {/**/}
          {/* <View style={styles.calendarContainer}>
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
          </View> */}
        </TouchableOpacity>
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    height: 50,
    marginBottom: 20,
    marginTop: 25,
    marginLeft: 20,
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
  logo: {
    width: 200,
    resizeMode: "contain",
  },
  iconsFooter: {
    width: 40,
    height: 40,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: 5,
    padding: 5,
    height: 85,
  },
  indicador: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  tituloContainer: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    margin: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  titulo: {
    fontSize: 20,
  },
  notasContainer: {
    textAlign: "center",
    width: "100%",
    paddingHorizontal: "10%",
    marginVertical: 20,
  },
  calendarContainer: {
    width: "100%",
    height: 260,
    // backgroundColor: 'rgb(229, 223, 223)',
    // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
    borderRadius: 20,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  calendar: {
    //   flex: 1,
    width: "100%",
    //   height: 'auto',
    transform: [{ scale: 0.8 }],
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#CCCCCC",
    marginBottom: 20,
  },
});
