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
import { useRouter } from "expo-router";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useState, useEffect } from "react";
import PieChart from "react-native-pie-chart";
import axios from "axios";
import Header from "@/components/Header";
import { Picker } from "@react-native-picker/picker";

interface Cultivo {
  _id: string;
  cultivo: string;
  invernaderoId: string;
  fecha_siembra: string;
  notasId: string | null;
  nota: string;
  temperaturaMin: number;
  temperaturaMax: number;
  humedadMin: number;
  humedadMax: number;
}

interface Invernadero {
  _id: string;
  nombre: string;
  ubicacion: string;
}

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
  const [invernaderos, setInvernaderos] = useState<Invernadero[]>([]);
  const [invernaderoSeleccionado, setInvernaderoSeleccionado] = useState("");
  const [cultivos, setCultivos] = useState<Cultivo[]>([]);

  useEffect(() => {
    obtenerInvernaderos();
  }, []);

  const obtenerInvernaderos = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/invernaderos`
      );
      setInvernaderos(response.data);
      if (response.data.length > 0) {
        setInvernaderoSeleccionado(response.data[0]._id);
      }
    } catch (error) {
      console.error("Error al obtener los invernaderos:", error);
    }
  };

  useEffect(() => {
    if (invernaderoSeleccionado) {
      obtenerInformacion();
    }
  }, [invernaderoSeleccionado]);

  const obtenerInformacion = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/cultivos`,
        {
          params: {
            invernaderoId: invernaderoSeleccionado,
          },
        }
      );
      setCultivos(response.data);
      // console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarCultivo = async (cultivoId: string) => {
    try {
      await axios.delete(
        `${process.env.EXPO_PUBLIC_BASE_URL}/cultivos/${cultivoId}`
      );
      setCultivos(cultivos.filter((cultivo) => cultivo._id !== cultivoId));
    } catch (error) {
      console.error("Error al eliminar el cultivo:", error);
    }
    alert("Cultivo eliminado");
  };

  const eliminarInvernadero = async (invernaderoId: string) => {
    try {
      await axios.delete(`${process.env.EXPO_PUBLIC_BASE_URL}/invernaderos/${invernaderoId}`);
      setInvernaderos(invernaderos.filter((invernadero) => invernadero._id !== invernaderoId));
    } catch (error) {
      console.error("Error al eliminar el cultivo:", error);
    }
    alert("Cultivo eliminado");
  };

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
          <PieChart
            series={Data}
            widthAndHeight={150}
            style={{ justifyContent: "center" }}
            // radius = {100}
            // innerRadius = {80}
            // dividerSize = {1}
            // backgroundColor = {}
          />
        </View>
        <View style={{ width: "50%", alignSelf: "center", marginTop: 10 }}>
          <Picker
            selectedValue={invernaderoSeleccionado}
            style={styles.picker}
            onValueChange={(itemValue) => {
              setInvernaderoSeleccionado(itemValue);
            }}
          >
            <Picker.Item label="Selecciona un invernadero" value="" />
            {invernaderos.map((invernadero) => (
              <Picker.Item key={invernadero._id} label={invernadero.nombre} value={invernadero._id} />
            ))}
          </Picker>

          {/* Obtener el invernadero seleccionado */}
          {invernaderoSeleccionado && (
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
              <TouchableOpacity onPress={() => router.push(`/updateinvernaderoscreen?invernaderoId=${invernaderoSeleccionado}`)}>
                <Ionicons style={{ marginHorizontal: 8 }} name="pencil" size={20} color="#29463D" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => eliminarInvernadero(invernaderoSeleccionado)}>
                <Ionicons style={{ marginHorizontal: 8 }} name="trash" size={20} color="#29463D" />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.tituloContainer}>
          {cultivos.map((cultivo, index) => (
            <View key={index} style={styles.tituloContainer}>
              <Text style={styles.titulo}>{cultivo.cultivo}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() =>
                    router.push(`/updatescreen?cultivoId=${cultivo._id}`)
                  }
                >
                  <Ionicons
                    style={{ marginLeft: 8 }}
                    name="pencil"
                    size={20}
                    color="#29463D"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => eliminarCultivo(cultivo._id)}>
                  <Ionicons
                    style={{ marginLeft: 8 }}
                    name="trash"
                    size={20}
                    color="#29463D"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.notasContainer}>
          {cultivos.map((cultivo, index) => (
            <View key={index} style={styles.tituloContainer}>
              <Text>{cultivo.nota}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity >
          {/**/}
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
