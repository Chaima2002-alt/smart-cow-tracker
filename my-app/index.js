import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { registerRootComponent } from "expo";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import des écrans
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import ChooseRoleScreen from "./ChooseRoleScreen";
import AdminLoginScreen from "./AdminLoginScreen";
import UserLoginScreen from "./UserLoginScreen";
import AdminDashboardScreen from "./AdminDashboardScreen";
import FarmerListScreen from "./FarmerListScreen";
import AddFarmerScreen from "./AddFarmerScreen";
import ManageBeltsScreen from "./ManageBeltsScreen";
import SettingsScreen from "./SettingsScreen";
import FarmerDetails from "./farmer-details";
import EditFarmerScreen from "./edit-farmer.js";
import { getFarmerById } from "./farmer-data";
const Stack = createStackNavigator();

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        " Chivo-Italic-VariableFont_wght": require("./assets/fonts/Chivo-Italic-VariableFont_wght.ttf"),
        " Chivo-VariableFont_wght": require("./assets/fonts/Chivo-VariableFont_wght.ttf"),
        "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
        "MPLUSRounded1c-Regular": require("./assets/fonts/MPLUSRounded1c-Regular.ttf"),
        "MPLUSRounded1c-Bold": require("./assets/fonts/MPLUSRounded1c-Bold.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChooseRole"
          component={ChooseRoleScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminLogin"
          component={AdminLoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserLogin"
          component={UserLoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        <Stack.Screen name="FarmerList" component={FarmerListScreen} />
        <Stack.Screen name="AddFarmer" component={AddFarmerScreen} />
        <Stack.Screen name="ManageBelts" component={ManageBeltsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="FarmerDetails" component={FarmerDetails} />
        <Stack.Screen name="EditFarmer" component={EditFarmerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
export default App;
