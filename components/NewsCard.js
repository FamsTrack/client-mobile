import React, { useState } from 'react'
import { StyleSheet, Text, ImageBackground } from 'react-native'
import globalStyles from '../components/GlobalStyles'
import TopNavBar from '../components/TopNavBar'
import BottomNavbar from '../components/BottomNavBar'
import { Card } from '@ui-kitten/components'


export default function NewsCard (props) {
  const CardImageHeader = () => (
    <ImageBackground 
      style={{ height: 128 }}
      source={{uri: props.img}}
    />
  )

  return (
    <>
      <Card style={{elevation: 5}} 
        header={CardImageHeader}>
        <Text 
          style={{fontWeight: 'bold'}}
          >{props.title}</Text>
        <Text 
          style={{fontWeight: '100'}}>{props.source}</Text>
      </Card>
    </>
  )
}
