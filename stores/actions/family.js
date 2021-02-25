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
      const payloadSchedule = response.data[0].group.schedule

      dispatch(fetchClientsSuccess(response.data))
      dispatch(addSchedules(payloadSchedule))
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

export function initBuzzer (arduinoKey, arduinoId) {
  return async (dispatch) => {
    try {
      dispatch(fetchClientsStart())
      const access_token = await AsyncStorage.getItem('access_token')

      const response = await axios.get(`/devices/${arduinoId}`, {
        headers: {
          access_token
        }
      })

      const resp = await axios.get(`/devices/${arduinoKey}/key?buzzerStatus=${!response.data.buzzerStatus}`, {
        headers: {
          access_token
        }
      })

      if (resp.data === 1) {
        dispatch(buzzerSuccess())
      }

    } catch (err) {
      dispatch(fetchFamiliesFailed(err))
    }
  }
}

export function buzzerSuccess () {
  return {
    type: 'BUZZER_SUCCESS'
  }
}
