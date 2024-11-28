import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StatusBar, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./src/screens/Login";
import Registrasi from "./src/screens/Registrasi";
import Home from "./src/screens/Home";
import User from "./src/screens/User";
import { API } from "./src/API/api";
import Belajar from "./src/screens/Belajar";
import { Plane, Wave } from 'react-native-animated-spinkit';
import Search from "./src/screens/Search";
import HomeUser from "./src/screens/HomeUser";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={{ marginTop: "45%" }}>
          <Image source={require("./src/img/logo.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
        <View style={{ marginTop: "70%" }}>
          <Text style={{ color: "#3880ff", fontSize: 30, fontWeight: 'bold' }}>B00K$</Text>
        </View>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "HomeUser"}>
        <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
        <Stack.Screen name="User" component={User} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Registrasi" component={Registrasi} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Belajar" component={Belajar} options={{ headerShown: false }} />
        <Stack.Screen name="HomeUser" component={HomeUser} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
