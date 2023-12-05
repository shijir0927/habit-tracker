import React, { Children } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, DayScreen, HabitsScreen } from './screens';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          title: '',
          headerStyle: {
            backgroundColor: '#000'
          },
          headerTintColor: '#fff'
        }} />
        <Stack.Screen name="Habits" component={HabitsScreen} options={{
          title: '',
          headerStyle: {
            backgroundColor: '#000'
          },
          headerTintColor: '#fff'
        }} />
        <Stack.Screen name="Day" component={DayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
