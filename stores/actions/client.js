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

export function fetchClients (url) {
  return async (dispatch) => {
    try {

      dispatch(fetchClientsStart())
      const res = await fetch(url)

      if (!res.ok) {
        throw Error(res.statusText)
      }

      const data = await res.json()
      dispatch(fetchClientsSuccess(data.results))

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
