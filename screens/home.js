import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { Spinner } from '@ui-kitten/components'
import CustomMarker from '../components/CustomMarker'
import TopNavBar from '../components/TopNavBar'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAFamily } from '../stores/actions/family'

export default function HomeScreen () {
  const dispatch = useDispatch()
  const { family, clients, loading, error } = useSelector((state) => state.family)

  useEffect(() => {
    dispatch(fetchAFamily())
    if (clients[clients.length - 1] && clients[clients.length - 1].device) {
      setRegion({
        ...region,
        latitude: clients[0].device.latitude,
        longitude: clients[0].device.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      })
      setMarkers(clients)
    }
  }, [])

  useEffect(() => {

  }, [clients])

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  const [markers, setMarkers] = useState([])

  const handleOnRegionChange = () => {
    setRegion(region)
  }

  if (loading) return (
    <View style={styles.spinnerContainer}>
      <Spinner
        size="large"
        style={styles.spinnerStyle} />
    </View>
  )

  return (
    <>
      <TopNavBar style={{ flex: 1 }} />
      <View style={{ flex: 4 }}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          region={region}
          onRegionChange={handleOnRegionChange}
          loadingEnabled={true}>
          {
            markers.map((marker) => {
              return <CustomMarker
                key={marker.id}
                lat={marker.device.latitude}
                lng={marker.device.longitude}
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
  spinnerContainer: {
    marginTop: 240,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinnerStyle: {
    alignSelf: 'center'
  }
})
