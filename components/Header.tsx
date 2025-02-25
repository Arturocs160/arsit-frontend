import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";


export default function Header() {

  const router = useRouter();


  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.push("/(tabs)/panelscreen")}>
        <Image
          style={[{ width: 90, height: 50 }]}
          source={require("@/assets/images/logoarsit.png")}
        />
        <Text style={styles.welcome}>Bienvenido</Text>
      </TouchableOpacity>
    </View>
  );


  
}

const styles = StyleSheet.create({
  header: {
    padding: 8,
  },
  welcome: {
    fontSize: 16,
    fontWeight: "500",
    color: "#29463D",
    marginTop: -8,
  },
});
