//const endpoint = 'http://192.168.1.7:3000/families'
//const endpoint = 'http://192.168.1.3:3000/families'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../../api/axios'

export function fetchFamiliesStart () {
  return {
    type: 'FETCH_FAMILIES_START'
  }
}

export function fetchFamiliesSuccess (data) {
  return {
    type: 'FETCH_FAMILIES',
    payload: data
  }
}

export function fetchAFamilySuccess (data) {
  return {
    type: 'FETCH_A_FAMILY',
    payload: data
  }
}


export function fetchFamiliesFailed (error) {
  return {
    type: 'FETCH_FAMILIES_FAILED', payload: error
  }
}

export function fetchFamilies (url) {
  return async (dispatch) => {
    try {

      dispatch(fetchFamiliesStart())
      const res = await fetch(url)

      if (!res.ok) {
        throw Error(res.statusText)
      }

      const data = await res.json()
      dispatch(fetchFamiliesSuccess(data.results))

    } catch (err) {
      dispatch(fetchFamiliesFailed(err))
      console.log('test', err)
    }
  }
}

export function fetchAFamily () {
  return async (dispatch) => {
    try {

      dispatch(fetchFamiliesStart())
      const access_token = await AsyncStorage.getItem('access_token')

      const response = await axios.get('/families/user', {
        headers: {
          access_token
        }
      })

      const { name, contact, address, gender } = response.data

      const payloadUser = {
        name,
        contact,
        address,
        gender
      }

      const payloadSchedule = response.data.client[0].group.schedule

      dispatch(fetchAFamilySuccess(payloadUser))
      dispatch(addClients(response.data.client))
      dispatch(addSchedules(payloadSchedule))
    } catch (err) {
      dispatch(fetchFamiliesFailed(err))
      console.log('>>>>>> ini error-nya', err.response.data)
    }
  }
}

export function addClients (data) {
  return {
    type: 'ADD_CLIENTS',
    payload: data
  }
}

export function updateLocation (data) {
  return (dispatch, getState) => {
    const { family } = getState()
    family.clients.forEach((client) => {
      if (data.clientId === client.id) {
        client.device = data
      }
    })
    dispatch(addClients(family.clients))
  }
}

export function addSchedules (data) {
  return {
    type: 'ADD_SCHEDULES',
    payload: data
  }
}
