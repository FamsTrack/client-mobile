import React, { useState } from 'react'
import { StyleSheet, Text, FlatList, Divider, View } from 'react-native'
import NewsCard from '../components/NewsCard'
import TopNavBar from '../components/TopNavBar'

export default function NewsScreen () {
  const renderItem = ({ item }) => (
    <NewsCard
      title={item.title}
      img={item.img}
      source={item.source} />
  )

  const [newsList] = useState([
    {
      id: 1,
      title: 'Can Saudi Arabia afford human rights?',
      img: "https://www.dw.com/image/50239544_401.jpg",
      source: 'DW'
    },
    {
      id: 2,
      title: 'What you need to know before visiting Saudi Arabia',
      img: "https://static.onecms.io/wp-content/uploads/sites/28/2019/10/deserto-sinai-saudi-arabia-SAUDIGUIDE1019.jpg",
      source: 'apaaja.com'
    },
    {
      id: 3,
      title: 'Can Saudi Arabia afford human rights?',
      img: "https://www.dw.com/image/50239544_401.jpg",
      source: 'DW'
    },
    {
      id: 4,
      title: 'What you need to know before visiting Saudi Arabia',
      img: "https://static.onecms.io/wp-content/uploads/sites/28/2019/10/deserto-sinai-saudi-arabia-SAUDIGUIDE1019.jpg",
      source: 'apaaja.com'
    },
  ])

  return (
    <>
      <TopNavBar style={{ flex: 1 }} />
      <View style={{ flex: 4 }}>
        <FlatList
          data={newsList}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={Divider}
        />
      </View>
      {
        //newsList.map(news => {
        //return <NewsCard
        //key={news.id}
        //title={news.title}
        //img={news.img}
        //source={news.source}/>
        //})
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 200,
  },
})

