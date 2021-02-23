const endpoint = 'http://192.168.1.7:3000'
//const endpoint = 'http://192.168.43.185:3000'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function fetchNewsStart () {
  return {
    type: 'FETCH_NEWS_START'
  }
}

export function fetchNewsSuccess () {
  return {
    type: 'FETCH_NEWS_SUCCESS'
  }
}

export function fetchNewsFailed (error) {
  return {
    type: 'FETCH_NEWS_FAILED',
    payload: error
  }
}

export function fetchNews () {
  return async (dispatch) => {
    try {

      dispatch(fetchNewsStart())
      const access_token = await AsyncStorage.getItem('access_token')

      const response = await axios.get(`${endpoint}/news`, {
        headers: {
          access_token
        }
      })

      dispatch(fetchNewsSuccess(response.data))
    } catch (err) {
      dispatch(fetchNewsFailed(err))
      console.log('err', err)
    }
  }
}