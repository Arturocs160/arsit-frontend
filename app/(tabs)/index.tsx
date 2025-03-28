import { Image, StyleSheet, Platform, View } from 'react-native';
// import SplashScreen from '@/components/Splashscreen/SplashScreen';
// import PanelScreen from '@/components/PanelScreen/PanelScreen'
import { useEffect, useState } from 'react';
import SplashScreen from './splashscreen';
import PanelScreen from './panelscreen';
import ConectionScreen from './conectionscreen'

export default function HomeScreen() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    setTimeout(()=> {setShowSplash(false);}, 5000); 
  })

  return <>{showSplash ? <SplashScreen /> : <ConectionScreen />}</>
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
  },
);
