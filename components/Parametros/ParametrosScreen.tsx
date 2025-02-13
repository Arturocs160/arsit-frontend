import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
    header: {
        marginTop: 30,
        marginHorizontal:"5%"
      },
      contendor: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 20
      },
      titulo: {
        alignItems: 'center',
        color: '29463D',
        fontSize: 20
      }, 
      texto: {
        alignItems: 'center',
        color: '29463D',
        fontSize: 20, 
        marginHorizontal: '15%', 
        marginTop: 10
      },
      calendar: {
        width: '80%',
        height: 150,
        backgroundColor: 'rgb(229, 223, 223)',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
        borderRadius:20,
        marginHorizontal: "10%",
        marginTop: 15,
        
      }, 
})

export default function ParametrosScreen(){
    return(
        <View > 
            <View style={styles.header}>
                        {/* <Image style={styles.logo} source={require('./../../assets/images/logo-arsit.png')}/> */}
                <Text>Bienvenido</Text>
            </View>
            <View> 

            </View>
            <View style={styles.titulo}> 
                <Text>Invernadero</Text>
            </View>
            <View style={styles.texto}> 
                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse excepturi provident aspernatur expedita quae obcaecati laudantium molestias culpa eveniet, modi exercitationem laboriosam adipisci et explicabo minima dolorem consectetur beatae quos!</Text>
            </View>
            <View style={styles.calendar}>
                <Text>Calendario</Text>
            </View>
        </View>
    )
}