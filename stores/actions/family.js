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
    type: 'FETCH_FAMILIES_FAILED',
    payload: error
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
      console.log('err', err)
    }
  }
}

export function fetchAFamily (url) {
  return async (dispatch) => {
    try {

      dispatch(fetchFamiliesStart())
      const res = await fetch(url)

      if (!res.ok) {
        throw Error(res.statusText)
      }

      const data = await res.json()
      dispatch(fetchAFamilySuccess(data))

    } catch (err) {
      dispatch(fetchFamiliesFailed(err))
      console.log('err', err)
    }
  }
}
