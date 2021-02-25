import React from 'react';
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Layout, Card, Text, Spinner, useTheme } from '@ui-kitten/components'

export default function ScheduleCard (props) {
  const theme = useTheme()
  const { schedule, loading, error } = useSelector((state) => state.family)

  if (loading) return (
    <View style={styles.spinnerContainer}>
      <Spinner
        size="large"
        style={styles.spinnerStyle} />
    </View>
  )

  return (
    <Card
      style={{ backgroundColor: theme['color-info-500'] }}>

      <View
        style={styles.container}>

        <Layout style={styles.layout}>
          <Text>{props.time}</Text>
        </Layout>

        <Layout style={styles.layout}>
          <Text>{props.title}</Text>
        </Layout>

      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
