const endpoint = 'http://192.168.1.7:3000/login'
//const endpoint = 'http://192.168.1.3:3000/login'
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
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        throw Error(res.statusText)
      }

      const data = await res.json()

      await AsyncStorage.setItem('access_token', data.access_token)
      dispatch(loginSuccess())

    } catch (err) {
      dispatch(loginFailed(err))
      console.log('err', err)
    }
  }
}

export function fetchLogout () {
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
