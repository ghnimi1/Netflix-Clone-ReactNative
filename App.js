import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Home from './src/screens/Home';
import { createStackNavigator } from '@react-navigation/stack';
import { DarkTheme, DefaultTheme, NavigationContainer, useTheme } from '@react-navigation/native';
import DetailsFilm from './src/screens/DetailsFilm';
import { createStore } from 'redux'
import { Provider, useDispatch, useSelector } from 'react-redux'
import themeReducer from './src/reducer/ThemeReducer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { changeTheme } from './src/actions';
import CastDetails from './src/screens/CastDetails';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element'

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    HeaderColor: '#404040',
    TextColor: 'white',
    TabIcon: 'white',
    TextDes: '#ABB4BD'
  }
}
const customDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    HeaderColor: 'white',
    TextColor: 'black',
    TabIcon: 'red',
    TextDes: 'black'
  }
}

const Stack = createSharedElementStackNavigator()
const store = createStore(themeReducer)

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}

export function Navigation() {
  const currentTheme = useSelector(state => state)
  const dispatch = useDispatch()
  const { colors } = useTheme()
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer theme={currentTheme ? customDarkTheme : customDefaultTheme}>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => dispatch(changeTheme(currentTheme))}>
              <MaterialCommunityIcons
                name="theme-light-dark" size={30}
                color='white' />
            </TouchableOpacity>

          )
        }} >
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Details' component={DetailsFilm} 
           sharedElementsConfig={(route, otherRoute, showing) => {
          const { item } = route.params;
          if (route.name === "Details" && showing) {
            // Open animation fades in image, title and description
            return [
              {
                id: `item.${item.id}.image`,
                 animation: "fade",
              },
               {
                id: `item.${item.id}.title`,
                animation: "fade",
                resize: "clip",
                align: "left-top",
              },
              {
                id: `item.${item.id}.description`,
                animation: "fade",
                resize: "clip",
                align: "left-top",
              },
              
            ];
          } else {
            // Close animation only fades out image
            return [
              {
                id: `item.${item.id}.image`,
                animation:'fade'
              },
            ];
          }
        }}/>
          <Stack.Screen name='DetailsCast' component={CastDetails} 
           sharedElementsConfig={(route, otherRoute, showing) => {
          const { item } = route.params;
          if (route.name === "DetailsCast" && showing) {
            // Open animation fades in image, title and description
            return [
              {
                id: `item.${item.id}.image`,
                 animation: "fade",
              },
            ];
          } else {
            // Close animation only fades out image
            return [
              {
                id: `item.${item.id}.image`,
                animation:'fade'
              },
            ];
          }
        }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

