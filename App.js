import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NewDeck from './components/NewDeck'
import DeckList from './components/DeckList'
import NewQuestion from './components/NewQuestion'
import IndividualDeck from './components/IndividualDeck'
import Quiz from './components/Quiz'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator  } from '@react-navigation/stack'
import { setLocalNotification } from './utils/helper'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeApp({ navigation })  {
  return (

        <Tab.Navigator screenOptions={{
         headerShown: false,
         tabBarIconStyle: { display: "none" }
         }}>
          <Tab.Screen name="New deck" component={DeckList} />
          <Tab.Screen name="deck list" component={NewDeck} />
        </Tab.Navigator>
  )
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <NavigationContainer screenOptions={{
          headerShown: false
          }}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeApp} />
          <Stack.Screen name="IndividualDeck" component={IndividualDeck} />
          <Stack.Screen name="NewQuestion" component={NewQuestion} />
          <Stack.Screen name="Quiz" component={Quiz} />
        </Stack.Navigator>
      </NavigationContainer>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
