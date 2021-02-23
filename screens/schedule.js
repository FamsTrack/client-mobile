import React, { useState } from 'react'
import { StyleSheet, View, FlatList, Divider} from 'react-native'
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

  // buat mockup desain
  //const [scheduleList] = useState([
    //{
      //id: 1,
      //title: 'Tawaf and Sa\'i',
      //time: '14:00'
    //},
    //{
      //id: 2,
      //title: 'Ashr prayer',
      //time: '15:30'
    //},
    //{
      //id: 3,
      //title: 'Maghrib prayer',
      //time: '18:00'
    //},
    //{
      //id: 4,
      //title: 'Free time',
      //time: '18:30'
    //},
    //{
      //id: 5,
      //title: 'Isya prayer',
      //time: '19:30'
    //},
    //{
      //id: 6,
      //title: 'Dinner',
      //time: '20:00'
    //}
  //])

  return (
    <>
      <TopNavBar style={{ flex: 1 }} />
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
