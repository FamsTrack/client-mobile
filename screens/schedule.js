import React from 'react'
import { StyleSheet, View, FlatList, Divider, Text } from 'react-native'
import { Layout } from '@ui-kitten/components'
import TopNavBar from '../components/TopNavBar'
import ScheduleCard from '../components/ScheduleCard'
import { useSelector } from 'react-redux'

export default function ScheduleScreen ({ navigation }) {
  const { schedules, loading, error } = useSelector((state) => state.family)

  const renderItem = ({ item }) => (
    <ScheduleCard
      title={item.description}
      time={item.time}
    />
  )

  return (
    <>
      <TopNavBar style={{ flex: 1 }} />
      <View
        style={styles.container}
      >

        <Layout style={styles.layout}>
          <Text
            style={{fontWeight: 'bold'}}
          >Time</Text>
        </Layout>

        <Layout style={styles.layout}>
          <Text
            style={{fontWeight: 'bold'}}
          >Activity</Text>
        </Layout>

      </View>
      <View style={{ flex: 4 }}>
        <FlatList
          data={schedules}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={Divider}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    flexDirection: 'row'
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
