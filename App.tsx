import React, { Children } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, DayScreen, HabitsScreen, SignInScreen, SettingsScreen } from './screens';
import { TabBar } from './components'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'

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
      <SettingsStack.Screen name="Settings" component={SettingsScreen} options={{
        title: '',
        headerStyle: {
          backgroundColor: '#000'
        },
        headerTintColor: '#fff'
      }} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#8B5CF6',
        tabBarStyle: { backgroundColor: '#000' },
        tabBarShowLabel: false,
      }}>
        <Tab.Screen name="HomeStack" options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <AntDesignIcon name="home" color={color} size={size} />
          )
        }} component={HomeStackScreen} />
        <Tab.Screen name="SettingsStack" options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <AntDesignIcon name="setting" color={color} size={size} />
          )
        }} component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
