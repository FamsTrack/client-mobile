import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import globalStyles from '../components/GlobalStyles'
import { TouchableWithoutFeedback } from 'react-native'
import { Input, Icon, Button, Spinner, StyleService, useStyleSheet, useTheme } from '@ui-kitten/components'
import CustomModal from '../components/CustomModal'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLogin } from '../stores/actions/user'

const AlertIcon = (props) => (
  <Icon {...props} name='alert-circle-outline' />
)

export default function LoginScreen ({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [warningText, setWarningText] = useState('')
  const [visible, setVisible] = useState(false)
  const [spinner, setSpinner] = useState(false)
  const { isLoggedIn, token, loading, error } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const [secureTextEntry, setSecureTextEntry] = React.useState(true)

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Home')
      setVisible(false)
      setSpinner(false)
    }
    if (error) {
      console.log('>>> ini error', error)
      setWarningText('Wrong password / email!')
      setVisible(true)
    }
    if (loading) {
      console.log('>>>> ini loading:', loading)
      setSpinner(true)
    }
  }, [isLoggedIn, error, loading])

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry)
  }

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  )

  const handleVisible = () => {
    setVisible(false)
    setSpinner(false)
  }

  const handleSubmit = () => {
    const payload = {
      email,
      password,
      pushToken: token
    }
    dispatch(fetchLogin(payload))
  }

  const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner
        size='small'
        status='control'
      />
    </View>
  )

  const styles = useStyleSheet(themedStyles)

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
          caption='Should contain at least 6 characters'
          accessoryRight={renderIcon}
          captionIcon={AlertIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={password => setPassword(password)}
        />
        {
          spinner ? <Button
            style={styles.loginButton}
            status='success'
            onPress={() => handleSubmit()}
            accessoryLeft={LoadingIndicator}
          > LOADING </Button> :
            <Button
              status='success'
              style={styles.loginButton}
              onPress={() => handleSubmit()}
            >
              LOGIN</Button>
        }
        {
          visible && <CustomModal
            text={warningText}
            setVisible={() => handleVisible()} />
        }
      </View>
    </>
  )
}

const themedStyles = StyleService.create({
  input: {
    margin: 2
  },
  loginButton: {
    marginTop: 20,
    alignSelf: 'stretch',
    color: 'color-success-500'
  },
  tinyLogo: {
    width: 200,
    height: 200,
    marginVertical: 10
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})
