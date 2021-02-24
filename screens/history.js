import React, { useState, useEffect } from 'react'
import { Spinner } from '@ui-kitten/components'
import { Card, Avatar } from 'react-native-elements'
import { StyleSheet, Text, View, FlatList, Divider } from 'react-native'
import TopNavBar from '../components/TopNavBar'
import ScheduleCard from '../components/ScheduleCard'

export default function HistoryScreen ({ route }) {
  const [spinner, setSpinner] = useState(false)
  let member = route.params
  let histories = member.history

  useEffect(() => {
    if (!member) {
      setSpinner(true)
    }
    if (member.length > 0) {
      setSpinner(false)
    }
  }, [])

  const renderItem = ({ item }) => {
    let long = Number.parseFloat(item.longitude).toFixed(5)
    let lat = Number.parseFloat(item.latitude).toFixed(5)

    return (
      <ScheduleCard
        title={long}
        time={lat}
      />
    )
  }

  const headers = [
    {
      id: 1,
      longitude: 'longitude',
      latitude: 'latitude'
    },
  ]

  const renderItemHeader = ({ item }) => {

    return (
      <ScheduleCard
        title={item.longitude}
        time={item.latitude}
      />
    )
  }
  const ListHeader = () => {
    //View to set in Header
    return (
      <View >
        <FlatList
          //Header to show above listview
          data={headers}
          renderItem={renderItemHeader}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    )
  }

  return (
    <>
      <TopNavBar style={{ flex: 1 }} />
      <View style={{ flex: 4 }}>
        {
          spinner ? <Spinner /> :
            <Card>
              <Card.Title>
                <View style={{
                  flex: 1, flexDirection: 'row', justifyContent: 'space-around',
                  alignItems: 'center'
                }}>
                  <View style={{ marginRight: 5 }}>
                    <Avatar
                      rounded
                      style={styles.tinyLogo}
                      source={{ uri: member.img }}
                    />
                  </View>
                  <View style={{ marginLeft: 5 }}>
                    <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>Papa Pevita</Text>

                  </View>
                </View>
              </Card.Title>
              <Card.Divider />
              <View>
                <FlatList
                  //Header to show above listview
                  ListHeaderComponent={ListHeader}
                  data={histories}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                />
              </View>
            </Card>
        }
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
  }
})
