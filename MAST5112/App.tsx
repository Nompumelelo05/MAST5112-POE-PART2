import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootTabs';
import { MenuProvider } from './src/context/MenuContext';

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </MenuProvider>
  );
}
