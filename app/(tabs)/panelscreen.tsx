import { setBackgroundColorAsync } from 'expo-system-ui';
import React from 'react';
import { Image, StyleSheet, Platform, View, Text, TouchableOpacity, RefreshControl } from 'react-native';

import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Weather from '@/components/Parametros/Wheater';
import PieChart from 'react-native-pie-chart';

// const openWeatherKey = 'b691521ef68e4659a585e52a9175b416'
// let url = `http://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${openWeatherKey}`;

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


  export default function PanelScreen({}) {
    const [selected, setSelected] = useState('');
    // const [forecast, setForescast] = useState(null); 
    // const [refreshing, setRefreshing] = useState(false); 

    // const loadForescast = async () => {
    //     setRefreshing(true); 

    //     const { status } = await Location.requestForegroundPermissionsAsync(); 
    //     if (status !== 'granted'){
    //         alert('Permiso denegado')
    //     }

    //     let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});

    //     const response = await fetch(`${url}=&lat=${location.coords.latitude}&lon=${location.coords.longitude}`); 
    //     const data = await response.json(); 

    //     if(!response.ok){
    //         alert('Error')

    //     }else {
    //         setForescast(data); 
    //     }
    //     setRefreshing(false)
    // }

    // useEffect(() => {
    //     loadForescast(); 
    // }, [])

    // if(!forecast){
    //     <SafeAreaView>
    //         <ActivityIndicator size={'large'}/>
    //     </SafeAreaView>
    // }

    // const current = forecase.current.weather[0];
    const Data = [
      {value: 40, color : '#FFAB0F'},
	    {value: 45, color : '#247AFD'},
	    {value: 15, color : '#FE46A5'},
    ]
    const router = useRouter();
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                  style={[{ width: 90, height: 50 }]}
                  source={require("./../../assets/images/logoarsit.png")}
              />
              <Text style={styles.welcome}>Bienvenido</Text>
            </TouchableOpacity>
          </View>
                         {/* <TouchableOpacity onPress={() => router.back()}>
                         <Ionicons name="arrow-back" size={30} color="#2D4B41" style={styles.backIcon} />
                         </TouchableOpacity> */}
         
        </View>
          <View style={styles.clima}>
           {/* <View refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => loadForescast}/>
           }></View> */}
            <Weather/> 
          </View>
        

          <View style={styles.contendor}>
            <View>
            <TouchableOpacity onPress={() => router.push('/(tabs)/parametroscreen')}>{/**/}
              <View style={styles.box1}>
                <Text style={styles.titulo}>Humedad</Text>
                <Text style={styles.texto}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos unde laborum culpa aspernatur blanditiis nobis consequuntur! Saepe ipsum alias repudiandae, iste nihil atque commodi ut incidunt! Distinctio adipisci enim labore.</Text>
                <PieChart
			        series = {Data}
              widthAndHeight={150}
              style={{justifyContent: 'center'}}
			        // radius = {100}
			        // innerRadius = {80}
			        // dividerSize = {1}
			        // backgroundColor = {}
			      />
            <Text>{Data[0].value}%</Text>
              </View>
            </TouchableOpacity>
            </View>

            <View>
            <TouchableOpacity onPress={() => router.push('/(tabs)/parametroscreen')}>{/**/}
              <View style={styles.box2}>
                  <Text style={styles.titulo}>Temperatura</Text>
                  <PieChart
			        series = {Data}
              widthAndHeight={120}
              style={{justifyContent: 'center'}}
			        // radius = {100}
			        // innerRadius = {80}
			        // dividerSize = {1}
			        // backgroundColor = {}
			      />
              </View>
              <View style={styles.calendarContainer}>
                  <View style={styles.calendar}>
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
                      }} 
                      hideExtraDays={true}
/>
                  </View>
              </View>
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

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#FFFFFF',
      alignItems: 'flex-start',
      paddingTop: 28
  },
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
      height: 380,
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      borderRadius:20,
      marginHorizontal: "1%", 
      marginTop: 15,
      backgroundColor: '#29463D',
      alignItems: 'center'
    },
    box2: {
      width: 180,
      height: 180,
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      borderRadius:20,
      marginHorizontal: "3%", 
      marginTop: 15,
      backgroundColor: '#29463D',
      alignItems:'center'
    },
    clima: {
      width: "90%",
      height: 200,
      borderRadius: "10%",
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      marginHorizontal: "5%",
      backgroundColor: 'rgb(130, 241, 204)'
    },
    logo: {
      width: 20, 
      resizeMode: 'contain'
    }, 
    titulo: {
      color: 'white',
      textAlign: 'center',
      fontSize: 20, 
      margin: 5
    }, 
    texto: {
      color: 'white',
      textAlign: 'center',
      fontSize: 12, 
      margin: 4, 
    },
    calendarContainer: {
      width: 180,
      height: 190,
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
      // width: '100%', 
      // height: '100%',  
      transform: [{ scale: 0.6 }]
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: "center",
      justifyContent: 'space-between',
      width: '100%',
      height: 50,
      marginBottom: 20,
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
        flex: 1, 
      },
      iconsFooter: {
        width: 30,
        height: 30,
      },
  })