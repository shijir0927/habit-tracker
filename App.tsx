import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, DayScreen, HabitsScreen, SignInScreen } from './screens';

const HomeStack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <HomeStack.Navigator initialRouteName='Home'>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
          title: '',
          headerStyle: {
            backgroundColor: '#000'
          },
          headerTintColor: '#fff'
        }} />
        <HomeStack.Screen name="Habits" component={HabitsScreen} options={{
          title: '',
          headerStyle: {
            backgroundColor: '#000'
          },
          headerTintColor: '#fff'
        }} />
        <HomeStack.Screen name="Day" component={DayScreen} options={{
          title: '',
          headerStyle: {
            backgroundColor: '#000'
          },
          headerTintColor: '#fff'
        }} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
