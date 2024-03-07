// import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppNavigation from './src/navigation/AppNavigation';
import AuthNavigation from './src/navigation/AuthNavigation';
import Auth from './src/components/Auth';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import { MenuProvider } from 'react-native-popup-menu';
import SplashScreen from 'react-native-splash-screen'
import { AuthProvider } from './src/services/useContextService';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
    <MenuProvider>
    <NavigationContainer>
        <Stack.Navigator  screenOptions={{
            headerShown:false
        }}
        initialRouteName='Auth'>
          <Stack.Screen name="Auth" component={Auth}/>
          {/* <Stack.Screen name='DrawerStack' component={DrawerNavigation}/> */}
          <Stack.Screen name='AuthStack' component={AuthNavigation}/>
          
          <Stack.Screen name='AppStack' component={AppNavigation}/>
          
        </Stack.Navigator>
    </NavigationContainer>
    </MenuProvider>
    </AuthProvider>
  );
};

export default App;
