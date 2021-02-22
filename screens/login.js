import React, { useState } from 'react'
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native'
import globalStyles from '../components/GlobalStyles'
import { TouchableWithoutFeedback } from 'react-native'
import { Input, Icon, Button } from '@ui-kitten/components'
import CustomModal from '../components/CustomModal'

const AlertIcon = (props) => (
  <Icon {...props} name='alert-circle-outline' />
)

export default function LoginScreen ({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [warningText, setWarningText] = useState('')
  const [visible, setVisible] = useState(false)

  const [secureTextEntry, setSecureTextEntry] = React.useState(true)

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry)
  }

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  )

  const handleSubmit = () => {
    if (password === '1234' && email === 'user@mail.com') {
      navigation.navigate('Home')
    } else {
      setWarningText('Wrong password / email!')
      setVisible(true)
    }
  }

  return (
    <>
      <View
        style={globalStyles.mainContainer}>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/FamTrack_vector.png')}
        />
        <Input
          style={styles.input}
          placeholder='Input your email address'
          value={email}
          required
          onChangeText={email => setEmail(email)}
        />
        <Input
          style={styles.input}
          value={password}
          required
          placeholder='Input your password'
          caption='Should contain at least 8 symbols'
          accessoryRight={renderIcon}
          captionIcon={AlertIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={password => setPassword(password)}
        />
        <Button
          style={styles.loginButton}
          onPress={() => handleSubmit()}
        >
          LOGIN</Button>
        {
          visible && <CustomModal
            text={warningText}
            setVisible={() => setVisible(false)} />
        }
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    margin: 2,
  },
  loginButton: {
    marginTop: 20,
    alignSelf: 'stretch'
  },
  tinyLogo: {
    width: 200,
    height: 200,
  }
})
