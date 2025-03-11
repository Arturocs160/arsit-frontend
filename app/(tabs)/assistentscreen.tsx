import React, { useEffect } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";

import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function DeviceScreen() {
  const [mensaje, setMensaje] = useState<string>("");
  const [mensajes, setMensajes] = useState<
    {
      role: string;
      content: string;
    }[]
  >([]);

  const router = useRouter();

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleMensaje = (text: string) => {
    setMensaje(text);
  };

  async function handleSend() {
    if (mensaje.trim()) {
      let messages =
        mensajes.length > 0
          ? mensajes
          : [
              {
                role: "system",
                content:
                  "Responde basado únicamente en la conversación previa.",
              },
            ];

      messages = messages.map((mensaje) => ({
        ...mensaje,
        role: mensaje.role === "assistant" ? "system" : mensaje.role,
      }));

      const newMessages = [...messages, { role: "user", content: mensaje }];

      const data = { messages: newMessages };

      try {
        const result = await axios.post(
          `${process.env.EXPO_PUBLIC_BASE_URL}/chatbot/completion`,
          data
        );

        setMensajes([...newMessages, ...result.data.slice(2)]);
        setMensaje("");
      } catch (error) {
        console.error("Error al enviar el mensaje:", error);
        alert("Hubo un error al enviar el mensaje.");
      }
    } else {
      alert("Primero debes escribir un mensaje");
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.containergeneral} behavior="padding">
        <View style={styles.general}>
          <View style={styles.headerContainer}>
            <Header />
            <TouchableOpacity onPress={() => router.push("/(tabs)/panelscreen")}>
              <Ionicons
                name="arrow-back"
                size={30}
                color="#2D4B41"
                style={styles.backIcon}
              />
            </TouchableOpacity>
          </View>
  
          <View style={styles.textContainer}>
            <Text style={styles.text}>Soporte</Text>
          </View>
  
          {/* ScrollView con espacio al final para evitar superposiciones */}
          <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.notesContainer}>
              <ScrollView>
                {mensajes
                  .filter((item) => item.role !== "system")
                  .map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={
                          item.role === "user"
                            ? styles.notesContainerLeft
                            : styles.notesContainerRight
                        }
                      >
                        <Text style={styles.notesLabel}>{item.content}</Text>
                      </View>
                    );
                  })}
              </ScrollView>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </KeyboardAvoidingView>
  
      {/* Input fijo justo arriba del footer */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe"
          placeholderTextColor="#29463D"
          value={mensaje}
          onChangeText={handleMensaje}
        />
        <TouchableOpacity onPress={handleSend}>
          <Ionicons name="arrow-back" size={24} color="#29463D" />
        </TouchableOpacity>
      </View>
  
      {/* Footer fijo abajo */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push("/(tabs)/conectionscreen")}>
          <Image
            source={require("../../assets/images/icons/conexion_Mesa de trabajo 1.png")}
            style={styles.iconsFooter}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/icons/mas.png")}
            style={styles.iconsFooter}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(tabs)/assistentscreen")}>
          <Image
            source={require("../../assets/images/icons/asistencia.png")}
            style={styles.iconsFooter}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "flex-start",
    paddingTop: 28,
  },
  containergeneral: {
    width: "100%",
    flex: 1,
  },
  general: {
    flex: 1,
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    height: 50,
    marginBottom: 50,
    marginTop: 25,
    marginLeft: 20,
  },
  header: {
    padding: 8,
  },
  backIcon: {
    alignSelf: "flex-end",
    marginRight: 10,
    padding: 8,
  },
  welcome: {
    fontSize: 16,
    fontWeight: "500",
    color: "#29463D",
    marginTop: -8,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "poppins medium",
  },
  notesContainer: {
    padding: 12,
    margin: 10,
    alignItems: "baseline",
  },
  notesContainerLeft: {
    backgroundColor: "#CCCCCC",
    padding: 13,
    borderRadius: 15,
    width: "auto", 
    maxWidth: "90%", 
    marginBottom: 50,
    marginLeft: 40,
  },
  notesContainerRight: {
    backgroundColor: "#CCCCCC",
    padding: 13,
    borderRadius: 15,
    width: "auto", 
    maxWidth: "90%", 
    marginBottom: 50,
    marginRight: 65,
  },
  notesLabel: {
    color: "#29463D",
    fontWeight: "500",
    fontSize: 15,
  },
  notesText: {
    color: "#2D4B41",
    paddingTop: 5,
    fontWeight: "100",
    minHeight: 60,
    textAlignVertical: "top",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#CCCCCC",
    borderRadius: 20,
    paddingHorizontal: 10,
    width: "90%",
    alignSelf: "center",
    position: "absolute",
    bottom: 80, 
    left: "5%", 
    right: "5%", 
    zIndex: 10, 
  },  
  input: {
    flex: 1,
    backgroundColor: "#CCCCCC",
    padding: 17,
    borderRadius: 20,
    color: "#29463D",
    fontSize: 15,
    fontWeight: 500,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: 65,
    padding: 5,
    backgroundColor: "#FFFFFF",
  },
  iconsFooter: {
    width: 40,
    height: 40,
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  
});
