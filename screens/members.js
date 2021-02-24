import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient'
import TouchableScale from 'react-native-touchable-scale'
import TopNavBar from '../components/TopNavBar'
import { Spinner } from '@ui-kitten/components'

export default function MembersScreen ({ navigation }) {
  useEffect(() => {
    if (loading) {
      setSpinner(true)
    }
    if (clients.length > 0) {
      setSpinner(false)
    }
  }, [])

  const { clients, loading, error } = useSelector((state) => state.family)
  const [spinner, setSpinner] = useState(false)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const goToHistory = () => {
    navigation.push('History',)
  }


  // data buat mockup
  //const [membersList] = useState([
  //{
  //id: 1,
  //name: 'Samara',
  //gender: 'female',
  //image: 'https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  //contact: '+62 123456'
  //},
  //{
  //id: 2,
  //name: 'Kanya',
  //gender: 'female',
  //image: 'https://uifaces.co//our-content//donated//93aChDW6.jpg',
  //contact: '+62 392810'
  //},
  //{
  //id: 3,
  //name: 'Kenji',
  //gender: 'male',
  //image: 'https://uifaces.co//our-content//donated//gPZwCbdS.jpg',
  //contact: '+62 201923'
  //},
  //{
  //id: 4,
  //name: 'Sandra',
  //gender: 'female',
  //image: 'https://uifaces.co/our-content/donated/hRomGWuB.jpg',
  //contact: '+62 201923'
  //},
  //])

  return (
    <>
      <TopNavBar style={{ flex: 1 }} />
      <View style={{ flex: 4 }}>
        {
          spinner ? <Spinner /> :
            clients.map((member) => (
              <ListItem
                onPress={() => navigation.push('History', member)}
                style={{ marginBottom: 10 }}
                key={member.id}
                bottomDivider
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                linearGradientProps={{
                  colors: ["#3360FF", "#01BAFD"],
                  start: { x: 0, y: 1 },
                  end: { x: 0, y: 0.2 },
                }}
                ViewComponent={LinearGradient}
              >
                <Avatar
                  rounded
                  source={{ uri: member.img }} />
                <ListItem.Content>
                  <ListItem.Title>{capitalizeFirstLetter(member.name)}</ListItem.Title>
                  <ListItem.Subtitle>{member.gender}</ListItem.Subtitle>
                  <ListItem.Subtitle>{member.contact}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron color="white"
                />
              </ListItem>
            ))
        }
      </View>
    </>
  )
}

