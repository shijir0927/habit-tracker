import React, { Children } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, DayScreen, HabitsScreen, SignInScreen, SettingsScreen } from './screens';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName='Home'>
      <HomeStack.Screen name="SignIn" component={SignInScreen} options={{
        title: '',
        headerStyle: {
          backgroundColor: '#000'
        },
        headerTintColor: '#fff'
      }} />
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
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator initialRouteName='Settings'>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="HomeStack" component={HomeStackScreen} />
        <Tab.Screen name="SettingsStack" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
