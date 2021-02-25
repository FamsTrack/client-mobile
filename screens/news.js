import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNews } from '../stores/actions/news'
import { Spinner } from '@ui-kitten/components'
import { StyleSheet, Text, FlatList, Divider, View } from 'react-native'
import NewsCard from '../components/NewsCard'
import TopNavBar from '../components/TopNavBar'

export default function NewsScreen () {
  const { news, loading, error } = useSelector((state) => state.news)
  const [spinner, setSpinner] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchNews())
    if (loading) {
      console.log('<<<< ini loading', loading)
      setSpinner(true)
    }
    if (news.length > 0) {
      setSpinner(false)
    }
  }, [])

  const renderItem = ({ item }) => (
    <NewsCard
      title={item.name}
      img={item.image}
      description={item.description} />
  )

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
            <FlatList
              data={news}
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
    maxHeight: 200,
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

