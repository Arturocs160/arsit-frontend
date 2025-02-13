import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import PanelScreen from "../components/PanelScreen/PanelScreen";
import AddScreen from "../components/AddScreen/AddScreen";

// Definir los tipos del stack
// type RootStackParamList = {
//   PanelScreen: undefined;
//   AddScreen: undefined;
// };

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PanelScreen" component={PanelScreen} />
        <Stack.Screen name="AddScreen" component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
