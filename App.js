import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NewDeck from './components/NewDeck'
import DeckList from './components/DeckList'
import NewQuestion from './components/NewQuestion'
import IndividualDeck from './components/IndividualDeck'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator  } from '@react-navigation/stack'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeApp({ navigation })  {
  return (

        <Tab.Navigator>
          <Tab.Screen name="New deck" component={DeckList} />
          <Tab.Screen name="deck list" component={NewDeck} />
        </Tab.Navigator>

    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text>Details Screen</Text>
    //   <TouchableOpacity
    //     title="Go to Details... again"
    //     onPress={() => navigation.navigate('Details')}
    //   ><Text>Henaaaaaaaa 2</Text></TouchableOpacity>
    // </View> 
  )
}

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeApp} />
          <Stack.Screen name="IndividualDeck" component={IndividualDeck} />
          <Stack.Screen name="NewQuestion" component={NewQuestion} />
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

      // <View style={styles.container}>
      //   <NewDeck />
      // </View>