import React from "react";
import { Image, StyleSheet, Platform, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useState } from "react";
import Header from "@/components/Header";

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
  dayNamesShort: ['D', 'L.', 'M.', 'M.', 'J.', 'V.', 'S.'],
  today: "Aujourd'hui"
};

LocaleConfig.defaultLocale = 'fr';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-start',
    paddingTop: 28
  },
  general: {
    flex: 1,
    width: '100%'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    width: '90%',
    height: 50,
    marginBottom: 20,
    marginTop: 25,
    marginLeft: 20
  },
  header: {
    padding: 8,
  },
  backIcon: {
    alignSelf: 'flex-end',
    marginRight: 10,
    padding: 8
  },
  welcome: {
    fontSize: 16,
    fontWeight: '500',
    color: '#29463D',
    marginTop: -8
  },
  calendarContainer: {
    width: '90%',
    height: 260,
    // backgroundColor: 'rgb(229, 223, 223)',
    // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
    borderRadius: 20,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '5%'
  },
  calendar: {
    //   flex: 1, 
    width: '100%',
    margin: 10,
    //   height: 'auto',
    transform: [{ scale: 1 }]
  },

  saveButton: {
    backgroundColor: '#29463D',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    width: '90%',
    marginBottom: 23,
    marginHorizontal: '5%'
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: 65,
    marginTop: 5,
    padding: 5,
    alignItems: 'flex-end',
  },
  iconsFooter: {
    width: 40,
    height: 40,
  },
  buttonContainer: {
    width: '100%',
    height: 260,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
})

export default function CalendarScreen() {
  const [selected, setSelected] = useState('');
  const [startPeriod, setStartPeriod] = useState<string | null>(null);
  const [endPeriod, setEndPeriod] = useState<string | null>(null);
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});

  const handleDayPress = (day: { dateString: string }) => {
    if (!startPeriod || (startPeriod && endPeriod)) {
      setStartPeriod(day.dateString);
      setEndPeriod(null);
      setMarkedDates({
        [day.dateString]: { startingDay: true, endingDay: true, color: "#29463d", textColor: "white" }
      });
    } else {
      if (new Date(day.dateString) < new Date(startPeriod)) {

        setStartPeriod(day.dateString);
        setMarkedDates({
          [day.dateString]: { startingDay: true, endingDay: true, color: "#5cb85c", textColor: "white" }
        });
      } else {
        setEndPeriod(day.dateString);
        const range = getMarkedRange(startPeriod, day.dateString);
        setMarkedDates(range);
      }
    }
  };

  const getMarkedRange = (start: string, end: string) => {
    let range: { [key: string]: any } = {};
    let currentDate = new Date(start);
    const endDate = new Date(end);

    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split("T")[0];
      if (dateString === start) {
        range[dateString] = { startingDay: true, color: "#5cb85c", textColor: "white" };
      } else if (dateString === end) {
        range[dateString] = { endingDay: true, color: "#5cb85c", textColor: "white" };
      } else {
        range[dateString] = { color: "#a5d6a7", textColor: "white" };
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return range;
  };


  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.general}>
        <View style={styles.headerContainer}>
          <Header></Header>
          <TouchableOpacity onPress={() => router.push('/(tabs)/panelscreen')}>
            <Ionicons name="arrow-back" size={30} color="#2D4B41" style={styles.backIcon} />
          </TouchableOpacity>
        </View>
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
                textDisabledColor: "#A9A9A9"
              }}
              hideExtraDays={true}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/conectionscreen')}>
          <Image source={require("../../assets/images/icons/conexion_Mesa de trabajo 1.png")} style={styles.iconsFooter} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/addscreen')}>
          <Image source={require("../../assets/images/icons/mas.png")} style={styles.iconsFooter} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/assistentscreen')}>
          <Image source={require("../../assets/images/icons/asistencia.png")} style={styles.iconsFooter} />
        </TouchableOpacity>
      </View>
    </View>
  )
}