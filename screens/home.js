import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import CustomMarker from '../components/CustomMarker'
import TopNavBar from '../components/TopNavBar'
import BottomNavbar from '../components/BottomNavBar'

export default function HomeScreen () {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  const [markers] = useState([
    {
      id: 1,
      latitude: 37.78825,
      longitude: -122.4324,
      name: 'Rudi',
      img: require('../assets/boy-3.png')
    },
    {
      id: 2,
      latitude: 37.786,
      longitude: -122.41,
      name: 'Sarah',
      img: require('../assets/girl-1.png')
    },
  ])

  const handleOnRegionChange = () => {
    setRegion(region)
  }

  return (
    <>
      <TopNavBar style={{ flex: 1 }} />
      <View style={{ flex: 4 }}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChange={handleOnRegionChange}
          loadingEnabled={true}>
           {
             markers.map((marker) => {
               return <CustomMarker
               key={marker.id}
               lat={marker.latitude}
               lng={marker.longitude}
               name={marker.name}
               img={marker.img} />
            })
           }
        </MapView>
      </View>
      {
      //<BottomNavbar style={{ flex: 1 }} />
      }
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
