import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import CustomMarker from '../components/CustomMarker'
import TopNavBar from '../components/TopNavBar'

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
      name: 'Kenji',
      img: 'https://uifaces.co//our-content//donated//gPZwCbdS.jpg'
    },
    {
      id: 2,
      latitude: 37.786,
      longitude: -122.41,
      name: 'Samara',
      img: 'https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
    },
    {
      id: 3,
      latitude: 37.7900,
      longitude: -122.41,
      name: 'Kanya',
      img: 'https://uifaces.co//our-content//donated//93aChDW6.jpg'
    },
    {
      id: 4,
      latitude: 37.78825,
      longitude: -122.440,
      name: 'Sandra',
      img: 'https://uifaces.co/our-content/donated/hRomGWuB.jpg'
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
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
