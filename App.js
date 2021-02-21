import React, { useState } from 'react'
// react-navigation libraries
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// ui kitten and eva libs
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry, Icon } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { default as theme } from './theme.json'
import LoginScreen from './screens/login'
import getHeaderTitle from './helpers/headerTitle'
import { TabNavigator } from './components/BottomNavBar'

function HomeTabs () {
  return (
    <TabNavigator />
  )
}

const Stack = createStackNavigator()

export default function App () {
  const [isSignedIn, setIsSignedIn] = useState(false)

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <NavigationContainer>
          <Stack.Navigator>
            {
              isSignedIn ? (
                <>
                  <Stack.Screen name="Home" component={HomeTabs} />
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
  })}/>
                </>
              )
            }
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  )
}
