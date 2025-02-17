import React from "react";
import { Image, StyleSheet, Platform, View, Text, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Calendar , LocaleConfig} from "react-native-calendars";
import { useState } from "react";
import PieChart from "react-native-pie-chart";

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
  logo: {
    width: 200,
    resizeMode: 'contain'
  },
  iconsFooter: {
    width: 40,
    height: 40,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 5,
    padding: 5,
    height: 65
  },
  indicador: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tituloContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
    marginVertical: 10
  },
  titulo: {
    fontSize: 20,
  },
  notasContainer: {
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: '10%',
    marginVertical: 20
  },
  calendarContainer: {
    width: '100%',
    height: 260,
    // backgroundColor: 'rgb(229, 223, 223)',
    // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
    borderRadius: 20,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar: {
    //   flex: 1, 
    width: '100%',
    //   height: 'auto',
    transform: [{ scale: 0.8 }]
  },
})


const Data = [
  {value: 40, color : '#FFAB0F'},
  {value: 45, color : '#247AFD'},
  {value: 15, color : '#FE46A5'},
]
export default function ParametrosScreen(){
    const [selected, setSelected] = useState('');
    
    const router = useRouter();
   return (
    <View style={styles.container}> 
    <View style={styles.general}>
    <View style={styles.headerContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.push('/(tabs)/panelscreen')}>
                <Image
                  style={[{ width: 90, height: 50 }]}
                  source={require("./../../assets/images/logoarsit.png")}
                />
                <Text
                  style={styles.welcome}
                >Bienvenido</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => router.push('/(tabs)/panelscreen')}>
              <Ionicons name="arrow-back" size={30} color="#2D4B41" style={styles.backIcon} />
            </TouchableOpacity>
          </View>
        <View style={styles.indicador}> 
        <PieChart
			        series = {Data}
              widthAndHeight={150}
              style={{justifyContent: 'center'}}
			        // radius = {100}
			        // innerRadius = {80}
			        // dividerSize = {1}
			        // backgroundColor = {}
			      />
        </View>
        <View style={styles.tituloContainer}> 
            <Text style={styles.titulo}>Invernadero1 </Text>
            <Ionicons name="pencil" size={20} color="#29463D" />
        </View>
        <View style={styles.tituloContainer}> 
            <Text style={styles.titulo}>Cultivo1 </Text>
            <Ionicons name="pencil" size={20} color="#29463D" />
        </View>
        <View style={styles.notasContainer}>
            <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa unde odio odit quaerat delectus maxime repellat eaque obcaecati consequuntur quibusdam corrupti aliquam reiciendis voluptatum excepturi, pariatur amet reprehenderit molestiae placeat.</Text>
        </View>        
        
        
        <TouchableOpacity onPress={() => router.push('/(tabs)/calendarscreen')}>{/**/}
        <View style={styles.calendarContainer}> 
          <View style={styles.calendar}>
             <Calendar onDayPress={(day: { dateString: React.SetStateAction<string>; }) => {
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
                  hideExtraDays={true}/> 
          </View>
        </View> 
      </TouchableOpacity>
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
