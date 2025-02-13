// import React from 'react';
// import { View, Text, StyleSheet, TextInput } from 'react-native';

// // Definir los parámetros del stack
// // type RootStackParamList = {
// //   PanelScreen: undefined;
// //   AddScreen: undefined;
// // };

// // // Tipos correctos para AddScreen
// // type AddScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "AddScreen">;
// // type AddScreenRouteProp = RouteProp<RootStackParamList, "AddScreen">;

// // interface Props {
// //   navigation: AddScreenNavigationProp;
// //   route: AddScreenRouteProp;


// const styles = StyleSheet.create({
//     header: {
//         marginTop: 30,
//         marginHorizontal:"5%"
//       },
//       contendor: {
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "space-around",
//         margin: 20
//       },
//       input: {
//         backgroundColor: 'rgb(183, 183, 183)',
//         borderRadius: 25,
//         width: '80%',
//         height: 50,
//         marginHorizontal:'10%',
//         marginTop: 12, 
//         paddingLeft: 15,
//         justifyContent:'center'
//       }
// });

// export default function AddScreen() {
//   return (
//     <View>
//        <View style={styles.header}>
//             {/* <Image style={styles.logo} source={require('./../../assets/images/logo-arsit.png')}/> */}
//             <Text>Bienvenido</Text>
//         </View>
//         <View style={styles.input}> 
//             <TextInput placeholder='Nombre'/>
//         </View>
//         <View style={styles.input}> 
//             <TextInput placeholder='Cultivo'/>
//         </View>
//     </View>
//   );
// }
