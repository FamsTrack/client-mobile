import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { Spinner } from '@ui-kitten/components'
import CustomMarker from '../components/CustomMarker'
import TopNavBar from '../components/TopNavBar'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAFamily } from '../stores/actions/family'
import store from '../stores/'

const takeValues = (arrayOfObjects, key) => {
  const permittedValues = []
  for (let i = 0; i < arrayOfObjects.length; i++) {
    permittedValues[i] = arrayOfObjects[i].key
  }
  return permittedValues
}

const centerPoint = (array) => {
  let sum = 0
  for (let i = 0; i < array.length; i++) {
    sum += parseInt(array[i], 10) //don't forget to add the base
  }
  avg = sum / elmt.length
  return avg
}

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
      })
      setMarkers(clients)
    }
    //console.log('>>>> store: ', store.getState())
  }, [])

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  const [markers, setMarkers] = useState([])

  const [response, setResponse] = useState('')

  // utk mockup desain
  //const [markers] = useState([
  //{ 
  //id: 1,
  //latitude: 37.78825,
  //longitude: -122.4324,
  //name: 'Kenji',
  //img: 'https://uifaces.co//our-content//donated//gPZwCbdS.jpg'
  //},
  //{
  //id: 2,
  //latitude: 37.786,
  //longitude: -122.41,
  //name: 'Samara',
  //img: 'https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
  //},
  //{
  //id: 3,
  //latitude: 37.7900,
  //longitude: -122.41,
  //name: 'Kanya',
  //img: 'https://uifaces.co//our-content//donated//93aChDW6.jpg'
  //},
  //{
  //id: 4,
  //latitude: 37.78825,
  //longitude: -122.440,
  //name: 'Sandra',
  //img: 'https://uifaces.co/our-content/donated/hRomGWuB.jpg'
  //},
  //])

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
