//const endpoint = 'http://192.168.1.7:3000/login'
//const endpoint = 'http://192.168.1.3:3000/login'
import axios from '../../api/axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function loginStart () {
  return {
    type: 'LOGIN_START'
  }
}

export function loginSuccess () {
  return {
    type: 'LOGIN_SUCCESS'
  }
}

export function loginFailed (error) {
  return {
    type: 'LOGIN_FAILED',
    payload: error
  }
}

export function fetchLogin (payload) {
  return async (dispatch) => {
    try {
      dispatch(loginStart())
      const response = await axios.post('/login', payload)

      await AsyncStorage.setItem('access_token', response.data.access_token)
      dispatch(loginSuccess())

    } catch (err) {
      dispatch(loginFailed(err))
      console.log('>>> err', err)
    }
  }
}

export function fetchLogout () {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem('access_token')
      dispatch(logOutSuccess())
    } catch (err) {
      dispatch(logoutFailed(err))
    }
  }
}

export function logOutSuccess () {
  return {
    type: 'LOGOUT'
  }
}

export function storeToken (data) {
  return {
    type: 'STORE_TOKEN',
    payload: data
  }
}
