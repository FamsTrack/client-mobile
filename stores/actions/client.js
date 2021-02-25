import axios from '../../api/axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function fetchClientsStart () {
  return {
    type: 'FETCH_CLIENTS_START'
  }
}

export function fetchClientsSuccess (data) {
  return {
    type: 'FETCH_CLIENTS',
    payload: data
  }
}

export function fetchAClientSuccess (data) {
  return {
    type: 'FETCH_A_CLIENT',
    payload: data
  }
}

export function fetchClientsFailed (error) {
  return {
    type: 'FETCH_CLIENTS_FAILED',
    payload: error
  }
}

export function fetchClients () {
  return async (dispatch) => {
    try {

      dispatch(fetchClientsStart())
      const access_token = await AsyncStorage.getItem('access_token')
      const response = await axios.get('/clients', {
        headers: {
          access_token
        }
      })

      //console.log('>>> admin login:', response.data)

      dispatch(fetchClientsSuccess(response.data))

    } catch (err) {
      dispatch(fetchClientsFailed(err))
      console.log('err', err)
    }
  }
}

export function fetchAClient (url) {
  return async (dispatch) => {
    try {

      dispatch(fetchClientsStart())
      const res = await fetch(url)

      if (!res.ok) {
        throw Error(res.statusText)
      }

      const data = await res.json()
      dispatch(fetchAClientSuccess(data))

    } catch (err) {
      dispatch(fetchClientsFailed(err))
      console.log('err', err)
    }
  }
}
