import React from 'react';
import { StyleSheet, View } from 'react-native'
import { Layout, Card, Text, useTheme } from '@ui-kitten/components';

export default function ScheduleCard (props) {
  const theme = useTheme()

  return (
    <Card
      style={{ backgroundColor: theme['color-primary-default'] }}>
      <View 
        style={styles.container}>

        <Layout style={styles.layout} level='4'>
          <Text>{props.time}</Text>
        </Layout>

        <Layout style={styles.layout} level='3'>
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
})
