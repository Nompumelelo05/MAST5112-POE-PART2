import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import AddItemScreen from '../screens/AddItemScreen';
import MenuListScreen from '../screens/MenuListScreen';

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { 
          backgroundColor: '#EAF2FF', // fond doux bleu clair
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
        },
        headerTintColor: '#0A1F44', // bleu foncé
        headerTitleStyle: { 
          fontWeight: '800',
          fontSize: 18,
        },
        tabBarActiveTintColor: '#1E90FF', // bleu principal
        tabBarInactiveTintColor: '#B0C4DE', // bleu clair désactivé
        tabBarStyle: {
          paddingBottom: 10,
          paddingTop: 5,
          height: 80,
          backgroundColor: '#0A1F44', // bleu très foncé
          borderTopWidth: 2,
          borderTopColor: '#1E90FF', // bordure bleu brillant
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="AddMenu" 
        component={AddItemScreen} 
        options={{ 
          tabBarLabel: 'Create',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="My Menu" 
        component={MenuListScreen} 
        options={{ 
          tabBarLabel: 'My Menu',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}
