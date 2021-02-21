import React from 'react';
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components'
import HomeScreen from '../screens/home'
import NewsScreen from '../screens/news'
import ScheduleScreen from '../screens/schedule'
import MembersScreen from '../screens/members'

const { Navigator, Screen } = createBottomTabNavigator()

const HomeIcon = (props) => (
  <Icon {...props} name='home'/>
)

const NewsIcon = (props) => (
  <Icon {...props} name='book-open'/>
)

const ScheduleIcon = (props) => (
  <Icon {...props} name='calendar'/>
)

const MembersIcon = (props) => (
  <Icon {...props} name='people'/>
)

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    style={styles.bottomNavigation}
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab 
      title='HOME' 
      icon={HomeIcon}/>
    <BottomNavigationTab 
      title='NEWS' 
      icon={NewsIcon}
      />
    <BottomNavigationTab 
      title='SCHEDULE' 
      icon={ScheduleIcon}/>
    <BottomNavigationTab 
      title='MEMBERS' 
      icon={MembersIcon}/>
  </BottomNavigation>
)

export const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Home' component={HomeScreen}/>
    <Screen name='News' component={NewsScreen}/>
    <Screen name='Schedule' component={ScheduleScreen}/>
    <Screen name='Members' component={MembersScreen}/>
  </Navigator>
)

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
})
