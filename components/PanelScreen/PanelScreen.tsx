import { setBackgroundColorAsync } from 'expo-system-ui';
import React from 'react';
import { Image, StyleSheet, Platform, View, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// // Definir los tipos del stack
// type RootStackParamList = {
//   PanelScreen: undefined;
//   AddScreen: undefined;
// };

// type PanelScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "PanelScreen">;

// interface Props {
//   navigation: PanelScreenNavigationProp;
// }

// import { useNavigation } from "@react-navigation/native";




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
      width: 170,
      height: 320,
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      borderRadius:20,
      marginHorizontal: "3%", 
      marginTop: 15,
      backgroundColor: '#29463D'
    },
    box2: {
      width: 170,
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
      marginVertical: 20,
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
      width: 170,
      height: 150,
      backgroundColor: 'rgb(229, 223, 223)',
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      borderRadius:20,
      marginHorizontal: "3%", 
      marginTop: 15,
      alignItems: 'center',
    justifyContent: 'center',
    }, 
    calendar: {
      // flex: 1, 
      width: 'auto', 
      height: 'auto',
      transform: [{ scale: 0.6 }]
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
  })
  export default function PanelScreen({}) {
    const [notes, setNotes] = useState('');

    const router = useRouter();
    return (
      <View style={{backgroundColor: "rgb(255, 255, 255)", flex: 1}}>
         <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              style={[{ width: 90, height: 50 }]}
              source={require("../../../arsitapp/assets/images/logo-arsit.png")}
            />
            <Text
              style={styles.welcome}
            >Bienvenido</Text>
          </TouchableOpacity>
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
      
      theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
        textDisabledColor: '#dd99ee'
      }} />
        </View>
   
            </View>
          </View>

        </View>
       

        <View style={styles.contendor}> 
          {/* <View style={styles.box}> <Image source={require('assets/images/mas.png')} /></View> */}
          {/* <View style={styles.box}><Text>Conectar</Text></View> */}
          {/* <TouchableOpacity onPress={() => navigation.navigate("AddScreen")}>
            <Text>Ir a AddScreen</Text>
          </TouchableOpacity> */}
        {/* <View style={styles.box}><Text>u</Text></View> */} *
        </View>
      </View>
    </View>
    )
  
    
  }