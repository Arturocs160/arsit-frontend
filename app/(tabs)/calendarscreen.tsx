import React, { useEffect } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useState } from "react";
import Header from "@/components/Header";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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

interface Calendario {
  fechaInicio: Date;
  fechaFinal: Date;
  fechasMarcadas: Number;
  notas: String;
}

interface MarkedDates {
  [date: string]: {
    startingDay?: boolean;
    endingDay?: boolean;
    color?: string;
    textColor?: string;
  };
}


export default function CalendarScreen() {
  const [selected, setSelected] = useState("");
  const [fechaInicio, setFechaInicio] = useState<Date | null>(null);
  const [fechaFinal, setFechaFinal] = useState<Date | null>(null);
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [fechasBaseDatos, setFechasBaseDatos] = useState<{ [key: string]: any }>({});
  const [nota, setNota] = useState("");
  const [selectionCount, setSelectionCount] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    obtenerFechas();
  }, []);

  const obtenerFechas = async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/calendario`);
      const fechasData = response.data;
      let newMarkedDates: { [key: string]: any } = {};

      fechasData.forEach((fecha: any) => {
        const range = getMarkedRange(new Date(fecha.fechaInicio), new Date(fecha.fechaFinal));
        newMarkedDates = { ...newMarkedDates, ...range };
      });

      setMarkedDates(newMarkedDates);
    } catch (error) {
      console.error("Error al obtener los detalles de las fechas:", error);
    }
  };

  const handleDayPress = (day: { dateString: string }) => {
    const fechaSeleccionada = day.dateString;
    const fechaHoy = new Date();
    const fechaHoyISO = fechaHoy.toISOString().split("T")[0];

    if (fechaSeleccionada < fechaHoyISO) {
      alert("No puedes seleccionar una fecha pasada.");
      return;
    }

    if (selectionCount >= 2) {
      Alert.alert("Solo puedes seleccionar un rango de dos fechas (inicio y final).","Para reiniciar la selección, debes borrar las fechas seleccionadas con el botón reiniciar selección.");
      return;
    }

    const nuevaFechaSeleccionada = new Date(fechaSeleccionada);
    let updatedMarkedDates = { ...markedDates };

    if (selectionCount === 0) {
      setFechaInicio(nuevaFechaSeleccionada);
      setFechaFinal(null);
      updatedMarkedDates[fechaSeleccionada] = {
        startingDay: true,
        endingDay: true,
        color: "#29463d",
        textColor: "white",
      };
      setSelectionCount(1);
    } else if (selectionCount === 1) {
      if (nuevaFechaSeleccionada < fechaInicio!) {
        alert("La fecha final no puede ser anterior a la fecha de inicio.");
        return;
      }

      setFechaFinal(nuevaFechaSeleccionada);
      const range = getMarkedRange(fechaInicio!, nuevaFechaSeleccionada);
      updatedMarkedDates = { ...updatedMarkedDates, ...range };
      setSelectionCount(2);
    }

    setMarkedDates(updatedMarkedDates);
  };

  const resetSelection = () => {
    setFechaInicio(null);
    setFechaFinal(null);
    setSelectionCount(0);
    setMarkedDates({});
  };

  const getMarkedRange = (startDate: Date, endDate: Date) => {
    if (startDate.toISOString().split("T")[0] === "1970-01-01") return {};

    let markedRange: { [key: string]: any } = {};
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const formattedDate = currentDate.toISOString().split("T")[0];

      if (formattedDate === startDate.toISOString().split("T")[0]) {
        markedRange[formattedDate] = {
          startingDay: true,
          color: "#5cb85c",
          textColor: "white",
        };
      } else if (formattedDate === endDate.toISOString().split("T")[0]) {
        markedRange[formattedDate] = {
          endingDay: true,
          color: "#5cb85c",
          textColor: "white",
        };
      } else {
        markedRange[formattedDate] = {
          color: "#a5d6a7",
          textColor: "white",
        };
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return markedRange;
  };

  const guardarFechas = async () => {
    if (!fechaInicio || fechaInicio.toISOString().split("T")[0] === "1970-01-01") {
      alert("Debes seleccionar al menos una fecha.");
      return;
    }

    if (nota.trim() === "") {
      alert("Debes colocar una nota.");
      return;
    }

    try {
      const ajustarAUTC = (fecha: Date): string => {
        return new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000).toISOString();
      };

      const fechaInicioAjustada = ajustarAUTC(new Date(fechaInicio));
      const fechaFinalAjustada = fechaFinal ? ajustarAUTC(new Date(fechaFinal)) : fechaInicioAjustada;
      const data = {
        fechaInicio: fechaInicioAjustada,
        fechaFinal: fechaFinalAjustada,
        nota,
      };

      const result = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/calendario`, data);

      if (result.status === 200) {
        Alert.alert("Recordatorio agregado", "El recordatorio fue agregado correctamente.", [
          {
            text: "Aceptar",
            onPress: () => obtenerFechas(),
          },
        ]);
      } else {
        alert("Ocurrió un error al guardar las fechas, por favor intente más tarde.");
      }

      setNota("");
      resetSelection();
    } catch (error) {
      console.error("Error al guardar las fechas:", error);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.general}>
          <View style={styles.headerContainer}>
            <Header />
            <TouchableOpacity onPress={() => router.push("/(tabs)/menuscreen")}>
              <Ionicons name="arrow-back" size={30} color="#2D4B41" style={styles.backIcon} />
            </TouchableOpacity>
          </View>
          <KeyboardAwareScrollView>
            <View style={styles.calendarContainer}>
              <View style={styles.calendar}>
                <Calendar
                  onDayPress={handleDayPress}
                  markingType={"period"}
                  markedDates={markedDates}
                  theme={{
                    calendarBackground: "transparent",
                    textSectionTitleColor: "#29463D",
                    selectedDayBackgroundColor: "#29463D",
                    selectedDayTextColor: "#ffffff",
                    todayTextColor: "#29463D",
                    dayTextColor: "#29463D",
                    textDisabledColor: "#A9A9A9",
                  }}
                  hideExtraDays={true}
                />
              </View>
            </View>
            <View style={styles.notesContainer}>
              <TextInput placeholder="NOTA" style={styles.input} placeholderTextColor="#29463D" value={nota} onChangeText={setNota} />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={guardarFechas}>
                <Text style={styles.saveButtonText}>GUARDAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={resetSelection}>
                <Text style={styles.saveButtonText}>REINICIAR SELECCIÓN</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={() => router.push("/(tabs)/recordatorioscreen")}>
                <Text style={styles.saveButtonText}>VER RECORDATORIOS</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
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
    // backgroundColor: 'purple'
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
  calendarContainer: {
    width: "90%",
    height: 380,
    // backgroundColor: 'rgb(130, 31, 31)',
    // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
    marginTop: 30,
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: "5%",
  },
  // notas: {
  //   width: "90%",
  //   height: 160,
  //   backgroundColor: "green",
  //   marginHorizontal: "5%",
  // },
  calendar: {
    //   flex: 1,
    width: "100%",
    margin: 5,
    //   height: 'auto',
    transform: [{ scale: 1 }],
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

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    height: 85,
    marginTop: 5,
    padding: 5,
    alignItems: "flex-end",
    // backgroundColor: 'blue'
  },
  iconsFooter: {
    width: 40,
    height: 40,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 25,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  input: {
    backgroundColor: "#CCCCCC",
    padding: 17,
    borderRadius: 20,
    color: "#29463D",
    fontSize: 15,
  },
  notesContainer: {
    backgroundColor: "#CCCCCC",
    padding: 12,
    borderRadius: 15,
    width: "90%",
    height: 150,
    marginBottom: 35,
    marginTop: 5,
    marginHorizontal: "5%",
  },
});
