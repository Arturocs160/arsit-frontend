import { setBackgroundColorAsync } from 'expo-system-ui';
import React from 'react';
import { Image, StyleSheet, Platform, View, Text, TouchableOpacity } from 'react-native';

import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {Calendar, LocaleConfig} from 'react-native-calendars';

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
    header1: {
      marginTop: 30,
      marginHorizontal:"5%"
    },
    contendor: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      margin: 20
    },
    box: {
      width: 50,
      height: 50,
    }, 
    box1: {
      width: 180,
      height: 320,
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      borderRadius:20,
      marginHorizontal: "1%", 
      marginTop: 15,
      backgroundColor: '#29463D'
    },
    box2: {
      width: 180,
      height: 150,
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      borderRadius:20,
      marginHorizontal: "3%", 
      marginTop: 15,
      backgroundColor: '#29463D'
    },
    clima: {
      width: "90%",
      height: 200,
      borderRadius: "10%",
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      marginHorizontal: "5%",
      backgroundColor: 'rgb(140, 250, 250)'
    },
    logo: {
      width: 20, 
      resizeMode: 'contain'
    }, 
    titulo: {
      color: 'white',
      textAlign: 'center',
      fontSize: 20, 
    }, 
    calendarContainer: {
      width: 180,
      height: 160,
      backgroundColor: 'rgb(229, 223, 223)',
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      borderRadius:20,
      marginHorizontal: "3%", 
      marginTop: 15,
      alignItems: 'center',
    justifyContent: 'center',
    }, 
    calendar: {
    //   flex: 1, 
    //   width: '100%', 
    //   height: 'auto',
      transform: [{ scale: 0.5 }]
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: "center",
      justifyContent: 'space-between',
      width: '100%',
      height: 50,
      marginBottom: 50,
      marginTop: 25,
    },
    header: {
      padding: 8,
    },
    backIcon: {
      alignSelf: 'flex-end',
      marginRight: 10,
      padding: 8,
    },
    welcome: {
      fontSize: 16,
      fontWeight: '500',
      color: '#29463D',
      marginTop: -8
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 5,
        padding: 5,
      },
      iconsFooter: {
        width: 30,
        height: 30,
      },
  })
  export default function PanelScreen({}) {
    const [selected, setSelected] = useState('');
    const router = useRouter();
    return (
      <View style={{backgroundColor: "rgb(255, 255, 255)", flex: 1}}>
                   <View style={styles.headerContainer}>
                         <View style={styles.header}>
                             <TouchableOpacity onPress={() => router.back()}>
                                 <Image
                                     style={[{ width: 90, height: 50 }]}
                                     source={require("./../../assets/images/logoarsit.png")}
                                 />
                                 <Text
                                     style={styles.welcome}
                                 >Bienvenido</Text>
                             </TouchableOpacity>
                         </View>
                         {/* <TouchableOpacity onPress={() => router.back()}>
                         <Ionicons name="arrow-back" size={30} color="#2D4B41" style={styles.backIcon} />
                         </TouchableOpacity> */}
         
                     </View>
        
        <View style={styles.clima}>
           <Text>Prono</Text>
        </View>

        <View style={styles.contendor}>
          <View>
            <View style={styles.box1}>
              <Text style={styles.titulo}>Humedad</Text>
            </View>
          </View>

          <View>
            <View style={styles.box2}>
              <Text style={styles.titulo}>Temperatura</Text>
            </View>
            <View style={styles.calendarContainer}>
        <View style={styles.calendar
      }>
        <Calendar
      onDayPress={(day: { dateString: React.SetStateAction<string>; }) => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: '#29463D'}
      }}
      theme={{
        calendarBackground: 'transparent',
        textSectionTitleColor: '#29463D',
        selectedDayBackgroundColor: '#29463D',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#29463D',
        dayTextColor: '#29463D',
        textDisabledColor: '#29463D'
      }} />
        </View>
   
            </View>
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