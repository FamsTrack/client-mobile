import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import TopNavBar from '../components/TopNavBar'
import BottomNavbar from '../components/BottomNavBar'

export default function MembersScreen ({navigation}) {
  return ( 
    <>
      <Text>ini halaman members</Text>
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    margin: 2,
  },
  loginButton: {
    marginTop: 120,
    alignSelf: 'stretch'
  },
  tinyLogo: {
    width: 300,
    height: 300,
  }
})


