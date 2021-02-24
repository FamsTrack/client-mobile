import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { BottomNavigation, BottomNavigationTab, Icon, useStyleSheet, StyleService } from '@ui-kitten/components'
import HomeScreen from '../screens/home'
import NewsScreen from '../screens/news'
import ScheduleScreen from '../screens/schedule'
import MembersScreen from '../screens/members'
import HistoryScreen from '../screens/history'

const { Navigator, Screen } = createBottomTabNavigator()

const HomeIcon = (props) => (
  <Icon {...props}
    name='home' />
)

const NewsIcon = (props) => (
  <Icon {...props}
    name='book-open'
  />

)

const ScheduleIcon = (props) => (
  <Icon {...props}
    name='calendar'
  />
)

const MembersIcon = (props) => (
  <Icon {...props}
    name='people'
  />
)

const BottomTabBar = ({ navigation, state }) => {

  const styles = useStyleSheet(themedStyles)
  return (

    < BottomNavigation
      style={styles.bottomNavigation}
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab
        title='HOME'
        icon={HomeIcon} />
      <BottomNavigationTab
        title='NEWS'
        icon={NewsIcon}
      />
      <BottomNavigationTab
        title='SCHEDULE'
        icon={ScheduleIcon} />
      <BottomNavigationTab
        title='MEMBERS'
        icon={MembersIcon} />
    </BottomNavigation >
  )
}

const MembersStack = createStackNavigator()
function MembersStackScreen () {
  return (
    <MembersStack.Navigator>
      <MembersStack.Screen
        name='Members'
        component={MembersScreen}
        options={{
          headerTitle: 'Members',
          headerLeft: () => {
            return null
          },
        }}
      />
      <MembersStack.Screen
        name='History'
        component={HistoryScreen}
      />
    </MembersStack.Navigator>
  )
}



export const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Home' component={HomeScreen} />
    <Screen name='News' component={NewsScreen} />
    <Screen name='Schedule' component={ScheduleScreen} />
    <Screen name='Members' component={MembersStackScreen} />
  </Navigator>
)

const themedStyles = StyleService.create({
  bottomNavigation: {
    marginVertical: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
})
