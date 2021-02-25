import React from 'react'
import { View } from 'react-native'
import globalStyles from '../components/GlobalStyles'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

export default function EditProfile () {
  return (
    <>
      <View
        style={globalStyles.mainContainer}>

      <Input
        placeholder="Comment"
        leftIcon={{ type: 'font-awesome', name: 'comment' }}
        onChangeText={value => this.setState({ comment: value })}
       errorStyle={{ color: 'red' }}
       errorMessage='ENTER A VALID ERROR HERE'
       />

      <Input placeholder="Password" secureTextEntry={true} />

      </View>
    </>
  )
}

