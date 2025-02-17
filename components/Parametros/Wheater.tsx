import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const API_KEY = '3ce24defef78f6b9e50b9c9756fe7908';

type WeatherData = {
  weather: { description: string; icon: string }[];
  main: { temp: number };
};

export default function Weather() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async () => {
    setLoading(true);

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permiso de ubicación denegado');
      setLoading(false);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      const data: WeatherData = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        alert(`Error: ${data}`);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (!weather) return <Text>Error al cargar datos</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
      <Image
            style={styles.largeIcon}
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`,
            }}
          />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    flexDirection: 'row'
  },
  temp: { 
    fontSize: 40, 
    fontWeight: 'bold' 
  },
  icon: { 
    width: 100, 
    height: 100 
  },
 
  largeIcon: {
        width: 250,
        height: 200,
      },
});




// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, RefreshControl, Image } from 'react-native';
// import * as Location from 'expo-location';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { ActivityIndicator } from 'react-native-paper';

// const openWeatherKey = '3ce24defef78f6b9e50b9c9756fe7908';
// let url = `https://api.openweathermap.org/data/2.5/onecall?units=metric&exclude=minutely&appid=${openWeatherKey}`;

// interface WeatherData {
//     current?: {
//       temp: number;  
//       weather: { icon: string }[];
//     };
// }

// const styles = StyleSheet.create({
//   current: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     alignContent: 'center',
//   },
//   largeIcon: {
//     width: 300,
//     height: 250,
//   },
// });

// export default function Weather() {
//     const [forecast, setForecast] = useState<WeatherData | null>(null);
//     const [refreshing, setRefreshing] = useState(false);

//   const loadForecast = async () => {
//     setRefreshing(true);

//     const { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Permiso denegado');
//       console.log("Permiso denegado");
//       setRefreshing(false);  // ✅ Evita que la app quede cargando
//       return;
//     }

//     let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });

//     if (!location.coords.latitude || !location.coords.longitude) {
//       alert('No se pudo obtener la ubicación');
//       setRefreshing(false);
//       return;
//     }

//     const response = await fetch(`${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
//     const data = await response.json();
//     console.log(data);

//     if (!response.ok) {
//       alert('Error al obtener datos');
//     } else {
//       setForecast(data);
//     }
//     setRefreshing(false);
//   };

//   useEffect(() => {
//     loadForecast();
//   }, []);

//   if (!forecast || !forecast.current) {
//     return (
//       <SafeAreaView>
//         <ActivityIndicator size={'large'} />
//         <Text>Cargando datos...</Text>
//       </SafeAreaView>
//     );
//   }

//   const current = forecast.current.weather[0];

//   return (
//     <View>
//       <ScrollView
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={loadForecast} />
//         }
//       >
//         <View style={styles.current}>
//           <Image
//             style={styles.largeIcon}
//             source={{
//               uri: `https://openweathermap.org/img/wn/${current.icon}@4x.png`,
//             }}
//           />
//           <Text>
//             {Math.round(forecast.current.temp)}°C
//           </Text>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }
