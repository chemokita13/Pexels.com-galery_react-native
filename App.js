import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import ImageScr from "./screens/ImageScr";
import HomeScr from "./screens/HomeScr";

const stk = createNativeStackNavigator()

export default function App() {

  const [search, setsearch] = useState(false)

  return (
    <NavigationContainer>
      <stk.Navigator>
        <stk.Screen
          name='home'
          options={{
            headerLeft: () => <Image source={{ uri: "https://images.pexels.com/lib/api/pexels.png" }} style={styles.img} />,
            title: 'Galery',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            headerStyle: {
              backgroundColor: '#0d0d0d'
            },
            headerRight: () => (<Text style={{ color: "#858585", fontSize: 18 }} onPress={() => setsearch(!search)}>
              {search ? 'Close' : "Search"}
            </Text>),
          }}
        >
          {(props) => <HomeScr {...props} search={search} />}
        </stk.Screen>
        <stk.Screen 
        name='img'
         component={ImageScr}
         options={{
          title: 'Galery',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerStyle: {
            backgroundColor: '#0d0d0d'
          }
        }}
         />
      </stk.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 37,
    height: 37,
    marginEnd: 5,
    borderRadius: 5
  }
})
