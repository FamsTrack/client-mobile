import React, { useState, useEffect, useRef } from 'react'
import { Text, View } from 'react-native'
// expo notification
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import { storeToken } from './stores/actions/user'
// react-navigation libraries
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// ui kitten and eva libs
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { default as theme } from './theme.json'
//import { default as mapping } from './mapping.json'
// react native elements
import { SafeAreaProvider } from 'react-native-safe-area-context'

// react redux
import { Provider } from 'react-redux'
import store from './stores/'

// components and helpers
import LoginScreen from './screens/login'
import EditProfile from './screens/editProfile'
import getHeaderTitle from './helpers/headerTitle'
import { TabNavigator } from './components/BottomNavBar'

// for socket.io client
import io from 'socket.io-client'
window.navigator.userAgent = "react-native"
const ENDPOINT = 'http://192.168.1.7/:3000'


function HomeTabs () {
  return (
    <TabNavigator />
  )
}

const Stack = createStackNavigator()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export default function App () {
  const [isSignedIn] = useState(false)
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    if (expoPushToken) {
      store.dispatch(storeToken(expoPushToken))
    }
  }, [expoPushToken])

  // register for push notification
  const registerForPushNotificationsAsync = async () => {
    try {
      let token
      if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync()
          finalStatus = status
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!')
          return
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data
        console.log('>>>> ini tokennya: ', token)
        setExpoPushToken(token)
      } else {
        alert('Must use physical device for Push Notifications')
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        })
      }

      return token
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token))

    // when we receive the push notification
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification)
    })

    // when we clicked on it
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('>>>> ini response-nya', response)
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener)
      Notifications.removeNotificationSubscription(responseListener)
    }
  }, [])

  useEffect(() => {
    const socket = io(ENDPOINT)
    socket.on('data:test', data => {
      setResponse(data)
      console.log('>>>>', data)
    })
    //const socket = io('http://localhost:3000', {
    //transports: ['websocket'], jsonp: false
    //});
    //socket.connect();
    //socket.on('connect', () => {
    //console.log('connected to socket server');
    //});

    //var socket = new SocketIO('localhost:3000');
    //socket.on('connect', () => {
    //console.log('Wahey -> connected!');
    //});

    //const socket = io(ENDPOINT, { transports: ['websocket'], forceNew: true });
    //socket.on('connected', () => {
    //debugger;
    //})

    //// Clean up the effect
    return () => socket.disconnect()
  }, [])

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <SafeAreaProvider>
        <ApplicationProvider
          {...eva}
          theme={{ ...eva.light, ...theme }}
        //customMapping={mapping}
        >
          <Provider store={store}>
            <NavigationContainer>
              <Stack.Navigator>
                {
                  isSignedIn ? (
                    <>
                      <Stack.Screen name="Home" component={HomeTabs} />
                      <Stack.Screen name="EditProfile" component={EditProfile} />
                    </>
                  ) : (
                      <>
                        <Stack.Screen
                          name="Login"
                          component={LoginScreen} />
                        <Stack.Screen
                          name="Home"
                          component={HomeTabs}
                          options={({ route }) => ({
                            headerTitle: getHeaderTitle(route),
                          })} />
                      </>
                    )
                }
              </Stack.Navigator>
            </NavigationContainer>
            {
              // buat testing push notification
              //<View
              //style={{
              //flex: 1,
              //alignItems: 'center',
              //justifyContent: 'space-around',
              //}}>
              //<Text>Your expo push token: {expoPushToken}</Text>
              //<View style={{ alignItems: 'center', justifyContent: 'center' }}>
              //<Text>Title: {notification && notification.request.content.title} </Text>
              //<Text>Body: {notification && notification.request.content.body}</Text>
              //<Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
              //</View>
              //</View>
            }
          </Provider>
        </ApplicationProvider>
      </SafeAreaProvider>
    </>
  )
}
