import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Avatar } from '@ui-kitten/components'
import MapView, { Marker } from 'react-native-maps'

export default function CustomMarker (props) {

  return (
    <Marker 
      coordinate={{latitude: props.lat, longitude: props.lng}}>
      <View style={{ width: 50, height: 50 }}>
        <Avatar
          style={styles.logo}
          source={props.img}
        />
      </View>
    </Marker>
  )
}

const styles = StyleSheet.create({
  logo: {
    borderWidth: 4,
    borderColor: '#01BAFD',
    ...Platform.select({
       android: {
         borderWidth: 4
       },
    }),
  }
})
