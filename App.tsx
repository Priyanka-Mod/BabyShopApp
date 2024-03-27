// import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigation from './src/navigation/AppNavigation';
import AuthNavigation from './src/navigation/AuthNavigation';
import Auth from './src/components/Auth';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import { MenuProvider } from 'react-native-popup-menu';
import SplashScreen from 'react-native-splash-screen'
import { AuthProvider } from './src/services/useContextService';
// import { getMessaging } from 'firebase/messaging';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  const deviceToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    // console.log('tokenDevice:', token);
    await AsyncStorage.setItem('deviceToken', token);
  };
  useEffect(() => {
    deviceToken()
  }, [])
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // console.log("Remote Message : ", remoteMessage);

      onDisplayNotification(remoteMessage)
      //   // backgroundNofication(remoteMessage)

      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);


  // useEffect(() => {
  //   const backgroundNofication = messaging().setBackgroundMessageHandler(
  //     async remoteMessage => {
  //       Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     }
  //   )
  //   return backgroundNofication
  // }, [])


  const onDisplayNotification = async (message: any) => {
    // console.log("message : ", message);

    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'abc',
      name: 'aaa Channel',
      importance: AndroidImportance.HIGH
    });

    // Display a notification
    await notifee.displayNotification({
      title: message.notification.title,
      body: message.notification.body,
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
      },
    });


  }


  return (
    <AuthProvider>
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown: false
          }}
            initialRouteName='Auth'>
            <Stack.Screen name="Auth" component={Auth} />
            {/* <Stack.Screen name='DrawerStack' component={DrawerNavigation}/> */}
            <Stack.Screen name='AuthStack' component={AuthNavigation} />

            <Stack.Screen name='AppStack' component={AppNavigation} />

          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </AuthProvider>
  );
};

export default App;
