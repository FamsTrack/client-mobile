import React, { useState, useEffect } from 'react'
import { StyleSheet, View, StatusBar, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { Spinner } from '@ui-kitten/components'
import CustomMarker from '../components/CustomMarker'
import TopNavBar from '../components/TopNavBar'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAFamily, updateLocation, fetchClients } from '../stores/actions/family'

// for socket.io client
import { io } from 'socket.io-client'
const ENDPOINT = 'https://famstrack.herokuapp.com'


export default function HomeScreen () {
  // socket.io related
  const socket = io(ENDPOINT, { transports: ["websocket"], jsonp: false })
  const [response, setResponse] = useState('')

  const dispatch = useDispatch()
  const { family, clients, loading, error } = useSelector((state) => state.family)
  const { user, role } = useSelector((state) => state.user)

  useEffect(() => {
    if (role === 'family') {
      dispatch(fetchAFamily())
      if (clients[clients.length - 1] && clients[clients.length - 1].device) {
        setRegion({
          ...region,
          latitude: clients[0].device.latitude,
          longitude: clients[0].device.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        })
      }
      setMarkers(clients)
    }
    else {
      dispatch(fetchClients())
      //console.log('>>>> ini semua clients:', clients)
      if (clients[clients.length - 1] && clients[clients.length - 1].device) {
        console.log('>>>> masuk siniiii')
        setRegion({
          ...region,
          latitude: clients[0].device.latitude,
          longitude: clients[0].device.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        })
      }
      setMarkers(clients)
    }
  }, [])

  useEffect(() => {
    socket.on("data:device", data => {
      setResponse(data)
      dispatch(updateLocation(data))

    })
    // CLEAN UP THE EFFECT
    return () => socket.disconnect()
  }, [])

  useEffect(() => {
    if (clients[clients.length - 1] && clients[clients.length - 1].device) {
      console.log('<<< masuk sini lhoo')
      setMarkers(clients)
      setRegion({
        ...region,
        latitude: clients[0].device.latitude,
        longitude: clients[0].device.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      })
    }

  }, [clients])

  const [region, setRegion] = useState({
    latitude: 21.418972,
    longitude: 39.829298,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  const [initialRegion, setInitialRegion] = useState({
    latitude: 21.418972,
    longitude: 39.829298,
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
      <StatusBar hidden />
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
