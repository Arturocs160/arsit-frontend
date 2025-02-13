import { Image, StyleSheet, Platform, View, Text} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffffa',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    logo: {
        width: 200,
        resizeMode: 'contain'
    }
})
export default function SplashScreen(){
   return (
    <View style={styles.container}> 
        <Image style={styles.logo} source={require('./../../assets/images/logo-arsit.png')}/>
        {/* <Text>ARSIT</Text> */}
    </View>
   )
}