import React from 'react';
import { StyleSheet, View, Image } from 'react-native'
import { Layout, Card, Text, useTheme, Avatar } from '@ui-kitten/components';
import CustomMarker from '../components/CustomMarker'

export default function MembersCard (props) {
  const theme = useTheme()
  const renderHeader = (avatar: uri) => {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 40, height: 40, marginHorizontal: 8}}
          source={{uri}} />
      </View>
    )
  }

  return (
    <Card
      style={{ backgroundColor: theme['color-primary-default'] }}
      header={renderHeader}
    >

      <View
        style={styles.bodyContainer}>
          <Text>Gender: {props.gender}</Text>
      </View>

      <View
        style={styles.bodyContainer}>
          <Text>Contact: {props.contact}</Text>
      </View>

    </Card>
  )
}

const styles = StyleSheet.create({
  logo: {
    marginHorizontal: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bodyContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
})
